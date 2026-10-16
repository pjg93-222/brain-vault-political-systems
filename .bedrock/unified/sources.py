"""Read-only source connectors; generated knowledge is stored in a separate private collection.

No source code, agent reasoning, tool output, credentials, or full chat transcripts are exported.
Codex adapter reads explicit completed final-answer pointers from read-only SQLite connections.
"""
from __future__ import annotations
import argparse
from collections import Counter
from contextlib import closing
from dataclasses import dataclass, field
import datetime as dt
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import shutil
import sqlite3
import subprocess
import sys
import tempfile
import time
import unicodedata
from urllib.parse import quote
import xml.etree.ElementTree as ET
import zipfile
import yaml

HERE=Path(__file__).resolve().parent
HOME=Path.home()
NO_WINDOW=getattr(subprocess,'CREATE_NO_WINDOW',0)

def digest(data): return hashlib.sha256(data if isinstance(data,bytes) else data.encode('utf-8')).hexdigest()
def slug(text): return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',text).encode('ascii','ignore').decode().lower()).strip('-')[:85] or 'source'
def normalize(text): return re.sub(r'\s+',' ',text).strip()
def title_key(text): return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',text).encode('ascii','ignore').decode().lower())
def stamp(): return dt.datetime.now(dt.timezone.utc).isoformat()
def note_fingerprint(text): return digest(re.sub(r'^generated_sha256:.*\n','',text,flags=re.M))
def inside(root,target):
    path=(root/target).resolve()
    if not path.is_relative_to(root.resolve()): raise RuntimeError('Generated note escaped private collection')
    return path
def fm(text):
    match=re.match(r'\A---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)',text)
    if not match: return {}
    try: return yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError: return {}

def atomic(path,text):
    path=Path(path); path.parent.mkdir(parents=True,exist_ok=True)
    if path.exists() and path.read_text(encoding='utf-8')==text: return False
    tmp=path.with_name('.'+path.name+'.tmp-'+str(os.getpid())); tmp.write_bytes(text.encode('utf-8'))
    for attempt in range(20):
        try: os.replace(tmp,path); return True
        except PermissionError:
            if attempt==19: raise
            time.sleep(.1)

def command(args,**kwargs):
    return subprocess.run([str(a) for a in args],capture_output=True,text=True,encoding='utf-8',errors='replace',
                          timeout=kwargs.pop('timeout',90),creationflags=NO_WINDOW,**kwargs)

def git(root,*args,check=True):
    p=command(['git','-C',root,*args],env=dict(os.environ,GIT_TERMINAL_PROMPT='0'))
    if check and p.returncode: raise RuntimeError('Git '+args[0]+' failed: '+p.stderr[:240])
    return p.stdout.strip()

@dataclass
class Record:
    id:str
    kind:str
    title:str
    text:str
    source:str
    version:str
    category:str
    project:str='general'
    raw_sha:str=''
    metadata:dict=field(default_factory=dict)

def config(path=None):
    data={'brain':str(HOME/'Documents/brain'),'research':str(HOME/'Documents/research'),
          'knowledge':str(HOME/'Documents/knowledge-private'),'codex':str(HOME/'.codex'),
          'projects':{'melange':str(HOME/'OneDrive/Desktop/Melange Systems'),
                      'mentat':str(HOME/'Mentat'),
                      'terrier':str(HOME/'Documents/Terrier/outputs/cu-geography-v3'),
                      'project-brain':str(HOME/'OneDrive/Desktop/Project Brain')}}
    if path: data.update(json.loads(Path(path).read_text(encoding='utf-8-sig')))
    return data

class HTMLText(HTMLParser):
    def __init__(self): super().__init__(); self.parts=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        if tag in ['script','style']: self.skip+=1
    def handle_endtag(self,tag):
        if tag in ['script','style']: self.skip=max(0,self.skip-1)
        if tag in ['p','div','h1','h2','li']: self.parts.append('\n')
    def handle_data(self,data):
        if not self.skip: self.parts.append(data)

