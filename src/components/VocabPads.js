import VocabPad from './VocabPad'
import './VocabPads.scss'

function VocabPads({ vocabs, selected }) {
  return (
    <div id="pads-container" className="container col">
      <div className="row">
        <VocabPad vocabs={vocabs} selected={selected} />
      </div>
    </div>
  );
}

export default VocabPads