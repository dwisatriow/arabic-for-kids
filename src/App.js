import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import VocabPads from './components/VocabPads';
import './App.scss'
import { fruitVegVocabs, animalVocabs } from './data';

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [selected, setSelected] = useState('');
  const [category, setCategory] = useState('animals');
  const keypad = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];
  const [playing, setPlaying] = useState(false);

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
      setPlaying(!playing);
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
    <div id="arabic-for-kids" className="px-5 px-lg-5 pb-5 pt-3 my-5 my-lg-0">
      <h1 className="pb-2">Arabic for Kids</h1>
      <div className="container">
        <div className="row justify-content-center">
          <VocabPads
            keypad={keypad}
            vocabs={vocabs}
            selected={selected}
            setSelected={setSelected}
            playing={playing}
            setPlaying={setPlaying}
            category={category}
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