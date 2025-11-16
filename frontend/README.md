# Full-Stack Chat Application - Frontend

This is the frontend component of a full-stack real-time chat application built with React, Vite, and modern web technologies.

## Features Implemented

### Authentication
- User signup with email and password
- User login/logout functionality
- JWT-based authentication
- Protected routes

### Real-time Messaging
- Instant messaging with Socket.IO
- Online/offline user status indicators
- Message history
- Image attachments

### User Management
- User profiles with avatar support
- Theme customization
- User presence detection

### UI/UX Enhancements
- Responsive design for all device sizes
- Dark/light theme support
- Loading states and skeletons
- Toast notifications

## Technical Improvements

### Security
- Input sanitization to prevent XSS attacks
- Email validation and sanitization
- Password length and complexity validation
- File type and size validation

### Performance
- Image compression for faster uploads
- Client-side caching for user data
- Optimized React components with useCallback
- Lazy loading for images
- Debouncing and throttling utilities

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion preferences

### Error Handling
- Comprehensive error handling for API calls
- User-friendly error messages
- Form validation with real-time feedback
- Graceful degradation for failed operations

### Code Quality
- Modular utility functions
- Constants for configuration
- Consistent coding patterns
- TypeScript-ready structure

## Libraries and Dependencies

### Core
- React 18 with hooks
- React Router for navigation
- Zustand for state management
- Axios for HTTP requests
- Socket.IO client for real-time communication

### UI Components
- TailwindCSS for styling
- DaisyUI for pre-built components
- Lucide React for icons
- React Hot Toast for notifications

### Development
- Vite for fast development
- ESLint for code quality
- PostCSS and Autoprefixer

## File Structure

```
src/
├── components/          # Reusable UI components
├── constants/           # Application constants
├── lib/                 # Utility functions
├── pages/               # Page components
├── store/               # Zustand stores
├── App.jsx             # Main application component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Utility Functions

### Sanitization (`lib/sanitization.js`)
- `sanitizeInput()`: Removes HTML tags and escapes special characters
- `validateAndSanitizeEmail()`: Validates and sanitizes email addresses

### Error Handling (`lib/errorHandler.js`)
- `handleApiError()`: Consistent error handling for API calls
- `handleValidationErrors()`: Handles form validation errors

### File Upload (`lib/fileUpload.js`)
- `validateFileType()`: Validates file MIME types
- `validateFileSize()`: Validates file size limits
- `fileToBase64()`: Converts files to base64
- `compressImage()`: Compresses images for better performance

### Presence (`lib/presence.js`)
- `formatUserStatus()`: Formats user online status
- `getUserStatusClass()`: Returns CSS classes for status indicators
- `isRecentlyOnline()`: Checks if user was recently online
- `formatLastSeen()`: Formats last seen timestamps

### Cache (`lib/cache.js`)
- `cacheManager`: Singleton cache manager
- `cacheUser()`: Caches individual user data
- `getCachedUser()`: Retrieves cached user data
- `cacheUsers()`: Caches user list
- `getCachedUsers()`: Retrieves cached user list

### Avatar (`lib/avatar.js`)
- `generateInitials()`: Generates user initials
- `generateAvatarColor()`: Generates consistent avatar colors
- `getAvatarInfo()`: Gets avatar information with fallbacks
- `generateAvatarGradient()`: Generates gradient backgrounds

### Responsive (`lib/responsive.js`)
- `useBreakpoint()`: Hook for detecting screen breakpoints
- `useIsMobile()`: Hook for detecting mobile devices
- `useIsTablet()`: Hook for detecting tablet devices
- `useIsDesktop()`: Hook for detecting desktop devices
- `getResponsiveClasses()`: Gets responsive class names
- `matchesBreakpoint()`: Checks if screen matches breakpoint

### Accessibility (`lib/accessibility.js`)
- `focusFirstElement()`: Focuses first focusable element
- `trapFocus()`: Traps focus within container
- `getUserStatusAriaLabel()`: Generates ARIA labels for user status
- `getMessageAriaLabel()`: Generates ARIA labels for messages
- `getNavigationAriaLabel()`: Generates ARIA labels for navigation
- `isHighContrastMode()`: Checks for high contrast mode
- `prefersReducedMotion()`: Checks for reduced motion preference
- `announceToScreenReader()`: Announces messages to screen readers

### Performance (`lib/performance.js`)
- `debounce()`: Debounces function calls
- `throttle()`: Throttles function calls
- `useDebounce()`: Hook for debouncing
- `useThrottle()`: Hook for throttling
- `useOptimizedCallback()`: Hook for optimized callbacks
- `lazyLoadImage()`: Lazy loads images
- `preloadImages()`: Preloads images

### Keyboard (`lib/keyboard.js`)
- `isKeyCombo()`: Checks keyboard event key combinations
- `isSubmitKey()`: Checks for submit key (Enter)
- `isCancelKey()`: Checks for cancel key (Escape)
- `isFocusSearchKey()`: Checks for search focus key (Ctrl+K or Ctrl+/)
- `preventDefaultForKeys()`: Prevents default for specific keys

### Notifications (`lib/notifications.js`)
- `showSuccess()`: Shows success notifications
- `showError()`: Shows error notifications
- `showInfo()`: Shows info notifications
- `showWarning()`: Shows warning notifications
- `showLoading()`: Shows loading notifications
- `dismissNotification()`: Dismisses specific notification
- `dismissAllNotifications()`: Dismisses all notifications
- `updateNotification()`: Updates existing notification

## Validation Rules

Defined in `constants/validation.js`:

### User Validation
- Full name: 1-50 characters
- Email: Up to 254 characters
- Password: 6-128 characters

### Message Validation
- Text: Up to 1000 characters
- Image: Up to 5MB
- Profile image: Up to 2MB

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Accessibility Features

- Full keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support
- Proper ARIA attributes
- Semantic HTML structure

## Performance Optimizations

- Code splitting
- Image compression
- Client-side caching
- Lazy loading
- Memoization
- Efficient re-renders

## Security Considerations

- Input sanitization
- XSS prevention
- CSRF protection (handled by backend)
- Secure JWT handling
- File upload validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests if applicable
5. Commit your changes
6. Push to the branch
7. Create a pull request

## License

This project is licensed under the MIT License.