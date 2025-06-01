/**
 * API configuration settings
 */

// Base API URL - update this with your actual API endpoint
export const API_URL = 'http://localhost:8080/api';

// API endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  SIGNUP: `${API_URL}/auth/signup`,
  FORGOT_PASSWORD: `${API_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_URL}/auth/reset-password`,
  VERIFY_OTP: `${API_URL}/auth/verify-otp`,
  RESEND_OTP: `${API_URL}/auth/resend-otp`,
  GOOGLE_AUTH: `${API_URL}/auth/google`,
  REFRESH_TOKEN: `${API_URL}/auth/refresh-token`,
  LOGOUT: `${API_URL}/auth/logout`,
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 15000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'wishverse_auth_token',
  REFRESH_TOKEN: 'wishverse_refresh_token',
  USER_INFO: 'wishverse_user_info',
};