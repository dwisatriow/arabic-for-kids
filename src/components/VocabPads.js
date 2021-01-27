import { useState, useEffect } from 'react';
import VocabPad from './VocabPad';
import Loading from './Loading';
import './VocabPads.scss';

function VocabPads({ keypad, vocabs, selected, setSelected, playing, setPlaying, category }) {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState([
    true, true, true,
    true, true, true,
    true, true, true
  ]);

  useEffect(() => {
    setLoading(true);
  }, [category]);
  
  useEffect(() => {
    if (downloading.every(download => download === false)) {
      setLoading(false);
      console.log("finished loading");
    }
    // console.log(downloading.every(download => download === false));
    // console.log(downloading);
  }, [downloading])

  return (
    <div id="pads-wrapper" className="col-12 col-lg-6 p-0 d-flex justify-content-center">
      <div id="pads-container" className="mb-4 mb-lg-0">
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
            setDownloading={setDownloading}
            index={i}
          />
        ))}
      </div>
      <Loading loading={loading} downloading={downloading} />
      {/* <div id="loading">{loading ? "Loading" : "Not loading"}</div> */}
      {/* <div id="loading">
        {downloading.map((download, i) => <div key={i}>{String(download)}</div>)}
      </div> */}
    </div>
  );
}

export default VocabPads;