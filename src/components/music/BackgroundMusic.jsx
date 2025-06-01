import React, { useState, useEffect, useRef } from 'react';
import musicFile from '../../assets/music.mp3';

/**
 * BackgroundMusic Component
 * 
 * A simple component that plays background music in a loop.
 * Shows only a microphone icon at the bottom right that toggles playback.
 * Volume is controlled via device volume controls.
 * 
 * @param {Object} props
 * @param {string} props.src - The URL of the audio file (optional, defaults to imported music)
 * @param {boolean} props.autoPlay - Whether to autoplay the music
 */
const BackgroundMusic = ({
  src = musicFile,
  autoPlay = false,
}) => {
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  // Store the audio element in a ref
  const audioRef = useRef(null);

  // Handle play/pause functionality
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;
    
    if (isPlaying) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback failed:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
    
  }, [isPlaying]);

  // Update audio source when src prop changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && src) {
      audio.src = src;
      audio.load(); // Reload the audio element with new source
    }
  }, [src]);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Color variations based on playing state
  const bgColor = isPlaying ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-gray-500 to-blue-400';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Hidden audio element that loops automatically */}
      <audio ref={audioRef} src={src} loop={true} preload="auto" />
      
      {/* Music button with cool gradient background */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full ${bgColor} text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105`}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;