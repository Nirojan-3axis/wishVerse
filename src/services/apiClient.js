import { DEFAULT_HEADERS, REQUEST_TIMEOUT, STORAGE_KEYS } from './config';

/**
 * API Client for handling HTTP requests
 */
class ApiClient {
  /**
   * Make a fetch request with standard error handling and timeout
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Request options
   * @returns {Promise<any>} - Response data
   */
  async fetch(url, options = {}) {
    const { headers = {}, ...restOptions } = options;
    
    // Add auth token if available
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    // Set up request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: {
          ...DEFAULT_HEADERS,
          ...authHeaders,
          ...headers,
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // Handle HTTP error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      // Only try to parse JSON if there's content
      if (response.status !== 204) {
        return await response.json();
      }
      
      return null;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }
  
  /**
   * HTTP GET request
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  get(url, options = {}) {
    return this.fetch(url, {
      method: 'GET',
      ...options,
    });
  }
  
  /**
   * HTTP POST request
   * @param {string} url - The API endpoint URL
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  post(url, data, options = {}) {
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }
  
  /**
   * HTTP PUT request
   * @param {string} url - The API endpoint URL
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  put(url, data, options = {}) {
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }
  
  /**
   * HTTP PATCH request
   * @param {string} url - The API endpoint URL
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  patch(url, data, options = {}) {
    return this.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }
  
  /**
   * HTTP DELETE request
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  delete(url, options = {}) {
    return this.fetch(url, {
      method: 'DELETE',
      ...options,
    });
  }
}

// Export a singleton instance
export default new ApiClient();