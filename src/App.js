import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import VocabPads from './components/VocabPads';
import './App.scss'
import { fruitVegVocabs, animalVocabs } from './data';

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [category, setCategory] = useState('fruits-vegs');
  const keypad = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

  useEffect(() => {
    switch (category) {
      case 'fruits-vegs':
        setVocabs(fruitVegVocabs);
        break;
      case 'animals':
        setVocabs(animalVocabs);
        break;
      default:
        break;
    }
  }, [category]);

  const handleKeyPress = (event) => {
    const keyIndex = keypad.indexOf(event.key);
    if (keyIndex >= 0 && keyIndex <= 8) {
      setSelected(event.key);
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  }, []);

  const handleCategoryChange = (event) => {
    switch (event.target.value) {
      case 'fruits-vegs':
        setCategory('fruits-vegs');
        break;
      case 'animals':
        setCategory('animals');
        break;
      default:
        break;
    }
  }
  
  return (
    <div id="arabic-for-kids" className="col">
      <h1>Arabic for Kids</h1>
      <div className="container">
        <div className="row">
          <VocabPads
            keypad={keypad}
            vocabs={vocabs}
            selected={selected}
            setSelected={setSelected}
          />
          <Display
            keypad={keypad}
            vocabs={vocabs}
            selected={selected}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;