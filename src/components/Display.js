import { useEffect } from 'react';
import './Display.scss';

function Display({ keypad, vocabs, selected, category, handleCategoryChange }) {
  const keyIndex = keypad.indexOf(selected);;

  const selectedStyle = {
    background: "#9DBDC4",
    color: "#F2F6F6"
  }

  const unselectedStyle = {
    background: "#DDE8EA",
    color: "#456268"
  }

  return (
    <div id="display-wrapper" className="col-12 col-lg-6 p-0 d-flex justify-content-center">
      <div id="display-container">

        <h2 id="display-header" className="noselect">Pronounciations</h2>
        <div id="display">
          <p id="name" className="noselect">
            {selected ? vocabs[keyIndex].name : "Click on the image"}
          </p>
          <p id="translit" className="noselect">
            {selected ? vocabs[keyIndex].transliteration : "or press the keypad"}
          </p>
        </div>

        <h2 id="category-header" className="noselect">Select Category</h2>
        <form id="category-display">
          <div
            className="radio mb-2 mb-md-0"
            style={category === 'fruits-vegs' ? selectedStyle : unselectedStyle}
          >
            <label>
              <input
                type="radio" 
                value="fruits-vegs"
                checked={category === 'fruits-vegs'}
                onChange={handleCategoryChange}
              />
              Fruits & Vegs
            </label>
          </div>
          <div
            className="radio"
            style={category === 'animals' ? selectedStyle : unselectedStyle}
          >
            <label>
              <input
                type="radio" 
                value="animals"
                checked={category === 'animals'}
                onChange={handleCategoryChange}
              />
              Animals
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Display;