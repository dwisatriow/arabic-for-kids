import VocabPad from './VocabPad';
import './VocabPads.scss';
import Q from '../media/audio/Q.wav';
import W from '../media/audio/W.wav';
import E from '../media/audio/E.wav';
import A from '../media/audio/A.wav';
import S from '../media/audio/S.wav';
import D from '../media/audio/D.wav';
import Z from '../media/audio/Z.wav';
import X from '../media/audio/X.wav';
import C from '../media/audio/C.wav';

function VocabPads({ vocabs, selected }) {
  const keypad = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  const clip = [Q, W, E, A, S, D, Z, X, C];

  return (
    <div id="pads-container" className="col-6">
      {vocabs.map((vocab, i) => (
        <VocabPad key={keypad[i]} keypad={keypad[i]} vocab={vocab} selected={selected} clip={clip[i]} />
      ))}
    </div>
  );
}

export default VocabPads;