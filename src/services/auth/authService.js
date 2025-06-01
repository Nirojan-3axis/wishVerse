import apiClient from '../apiClient';
import { AUTH_ENDPOINTS, STORAGE_KEYS } from '../config';

/**
 * Authentication service for handling auth-related API calls
 */
class AuthService {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data and tokens
   */
  async login(email, password) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { username: email, password });
      this._saveAuthData(response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Sign up with user details
   * @param {Object} userData - User details for registration
   * @returns {Promise<Object>} - User data and tokens if auto-login
   */
  async signup(userData) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, userData);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Login or signup with Google
   * @param {string} token - Google auth token
   * @returns {Promise<Object>} - User data and tokens
   */
  async googleAuth(token) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.GOOGLE_AUTH, { token });
      this._saveAuthData(response);
      return response;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} - Response data
   */
  async forgotPassword(email) {
    try {
      return await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @returns {Promise<Object>} - Response data
   */
  async resetPassword(token, password) {
    try {
      return await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, password });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP code
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @returns {Promise<Object>} - Response data
   */
  async verifyOtp(email, otp) {
    try {
      return await apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, { email, otp });
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }

  /**
   * Resend OTP code
   * @param {string} email - User email
   * @returns {Promise<Object>} - Response data
   */
  async resendOtp(email) {
    try {
      return await apiClient.post(AUTH_ENDPOINTS.RESEND_OTP, { email });
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        await apiClient.post(AUTH_ENDPOINTS.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this._clearAuthData();
    }
  }

  /**
   * Refresh auth token
   * @returns {Promise<Object>} - New tokens
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
      this._saveAuthData(response);
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      this._clearAuthData();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get current user info
   * @returns {Object|null} - User data or null if not logged in
   */
  getCurrentUser() {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Save authentication data to local storage
   * @param {Object} data - Auth response data
   * @private
   */
  _saveAuthData(data) {
    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    }
    if (data.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(data.user));
    }
  }

  /**
   * Clear authentication data from local storage
   * @private
   */
  _clearAuthData() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }
}

// Export a singleton instance
export default new AuthService();