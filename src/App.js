import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import VocabPads from './components/VocabPads';
import './App.scss'

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [selected, setSelected] = useState('');
  const [category, setCategory] = useState('fruits-vegs');
  const keypad = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];
  const [playing, setPlaying] = useState(false);

  const getVocabs = (vocabs) => {
    const endpointPrefix = 'https://5f9b77e3856f4c00168bffb3.mockapi.io/';

    fetch(endpointPrefix+vocabs)
      .then(response => response.json())
      .then(data => { setVocabs(data)});
  }

  useEffect(() => {
    switch (category) {
      case 'fruits-vegs':
        getVocabs('fruitsVegsVocab');
        break;
      case 'animals':
        getVocabs('animalsVocab');
        break;
      default:
        break;
    }
  }, [category]);

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

  const handleKeyPress = (event) => {
    const keyIndex = keypad.indexOf(event.key);
    if (keyIndex >= 0 && keyIndex <= 8 && !playing) {
      setSelected(event.key);
      setPlaying(!playing);
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  }, [playing]);

  return (
    <div id="app-wrapper">
      <div id="arabic-for-kids" className="px-5 px-lg-5 pb-5 pt-5 pt-md-3 my-0 my-md-5 my-lg-0">
        <h1 className="pb-2 noselect">Arabic for Kids</h1>
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
    </div>
  );
}

export default App;