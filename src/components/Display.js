import { useRef } from 'react';
import './Display.scss';

function Display({ keypad, vocabs, selected }) {
  const translitRef = useRef();
  const translatRef = useRef();

  const keyIndex = keypad.indexOf(selected);

  return (
    <div id="display-container" className="col-6">

      <h2>Pronounciations</h2>
      <div id="display">
        <p
          id="translit" 
          ref={translitRef}>
          {selected ? vocabs[keyIndex].transliteration : "Click on the image"}
        </p>
        <p
          id="translat" 
          ref={translatRef}>
          {selected ? vocabs[keyIndex].translation : "or press thekeypad"}
        </p>
      </div>

      {/* <h2>Select Category</h2>
      <form id="category-display">
        <div className="radio">
          <label>
            <input 
              type="radio" 
              value="fruits-vegs"
            />
            Fruits & Vegs
          </label>
          <label>
            <input 
              type="radio" 
              value="animals"
            />
            Animals
          </label>
        </div>
      </form> */}
    </div>
  );
}

export default Display;