def ocr_local(path,tessdata):
    if not tessdata or not (Path(tessdata)/'eng.traineddata').is_file(): return '',True
    import fitz
    parts=[]
    if path.suffix.lower()=='.pdf':
        progress_path=Path(tessdata).parent/'ocr-pages'/(digest(str(path.resolve())+str(path.stat().st_size)+str(path.stat().st_mtime_ns))+'.json')
        if progress_path.is_file(): parts=json.loads(progress_path.read_text(encoding='utf-8'))['parts']
        started=time.monotonic(); count=0
        with fitz.open(path) as document:
            total=len(document)
            for index in range(len(parts),total):
                page=document[index]
                tp=page.get_textpage_ocr(language='eng',dpi=150,full=True,tessdata=str(tessdata))
                parts.append(page.get_text(textpage=tp))
                atomic(progress_path,json.dumps({'parts':parts}))
                count+=1
                if count>=12 or time.monotonic()-started>=45: break
        return '\n\n'.join(parts)[:2_000_000],len(parts)==total
    elif path.suffix.lower() in ['.docx','.pptx']:
        with zipfile.ZipFile(path) as archive:
            for name in archive.namelist():
                if '/media/' not in name or not name.lower().endswith(('.png','.jpg','.jpeg','.tiff','.bmp')): continue
                if archive.getinfo(name).file_size>50_000_000: continue
                pix=fitz.Pixmap(archive.read(name))
                if pix.alpha: pix=fitz.Pixmap(pix,0)
                if pix.colorspace!=fitz.csRGB: pix=fitz.Pixmap(fitz.csRGB,pix)
                while pix.width*pix.height>10_000_000: pix.shrink(1)
                with fitz.open('pdf',pix.pdfocr_tobytes(language='eng',tessdata=str(tessdata))) as document:
                    parts.extend(page.get_text() for page in document)
    return '\n\n'.join(parts)[:2_000_000],True

def extract(path,tessdata=None):
    """Extract locally. Unreadable images/doc binaries stay explicit review items."""
    path=Path(path); ext=path.suffix.lower()
    if ext in ['.md','.txt','.rst']: return path.read_text(encoding='utf-8-sig',errors='replace'),'text-extracted'
    if ext in ['.docx','.pptx','.epub']:
        parts=[]
        with zipfile.ZipFile(path) as archive:
            names=archive.namelist()
            if ext=='.docx': names=[n for n in names if n=='word/document.xml']
            elif ext=='.pptx': names=sorted(n for n in names if re.fullmatch(r'ppt/slides/slide\d+\.xml',n))
            else: names=[n for n in names if n.endswith(('.xhtml','.html','.htm'))]
            for name in names:
                raw=archive.read(name)
                if ext=='.epub':
                    parser=HTMLText(); parser.feed(raw.decode('utf-8',errors='replace')); parts.append(''.join(parser.parts))
                else:
                    tree=ET.fromstring(raw)
                    parts.append('\n'.join(' '.join(n.itertext()) for n in tree.iter() if n.tag.endswith('}p')))
        text='\n\n'.join(parts)
        if len(normalize(text))<60:
            ocr,complete=ocr_local(path,tessdata)
            if len(normalize(ocr))>60: return ocr,'ocr-extracted-unverified' if complete else 'ocr-in-progress'
        return text[:2_000_000], 'text-extracted' if len(normalize(text))>60 else 'needs-text-review'
    if ext=='.pdf':
        # MuPDF is much faster than pure-Python PDF parsing on long course packs.
        try:
            import fitz
            parts=[]; total=0; partial=False
            with fitz.open(path) as document:
                for page in document:
                    value=page.get_text(); parts.append(value); total+=len(value)
                    if total>=2_000_000: partial=True; break
            text='\n\n'.join(parts)[:2_000_000]
            if len(normalize(text))<100:
                ocr,complete=ocr_local(path,tessdata)
                if len(normalize(ocr))>60: return ocr,'ocr-extracted-unverified' if complete else 'ocr-in-progress'
            return text, ('text-extracted-partial' if partial else 'text-extracted') if len(normalize(text))>100 else 'needs-ocr'
        except ImportError:
            pass
        exe=shutil.which('pdftotext')
        if not exe:
            candidate=Path(r'C:\Program Files\Git\mingw64\bin\pdftotext.exe')
            if candidate.is_file(): exe=str(candidate)
        if exe:
            p=command([exe,'-enc','UTF-8',path,'-'],timeout=60); text=p.stdout
        else:
            from pypdf import PdfReader
            reader=PdfReader(path); text='\n\n'.join(page.extract_text() or '' for page in reader.pages)
        return text[:2_000_000], 'text-extracted' if len(normalize(text))>100 else 'needs-ocr'
    return '', 'unsupported-format'

