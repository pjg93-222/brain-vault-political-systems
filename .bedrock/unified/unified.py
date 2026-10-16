"""One Obsidian workspace over canonical brain and research repositories.

refresh: generate navigation, exact-content inventory, and secret-screened research recall.
sync: run existing research intake/bridge builder, then refresh navigation even on intake failure.
hook: research-only Claude recall; existing brain memory capture and recall stay in place.
"""
from __future__ import annotations
import argparse
from collections import Counter, defaultdict
import datetime as dt
import hashlib
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import threading
import time

HERE = Path(__file__).resolve().parent
HOME = Path.home()
DEFAULTS = {'brain':str(HOME/'Documents/brain'), 'research':str(HOME/'Documents/research'),
            'linked':str(HOME/'Documents/linked'),
            'vaultlink':str(HOME/'OneDrive/Desktop/Project Brain/vaultlink')}
STOP = set('a an the and or to of in on for from with is are was were be been this that it as at by i we you can could would should how what why please help tell me about find explain show use using does do know my our have has had'.split())

def paths(config=None):
    cfg = dict(DEFAULTS)
    if config:
        cfg.update(json.loads(Path(config).read_text(encoding='utf-8-sig')))
    return {k:Path(v) for k,v in cfg.items()}

def atomic(path, content):
    data = content.encode('utf-8')
    if path.exists() and path.read_bytes() == data:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name('.'+path.name+'.tmp-'+str(os.getpid()))
    tmp.write_bytes(data)
    os.replace(tmp,path)
    return True

