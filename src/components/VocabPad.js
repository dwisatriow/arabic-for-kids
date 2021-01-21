import { useState, useEffect, useRef } from 'react';
import './VocabPad.scss';
import { Icon } from '@iconify/react-with-api';
import '../icons-bundle.js';


function VocabPad({ keypad, vocab, selected, setSelected, clip, playing, setPlaying }) {
  const audio = useRef(null);

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

  // useEffect(() => {
  //   if (selected === keypad) setPlaying(!playing);
  // }, [selected]);

  return (
      <div 
        className="vocab-pad" 
        id={vocab.translation} 
        key={vocab.id}
        onClick={toggle}
      >
          
        <span className="keypad">{keypad.toUpperCase()}</span>
        <Icon className="iconify" icon={vocab.icon} />
        
        <audio
          ref={audio}
          id={keypad}
          src={clip}
          className='clip'
        >
          Your browser does not support the <code>audio</code> element
        </audio>
        
        <span>{vocab.translation}</span>
      </div>
  );
}

export default VocabPad;