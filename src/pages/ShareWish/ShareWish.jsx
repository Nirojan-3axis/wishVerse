import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ShareWish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // This would come from the API in a real implementation
  // Using a hardcoded value for demonstration
  const wishId = location.state?.wishId || "abc123";
  const shareableLink = `${window.location.origin}/wishes/${wishId}`;
  
  useEffect(() => {
    // Trigger entrance animation
    setShowAnimation(true);
    
    // Reset copied state after 2 seconds
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
      });
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.8, 
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 1
      } 
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6"
      initial="hidden"
      animate={showAnimation ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="relative z-10 w-full max-w-lg">
        {/* Top decorative elements */}
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="h-8 w-8 rounded-full"
                style={{
                  backgroundColor: i === 0 ? '#fbbf24' : i === 1 ? '#ec4899' : '#8b5cf6',
                  transform: `scale(${1 - i * 0.2})`,
                  opacity: 1 - i * 0.2
                }}
              ></div>
            ))}
          </div>
        </motion.div>
        
        {/* Main card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          variants={itemVariants}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 200,
                delay: 0.4
              }}
              className="inline-block"
            >
              <motion.div 
                className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
                animate={{ rotate: [0, 10] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <svg 
                  className="w-12 h-12 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
                  />
                </svg>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="mt-6 text-3xl font-bold text-white"
              variants={itemVariants}
            >
              Your Wish Is Ready!
            </motion.h1>
            
            <motion.p 
              className="mt-2 text-white/90"
              variants={itemVariants}
            >
              Share this magical moment with someone special
            </motion.p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <h2 className="text-gray-700 font-medium mb-6">
                Copy this link and share it with your loved one
              </h2>
              
              <motion.div 
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                variants={itemVariants}
              >
                {/* Animated celebration sparkles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-yellow-400"
                    initial={{ 
                      x: Math.random() * 100 - 50 + '%',
                      y: Math.random() * 100 - 50 + '%',
                      scale: 0
                    }}
                    animate={{ 
                      x: [null, Math.random() * 200 - 100 + '%'],
                      y: [null, Math.random() * 200 - 100 + '%'],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
                
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0">
                  <input
                    type="text"
                    readOnly
                    value={shareableLink}
                    className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    onClick={(e) => e.target.select()}
                  />
                  <motion.button
                    onClick={handleCopyLink}
                    className={`ml-0 sm:ml-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center min-w-[120px] ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy Link
                      </>
                    )}
                  </motion.button>
                </div>
                
                <p className="mt-4 text-xs text-gray-500">
                  Your link will be active until the reveal date you've chosen
                </p>
              </motion.div>
              
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={handleBackToDashboard}
                    className="px-8 py-3 bg-white border border-purple-200 rounded-xl text-purple-700 font-medium hover:bg-purple-50 hover:border-purple-300 transition-colors flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Dashboard
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-colors flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/dashboard/schedule-wish")}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Create New Wish
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Social sharing options */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm mb-3">Or share directly via:</p>
          <div className="flex justify-center space-x-4">
            {[
              { icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", bg: "bg-blue-600" },
              { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", bg: "bg-blue-400" },
              { icon: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z", bg: "bg-green-500" }
            ].map((social, index) => (
              <motion.button 
                key={index}
                className={`${social.bg} p-3 rounded-full text-white hover:opacity-90 transition-opacity`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon}></path>
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShareWish;