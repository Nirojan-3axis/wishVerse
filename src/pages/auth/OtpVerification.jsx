import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/auth/Button';
import authService from '../../services/auth';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from sessionStorage (set during signup or forgot password)
    const storedEmail = sessionStorage.getItem('verificationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - clear current box and focus previous
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim().slice(0, 4);
    
    if (!/^\d+$/.test(pastedData)) {
      return;
    }
    
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 4) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    
    // Focus the last filled input or the next empty one
    const lastIndex = Math.min(pastedData.length, 3);
    inputRefs[lastIndex].current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.some(digit => digit === '')) {
      setError('Please enter a complete OTP code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    const otpString = otp.join('');
    
    try {
      // Call the verify OTP API
      await authService.verifyOtp(email, otpString);
      setVerified(true);
      
      // Store verification success in sessionStorage to indicate OTP is verified
      sessionStorage.setItem('otpVerified', 'true');
    } catch (error) {
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Call the resend OTP API
      await authService.resendOtp(email);
      setResendDisabled(true);
      setCountdown(30);
    } catch (error) {
      setError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    // Check the previous page context to determine where to navigate
    const isResetFlow = sessionStorage.getItem('resetPasswordFlow');
    
    if (isResetFlow) {
      navigate('/reset-password');
    } else {
      // Assume this is a signup verification
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[var(--color-primary)]">WishVerse</h1>
              <p className="text-[var(--color-text-secondary)] mt-2">OTP Verification</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!verified ? (
              <>
                <div className="mb-6 text-center">
                  <p className="text-[var(--color-text-main)]">
                    We've sent a verification code to
                  </p>
                  <p className="font-medium text-[var(--color-text-main)]">{email || 'your email'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center space-x-3 mb-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : null}
                        className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                        maxLength={1}
                        autoFocus={index === 0}
                        disabled={isLoading}
                      />
                    ))}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    disabled={isLoading || otp.some(digit => digit === '')}
                    className={isLoading || otp.some(digit => digit === '') ? 'opacity-70 cursor-not-allowed' : ''}
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-[var(--color-text-secondary)] text-sm mb-2">
                    Didn't receive the code?
                  </p>
                  {resendDisabled ? (
                    <p className="text-[var(--color-text-main)] text-sm">
                      Resend in <span className="font-medium">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      className="text-[var(--color-primary)] hover:underline text-sm font-medium transition-colors"
                      disabled={isLoading}
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Verification Successful</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Your account has been verified successfully
                </p>
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;