def classify(title,text):
    sample=(title+' '+text[:1800]).lower()
    if re.search(r'resum[eé]|scholarship agreement|career (?:values|progress)|personal branding|passport|accomplishment record|tax return|invoice',sample): return 'personal'
    if re.search(r'\babstract\b|\bdoi\b|arxiv|journal of|proceedings of',text[:4500].lower()): return 'research'
    if re.search(r'assignment|syllabus|\bclass \d|\bmsba\b|study guide|quiz|course|lecture|journal [12345]|learning reflection',sample): return 'coursework'
    if re.search(r'melange|mentat|moneyball|handoff|closeout|collector|staffer|boot.protocol',sample): return 'project-records'
    if re.search(r'congress|legislat|credit.union|committee|advocacy',sample): return 'policy-reference'
    return 'reference'

def synopsis(text,limit=4500):
    text=text.replace('\x00','')
    abstract=re.search(r'\bAbstract\b\s*[:—-]?\s*([\s\S]{80,5000})',text[:16000],re.I)
    if abstract:
        abstract=re.split(r'\n\s*(?:1[ .]+)?Introduction\b|\n\s*Keywords\b',abstract.group(1),maxsplit=1,flags=re.I)[0]
        return normalize(abstract)[:limit]
    paragraphs=[normalize(p) for p in re.split(r'\n\s*\n',text) if len(normalize(p))>=60]
    meaningful=[p for p in paragraphs if not re.match(r'^(contents|table of contents|copyright|all rights reserved)\b',p,re.I)]
    return '\n\n'.join(meaningful[:6])[:limit] or normalize(text)[:limit]

def source_heading(text,fallback):
    # Filenames are safer than mistaking a code comment or a slide label for a document title.
    readable=re.sub(r'\.(?:pdf|docx|pptx|epub|md|txt)$','',fallback,flags=re.I).replace('_',' ')
    if len(re.findall(r'[A-Za-z]{3,}',readable))>=3: return readable[:180]
    lines=[normalize(line) for line in text[:1200].splitlines() if 12<=len(normalize(line))<=180]
    for line in lines[:10]:
        if re.search(r'@|https?://|copyright|arxiv:|^\d|^abstract\b',line,re.I): continue
        if len(line.split())>=4: return line
    return fallback

def research_records(cfg,stats):
    root=Path(cfg['research']); cache=Path(cfg['knowledge'])/'.integration/extracted'; cache.mkdir(parents=True,exist_ok=True)
    for stub in sorted((root/'inbox').glob('*.md')):
        meta=fm(stub.read_text(encoding='utf-8-sig')); copy=meta.get('copy'); sha=str(meta.get('sha256',''))
        if not copy or not sha: continue
        source=(root/copy).resolve()
        if not source.is_relative_to(root.resolve()): raise RuntimeError('Research copy escaped source vault')
        cached=cache/(sha+'.json')
        if cached.is_file():
            result=json.loads(cached.read_text(encoding='utf-8'))
            if (result['status']=='ocr-in-progress' or (result['status'] in ['needs-ocr','needs-text-review'] and not result.get('ocr_attempted'))) and (cache.parent/'tessdata/eng.traineddata').is_file() and source.is_file():
                try: text,status=extract(source,cache.parent/'tessdata')
                except Exception as exc: text,status=result.get('text',''),'extraction-error:'+type(exc).__name__
                result={'text':text,'status':status,'ocr_attempted':True}; atomic(cached,json.dumps(result))
        elif source.is_file():
            try: text,status=extract(source,cache.parent/'tessdata')
            except Exception as exc: text,status='', 'extraction-error:'+type(exc).__name__
            result={'text':text,'status':status}; atomic(cached,json.dumps(result))
        else: result={'text':'','status':'missing-original'}
        text=result['text']; title=str(meta.get('title',stub.stem)); category=classify(title,text)
        stats['research_extraction_'+result['status']]+=1
        yield Record('research:'+sha,'document',source_heading(text,title),text,str(source),sha,category,
                     raw_sha=sha,metadata={'stub':str(stub),'extraction':result['status'],'original_name':title})

