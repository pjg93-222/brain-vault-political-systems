from pathlib import Path
import importlib.util
import json
import sqlite3
import sys
import tempfile
import unittest
from unittest.mock import patch

spec=importlib.util.spec_from_file_location('sources',Path(__file__).with_name('sources.py'))
sources=importlib.util.module_from_spec(spec); sys.modules['sources']=sources; spec.loader.exec_module(sources)

class SourceTests(unittest.TestCase):
    def test_visual_review_requires_matching_original_transcript_and_full_coverage(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); original=root/'original.pdf'; original.write_bytes(b'immutable original')
            transcript=root/'transcriptions/reviewed.txt'; transcript.parent.mkdir(); transcript.write_bytes(b'Checked source words.\n')
            sha=sources.digest(original.read_bytes())
            review={'source_sha256':sha,'transcript':'transcriptions/reviewed.txt','transcript_sha256':sources.digest(transcript.read_bytes()),
                    'status':'complete','units_checked':2,'source_units':2,'reviewed_at':'2026-10-16','unresolved':[]}
            result=lambda: sources.reviewed_extraction(root,sha,original,{sha:review})
            self.assertEqual(result()['status'],'ocr-reviewed')
            original.write_bytes(b'changed original'); self.assertEqual(result()['status'],'ocr-review-needs-attention')
            original.write_bytes(b'immutable original'); transcript.write_bytes(b'changed transcript')
            self.assertEqual(result()['status'],'ocr-review-needs-attention')
            transcript.write_bytes(b'Checked source words.\n');review['units_checked']=1
            self.assertEqual(result()['status'],'ocr-review-needs-attention')
            review['units_checked']=2;review['transcript']='../outside.txt'
            self.assertEqual(result()['status'],'ocr-review-needs-attention')

    def test_partial_review_is_not_a_verified_claim_or_clearable_extraction(self):
        record=sources.Record('r','document','Handwritten source','One term remains [unclear].','original.pdf','v1','coursework',
                              metadata={'extraction':'ocr-reviewed-partial','ocr_review_unresolved':['image 2 exponent']})
        issue=sources.extraction_issue(record,'coursework/record.md')
        self.assertIn('image 2 exponent',issue['reason'])
        self.assertIn('evidence_status: UNVERIFIED',sources.render_record(record))
        record.metadata['extraction']='ocr-reviewed'
        self.assertIsNone(sources.extraction_issue(record,'coursework/record.md'))

    def test_duplicate_documents_retain_each_pending_review(self):
        with tempfile.TemporaryDirectory() as tmp:
            records=[sources.Record(i,'document',i,'Identical handwritten source text.','file.pdf','v1','research',
                                    metadata={'extraction':'ocr-reviewed-partial','ocr_review_unresolved':['image 4 exponent']}) for i in ['a','b']]
            with patch.object(sources,'existing_bindings',return_value=({},{})),patch.object(sources,'research_records',return_value=records),patch.object(sources,'claude_records',return_value=[]),patch.object(sources,'codex_records',return_value=[]),patch.object(sources,'documentation_records',return_value=[]),patch.object(sources,'scan_records',return_value={'a':[],'b':[]}):
                result=sources.run({'knowledge':tmp})
            self.assertEqual(result['stats']['review_items'],2)
            queue=(Path(tmp)/'Review queue.md').read_text(encoding='utf-8')
            self.assertEqual(queue.count('image 4 exponent'),2)
            self.assertNotIn('[[research/general',queue)

    def test_private_research_folder_is_not_external_vault_namespace(self):
        self.assertEqual(sources.vault_link('research/general/import.md'),'knowledge/research/general/import')
        self.assertEqual(sources.vault_link('research/papers/theme/paper'),'research/papers/theme/paper')
        self.assertEqual(sources.vault_link('coursework/general/notes.md'),'knowledge/coursework/general/notes')

    def test_frontmatter_inline_delimiter_and_self_fingerprint(self):
        record=sources.Record('safe','document','An arrow <--- No!','A body with preserved source evidence.','file.pdf','v1','reference')
        note=sources.render_record(record)
        self.assertEqual(sources.fm(note)['title'],'An arrow <--- No!')
        self.assertEqual(sources.fm(note)['generated_sha256'],sources.note_fingerprint(note))
        self.assertNotEqual(sources.fm(note)['generated_sha256'],sources.note_fingerprint(note+'human edit'))

    def test_destination_cannot_escape_collection(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaises(RuntimeError): sources.inside(Path(tmp),'../outside.md')

    def test_duplicates_stay_aliases_and_edited_notes_survive_source_changes(self):
        with tempfile.TemporaryDirectory() as tmp:
            cfg={'knowledge':tmp}
            first=sources.Record('a','document','First','Source text retained as canonical content.','a.pdf','v1','research',metadata={'extraction':'text-extracted'})
            alias=sources.Record('b','document','Copy','Source text retained as canonical content.','b.pdf','v1','research',metadata={'extraction':'text-extracted'})
            with patch.object(sources,'existing_bindings',return_value=({},{})),patch.object(sources,'research_records',return_value=[first,alias]),patch.object(sources,'claude_records',return_value=[]),patch.object(sources,'codex_records',return_value=[]),patch.object(sources,'documentation_records',return_value=[]),patch.object(sources,'scan_records',return_value={'a':[],'b':[]}):
                sources.run(cfg); manifest=json.loads((Path(tmp)/'.integration/manifest.json').read_text())
                target=Path(tmp)/manifest['sources']['a']['target']; original=target.read_bytes()
                self.assertEqual(manifest['sources']['b']['duplicate_of'],manifest['sources']['a']['target'])
                sources.run(cfg); self.assertEqual(target.read_bytes(),original)
                target.write_text(target.read_text()+'\nHuman correction retained.\n')
                first.text='A corrected transcript with different content but the same original-file version.'
                sources.run(cfg)
                self.assertIn('Human correction retained.',target.read_text())
                self.assertIn('source changed; curated/edited note preserved',(Path(tmp)/'Review queue.md').read_text())

    def test_research_classification_uses_content_before_course_keywords(self):
        self.assertEqual(sources.classify('Journal 3','Student journal reflection for class 3'),'coursework')
        self.assertEqual(sources.classify('Journal of Networks','Abstract: A method for network analysis. DOI 10.1000/test'),'research')
        self.assertEqual(sources.classify('Career Values','Personal career values and target list'),'personal')

    def test_extracts_abstract_without_claiming_validation(self):
        text='Paper title\n\nAbstract\n'+('Proposed model improves the reported benchmark. '*6)+'\n1 Introduction\nBody excluded from abstract.'
        summary=sources.synopsis(text)
        self.assertNotIn('Body excluded',summary)
        record=sources.Record('test','document','Title',text,'file.pdf','v1','research')
        note=sources.render_record(record)
        self.assertIn('evidence_status: UNVERIFIED',note)
        self.assertIn('independent validation is not implied',note)

    def test_atomic_no_change_and_unicode_slug(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)/'note.md'
            self.assertTrue(sources.atomic(p,'one'))
            before=p.stat().st_mtime_ns
            self.assertFalse(sources.atomic(p,'one'))
            self.assertEqual(p.stat().st_mtime_ns,before)
            self.assertEqual(sources.slug('Résumé / Notes'),'resume-notes')

    def test_codex_only_reads_completed_final_answers_and_excludes_subagents(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            state=sqlite3.connect(root/'state_5.sqlite')
            state.execute('create table threads (id text,title text,cwd text,source text,updated_at int)')
            state.executemany('insert into threads values (?,?,?,?,?)',[('root','Root outcome','work','mcp',2),('agent','Agent output','work','{"subagent":{}}',1),('working','Working','work','mcp',3)])
            state.commit(); state.close()
            hist=sqlite3.connect(root/'thread_history_1.sqlite')
            hist.execute('create table thread_turns(thread_id text,turn_id text,status text,final_agent_item_id text,completed_at int,rollout_ordinal int)')
            hist.execute('create table thread_items(thread_id text,turn_id text,item_id text,item_json text)')
            hist.executemany('insert into thread_turns values (?,?,?,?,?,?)',[('root','t1','completed','final',1,1),('root','t2','inProgress','analysis',2,2),('agent','t1','completed','final',1,1),('working','t1','inProgress','analysis',1,1)])
            hist.execute('insert into thread_items values (?,?,?,?)',('root','t1','final',json.dumps({'type':'agentMessage','phase':'final_answer','text':'Completed final outcome with explicit source evidence and a verified local artifact.'})))
            hist.execute('insert into thread_items values (?,?,?,?)',('root','t2','analysis',json.dumps({'type':'reasoning','text':'PRIVATE REASONING MUST NOT BE CAPTURED'})))
            hist.commit(); hist.close()
            from collections import Counter
            records=list(sources.codex_records({'codex':str(root)},Counter()))
            self.assertEqual([r.id for r in records],['codex:root'])
            self.assertNotIn('PRIVATE REASONING',records[0].text)

if __name__=='__main__': unittest.main()
