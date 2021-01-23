import { useState, useEffect, useRef } from 'react';
import './VocabPad.scss';
import { Icon } from '@iconify/react-with-api';
import '../icons-bundle.js';
import audioRef from '../firebase-conf';

function VocabPad({ keypad, vocab, selected, setSelected, playing, setPlaying, category, loading, setDownloading }) {
  const audio = useRef(null);

  const getClip = (category, name) => {
    if (window[`${name}AudioURL`]) {
      audio.current.src = window[`${name}AudioURL`];
    } else {
      setDownloading(prevState => ([
        ...prevState,
        { [name] : true }
      ]));
      const audioURL = `${category}/${name}.wav`;
  
      audioRef.child(audioURL).getDownloadURL()
      .then((url) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          let blob = xhr.response;
          window[`${name}AudioURL`] = window.URL.createObjectURL(blob)
          audio.current.src = window[`${name}AudioURL`];
          setDownloading(prevState => ([
            ...prevState,
            { [name] : false }
          ]));
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        console.log(error.message);
      });
    }

  }

  useEffect(() => {
    getClip(category, vocab.translation);
  }, [vocab]);

  const toggle = () => {
    setSelected(keypad);
    setPlaying(!playing);
  }

  useEffect(() => {
    if (playing && selected === keypad) audio.current.play();
  }, [playing]);

  useEffect(() => {
    audio.current.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.current.removeEventListener('ended', () => setPlaying(false));
    }
  }, []);

  return (
      (<div 
        className="vocab-pad" 
        id={vocab.translation} 
        key={vocab.id}
        onClick={toggle}
      >
          
        <span className="keypad">{keypad.toUpperCase()}</span>
        {loading ? <p>Loading</p> : <Icon className="iconify" icon={vocab.icon} />}
        
        <audio
          ref={audio}
          id={keypad}
          className='clip'
        >
          Your browser does not support the <code>audio</code> element
        </audio>
        
        <span>{vocab.translation}</span>
      </div>)
  );
}

export default VocabPad;