def existing_bindings(cfg):
    bindings={}; raw={}
    for ns in ['brain','research']:
        root=Path(cfg[ns])
        for folder,dirs,files in os.walk(root):
            dirs[:]=[d for d in dirs if not d.startswith(('.','_')) or d=='_non-articles']
            for name in files:
                if not name.endswith('.md') or name.startswith('_'): continue
                path=Path(folder)/name; rel=path.relative_to(root).as_posix()
                if rel.startswith(('fleeting/','inbox/')): continue
                meta=fm(path.read_text(encoding='utf-8-sig',errors='replace')); target=ns+'/'+rel[:-3]
                if ns=='research' and meta.get('type')=='paper':
                    key=title_key(str(meta.get('title','')))
                    if len(key)>=45: raw['title:'+key]=target
                for source in meta.get('sources',[]) or []:
                    if isinstance(source,dict) and source.get('path') and source.get('sha256'):
                        bindings[os.path.normcase(os.path.normpath(source['path']))]=(str(source['sha256']),target)
                hashes=meta.get('sha12',[]) or []
                if isinstance(hashes,str): hashes=[hashes]
                if meta.get('sha256'): hashes.append(meta['sha256'])
                for value in hashes:
                    if isinstance(value,str) and len(value)>=12: raw[value[:12]]=target
    return bindings,raw

def claude_records(cfg,bindings,stats):
    root=HOME/'.claude/projects'
    for memory in sorted(root.glob('*/memory/*.md')):
        if memory.name.lower()=='memory.md': continue
        text=memory.read_text(encoding='utf-8-sig',errors='replace'); sha=digest(memory.read_bytes())
        known=bindings.get(os.path.normcase(os.path.normpath(memory)))
        if known and known[0]==sha:
            stats['claude_already_curated']+=1; continue
        meta=fm(text); body=re.sub(r'\A---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)','',text,count=1) if meta else text
        stats['claude_pending_sources']+=1
        yield Record('claude:'+str(memory).lower(),'claude-memory',str(meta.get('name',meta.get('title',memory.stem))),
                     body,str(memory),sha,'claude-memory','melange' if 'melange' in str(memory).lower() else 'general',raw_sha=sha)

def connect_ro(path):
    con=sqlite3.connect(Path(path).resolve().as_uri()+'?mode=ro',uri=True,timeout=10)
    con.execute('pragma query_only=on'); return con

def codex_records(cfg,stats):
    root=Path(cfg['codex']); states=sorted(root.glob('state_*.sqlite'),key=lambda p:int(p.stem.split('_')[-1]))
    histories=sorted(root.glob('thread_history_*.sqlite'),key=lambda p:int(p.stem.split('_')[-1]))
    if not states or not histories: raise RuntimeError('Codex state/history stores unavailable; no source state was advanced')
    with closing(connect_ro(states[-1])) as state, closing(connect_ro(histories[-1])) as history:
        columns={r[1] for r in history.execute('pragma table_info(thread_turns)')}
        if not {'thread_id','turn_id','status','final_agent_item_id','completed_at'}<=columns:
            raise RuntimeError('Codex history schema changed; adapter requires review')
        rows=state.execute("select id,title,cwd from threads where source not like '{%' order by updated_at desc").fetchall()
        stats['codex_main_threads']=len(rows)
        for tid,title,cwd in rows:
            turn=history.execute("select turn_id,final_agent_item_id,completed_at from thread_turns where thread_id=? and status='completed' and final_agent_item_id is not null order by completed_at desc,rollout_ordinal desc limit 1",(tid,)).fetchone()
            if not turn: stats['codex_no_completed_final']+=1; continue
            item=history.execute('select item_json from thread_items where thread_id=? and turn_id=? and item_id=?',(tid,turn[0],turn[1])).fetchone()
            if not item: stats['codex_missing_final_item']+=1; continue
            obj=json.loads(item[0])
            if obj.get('type')!='agentMessage' or obj.get('phase') not in ['final_answer','final']:
                stats['codex_nonfinal_item_ignored']+=1; continue
            text=obj.get('text','')
            if not isinstance(text,str) or len(text.strip())<60: stats['codex_short_final_ignored']+=1; continue
            project='general'
            for name in ['melange','mentat','terrier','moneyball']:
                if name in (str(cwd)+' '+title).lower(): project=name; break
            yield Record('codex:'+tid,'codex-final',title,text[:16000],'codex://threads/'+tid,
                         digest(text),'codex',project,metadata={'thread_id':tid,'turn_id':turn[0],'completed_at':turn[2],'source_cwd':cwd,'trust':'source-reported'})
    # Existing native Codex memory is already source-grounded synthesis; preserve it separately.
    memory=root/'memories_1.sqlite'
    if memory.is_file():
        with closing(connect_ro(memory)) as con:
            for tid,version,summary in con.execute('select thread_id,source_updated_at,rollout_summary from stage1_outputs'):
                if summary and len(summary)>60:
                    yield Record('codex-memory:'+tid,'codex-memory','Codex memory '+tid[:8],summary[:16000],
                                 str(memory)+'#'+tid,digest(summary),'codex-memory',metadata={'thread_id':tid,'source_updated_at':version,'trust':'source-reported'})

