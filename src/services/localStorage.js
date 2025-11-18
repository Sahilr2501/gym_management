// LocalStorage helper functions for persisting state

export const saveState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadState = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return fallback;
  }
};

export const clearState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

