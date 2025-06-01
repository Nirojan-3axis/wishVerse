import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/auth/Button';
import authService from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Call the forgotPassword API
      await authService.forgotPassword(email);
      setSubmitted(true);
      
      // Store email for OTP verification if needed
      sessionStorage.setItem('verificationEmail', email);
    } catch (error) {
      setError(error.message || 'Failed to send reset link. Please try again.');
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!submitted ? (
              <>
                <p className="text-[var(--color-text-main)] mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-main)]">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                      placeholder="your@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-[var(--color-accent-2)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Check your email</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <Link to="/verify-otp">
                  <Button variant="primary" fullWidth>
                    Verify with OTP
                  </Button>
                </Link>
                <button 
                  className="mt-4 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  onClick={() => setSubmitted(false)}
                >
                  Try a different email
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;