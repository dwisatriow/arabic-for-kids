import VocabPad from './VocabPad';
import './VocabPads.scss';
import q from '../media/audio/q.wav';
import w from '../media/audio/w.wav';
import e from '../media/audio/e.wav';
import a from '../media/audio/a.wav';
import s from '../media/audio/s.wav';
import d from '../media/audio/d.wav';
import z from '../media/audio/z.wav';
import x from '../media/audio/x.wav';
import c from '../media/audio/c.wav';

function VocabPads({ keypad, vocabs, selected, setSelected, playing, setPlaying }) {
  const clip = [q, w, e, a, s, d, z, x, c];

  return (
    <div id="pads-container" className="col-6">
      {vocabs.map((vocab, i) => (
        <VocabPad
          key={keypad[i]}
          keypad={keypad[i]}
          vocab={vocab}
          selected={selected}
          setSelected={setSelected}
          clip={clip[i]}
          playing={playing}
          setPlaying={setPlaying}
        />
      ))}
    </div>
  );
}

export default VocabPads;