def scan(root, namespace):
    result = []
    for folder, dirs, files in os.walk(root, followlinks=False):
        papers_folder = namespace == 'research' and Path(folder) == root/'papers'
        dirs[:] = sorted(d for d in dirs
                         if (not d.startswith(('.', '_')) or (papers_folder and d == '_non-articles'))
                         and not os.path.isjunction(Path(folder)/d))
        for name in sorted(files):
            if not name.endswith('.md') or name.startswith('_') or name in {'CLAUDE.md','index.md','log.md'}:
                continue
            p = Path(folder)/name
            text = p.read_text(encoding='utf-8-sig', errors='replace')
            rel = p.relative_to(root).as_posix()
            heading = re.search(r'^#\s+(.+)$',text,re.M)
            title = heading.group(1).strip() if heading else p.stem
            # Navigation titles are filenames, never arbitrary content from captured memory.
            result.append({'target':f'{namespace}/{rel[:-3]}','rel':rel,'namespace':namespace,
                           'title':title,'label':p.stem.replace('|','-').replace('[','').replace(']',''),
                           'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
    return result

def wikilink(note):
    return f"[[{note['target']}|{note['label']}]]"

def groups(notes):
    out = defaultdict(list)
    for n in notes:
        parts=n['rel'].split('/')
        category=parts[0] if len(parts)>1 else 'overview'
        if n['namespace']=='research' and category=='papers':
            category += '/' + (parts[1] if len(parts)>2 else 'general')
        if n['namespace']=='brain' and category=='ledger':
            category += '/' + (parts[1] if len(parts)>2 else 'overview')
        out[n['namespace']+'/'+category].append(n)
    return out

def render(notes, config):
    by_hash=defaultdict(list)
    for n in notes: by_hash[n['sha256']].append(n)
    # Keep every original file. Display one representative per exact content in the catalog.
    representatives=[sorted(v,key=lambda n:n['target'])[0] for v in by_hash.values()]
    grouped=groups(representatives)
    duplicate_sets=[sorted(n['target'] for n in v) for v in by_hash.values() if len(v)>1]
    by_stem=defaultdict(list)
    for n in notes: by_stem[Path(n['rel']).stem.casefold()].append(n['target'])
    collisions={k:v for k,v in by_stem.items() if len(v)>1}
    counts=Counter(n['namespace'] for n in notes)
    home=['---','tags: [type/index]','---','# Knowledge home','',
          'One workspace for systems, evidence, decisions, and captured memory. Each source file has one canonical home.','',
          '## Start here','',
          '- [[Library|Browse the complete library]]',
          '- [[Connections|Systems and their supporting research]]',
          '- [[Vault guide|How this vault updates and syncs]]',
          '- [[Consolidation review|Duplicate and recovery audit]]','',
          '## Engineering and project memory','',
          '- [[brain/index|Engineering index]]',
          '- [[Library#brain/projects|Projects]]',
          '- [[Library#brain/concepts|Concepts and methods]]',
          '- [[Library#brain/actors|Systems and tools]]',
          '- [[Library#brain/topics|Implementation knowledge]]',
          '- [[Library#brain/fleeting|Captured Claude memory awaiting review]]','',
          '## Research and evidence','',
          '- [[research/index|Research index]]',
          '- [[research/framework|Research framework]]',
          '- [[Library#research/themes|Literature themes]]',
          '- [[Library#research/systems|Research system hubs]]',
          '- [[Library#research/notes|Research notes]]',
          '- [[Library#research/annotations|Original annotations]]',
          '- [[Library#research/inbox|Imported documents awaiting review]]','',
          '## Library size','',
          f"{counts['brain']} brain notes; {counts['research']} research notes; {len(representatives)} distinct note contents.",
          '', 'Decision ledgers are grouped separately in the library. Backups, test vaults, templates, source-processing files, and application settings are excluded from everyday navigation.','']
    library=['---','tags: [type/index]','---','# Library','','[[Home|Knowledge home]] · [[Connections|System connections]]','',
             'Canonical notes grouped by purpose. Byte-identical contents appear once; originals remain preserved.','']
    for group, entries in sorted(grouped.items()):
        library += ['## '+group,'']
        library += ['- '+wikilink(n) for n in sorted(entries,key=lambda n:n['label'].casefold())]
        library += ['']
    bridges=sorted((config['linked']/'bridges').glob('*.md'))
    connections=['---','tags: [type/index]','---','# Connections','','[[Home|Knowledge home]]','',
                 'Each system bridge connects implementation notes to evidence.','']
    for family,prefixes in [('Melange',('melange-',)),('Moneyball',('moneyball-',)),('Mentat',('mentat-',)),('Terrier',('terrier-',))]:
        connections += ['## '+family,'']
        connections += [f'- [[bridges/{p.stem}|{p.stem}]]' for p in bridges if p.stem.startswith(prefixes)]
        connections += ['']
    review=['---','tags: [type/index]','---','# Consolidation review','','[[Home|Knowledge home]]','',
            f'Exact-content duplicate groups in canonical notes: **{len(duplicate_sets)}**. Catalog shows one representative per group. No originals were deleted.','']
    for duplicate in duplicate_sets:
        review += ['- '+'; '.join(f'[[{t}]]' for t in duplicate)]
    review += ['', '## Same names, different notes','',
               'These are distinct documents, not safe automatic merges. Navigation uses full vault paths.','']
    for stem, targets in sorted(collisions.items()):
        review += ['- '+stem+': '+'; '.join(f'[[{t}]]' for t in targets)]
    review += ['', '## Older copies','',
               '- `Desktop/vault_test_copy`: 240 Markdown files; 194 exact matches at audit; 46 older versions at existing paths; no unique note paths and content.',
               '- `Documents/brain-wt-backlog-20261015`: Git development worktree; 578 Markdown files; 566 exact matches; 12 versions at existing paths; no unique note paths and content.',
               '- Original Project Brain ledgers already project into `brain/ledger/`; do not import a second copy.',
               '- Starter Obsidian vault contains only Welcome and an untitled canvas.',
               '- Old versions remain outside this active vault. Different wording was not discarded or treated as an exact duplicate.','']
    guide=['---','tags: [type/index]','---','# Vault guide','','[[Home|Knowledge home]]','',
           '## Canonical workspace','',f"Open `{config['linked']}` in Obsidian. Open the root folder, not `.obsidian` or `bridges`.",'',
           '`brain/` and `research/` are Windows junctions to the existing repositories. Edits here change the same original file. No copied vaults are needed.','',
           '## GitHub','',
           '- Brain repository: https://github.com/pjg93-222/brain-vault-political-systems',
           '- Research repository: https://github.com/pjg93-222/research-vault',
           '- Both repositories are public as verified during this setup. This consolidation does not change visibility.',
           '- Existing generated-memory upload stays in place; hand-curated brain changes retain their branch/PR workflow.',
           '- Research commits retain their existing GitHub and local-mirror post-commit hook.',
           '- Home and library pages are generated from those canonical sources and can be recreated with the refresh command.','',
           '## Claude memory','',
           '- Existing Bedrock hooks capture Claude memory into `brain/fleeting/` and recall engineering notes.',
           '- Additional research recall supplies up to three relevant research paths and titles; notes are secret-screened before indexing.',
           '- Session-start context points Claude to this combined workspace.',
           '- Existing memory directories and source hashes remain authoritative. Annotations and curated source text are preserved.','',
           '## Refresh','',
           'Scheduled `vaultlink-sync` runs research inbox intake and bridge building, then regenerates combined navigation and research recall.',
           'Claude Stop/SessionEnd also launch a quick navigation refresh; they do not run inbox intake.',
           f'`python "{HERE / "unified.py"}" refresh`',
           f'`python "{HERE / "unified.py"}" sync`','',
           'Original research files under `_sources`, `_raw`, `_text`, and `_annots` keep their existing local-only storage policy; GitHub contains the versioned notes, not those source binaries.','']
    contract=['# Combined knowledge workspace','',
              f"Canonical Obsidian workspace: `{config['linked']}`.",
              'Start at Home.md and Library.md. brain/ and research/ are junctions, not duplicate copies.','',
              'Follow brain/CLAUDE.md for engineering memory and research/CLAUDE.md for evidence. Keep source provenance, annotations, note titles, and existing Git workflows intact.',
              'Use Bedrock on the brain source vault; research has a different schema. Do not point Bedrock capture at this aggregate root.',
              'Do not merge same-name notes without checking meaning. Exact duplicates are collapsed in generated navigation; originals stay preserved.',
              'Home.md, Library.md, Connections.md, Consolidation review.md, Vault guide.md, and this file are generated by brain/.bedrock/unified/unified.py refresh.',
              'Source repositories remain separate. Never git-add junctions or initialize another repository across them.','']
    outputs={'Home.md':'\n'.join(home),'Library.md':'\n'.join(library),'Connections.md':'\n'.join(connections),
             'Consolidation review.md':'\n'.join(review),'Vault guide.md':'\n'.join(guide),'CLAUDE.md':'\n'.join(contract)}
    return outputs, {'notes':dict(counts),'distinct_contents':len(representatives),
                     'exact_duplicate_groups':duplicate_sets,'same_name_groups':collisions,'bridges':len(bridges)}

def validate(outputs, config):
    dead=[]
    for name, text in outputs.items():
        for target in re.findall(r'\[\[([^\]|]+)',text):
            target=target.split('#')[0]
            if not target: continue
            candidate=target+'.md'
            if candidate not in outputs and not (config['linked']/candidate).is_file():
                dead.append([name,target])
    return dead

def refresh(config):
    for key in ('brain','research','linked'):
        if not config[key].is_dir(): raise RuntimeError('Missing '+key+' root')
    notes=scan(config['brain'],'brain')+scan(config['research'],'research')
    outputs, report=render(notes,config)
    dead=validate(outputs,config)
    if dead: raise RuntimeError('Generated links do not resolve: '+json.dumps(dead[:10]))
    written=sum(atomic(config['linked']/name,text) for name,text in outputs.items())
    cache=config['brain']/'.bedrock/unified/cache'
    cache.mkdir(parents=True,exist_ok=True)
    atomic(cache/'inventory.json',json.dumps(report,indent=2)+'\n')
    bun=shutil.which('bun')
    if not bun: raise RuntimeError('Bun unavailable; research index was not refreshed')
    p=subprocess.run([bun,str(HERE/'research_index.ts'),str(config['research']),str(cache/'research-index.json')],
                     capture_output=True,text=True,timeout=120,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
    if p.returncode: raise RuntimeError('Research indexing failed: '+p.stderr[:300])
    report.update({'written':written,'dead_links':len(dead),'research_index':json.loads(p.stdout)})
    print(json.dumps({k:v for k,v in report.items() if k not in {'exact_duplicate_groups','same_name_groups'}}))
    return report

def recall(prompt, index):
    query={t for t in re.findall(r'[a-z0-9]+',prompt.lower()) if len(t)>2 and t not in STOP}
    if not query or len(prompt)>30000: return []
    notes=index.get('notes',[])
    n=len(notes)
    dfs=Counter(t for note in notes for t in set(note['terms']) if t in query)
    scored=[]
    for note in notes:
        freq=Counter(note['terms']); hits=query & freq.keys()
        title_terms=set(re.findall(r'[a-z0-9]+',(note['title']+' '+note['rel']).lower()))
        # A lone incidental body word is insufficient; title hits or two specific terms qualify.
        if not (hits & title_terms) and len(hits)<2: continue
        score=sum(max(.5,math.log(1+(n-dfs[t]+.5)/(dfs[t]+.5)))*min(freq[t],3)*(3 if t in title_terms else 1) for t in hits)
        if score>=3: scored.append((score,note))
    scored.sort(key=lambda v:(-v[0],v[1]['rel']))
    return [n for _,n in scored[:3]]

def read_payload(timeout=.75):
    """Accept complete JSON immediately even when a hook runner leaves stdin open."""
    result=[]; ready=threading.Event()
    def reader():
        data=b''
        try:
            while len(data)<1024*1024:
                chunk=os.read(sys.stdin.fileno(),65536)
                if not chunk: break
                data+=chunk
                try:
                    value=json.loads(data.decode('utf-8'))
                except (ValueError,UnicodeDecodeError):
                    continue
                if isinstance(value,dict): result.append(value)
                break
        except (OSError,ValueError):
            pass
        finally: ready.set()
    threading.Thread(target=reader,daemon=True).start()
    ready.wait(timeout)
    return result[0] if result else {}

def hook(action,config):
    payload=read_payload() if action=='recall' else {}
    if action=='session-start':
        message=f"Unified Obsidian workspace: {config['linked']}. Start at Home.md; brain/ holds engineering memory, research/ holds evidence. Existing Bedrock capture continues in brain/fleeting/."
        failure=config['brain']/'.bedrock/unified/cache/last-error.txt'
        if failure.exists(): message += ' Unified refresh needs attention; see '+str(failure)+'.'
        print(json.dumps({'hookSpecificOutput':{'hookEventName':'SessionStart','additionalContext':message}}))
    elif action=='recall':
        index_path=config['brain']/'.bedrock/unified/cache/research-index.json'
        if not index_path.is_file(): return
        index=json.loads(index_path.read_text(encoding='utf-8'))
        hits=recall(str(payload.get('prompt','')),index)
        if hits:
            lines=['Research recall (relevance leads; read sources before making claims):']
            for note in hits:
                title=re.sub(r'[\x00-\x1f\x7f]',' ',note['title'])[:130]
                lines.append(f"- {config['research']/note['rel']} | {title}")
            print(json.dumps({'hookSpecificOutput':{'hookEventName':'UserPromptSubmit','additionalContext':'\n'.join(lines)}}))
    elif action=='refresh':
        subprocess.Popen([sys.executable,str(HERE/'unified.py'),'refresh-worker'],stdin=subprocess.DEVNULL,
                         stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,close_fds=True,
                         creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['refresh','refresh-worker','sync','hook'])
    parser.add_argument('action',nargs='?')
    parser.add_argument('--config')
    args=parser.parse_args(); config=paths(args.config)
    if args.command=='hook':
        try: hook(args.action,config)
        except Exception: pass  # hook errors never block a Claude session
        return 0
    cache=config['brain']/'.bedrock/unified/cache'
    cache.mkdir(parents=True,exist_ok=True)
    lock=cache/'refresh.lock'
    try:
        fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY); os.close(fd)
    except FileExistsError:
        if time.time()-lock.stat().st_mtime<900: return 0
        lock.unlink(); return main()
    try:
        if args.command=='refresh-worker':
            state=cache/'last-refresh.json'
            if state.exists() and time.time()-state.stat().st_mtime<60: return 0
        code=0
        if args.command=='sync':
            log=cache/'sync.log'
            if log.exists() and log.stat().st_size>1024*1024:
                os.replace(log,cache/'sync.previous.log')
            with log.open('a',encoding='utf-8') as stream:
                stream.write('\n'+dt.datetime.now(dt.timezone.utc).isoformat()+' sync start\n'); stream.flush()
                try:
                    p=subprocess.run([sys.executable,str(config['vaultlink']/'vault_sync.py')],timeout=720,
                                     stdout=stream,stderr=stream,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
                    code=p.returncode
                except subprocess.TimeoutExpired:
                    code=124
                    stream.write('Research intake timeout; refreshing navigation anyway.\n')
        report=refresh(config)
        atomic(cache/'last-refresh.json',json.dumps({'at':dt.datetime.now(dt.timezone.utc).isoformat(),'sync_exit':code,'notes':report['notes']}))
        if args.command=='sync':
            atomic(cache/'last-sync.json',json.dumps({'at':dt.datetime.now(dt.timezone.utc).isoformat(),'exit':code}))
        if code:
            atomic(cache/'last-error.txt',f'Research sync exited {code}; see sync.log.\n')
        else:
            failure=cache/'last-error.txt'
            if args.command=='sync' or not failure.exists() or not failure.read_text(encoding='utf-8').startswith('Research sync'):
                failure.unlink(missing_ok=True)
        return code
    finally:
        lock.unlink(missing_ok=True)

if __name__=='__main__':
    try: sys.exit(main())
    except Exception as exc:
        try:
            atomic(paths().get('brain')/'.bedrock/unified/cache/last-error.txt',str(exc)+'\n')
        except Exception:
            pass
        print('unified-vault FAILED: '+str(exc),file=sys.stderr)
        sys.exit(1)
