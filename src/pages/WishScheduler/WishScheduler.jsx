import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion"; // Import framer-motion for animations

const WishScheduler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [revealDate, setRevealDate] = useState(new Date());
  const [revealTime, setRevealTime] = useState(new Date());
  const [waitingMessage, setWaitingMessage] = useState(
    "A special wish is waiting for you! Come back on the reveal date to see it."
  );
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [previewMode, setPreviewMode] = useState("before"); // Toggle between before/after
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false); // For a fun animation
  const [emailReminderEnabled, setEmailReminderEnabled] = useState(true);
  const [smsReminderEnabled, setSmsReminderEnabled] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [continueIterating, setContinueIterating] = useState(false);

  // Get cake options from navigation state if available
  const cakeOptions = location.state?.cakeOptions || {};

  // Combine date and time for the final reveal datetime
  const combineDateAndTime = () => {
    const combinedDate = new Date(revealDate);
    combinedDate.setHours(revealTime.getHours());
    combinedDate.setMinutes(revealTime.getMinutes());
    return combinedDate;
  };

  // Animation variants for smooth transitions
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Toggle preview mode with animation
  const togglePreview = () => {
    setShowConfetti(previewMode === "before");
    setPreviewMode(previewMode === "before" ? "after" : "before");
  };

  // Effect to hide confetti after animation
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleSaveWish = async () => {
    setIsSaving(true);
    
    try {
      // Combine the date and time
      const revealDateTime = combineDateAndTime();
      
      // Create wish object with all necessary data
      const wishData = {
        cakeOptions,
        revealDateTime,
        waitingMessage,
        reminderEnabled,
        emailReminderEnabled,
        smsReminderEnabled,
        recipientEmail,
        recipientPhone,
        createdDate: new Date(),
      };
      
      console.log("Saving wish:", wishData);
      
      // Here you would typically make an API call to save the wish
      // For example:
      // await apiClient.post('/wishes', wishData);
      
      // Show success animation instead of alert
      setShowConfetti(true);
      
      // Wait a moment to show the animation, then navigate to ShareWish
      setTimeout(() => {
        // Navigate to the ShareWish page with the wishData
        navigate("/dashboardwish-scheduler/share", { 
          state: { 
            wishData,
            wishId: "wish-" + Date.now(), // Generate a temporary ID until backend integration
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Error saving wish:", error);
      alert("Failed to save your wish. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Use a more user-friendly modal instead of a standard confirm
    if (window.confirm("Are you sure you want to cancel? Your progress will be lost.")) {
      navigate(-1);
    }
  };

  // Calculate min date (today) and max date (1 year from now)
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="pb-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Magical background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-green-100 rounded-full filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

      {/* Header with progress indication */}
      <div className="mb-8 relative z-10">
        <motion.h1 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Schedule Your Wish
        </motion.h1>
        <motion.p 
          className="text-[var(--color-text-secondary)] mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose when your magical cake wish will be revealed to make someone's day special
        </motion.p>
        
        {/* Stylish progress tracker */}
        <div className="mt-6 flex items-center">
          <div className={`h-2 w-1/3 rounded-l-full ${currentStep >= 1 ? 'bg-gradient-to-r from-[var(--color-primary)] to-purple-500' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-1/3 ${currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-1/3 rounded-r-full ${currentStep === 3 ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Create Cake</span>
          <span className="font-medium text-purple-600">Schedule Reveal</span>
          <span>Share Wish</span>
        </div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div 
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    width: `${0.5 + Math.random() * 1}rem`,
                    height: `${0.5 + Math.random() * 1}rem`,
                    animation: `fall ${1 + Math.random() * 3}s linear forwards`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
            {isSaving && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Saving Your Wish</h3>
                <p className="text-gray-600">Preparing your special moment...</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Preview Panel - Left Side (wider on mobile) */}
        <motion.div 
          className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Preview
                </h2>
                <button 
                  onClick={togglePreview}
                  className="text-xs px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                >
                  {previewMode === "before" ? "Show After" : "Show Before"}
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden" style={{ minHeight: "460px" }}>
              {/* Device frame for better visualization */}
              <div className="absolute inset-4 rounded-2xl border-8 border-gray-800 shadow-lg overflow-hidden bg-white">
                {/* Device header */}
                <div className="h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                </div>
                
                <motion.div 
                  className="relative h-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Before reveal preview */}
                  {previewMode === "before" && (
                    <motion.div 
                      className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-gray-800 font-medium text-lg">{waitingMessage || "A special wish is waiting for you!"}</p>
                        
                        <div className="mt-6 inline-block px-5 py-3 bg-white rounded-xl shadow border border-gray-100 text-sm">
                          <div className="flex items-center mb-1">
                            <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-gray-900 font-medium">{revealDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-gray-900 font-medium">{revealTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                        <div className="px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-xs font-medium animate-pulse">
                          Come back on the reveal date
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* After reveal preview */}
                  {previewMode === "after" && (
                    <motion.div 
                      className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-orange-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-3 text-center">
                        <span className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-yellow-800 text-xs font-medium">
                          🎉 Wish Revealed!
                        </span>
                      </div>
                      
                      <div className="w-24 h-24 mx-auto my-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl animate-pulse opacity-25"></div>
                        <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                          <svg className="w-12 h-12 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-xl shadow-lg border border-yellow-100 w-full max-w-xs text-center mt-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{cakeOptions.message || "Happy Birthday!"}</h3>
                        <p className="text-sm text-gray-600">Your virtual cake is now ready to be enjoyed!</p>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full opacity-70"></div>
                      </div>
                      <div className="absolute bottom-10 right-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full opacity-70"></div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Device footer */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-24 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Preview tip */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                Click the toggle above to see how your wish will appear before and after reveal
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Panel - Right Side */}
        <motion.div 
          className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
              <h2 className="text-xl font-bold text-[var(--color-text-main)] flex items-center">
                <svg className="w-6 h-6 mr-2 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Schedule Your Magical Moment
              </h2>
              <p className="mt-1 text-[var(--color-text-secondary)] max-w-xl">
                Select when your cake wish will be revealed and customize the experience for your recipient
              </p>
            </div>
            
            <div className="p-6 space-y-10">
              {/* Date and Time Selection with enhanced UI */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[var(--color-text-main)] border-b border-gray-100 pb-2">
                  Reveal Timing
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker with enhanced design */}
                  <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <label htmlFor="revealDate" className=" text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Choose Reveal Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <DatePicker
                        selected={revealDate}
                        onChange={(date) => setRevealDate(date)}
                        minDate={minDate}
                        maxDate={maxDate}
                        className="pl-10 block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-all text-gray-700"
                        dayClassName={date => 
                          date.getDate() === revealDate.getDate() && 
                          date.getMonth() === revealDate.getMonth() ? 
                          "bg-[var(--color-primary)] text-white rounded-full" : undefined
                        }
                      />
                    </div>
                    <p className="mt-3 text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Select the perfect day for your surprise reveal
                    </p>
                  </div>

                  {/* Time Picker with enhanced design */}
                  <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <label htmlFor="revealTime" className=" text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Choose Reveal Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <DatePicker
                        selected={revealTime}
                        onChange={(time) => setRevealTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="pl-10 block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-all text-gray-700"
                      />
                    </div>
                    <p className="mt-3 text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Choose the exact moment for your wish to appear
                    </p>
                  </div>
                </div>
              </div>

              {/* Waiting Message with character count animation */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[var(--color-text-main)] border-b border-gray-100 pb-2">
                  Waiting Message
                </h3>
                
                <div className="bg-gradient-to-br from-white to-purple-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <label htmlFor="waitingMessage" className=" text-sm font-medium text-[var(--color-text-secondary)] mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    Surprise Waiting Message
                  </label>
                  <textarea
                    id="waitingMessage"
                    rows="3"
                    value={waitingMessage}
                    onChange={(e) => setWaitingMessage(e.target.value)}
                    placeholder="Enter a message that will be shown until the cake is revealed..."
                    className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-all resize-none text-gray-700"
                    maxLength={200}
                  ></textarea>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      This message appears until the reveal date/time
                    </p>
                    
                    {/* Animated character count */}
                    <div className="text-xs font-medium">
                      <span className="inline-block relative">
                        <span className={`${waitingMessage.length > 150 ? 'text-orange-500' : 'text-[var(--color-primary)]'}`}>
                          {waitingMessage.length}
                        </span>
                        <span className="text-gray-400">/200</span>
                        
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Notification Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-[var(--color-text-main)] border-b border-gray-100 pb-2">
                  Delivery Options
                </h3>
                
                <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  {/* Reminder option */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          id="reminderEnabled"
                          type="checkbox"
                          checked={reminderEnabled}
                          onChange={() => setReminderEnabled(!reminderEnabled)}
                          className="h-4 w-4 appearance-none rounded bg-white checked:bg-gradient-to-r checked:from-[var(--color-primary)] checked:to-purple-600 checked:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 transition-all duration-200 cursor-pointer border-gray-300 border"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="reminderEnabled" className="text-sm font-medium text-[var(--color-text-main)]">
                          Enable Reminders
                        </label>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          Send a notification when it's time to view the cake
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${reminderEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {reminderEnabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {/* Reminder delivery options - only shown if reminders are enabled */}
                  {reminderEnabled && (
                    <div className="mt-4 pl-7 space-y-4">
                      <div className="flex flex-col space-y-3">
                        <p className="text-sm font-medium text-[var(--color-text-main)]">
                          Notification Method
                        </p>
                        
                        {/* Email reminder option */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <input
                              id="emailReminder"
                              type="checkbox"
                              checked={emailReminderEnabled}
                              onChange={() => setEmailReminderEnabled(!emailReminderEnabled)}
                              className="h-4 w-4 appearance-none rounded bg-white checked:bg-gradient-to-r checked:from-[var(--color-primary)] checked:to-purple-600 checked:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 transition-all duration-200 cursor-pointer border-gray-300 border"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="emailReminder" className="text-sm font-medium text-[var(--color-text-main)]">
                              Email Reminder
                            </label>
                          </div>
                        </div>
                        
                        {/* Email input field - only shown if email reminders are enabled */}
                        {emailReminderEnabled && (
                          <motion.div 
                            className="ml-7 mt-1"
                            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                              <input
                                type="email"
                                id="recipientEmail"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                placeholder="Enter recipient's email address"
                                className="pl-10 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-all text-gray-700 text-sm"
                                required={emailReminderEnabled}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              We'll email a reminder when it's time to reveal the cake
                            </p>
                          </motion.div>
                        )}
                        
                        {/* SMS reminder option */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <input
                              id="smsReminder"
                              type="checkbox"
                              checked={smsReminderEnabled}
                              onChange={() => setSmsReminderEnabled(!smsReminderEnabled)}
                              className="h-4 w-4 appearance-none rounded bg-white checked:bg-gradient-to-r checked:from-[var(--color-primary)] checked:to-purple-600 checked:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 transition-all duration-200 cursor-pointer border-gray-300 border"
                            />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="smsReminder" className="text-sm font-medium text-[var(--color-text-main)]">
                              SMS Reminder
                            </label>
                          </div>
                        </div>
                        
                        {/* Phone input field - only shown if SMS reminders are enabled */}
                        {smsReminderEnabled && (
                          <motion.div 
                            className="ml-7 mt-1"
                            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16l-1-1m0 0l-1-1m1 1l-1-1m0 0l1-1m-1 5l1-1m0 0l1-1m-1 1l1-1m0 0l-1-1M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"></path>
                                </svg>
                              </div>
                              <input
                                type="tel"
                                id="recipientPhone"
                                value={recipientPhone}
                                onChange={(e) => setRecipientPhone(e.target.value)}
                                placeholder="Enter recipient's phone number"
                                className="pl-10 block w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-all text-gray-700 text-sm"
                                required={smsReminderEnabled}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              We'll send an SMS reminder when it's time to reveal the cake
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-10">
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white border border-gray-200 text-[var(--color-text-main)] rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Cancel
                </motion.button>
                
                <motion.button
                  onClick={handleSaveWish}
                  disabled={isSaving}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] via-purple-600 to-pink-500 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                    isSaving ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Magic...
                    </>
                  ) : (
                    <>
                      Save Your Wish
                      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Add CSS keyframes for confetti animation */}
      <style jsx="true">{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        .confetti {
          position: absolute;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: both;
          border-radius: 2px;
        }
      `}</style>
    </motion.div>
  );
};

export default WishScheduler;