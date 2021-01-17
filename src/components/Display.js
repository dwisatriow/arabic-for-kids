import './Display.scss';

function Display() {
  return (
    <div id="display-container" className="col-6">

      <h2>Pronounciations</h2>
      <div id="display">
        <p id="transliteration">عنب</p>
        <p id="translation">'enab</p>
      </div>

      <h2>Select Category</h2>
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
      </form>
    </div>
  );
}

export default Display;