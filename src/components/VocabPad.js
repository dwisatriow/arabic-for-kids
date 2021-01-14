import './VocabPad.scss'

function VocabPad({ vocabs, selected }) {
  const keypad = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

  return (
    vocabs.map((vocab, i) => (
      <div id="vocab-pad-container" className="col-4" key={vocab.id}>
        <div className="vocab-pad" id={vocab.translation}>{keypad[i]}</div>
      </div>
    ))
  );
}

export default VocabPad;