/**
 * API Configuration Utility
 * Handles dynamic API base URL construction for Codespaces and localhost
 */

/**
 * Get the API base URL based on environment variables
 * 
 * Priority:
 * 1. VITE_API_BASE_URL (if manually set)
 * 2. Codespaces URL: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api
 * 3. Localhost: http://localhost:8000/api
 * 
 * @returns {string} The API base URL
 */
export function getApiBaseUrl() {
  // Check if custom API base URL is set
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Check for Codespaces environment
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName !== 'localhost') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  // Default to localhost
  return 'http://localhost:8000/api';
}

/**
 * Fetch data from API endpoint
 * Handles both paginated and array responses
 * 
 * @param {string} endpoint - API endpoint path (e.g., '/users')
 * @returns {Promise<Array>} Array of data items
 */
export async function fetchFromApi(endpoint) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Handle both paginated responses and array responses
    if (Array.isArray(data)) {
      return data;
    }

    // If paginated, extract items
    if (data.items && Array.isArray(data.items)) {
      return data.items;
    }

    // If single object, wrap in array
    if (data && typeof data === 'object') {
      return [data];
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    return [];
  }
}

/**
 * Post data to API endpoint
 * 
 * @param {string} endpoint - API endpoint path (e.g., '/users')
 * @param {Object} data - Data to POST
 * @returns {Promise<Object>} Response data
 */
export async function postToApi(endpoint, data) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${url}:`, error);
    throw error;
  }
}
