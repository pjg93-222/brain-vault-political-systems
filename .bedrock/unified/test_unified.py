import importlib.util
from pathlib import Path
import tempfile
import unittest
import json
import subprocess
import sys

spec=importlib.util.spec_from_file_location('unified',Path(__file__).with_name('unified.py'))
unified=importlib.util.module_from_spec(spec)
spec.loader.exec_module(unified)

class UnifiedTests(unittest.TestCase):
    def test_duplicate_content_collapses_without_changing_sources(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            (root/'concepts').mkdir(); (root/'topics').mkdir()
            for rel in ['concepts/a.md','topics/b.md']:
                (root/rel).write_text('# Same\nEvidence survives.\n')
            (root/'topics/_template.md').write_text('# Template')
            notes=unified.scan(root,'brain')
            pages,report=unified.render(notes,{'linked':root,'brain':root,'research':root})
            self.assertEqual(len(notes),2)
            self.assertEqual(report['distinct_contents'],1)
            self.assertEqual(pages['Library.md'].count('Evidence survives.'),0)
            self.assertEqual(sum(pages['Library.md'].count(n['target']) for n in notes),1)
            self.assertEqual((root/'topics/b.md').read_text(),'# Same\nEvidence survives.\n')

    def test_same_name_different_content_uses_full_paths(self):
        notes=[{'target':'brain/projects/model','rel':'projects/model.md','namespace':'brain','title':'Model','label':'model','sha256':'a'},
               {'target':'research/notes/model','rel':'notes/model.md','namespace':'research','title':'Model','label':'model','sha256':'b'}]
        pages,report=unified.render(notes,{'linked':Path('absent'),'brain':Path('brain'),'research':Path('research')})
        self.assertEqual(report['distinct_contents'],2)
        self.assertIn('[[brain/projects/model|model]]',pages['Library.md'])
        self.assertIn('[[research/notes/model|model]]',pages['Library.md'])
        self.assertEqual(len(report['same_name_groups']['model']),2)

    def test_recall_relevant_bounded_and_no_incidental_body_match(self):
        index={'notes':[{'rel':f'papers/allocation-{i}.md','title':'Allocation models','terms':['allocation','models','research','validation']} for i in range(6)]}
        self.assertEqual(len(unified.recall('allocation models validation',index)),3)
        self.assertEqual(unified.recall('Hello thanks',index),[])
        self.assertEqual(unified.recall('research',index),[])

    def test_dead_links_detected_and_heading_targets_resolve(self):
        config={'linked':Path('missing')}
        pages={'Home.md':'[[Library#Methods]] [[Absent]]','Library.md':'# Methods'}
        self.assertEqual(unified.validate(pages,config),[['Home.md','Absent']])

    def test_hook_returns_before_stdin_eof(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); cache=root/'.bedrock/unified/cache'; cache.mkdir(parents=True)
            index={'notes':[{'rel':'systems/allocation.md','title':'Allocation validation','terms':['allocation','validation','models']}]}
            (cache/'research-index.json').write_text(json.dumps(index))
            config=root/'config.json'; config.write_text(json.dumps({'brain':str(root),'research':str(root)}))
            proc=subprocess.Popen([sys.executable,str(Path(__file__).with_name('unified.py')),'hook','recall','--config',str(config)],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            try:
                proc.stdin.write(b'{"prompt":"allocation validation models"}'); proc.stdin.flush()
                proc.wait(timeout=5)
                self.assertEqual(proc.returncode,0)
                self.assertIn('Research recall',proc.stdout.read().decode())
            finally:
                if proc.poll() is None: proc.kill(); proc.wait()
                proc.stdin.close(); proc.stdout.close(); proc.stderr.close()

if __name__=='__main__': unittest.main()
