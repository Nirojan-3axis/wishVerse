import React, { useState, useEffect, useRef } from 'react';

/**
 * BackgroundMusic Component
 * 
 * A simple component that plays background music in a loop.
 * Shows only a microphone icon at the bottom right that toggles playback.
 * Volume is controlled via device volume controls.
 * 
 * @param {Object} props
 * @param {string} props.src - The URL of the audio file
 * @param {boolean} props.autoPlay - Whether to autoplay the music
 */
const BackgroundMusic = ({
  src,
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

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Color variations based on playing state
  const bgColor = isPlaying ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-gray-500 to-blue-400';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Hidden audio element that loops automatically */}
      <audio ref={audioRef} src={src} loop={true} />
      
      {/* Microphone button with cool gradient background */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full ${bgColor} text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105`}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M8 5.5v13a.5.5 0 00.81.39L15.62 12l-6.81-6.89A.5.5 0 008 5.5z" />
            <path d="M16 12l-7.5 6V6l7.5 6z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 19a1 1 0 01-1-1V6a1 1 0 012 0v12a1 1 0 01-1 1zM7.5 12a1 1 0 01-1-1V9a1 1 0 012 0v2a1 1 0 01-1 1zM16.5 12a1 1 0 01-1-1V9a1 1 0 012 0v2a1 1 0 01-1 1z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;