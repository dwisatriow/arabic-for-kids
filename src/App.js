import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import VocabPads from './components/VocabPads';
import './App.scss'
import { fruitsVegsVocabs } from './data';

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const keypad = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

  useEffect(() => {
    setVocabs(fruitsVegsVocabs);
  }, []);

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
  
  return (
    <div id="arabic-for-kids" className="col">
      <h1>Arabic for Kids</h1>
      <div className="container">
        <div className="row">
          <VocabPads keypad={keypad} vocabs={vocabs} selected={selected} setSelected={setSelected} />
          <Display keypad={keypad} vocabs={vocabs} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;