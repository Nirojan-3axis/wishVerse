import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import CakeScene from "../../components/virtualCake/CakeScene";
import Confetti from "../../components/virtualCake/Confetti";
import musicFile from "../../assets/music.mp3";

// Modern Control Panel Component
const ControlPanel = ({ micPermission, candlesLit, onResetCandles, blowDetected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute top-6 right-6 z-30">
      <div className={`bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 ${
        isExpanded ? 'p-6 w-80' : 'p-4 w-16'
      }`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="text-white">
              <h3 className="font-bold text-lg mb-3">Cake Controls</h3>
              
              {/* Microphone Status */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg mb-3">
                <span className="text-sm">Microphone</span>
                <div className={`w-3 h-3 rounded-full ${
                  micPermission ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}></div>
              </div>

              {/* Candles Status */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg mb-3">
                <span className="text-sm">Candles</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-medium">
                  {candlesLit ? 'Lit 🕯️' : 'Out 💨'}
                </span>
              </div>

              {/* Reset Button */}
              {!candlesLit && (
                <button
                  onClick={onResetCandles}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
                >
                  Light Candles Again ✨
                </button>
              )}

              {/* Blow Detection Indicator */}
              {micPermission && candlesLit && (
                <div className={`p-3 rounded-lg border transition-all ${
                  blowDetected 
                    ? 'bg-green-500/20 border-green-400 text-green-300' 
                    : 'bg-blue-500/20 border-blue-400 text-blue-300'
                }`}>
                  <div className="flex items-center">
                    <span className="mr-2">{blowDetected ? '💨' : '🎤'}</span>
                    <span className="text-sm">
                      {blowDetected ? 'Blowing detected!' : 'Listening...'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Microphone Permission Overlay
const MicPermissionOverlay = ({ isVisible, onAccept, onDeny }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1A1A2E]/90 to-[#2A2A45]/90 backdrop-blur-xl max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-all">
        <div className="p-8">
          {/* Animated Header */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white animate-bounce">
                ✓
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-purple-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Make a Wish! 🌟
          </h2>
          <p className="text-gray-300 text-center mb-8 text-lg leading-relaxed">
            Enable your microphone!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onDeny}
              className="flex-1 px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-300 font-medium transition-all transform hover:scale-105 border border-gray-600/50"
            >
              Skip for Now
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-xl text-white font-bold shadow-lg transition-all transform hover:scale-105 hover:shadow-purple-500/25"
            >
              Enable Magic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Celebration Component
const CelebrationOverlay = ({ isVisible, onReset, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-[#1A1A2E]/95 to-[#2A2A45]/95 backdrop-blur-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 transform transition-all animate-bounce-in">
        {/* Header with close button */}
        <div className="relative p-4 sm:p-8 pb-2 sm:pb-4">
          
          {/* Animated celebration icons */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="text-5xl sm:text-8xl mb-2 sm:mb-4 animate-pulse">🎉</div>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 text-2xl sm:text-4xl animate-bounce">✨</div>
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 text-xl sm:text-3xl animate-bounce delay-300">🌟</div>
              <div className="absolute top-1/2 -right-4 sm:-right-8 text-lg sm:text-2xl animate-ping">💫</div>
            </div>
          </div>
          
          <h1 className="text-xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent text-center leading-tight">
            🎂 Happy Birthday! 🎂
          </h1>
        </div>

        {/* Main content */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 border border-white/10">
            
            <div className="text-sm sm:text-lg text-gray-200 leading-relaxed space-y-2 sm:space-y-4 text-center">
              <p>
                🎈 May this special day bring you endless joy, laughter, and beautiful memories that will last a lifetime. 
              </p>
              <p>
                ✨ As you blow out these virtual candles, may all your dreams take flight and your heart be filled with happiness, love, and wonder.
              </p>
              <p className="text-base sm:text-xl font-medium text-yellow-300">
                🎉 Happy Birthday, and may all your wishes come true! 🎂
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg sm:rounded-xl text-gray-300 font-medium transition-all transform hover:scale-105 border border-gray-600/50 text-sm sm:text-base"
            >
              Close
            </button>
            <button
              onClick={() => {
                onReset();
                onClose && onClose();
              }}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-lg sm:rounded-xl text-white font-bold shadow-lg transition-all transform hover:scale-105 hover:shadow-purple-500/25 text-sm sm:text-base"
            >
              Light Candles Again ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Status Indicator
const StatusIndicator = ({ micPermission, candlesLit, blowDetected }) => {
  if (!micPermission || !candlesLit) return null;

  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 px-4 w-full max-w-md">
      <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
        blowDetected 
          ? 'bg-green-500/20 border-green-400/50 text-green-300' 
          : 'bg-blue-500/20 border-blue-400/50 text-blue-300'
      }`}>
        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse ${
            blowDetected ? 'bg-green-400' : 'bg-blue-400'
          }`}></div>
          <span className="font-medium text-sm sm:text-base text-center">
            {blowDetected ? 'Blowing detected!' : 'Blow to extinguish candles'}
          </span>
        </div>
      </div>
    </div>
  );
};

const VirtualCake = () => {
  // Enhanced cake options with more personality
  const defaultCakeOptions = {
    flavor: "vanilla",
    layers: 2,
    message: "Happy Birthday\nMunimmaa\n🎂🧁",
    color: "#FF9EAA",
    candleCount: 25,
    topping: "none",
    shape: "round",
    messageColor: "#FFFFFF",
    outlineColor: "#5C2E91",
    outlineWidth: 0.02,
    strokeColor: "#FF90E8",
    strokeWidth: 0.01,
    balloonCount: 12,
    zoom:false
  };

  // State for microphone permission and audio processing
  const [showMicPermissionOverlay, setShowMicPermissionOverlay] = useState(true);
  const [micPermission, setMicPermission] = useState(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [blowDetected, setBlowDetected] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [microphoneStream, setMicrophoneStream] = useState(null);
  const [audioAnalyser, setAudioAnalyser] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const micDataRef = useRef(new Uint8Array(0));
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(musicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play music when candles are blown out
  const playBirthdayMusic = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play birthday music:', error);
      }
    }
  };

  // Stop music
  const stopBirthdayMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Toggle music playback
  const toggleMusic = () => {
    if (isPlaying) {
      stopBirthdayMusic();
    } else {
      playBirthdayMusic();
    }
  };

  // Setup microphone and blow detection
  useEffect(() => {
    if (micPermission !== true || audioContext) return;

    const setupMicrophone = async () => {
      try {
        // Create audio context
        const context = new (window.AudioContext || window.webkitAudioContext)();

        // Get microphone stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Create analyser
        const analyser = context.createAnalyser();
        analyser.fftSize = 1024;

        // Connect microphone to analyser
        const source = context.createMediaStreamSource(stream);
        source.connect(analyser);

        // Setup data array for analysis
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        micDataRef.current = dataArray;

        // Store in state
        setAudioContext(context);
        setMicrophoneStream(stream);
        setAudioAnalyser(analyser);
        setIsListening(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setMicPermission(false);
      }
    };

    setupMicrophone();

    // Cleanup
    return () => {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [micPermission, audioContext]);

  // Detect blowing
  useEffect(() => {
    if (!isListening || !audioAnalyser || !micDataRef.current.length) return;

    let animationFrameId;
    let blowTimer = null;
    let consecutiveBlowFrames = 0;

    const detectBlowing = () => {
      // Get audio data
      audioAnalyser.getByteFrequencyData(micDataRef.current);

      // Calculate average volume in low frequency range (where blowing is typically detected)
      let lowFreqSum = 0;
      const lowFreqEnd = Math.floor(audioAnalyser.frequencyBinCount * 0.1); // ~10% of frequency range

      for (let i = 0; i < lowFreqEnd; i++) {
        lowFreqSum += micDataRef.current[i];
      }

      const lowFreqAvg = lowFreqSum / lowFreqEnd;

      // Detect blow - adjusting threshold for sensitivity
      if (lowFreqAvg > 140) {
        // Adjust this threshold as needed
        consecutiveBlowFrames++;

        // Require sustained blowing for detection (5 frames ~ 80ms at 60fps)
        if (consecutiveBlowFrames >= 5 && !blowTimer) {
          setBlowDetected(true);

          // Extinguish candles with slight delay for effect
          blowTimer = setTimeout(() => {
            setCandlesLit(false);
            setShowConfetti(true);
            // Start birthday music when candles are blown out
            playBirthdayMusic();
            
            // Show celebration overlay after 2 seconds
            setTimeout(() => {
              setShowCelebration(true);
            }, 3000);
            
            blowTimer = null;
          }, 300);
        }
      } else {
        consecutiveBlowFrames = 0;
      }

      animationFrameId = requestAnimationFrame(detectBlowing);
    };

    animationFrameId = requestAnimationFrame(detectBlowing);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (blowTimer) clearTimeout(blowTimer);
    };
  }, [isListening, audioAnalyser]);

  // Enhanced reset function
  const handleResetCandles = () => {
    setCandlesLit(true);
    setShowConfetti(false);
    setShowCelebration(false);
    setBlowDetected(false);
    // Stop music when resetting candles
    stopBirthdayMusic();
  };

  // Handle closing celebration modal
  const handleCloseCelebration = () => {
    setShowCelebration(false);
    // Keep music playing even when modal is closed
  };

  // Handle microphone permission responses
  const handleAcceptMic = async () => {
    setShowMicPermissionOverlay(false);
    setMicPermission(true);
  };

  const handleDenyMic = () => {
    setShowMicPermissionOverlay(false);
    setMicPermission(false);
    setPlayMusic(true);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#2A2A45]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
      </div>

      {/* Music Control Button */}
      {isPlaying && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={toggleMusic}
            className={`w-12 h-12 rounded-full ${
              isPlaying 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gradient-to-r from-gray-500 to-blue-400'
            } text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105`}
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
      )}

      {/* Confetti effect */}
      <Confetti isActive={showConfetti} />

      {/* Main 3D Scene */}
      <div className="w-full h-full">
        <Canvas 
          camera={{ position: [0, 3, 8], fov: 50 }} 
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <CakeScene cakeOptions={defaultCakeOptions} candlesLit={candlesLit} />
        </Canvas>
      </div>

      {/* Modern UI Components */}
      <StatusIndicator 
        micPermission={micPermission}
        candlesLit={candlesLit}
        blowDetected={blowDetected}
      />

      <CelebrationOverlay 
        isVisible={showCelebration}
        onReset={handleResetCandles}
        onClose={handleCloseCelebration}
      />

      <MicPermissionOverlay 
        isVisible={showMicPermissionOverlay} 
        onAccept={handleAcceptMic} 
        onDeny={handleDenyMic} 
      />

      {/* Enhanced animations */}
      <style jsx="true">{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3) translateY(100px);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0px);
          }
          100% {
            transform: scale(1) translateY(0px);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VirtualCake;