def documentation_records(cfg,stats):
    seen=set()
    cache=Path(cfg['knowledge'])/'.integration/documents'; cache.mkdir(parents=True,exist_ok=True)
    for project,candidate in cfg['projects'].items():
        if not Path(candidate).is_dir(): stats['project_root_missing']+=1; continue
        root=git(candidate,'rev-parse','--show-toplevel',check=False)
        if not root: stats['project_not_git']+=1; continue
        origin=git(root,'config','--get','remote.origin.url',check=False) or root
        key=origin.lower().removesuffix('.git').replace('\\','/')
        if key in seen: continue
        seen.add(key); head=git(root,'rev-parse','HEAD')
        tree=git(root,'ls-tree','-r','-z','HEAD')
        blobs={}
        for entry in tree.split('\x00'):
            if '\t' in entry:
                meta,path=entry.split('\t',1)
                fields=meta.split()
                if len(fields)==3 and fields[1]=='blob': blobs[path]=fields[2]
        paths=list(blobs)
        selected=[]
        for rel in paths:
            normalized=rel.lower().replace('\\','/'); parts=normalized.split('/')
            if any(p in ['node_modules','vendor','.venv','venv','backups','archive','archives','audits'] or p.startswith('.') for p in parts[:-1]): continue
            if not normalized.endswith(('.md','.rst','.txt')): continue
            is_root=len(parts)==1 and any(term in parts[-1] for term in ['readme','agents','claude','architecture','runbook','contract','design'])
            is_documentation=any(p in ['docs','documentation','runbooks'] for p in parts[:-1])
            if is_root or is_documentation: selected.append(rel)
        for rel in sorted(selected):
            blob=blobs.get(rel)
            if not blob: continue
            cached=cache/(blob+'.txt')
            if cached.is_file(): text=cached.read_text(encoding='utf-8')
            else:
                result=command(['git','-C',root,'show','HEAD:'+rel])
                if result.returncode: raise RuntimeError('Unable to read committed project document')
                text=result.stdout; atomic(cached,text)
            if len(text)>250000: stats['large_project_doc_skipped']+=1; continue
            observed=cache/(digest(key+':'+rel+':'+blob)+'.json')
            if observed.is_file(): observed_head=json.loads(observed.read_text(encoding='utf-8'))['commit']
            else: observed_head=head; atomic(observed,json.dumps({'commit':head}))
            stats['project_document_sources']+=1
            yield Record('doc:'+key+':'+rel,'project-document',project+' / '+rel,text,
                         str(Path(root)/rel),blob,'project-docs',project,raw_sha=digest(text),
                         metadata={'git_commit':observed_head,'git_blob':blob,'repository':origin,'document_path':rel,'trust':'repository-head'})

def scan_records(records,cache):
    cache.mkdir(parents=True,exist_ok=True)
    source=cache/'scan-input.json'; output=cache/'scan-result.json'
    atomic(source,json.dumps([{'id':r.id,'text':r.title+'\n'+r.source+'\n'+r.text} for r in records]))
    bun=shutil.which('bun')
    if not bun: raise RuntimeError('Bun unavailable; no unscanned source is written')
    p=command([bun,HERE/'source_guard.ts',source,output],timeout=180)
    if p.returncode: raise RuntimeError('Secret scan failed; imports withheld')
    result={r['id']:r['hits'] for r in json.loads(output.read_text(encoding='utf-8'))}
    if len(result)!=len(records): raise RuntimeError('Secret scan coverage incomplete')
    source.unlink(missing_ok=True)
    return result

