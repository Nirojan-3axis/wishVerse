import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/auth/Button';
import authService from '../../services/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetComplete, setResetComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    if (token) {
      setResetToken(token);
    } else {
      // Check if OTP was verified
      const isOtpVerified = sessionStorage.getItem('otpVerified');
      if (!isOtpVerified) {
        // Redirect to forgot password if no token and OTP not verified
        navigate('/forgot-password');
      }
    }
  }, [location, navigate]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    setIsLoading(true);
    
    try {
      // Reset password using token or email (depending on flow)
      if (resetToken) {
        await authService.resetPassword(resetToken, password);
      } else {
        // Email-based reset (after OTP verification)
        const email = sessionStorage.getItem('verificationEmail');
        if (!email) {
          throw new Error('Email not found. Please restart the password reset process.');
        }
        
        // In a real implementation, you might need a different API call here
        // This is just an example that uses the same resetPassword method
        await authService.resetPassword(email, password);
      }
      
      setResetComplete(true);
      
      // Clear session storage data used for reset flow
      sessionStorage.removeItem('verificationEmail');
      sessionStorage.removeItem('otpVerified');
      sessionStorage.removeItem('resetPasswordFlow');
    } catch (error) {
      setPasswordError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[var(--color-primary)]">WishVerse</h1>
              <p className="text-[var(--color-text-secondary)] mt-2">Reset your password</p>
            </div>

            {!resetComplete ? (
              <>
                <p className="text-[var(--color-text-main)] mb-6">
                  Create a new password for your account. Make sure it's at least 8 characters long.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text-main)]">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors ${
                        passwordError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-text-main)]">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors ${
                        passwordError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                    {passwordError && (
                      <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-[var(--color-text-secondary)]">Password must contain:</p>
                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 pl-5 list-disc">
                      <li className={password.length >= 8 ? 'text-green-500' : ''}>At least 8 characters</li>
                      <li className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>One uppercase letter</li>
                      <li className={/[0-9]/.test(password) ? 'text-green-500' : ''}>One number</li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Password Reset Complete</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Your password has been reset successfully
                </p>
                <Link to="/login">
                  <Button variant="primary" fullWidth>
                    Back to Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;