// Format seconds to human-readable hours
export const formatHours = (seconds) => {
  if (!seconds || seconds === 0) return '0h';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}m`;
};

// Format date to locale string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate percentage with bounds
export const calculatePercentage = (used, total) => {
  if (!total || total === 0) return 0;
  return Math.min(Math.round((used / total) * 100), 100);
};

// Get status color based on percentage
export const getStatusColor = (percentage) => {
  if (percentage >= 90) return '#e74c3c'; // Red
  if (percentage >= 75) return '#f39c12'; // Orange
  if (percentage >= 50) return '#3498db'; // Blue
  return '#27ae60'; // Green
};

// Group items by company
export const groupItemsByCompany = (items) => {
  return items.reduce((acc, item) => {
    const companyId = item.companyId;
    if (!acc[companyId]) {
      acc[companyId] = {
        companyId,
        companyName: item.companyName,
        items: []
      };
    }
    acc[companyId].items.push(item);
    return acc;
  }, {});
};

// Sort items by type and title
export const sortItems = (items) => {
  return [...items].sort((a, b) => {
    // Sort projects before agreements
    if (a.type !== b.type) {
      return a.type === 'project' ? -1 : 1;
    }
    // Then sort alphabetically by title
    return a.title.localeCompare(b.title);
  });
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// API key validation
export const isValidApiKey = (apiKey) => {
  return apiKey && apiKey.trim().length > 0;
};

// Error message formatter
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.response?.data?.message) return error.response.data.message;
  return 'An unexpected error occurred';
};