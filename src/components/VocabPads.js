import { useState, useEffect } from 'react';
import VocabPad from './VocabPad';
import './VocabPads.scss';

function VocabPads({ keypad, vocabs, selected, setSelected, playing, setPlaying, category }) {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState({
    q : true, w : true, e : true,
    a : true, s : true, d : true,
    z : true, x : true, c : true
  });

  useEffect(() => {
    setLoading(true);
  }, [category])
  
  useEffect(() => {
    const status = [];
    for (const pad in downloading) {
      status.push(downloading[pad]);
    }
    
    if (status.every(pad => pad === false)) {
      setLoading(false);
      console.log("finished loading");
    }

  }, [downloading])

  return (
    <div id="pads-container" className="col-6">
      {vocabs.map((vocab, i) => (
        <VocabPad
          key={keypad[i]}
          keypad={keypad[i]}
          vocab={vocab}
          selected={selected}
          setSelected={setSelected}
          playing={playing}
          setPlaying={setPlaying}
          category={category}
          loading={loading}
          setdownloading={setDownloading}
        />
      ))}
    </div>
  );
}

export default VocabPads;