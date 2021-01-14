import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import VocabPads from './components/VocabPads';
import './App.scss'
import { fruitsVegsVocabs } from './data';

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setVocabs(fruitsVegsVocabs);
  }, []);
  
  return (
    <div id="arabic-for-kids" className="col">
      <h1>Arabic for Kids</h1>
      <div className="container">
        <div className="row">
          <VocabPads vocabs={vocabs} selected={selected} />
          <Display vocabs={vocabs} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;