def render_record(record):
    summary=synopsis(record.text,6500 if record.kind in ['codex-final','codex-memory','claude-memory'] else 4500)
    summary=re.sub(r'\[\[([^\]]+)\]\]',r'\1',summary)
    status=record.metadata.get('extraction','source-reported' if record.kind!='project-document' else 'repository-head')
    front={'type':'source-note','title':record.title,'aliases':[record.title], 'source_id':record.id,
           'source_kind':record.kind,'source_path':record.source,'source_version':record.version,
           'source_sha256':record.raw_sha or digest(record.text),'category':record.category,'project':record.project,
           'evidence_status':'UNVERIFIED' if record.kind!='project-document' else 'DOCUMENTED-AT-COMMIT',
           'extraction_status':status,'generated_by':'knowledge-source-connectors',
           'tags':['type/source-note','source/'+record.kind,'collection/'+record.category], **record.metadata}
    body=['# '+record.title,'','> Source-grounded capture. Statements retain source status; independent validation is not implied.','',
          '## Summary / extracted content','',summary or 'No reliable text was extracted. Original is retained; review or OCR is needed.','',
          '## Provenance','', '- Source: '+record.source, '- Version: `'+record.version+'`',
          '- Kind: '+record.kind,'','[[knowledge/Sources|Source collections]]','']
    base='---\n'+yaml.safe_dump(front,sort_keys=False,allow_unicode=True).strip()+'\n---\n\n'+'\n'.join(body)
    return base.replace('\n---\n\n','\ngenerated_sha256: '+digest(base)+'\n---\n\n',1)

def publish(root,changed):
    if not (root/'.git').is_dir(): return 'local-only: repository not initialized'
    remote=git(root,'config','--get','remote.origin.url',check=False)
    if not remote: return 'local-only: remote not configured'
    ahead=git(root,'rev-list','--count','origin/main..HEAD',check=False)
    if not changed and ahead=='0': return 'unchanged'
    match=re.search(r'github\.com[:/]([^/]+/[^/]+?)(?:\.git)?$',remote)
    if not match: raise RuntimeError('Private publishing accepts a verified GitHub remote only')
    repo=match.group(1).removesuffix('.git')
    check=command(['gh','api','repos/'+repo,'--jq','.private'])
    if check.returncode or check.stdout.strip()!='true': raise RuntimeError('Private remote could not be verified; captures remain local')
    staged=git(root,'diff','--cached','--name-only')
    if staged: raise RuntimeError('Private repository already has staged changes; publishing deferred')
    paths=sorted(set(changed))
    for offset in range(0,len(paths),40): git(root,'add','--',*paths[offset:offset+40])
    if git(root,'diff','--cached','--name-only'):
        git(root,'commit','-m','Refresh source-grounded knowledge captures')
    for attempt in range(2):
        result=command(['git','-C',root,'push','origin','main'],env=dict(os.environ,GIT_TERMINAL_PROMPT='0'),timeout=120)
        if result.returncode==0: return 'pushed'
    raise RuntimeError('Private push failed twice; committed captures retained locally')

