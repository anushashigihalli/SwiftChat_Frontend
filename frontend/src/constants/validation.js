export const VALIDATION_RULES = {
  // User validation
  USER: {
    FULL_NAME: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 50,
    },
    EMAIL: {
      MAX_LENGTH: 254,
    },
    PASSWORD: {
      MIN_LENGTH: 6,
      MAX_LENGTH: 128,
    },
  },
  
  // Message validation
  MESSAGE: {
    TEXT: {
      MAX_LENGTH: 1000,
    },
    IMAGE: {
      MAX_SIZE: 5 * 1024 * 1024, // 5MB
      PROFILE_MAX_SIZE: 2 * 1024 * 1024, // 2MB for profile pictures
    },
  },
};