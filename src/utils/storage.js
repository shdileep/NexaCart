/**
 * Safe Browser Storage Wrapper
 * Handles quota exceptions and private browsing mode safely.
 */

const memoryStore = new Map();

export const safeStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      memoryStore.set(key, value);
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      memoryStore.delete(key);
    }
  },

  clear: () => {
    try {
      window.localStorage.clear();
    } catch {
      memoryStore.clear();
    }
  },
};
