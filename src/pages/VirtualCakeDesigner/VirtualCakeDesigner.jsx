import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import CakeScene from "../../components/virtualCake/CakeScene";
import Confetti from "../../components/virtualCake/Confetti";

const VirtualCakeDesigner = () => {
  // State for cake customization
  const [cakeOptions, setCakeOptions] = useState({
    flavor: "vanilla",
    layers: 2,
    message: "Happy Birthday!",
    color: "#FF9EAA", // Light pink default
    candleCount: 5, // Default candle count
    topping: "sprinkles", // Default topping
    shape: "round", // Default cake shape
  });

  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPublic, setIsPublic] = useState(false); // State for public/private design option
  
  // Accordion state
  const [openAccordion, setOpenAccordion] = useState({
    cakeDesign: true,
    messageDesign: false,
    visibility: false
  });
  
  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setOpenAccordion(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Available options for customization
  const cakeFlavorOptions = [
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "redvelvet", label: "Red Velvet" },
    { value: "strawberry", label: "Strawberry" },
    { value: "lemon", label: "Lemon" },
  ];

  const toppingOptions = [
    { value: "sprinkles", label: "Sprinkles" },
    { value: "fruit", label: "Fruit" },
    { value: "chocolate", label: "Chocolate Chips" },
    { value: "flowers", label: "Flowers" },
    { value: "none", label: "None" },
  ];

  // Text style presets for quick selection
  const textPresets = [
    {
      name: "Preset 1",
      textColor: "#FFFFFF",
      outlineColor: "#FF5252",
      outlineWidth: 0.04,
      strokeColor: "#FF90E8",
      strokeWidth: 0.01,
    },
    {
      name: "Preset 2",
      textColor: "#FFEB3B",
      outlineColor: "#448AFF",
      outlineWidth: 0.03,
      strokeColor: "#8E24AA",
      strokeWidth: 0.008,
    },
    {
      name: "Preset 3",
      textColor: "#4CAF50",
      outlineColor: "#FFC107",
      outlineWidth: 0.05,
      strokeColor: "#FF5722",
      strokeWidth: 0.012,
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for numeric width values
    if (name === 'outlineWidth' || name === 'strokeWidth') {
      setCakeOptions({
        ...cakeOptions,
        [name]: parseFloat(value),
      });
    } else {
      setCakeOptions({
        ...cakeOptions,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  // Apply text preset
  const applyTextPreset = (preset) => {
    setCakeOptions({
      ...cakeOptions,
      messageColor: preset.textColor,
      outlineColor: preset.outlineColor,
      outlineWidth: parseFloat(preset.outlineWidth),
      strokeColor: preset.strokeColor,
      strokeWidth: parseFloat(preset.strokeWidth),
    });
  };

  // Check if current options match the preset
  const isCurrentTextPreset = (preset) => {
    return (
      cakeOptions.messageColor === preset.textColor &&
      cakeOptions.outlineColor === preset.outlineColor &&
      cakeOptions.outlineWidth === preset.outlineWidth &&
      cakeOptions.strokeColor === preset.strokeColor &&
      cakeOptions.strokeWidth === preset.strokeWidth
    );
  };

  // Handle text input changes
  const handleTextareaChange = (e) => {
    // Limit to 3 lines
    const text = e.target.value;
    const lines = text.split('\n');
    
    if (lines.length <= 3) {
      setCakeOptions({
        ...cakeOptions,
        message: text
      });
    }
  };
  
  // Handle candle count changes
  const handleCandleChange = (change) => {
    const newCount = Math.max(0, Math.min(70, parseInt(cakeOptions.candleCount || 0) + change));
    setCakeOptions({
      ...cakeOptions,
      candleCount: newCount
    });
  };

  // Function to handle cake design sharing
  const handleShareCake = () => {
    // This would integrate with your sharing functionality
    alert("Cake design shared to your wishlist!");
  };

  // Function to handle cake design saving
  const handleSaveCake = () => {
    // This would save the cake design to the user's account
    alert("Cake design saved to your account!");
  };

  // New function to handle saving as draft
  const handleSaveDraft = () => {
    // This would save the cake design as a draft
    alert("Cake design saved as draft!");
  };

  // New function to handle continuing to create a wish
  const handleCreateWish = () => {
    // This would proceed to the wish creation process
    alert("Proceeding to create a wish with this cake design!");
  };

  const navigate = useNavigate();

  // Function to continue to wish scheduler
  const handleContinueToScheduler = () => {
    navigate('/dashboard/schedule-wish', { state: { cakeOptions } });
  };

  return (
    <div className="pb-6 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Virtual Cake Designer</h1>
        <p className="text-[var(--color-text-secondary)]">Create your perfect cake and add it to your wishlist!</p>
      </div>

      {/* Confetti effect when candles are blown out */}
      <Confetti isActive={showConfetti} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Cake Display/Preview with Fixed Positioning on Desktop */}
        <div className="lg:col-span-2 relative">
          {/* Sticky container for desktop */}
          <div className="hidden lg:block sticky top-4">
            <div className="bg-gradient-to-br from-[#f8f9fa] to-[#f0f2f5] rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col items-center justify-center h-[800px] overflow-hidden relative">
              {/* Decorative elements for a trendier look */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent-2)] opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl"></div>

              <div className="w-full h-[600px] relative">
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <CakeScene cakeOptions={cakeOptions} candlesLit={candlesLit} />
                </Canvas>
              </div>

              {/* Action buttons */}
              <div className="w-full flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                <button
                  onClick={() => handleSaveDraft()}
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-[var(--color-text-main)] rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Draft
                </button>

                <button
                  onClick={handleContinueToScheduler}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[#8E24AA] text-white rounded-xl hover:shadow-lg font-medium transition-all duration-300 flex items-center justify-center group"
                >
                  Continue to Create Wish
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Non-sticky version for mobile - shown at the top */}
          <div className="block lg:hidden">
            <div className="bg-gradient-to-br from-[#f8f9fa] to-[#f0f2f5] rounded-2xl shadow-lg p-4 border border-gray-100 flex flex-col items-center justify-center h-[400px] overflow-hidden relative">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent-2)] opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl"></div>

              <div className="w-full h-[300px] relative">
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <CakeScene cakeOptions={cakeOptions} candlesLit={candlesLit} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Cake Customization Controls - Styled more modern */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent-1)] opacity-10 rounded-full blur-xl"></div>

          <h2 className="text-xl font-bold mb-6 text-[var(--color-text-main)] flex items-center">
            <svg className="w-6 h-6 mr-2 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Customize Your Cake
          </h2>

          {/* Bottom action buttons for mobile only - sticky */}
          <div className="lg:hidden sticky bottom-0 left-0 right-0 mt-6 pt-4 pb-4 px-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 z-10">
            <button
              onClick={() => handleSaveDraft()}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-[var(--color-text-main)] rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Draft
            </button>

            <button
              onClick={handleContinueToScheduler}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[#8E24AA] text-white rounded-xl hover:shadow-lg font-medium transition-all duration-300 flex items-center justify-center group"
            >
              Continue to Create Wish
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div className="space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 pb-20 lg:pb-0">
            {/* Accordion for Cake Design */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Accordion Header */}
              <button 
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                onClick={() => toggleAccordion('cakeDesign')}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF9EAA] to-[#FFD6A5] flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-[var(--color-text-main)]">Cake Design</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Flavor, color, layers & toppings</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-gray-400 transition-transform ${openAccordion.cakeDesign ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion.cakeDesign ? 'max-h-[1500px]' : 'max-h-0'}`}>
                <div className="p-5 space-y-4 bg-gray-50">
                  {/* Cake Flavor */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="flavor" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Cake Flavor
                    </label>
                    <select
                      id="flavor"
                      name="flavor"
                      value={cakeOptions.flavor}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                    >
                      {cakeFlavorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Frosting Color */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="color" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                      Frosting Color
                    </label>
                    <div className="flex flex-col space-y-3">
                      <div className="grid grid-cols-6 gap-3">
                        {["#FF9EAA", "#FFD6A5", "#FFFEC4", "#CBFFA9", "#A0C4FF", "#D0AAFF"].map((presetColor) => (
                          <button
                            key={presetColor}
                            type="button"
                            onClick={() => setCakeOptions({ ...cakeOptions, color: presetColor })}
                            className={`h-10 w-full rounded-full transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md ${
                              cakeOptions.color === presetColor ? "ring-2 ring-offset-2 ring-[var(--color-primary)]" : ""
                            }`}
                            style={{ backgroundColor: presetColor }}
                            aria-label={`Select ${presetColor} color`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div
                          className="h-10 w-10 rounded-md shadow-inner border border-gray-200 overflow-hidden"
                          style={{ background: `linear-gradient(to right, #fff 0%, ${cakeOptions.color} 100%)` }}
                        >
                          <input
                            type="color"
                            id="color"
                            name="color"
                            value={cakeOptions.color}
                            onChange={handleInputChange}
                            className="h-full w-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <input
                            type="text"
                            value={cakeOptions.color}
                            onChange={handleInputChange}
                            name="color"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Layers */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="layers" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                      Number of Layers
                    </label>
                    <input
                      type="range"
                      id="layers"
                      name="layers"
                      min="1"
                      max="5"
                      value={cakeOptions.layers}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                  
                  {/* Toppings */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="topping" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Cake Toppings
                    </label>
                    <select
                      id="topping"
                      name="topping"
                      value={cakeOptions.topping}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                    >
                      {toppingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Candles */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="candleCount" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Number of Candles
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleCandleChange(-1)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                        aria-label="Decrease candle count"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="candleCount"
                        name="candleCount"
                        min="0"
                        max="70"
                        value={cakeOptions.candleCount}
                        onChange={handleInputChange}
                        className="mx-2 block w-20 text-center px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => handleCandleChange(1)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                        aria-label="Increase candle count"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Cake Shape */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="shape" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Cake Shape
                    </label>
                    <select
                      id="shape"
                      name="shape"
                      value={cakeOptions.shape}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors"
                    >
                      <option value="round">Round</option>
                      <option value="square">Square</option>
                      <option value="star">Star</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accordion for Message Design */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Accordion Header */}
              <button 
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                onClick={() => toggleAccordion('messageDesign')}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#A0C4FF] to-[#D0AAFF] flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-[var(--color-text-main)]">Message Design</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Text, colors & styling</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-gray-400 transition-transform ${openAccordion.messageDesign ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion.messageDesign ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="p-5 space-y-4 bg-gray-50">
                  {/* Birthday Message */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Birthday Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={cakeOptions.message}
                        onChange={handleTextareaChange}
                        placeholder="Enter birthday wishes (max 3 lines)"
                        rows="3"
                        maxLength="60"
                        className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm transition-colors resize-none"
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {cakeOptions.message.split('\n').length}/3 lines
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Max 3 lines of text for best display.</p>
                  </div>
                  
                  {/* Message Text Color */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <label htmlFor="messageColor" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Message Text Color
                    </label>
                    <div className="flex flex-col space-y-3">
                      <div className="grid grid-cols-6 gap-3">
                        {["#FFFFFF", "#FFD700", "#FF9EAA", "#64FFDA", "#A0C4FF", "#E040FB"].map((presetColor) => (
                          <button
                            key={presetColor}
                            type="button"
                            onClick={() => setCakeOptions({ ...cakeOptions, messageColor: presetColor })}
                            className={`h-10 w-full rounded-full transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md ${
                              cakeOptions.messageColor === presetColor ? "ring-2 ring-offset-2 ring-[var(--color-primary)]" : ""
                            }`}
                            style={{ backgroundColor: presetColor }}
                            aria-label={`Select ${presetColor} color`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div
                          className="h-10 w-10 rounded-md shadow-inner border border-gray-200 overflow-hidden"
                          style={{ background: cakeOptions.messageColor || "#FFFFFF" }}
                        >
                          <input
                            type="color"
                            id="messageColor"
                            name="messageColor"
                            value={cakeOptions.messageColor || "#FFFFFF"}
                            onChange={handleInputChange}
                            className="h-full w-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <input
                            type="text"
                            value={cakeOptions.messageColor || "#FFFFFF"}
                            onChange={(e) => setCakeOptions({...cakeOptions, messageColor: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Text Styling */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    {/* Style Presets */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                        Style Presets
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {textPresets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => applyTextPreset(preset)}
                            className={`p-2 rounded-lg text-center text-xs transition-all border ${
                              isCurrentTextPreset(preset) 
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="h-8 flex items-center justify-center mb-1 overflow-hidden">
                              <span 
                                className="font-semibold" 
                                style={{
                                  color: preset.textColor,
                                  textShadow: `${preset.outlineWidth}px ${preset.outlineWidth}px 0 ${preset.outlineColor}, 
                                              -${preset.outlineWidth}px ${preset.outlineWidth}px 0 ${preset.outlineColor}, 
                                              ${preset.outlineWidth}px -${preset.outlineWidth}px 0 ${preset.outlineColor}, 
                                              -${preset.outlineWidth}px -${preset.outlineWidth}px 0 ${preset.outlineColor}`
                                }}
                              >
                                Aa
                              </span>
                            </div>
                            <span>{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Custom Styling (Colors) */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                        Text Effects
                      </label>
                      <div className="flex space-x-2">
                        {/* Outline Color */}
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Outline
                          </label>
                          <div className="relative">
                            <div 
                              className="h-10 w-full rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center"
                              style={{background: cakeOptions.outlineColor || "#5C2E91"}}
                            >
                              <input
                                type="color"
                                name="outlineColor"
                                value={cakeOptions.outlineColor || "#5C2E91"}
                                onChange={handleInputChange}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Stroke Color */}
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Stroke
                          </label>
                          <div className="relative">
                            <div 
                              className="h-10 w-full rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center"
                              style={{background: cakeOptions.strokeColor || "#FF90E8"}}
                            >
                              <input
                                type="color"
                                name="strokeColor"
                                value={cakeOptions.strokeColor || "#FF90E8"}
                                onChange={handleInputChange}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Width Controls */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                        Effect Thickness
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Outline Width */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-medium text-gray-500">
                              Outline
                            </label>
                            <span className="text-xs text-gray-400">
                              {cakeOptions.outlineWidth || 0.04}
                            </span>
                          </div>
                          <input
                            type="range"
                            name="outlineWidth"
                            min="0"
                            max="0.1"
                            step="0.01"
                            value={cakeOptions.outlineWidth || 0.04}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                          />
                        </div>
                        
                        {/* Stroke Width */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-medium text-gray-500">
                              Stroke
                            </label>
                            <span className="text-xs text-gray-400">
                              {cakeOptions.strokeWidth || 0.01}
                            </span>
                          </div>
                          <input
                            type="range"
                            name="strokeWidth"
                            min="0"
                            max="0.05"
                            step="0.005"
                            value={cakeOptions.strokeWidth || 0.01}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Preview */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                      <p className="text-center text-xs text-gray-400 mb-2">Live Preview</p>
                      <div className="h-16 flex items-center justify-center">
                        <span 
                          className="text-2xl font-bold" 
                          style={{
                            color: cakeOptions.messageColor || "#FFFFFF",
                            textShadow: `${cakeOptions.outlineWidth || 0.04}px ${cakeOptions.outlineWidth || 0.04}px 0 ${cakeOptions.outlineColor || "#5C2E91"}, 
                                         -${cakeOptions.outlineWidth || 0.04}px ${cakeOptions.outlineWidth || 0.04}px 0 ${cakeOptions.outlineColor || "#5C2E91"}, 
                                         ${cakeOptions.outlineWidth || 0.04}px -${cakeOptions.outlineWidth || 0.04}px 0 ${cakeOptions.outlineColor || "#5C2E91"}, 
                                         -${cakeOptions.outlineWidth || 0.04}px -${cakeOptions.outlineWidth || 0.04}px 0 ${cakeOptions.outlineColor || "#5C2E91"}`
                          }}
                        >
                          {cakeOptions.message.split('\n')[0] || "Happy Birthday!"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accordion for Privacy Settings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Accordion Header */}
              <button 
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                onClick={() => toggleAccordion('visibility')}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#64FFDA] to-[#CBFFA9] flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-[var(--color-text-main)]">Privacy Settings</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Control who can see your design</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-gray-400 transition-transform ${openAccordion.visibility ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion.visibility ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="p-5 space-y-4 bg-gray-50">
                  {/* Visibility Toggle */}
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[var(--color-text-main)]">Design Visibility</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          Choose whether your cake design is visible to others
                        </p>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isPublic}
                          onChange={() => setIsPublic(!isPublic)}
                          className="sr-only"
                        />
                        <div className={`w-14 h-7 rounded-full transition-all ${isPublic ? 'bg-gradient-to-r from-[var(--color-primary)] to-[#8E24AA]' : 'bg-gray-300'}`}>
                          <div 
                            className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-all duration-300"
                            style={{ transform: isPublic ? 'translateX(28px)' : 'translateX(0)' }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-[var(--color-text-main)]">
                          {isPublic ? 'Public' : 'Private'}
                        </span>
                      </label>
                    </div>
                    
                    {/* Privacy description */}
                    <div className={`mt-4 p-4 rounded-lg ${
                      isPublic 
                        ? 'bg-blue-50 border border-blue-100' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className={`h-5 w-5 ${isPublic ? 'text-blue-500' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d={isPublic 
                              ? "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                              : "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            } clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className={`text-sm leading-relaxed ${isPublic ? 'text-blue-700' : 'text-gray-700'}`}>
                            {isPublic ? (
                              <>
                                <span className="font-semibold">Your cake design will be public.</span> The cake's appearance,
                                flavor, and toppings will be visible in our public gallery. Personal details like your birthday message
                                will remain private.
                              </>
                            ) : (
                              <>
                                <span className="font-semibold">Your cake design is private.</span> Only you and people you
                                specifically share it with can see it.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCakeDesigner;
