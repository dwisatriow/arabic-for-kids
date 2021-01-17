import { useState, useEffect, useRef } from 'react';
import './VocabPad.scss';

function VocabPad({ keypad, vocab, selected, clip }) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef();

  const toggle = () => setPlaying(!playing);

  const handleKeydown = (event) => {
    if (event.key === keypad.toLowerCase()) {
      console.log(event.key);
    }
  }

  useEffect(() => {
    playing ? audio.current.play() : audio.current.curreTime = 0;
  }, [playing]);

  useEffect(() => {
    audio.current.addEventListener('ended', () => setPlaying(false));
    document.addEventListener('keypress', handleKeydown);

    return () => {
      audio.current.removeEventListener('ended', () => setPlaying(false));
      document.removeEventListener('keypress', handleKeydown);
    }
  }, []);

  return (
      <div 
        className="vocab-pad" 
        id={vocab.translation} 
        key={vocab.id}
        onClick={toggle}
      >
          
        <span className="keypad">{keypad}</span>
        <span className="iconify" data-icon={vocab.icon} data-inline="false"></span>
        
        <audio
          ref={audio}
          id={keypad}
          src={clip}
          className="clip"
        >
          Your browser does not support the <code>audio</code> element
        </audio>
        
        <span>{vocab.translation}</span>
      </div>
  );
}

export default VocabPad;