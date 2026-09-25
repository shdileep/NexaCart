/**
 * Structured Client-side Logger for NexaCart
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const currentLevel = import.meta.env?.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;

const formatPrefix = (level) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] [NexaCart]`;
};

export const logger = {
  debug: (...args) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.debug(formatPrefix('DEBUG'), ...args);
    }
  },
  info: (...args) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info(formatPrefix('INFO'), ...args);
    }
  },
  warn: (...args) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(formatPrefix('WARN'), ...args);
    }
  },
  error: (...args) => {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(formatPrefix('ERROR'), ...args);
    }
  },
};