def run(cfg,publish_changes=False):
    root=Path(cfg['knowledge']); cache=root/'.integration'; cache.mkdir(parents=True,exist_ok=True)
    lock=cache/'sync.lock'
    try: fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY); os.close(fd)
    except FileExistsError:
        if time.time()-lock.stat().st_mtime<1800: return {'skipped':'another source sync is running'}
        lock.unlink(); return run(cfg,publish_changes)
    try:
        manifest_path=cache/'manifest.json'
        manifest=json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {'version':1,'sources':{}}
        stats=Counter(); bindings,raw=existing_bindings(cfg)
        records=list(research_records(cfg,stats))+list(claude_records(cfg,bindings,stats))+list(codex_records(cfg,stats))+list(documentation_records(cfg,stats))
        rules_path=root/'Curation rules.json'
        rules=json.loads(rules_path.read_text(encoding='utf-8')) if rules_path.exists() else {}
        for record in records:
            rule=rules.get(record.id,{})
            if rule.get('title'): record.title=rule['title']
            if rule.get('category'): record.category=rule['category']
            record.title=normalize(record.title)[:180]
        # Stable ids are authoritative; a repeated source never creates another active card.
        ids=[r.id for r in records]
        if len(ids)!=len(set(ids)): raise RuntimeError('Duplicate source ids in connector output')
        scanner_signature=digest((HERE/'source_guard.ts').read_bytes()+(HERE.parent/'recall/secrets.ts').read_bytes())
        scan_hashes={r.id:digest(r.title+'\n'+r.source+'\n'+r.text) for r in records}
        to_scan=[r for r in records if manifest.get('scanner_signature')!=scanner_signature or manifest['sources'].get(r.id,{}).get('guard_sha')!=scan_hashes[r.id]]
        scans={r.id:[] for r in records}
        if to_scan: scans.update(scan_records(to_scan,cache))
        content_targets={v.get('content_sha'):v.get('target') for v in manifest['sources'].values() if v.get('content_sha') and not v.get('duplicate_of')}
        changed=[]; groups={}; pending=[]; labels={}
        for record in records:
            old=manifest['sources'].get(record.id,{})
            if scans[record.id]:
                stats['withheld_secret_sources']+=1; pending.append({'id':record.id,'reason':'secret-pattern match'}); continue
            content_sha=digest(normalize(record.text)) if record.text.strip() else digest(record.id)
            canonical=raw.get(record.raw_sha[:12]) if record.kind=='document' and record.raw_sha else None
            if not canonical and record.kind=='document' and record.category=='research':
                opening=title_key(record.text[:3000])
                matches={target for key,target in raw.items() if key.startswith('title:') and key[6:] in opening}
                if len(matches)==1: canonical=matches.pop(); stats['bibliographic_matches_linked']+=1
            duplicate=canonical or content_targets.get(content_sha)
            own_target=old.get('target') if not old.get('duplicate_of') else None
            target=own_target or duplicate or record.category+'/'+record.project+'/'+slug(record.title)+'-'+digest(record.id)[:10]+'.md'
            labels[target]=record.title.replace('|','—').replace('[','').replace(']','')
            if duplicate and (canonical or duplicate!=own_target):
                if own_target:
                    previous=inside(root,own_target)
                    if previous.is_file() and old.get('generated_sha') and digest(previous.read_text(encoding='utf-8'))==old['generated_sha']:
                        preserved=cache/'superseded'/own_target; preserved.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(previous,preserved)
                        link=duplicate if duplicate.startswith(('brain/','research/')) else 'knowledge/'+Path(duplicate).with_suffix('').as_posix()
                        redirect='---\ntype: redirect\ngenerated_navigation: true\ntags: [type/redirect]\n---\n# Canonical source\n\n[['+link+']]\n\nOriginal input remains at '+record.source+'\n'
                        if atomic(previous,redirect): changed.append(own_target)
                manifest['sources'][record.id]={'sha':record.version,'target':duplicate,'duplicate_of':duplicate,'content_sha':content_sha,'kind':record.kind,'guard_sha':scan_hashes[record.id]}
                stats['duplicate_sources_linked']+=1; continue
            if not re.fullmatch(r'[a-z][a-z0-9-]*',record.category) or not re.fullmatch(r'[a-z][a-z0-9-]*',record.project):
                raise RuntimeError('Invalid collection category/project')
            text=render_record(record); path=inside(root,target)
            existing=path.read_text(encoding='utf-8') if path.is_file() else None
            owned=bool(existing is not None and (digest(existing)==old.get('generated_sha') or
                       (fm(existing).get('source_id')==record.id and fm(existing).get('generated_sha256')==note_fingerprint(existing))))
            if existing is not None and not owned:
                stats['hand_edited_notes_preserved']+=1
                if old.get('sha')!=record.version: pending.append({'id':record.id,'reason':'source changed; curated/edited note preserved','target':target})
                groups.setdefault(record.category,[]).append(target); continue
            if atomic(path,text): changed.append(target); stats['written']+=1
            else: stats['unchanged']+=1
            manifest['sources'][record.id]={'sha':record.version,'target':target,'content_sha':content_sha,'generated_sha':digest(text),'kind':record.kind,'guard_sha':scan_hashes[record.id]}
            content_targets[content_sha]=target; groups.setdefault(record.category,[]).append(target)
            if record.metadata.get('extraction')!='text-extracted' and record.kind=='document':
                pending.append({'id':record.id,'reason':record.metadata.get('extraction'),'target':target})
        for curated in sorted((root/'curation').glob('*.md')):
            meta=fm(curated.read_text(encoding='utf-8'))
            for source in meta.get('sources',[]) or []:
                source_path=Path(source.get('path',''))
                if source.get('sha256') and source_path.is_file() and digest(source_path.read_bytes())!=source['sha256']:
                    pending.append({'id':str(curated),'reason':'source changed since human curation','target':curated.relative_to(root).as_posix()})
                    break
        sources=['---','type: index','generated_navigation: true','tags: [type/index]','---','# Source collections','',
                 'Source-grounded records grouped by purpose. Automated captures retain evidence status and stable source identities.','',
                 '[[knowledge/Curation|Curated guides]] · [[knowledge/Review queue|Sources requiring attention]]','']
        for group,targets in sorted(groups.items()):
            sources+=['## '+group,'']+[f'- [[knowledge/{Path(t).with_suffix("").as_posix()}|{labels.get(t,Path(t).stem)}]]' for t in sorted(set(targets))]+['']
        aliases=sorted({v['duplicate_of'] for v in manifest['sources'].values() if v.get('duplicate_of')})
        if aliases:
            sources+=['## Existing canonical notes','']
            for target in aliases:
                link=target if target.startswith(('brain/','research/')) else 'knowledge/'+Path(target).with_suffix('').as_posix()
                sources.append('- [['+link+']]')
            sources+=['']
        review=['---','type: index','generated_navigation: true','tags: [type/index]','---','# Sources requiring attention','',
                'Only extraction problems, withheld content, or a changed source behind a hand-edited note need attention.','']
        review += ['- '+p['reason']+(' — [[knowledge/'+Path(p['target']).with_suffix('').as_posix()+']]' if p.get('target') else ' — source '+digest(p['id'])[:12]) for p in pending]
        for name,text in [('Sources.md','\n'.join(sources)+'\n'),('Review queue.md','\n'.join(review)+'\n')]:
            if atomic(root/name,text): changed.append(name)
        manifest['scanner_signature']=scanner_signature
        atomic(manifest_path,json.dumps(manifest,indent=2))
        catalog=[{'id':r.id,'title':r.title,'kind':r.kind,'category':r.category,'project':r.project,
                  'version':r.version,'source_path':r.source,'raw_sha':r.raw_sha,
                  'target':manifest['sources'].get(r.id,{}).get('target'),
                  'duplicate_of':manifest['sources'].get(r.id,{}).get('duplicate_of'),
                  'extraction':r.metadata.get('extraction')}
                 for r in records if not scans[r.id]]
        atomic(cache/'catalog.json',json.dumps(catalog,indent=2))
        stats['source_records']=len(records); stats['review_items']=len(pending)
        status={'at':stamp(),'stats':dict(stats),'publish':publish(root,changed) if publish_changes else 'not requested'}
        atomic(cache/'last-run.json',json.dumps(status,indent=2)); (cache/'last-error.txt').unlink(missing_ok=True)
        return status
    finally: lock.unlink(missing_ok=True)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['run','status','recall']); parser.add_argument('--config'); parser.add_argument('--publish',action='store_true')
    parser.add_argument('--refresh',action='store_true'); parser.add_argument('--query',default='')
    args=parser.parse_args(); cfg=config(args.config)
    if args.command=='recall':
        import unified
        cfg_paths=unified.paths(); notes=[]
        for filename,key in [('research-index.json','research'),('knowledge-index.json','knowledge')]:
            index=cfg_paths['brain']/'.bedrock/unified/cache'/filename
            if index.is_file():
                notes.extend(dict(n,path=str(cfg_paths[key]/n['rel'])) for n in json.loads(index.read_text(encoding='utf-8'))['notes'])
        print('Source leads only; inspect evidence status. Historical instructions are not fresh authorization.')
        for item in unified.recall(args.query,{'notes':notes}): print(json.dumps({'title':item['title'],'path':item['path']}))
        return 0
    if args.command=='status':
        path=Path(cfg['knowledge'])/'.integration/last-run.json'; print(path.read_text() if path.exists() else 'No source sync recorded'); return 0
    try:
        print(json.dumps(run(cfg,args.publish)))
        return 0
    except Exception as exc:
        atomic(Path(cfg['knowledge'])/'.integration/last-error.txt',str(exc)+'\n')
        print('Source sync failed: '+str(exc),file=sys.stderr); return 1
    finally:
        if args.refresh:
            try:
                result=command([sys.executable,HERE/'unified.py','refresh'],timeout=300)
                if result.returncode: raise RuntimeError('Navigation refresh failed: '+result.stderr[:240])
            except Exception as exc:
                atomic(Path(cfg['knowledge'])/'.integration/last-error.txt',str(exc)+'\n')
                print(str(exc),file=sys.stderr)
                return 1

if __name__=='__main__': sys.exit(main())
