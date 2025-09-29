import { extendTheme } from '@chakra-ui/react';

// Define a custom theme to match the 'stone' and 'orange' palette with mobile optimizations
const theme = extendTheme({
  colors: {
    stone: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components: {
    Button: {
      sizes: {
        sm: {
          h: { base: '36px', md: '32px' }, // Larger buttons on mobile for better touch targets
          minW: { base: '36px', md: '32px' },
          fontSize: { base: 'sm', md: 'xs' },
          px: { base: 3, md: 2 },
        },
        md: {
          h: { base: '44px', md: '40px' }, // Larger buttons on mobile
          minH: { base: '44px', md: '40px' },
          fontSize: { base: 'md', md: 'sm' },
          px: { base: 4, md: 3 },
        },
        lg: {
          h: { base: '48px', md: '48px' },
          minH: { base: '48px', md: '48px' },
          fontSize: { base: 'lg', md: 'md' },
          px: { base: 6, md: 4 },
        },
      },
    },
    Input: {
      sizes: {
        md: {
          field: {
            h: { base: '44px', md: '40px' }, // Larger inputs on mobile
            fontSize: { base: '16px', md: '14px' }, // Prevent zoom on iOS
          },
        },
      },
    },
    Select: {
      sizes: {
        md: {
          field: {
            h: { base: '44px', md: '40px' }, // Larger selects on mobile
            fontSize: { base: '16px', md: '14px' }, // Prevent zoom on iOS
          },
        },
        sm: {
          field: {
            h: { base: '36px', md: '32px' },
            fontSize: { base: '14px', md: '12px' },
          },
        },
      },
    },
    Textarea: {
      sizes: {
        md: {
          minH: { base: '100px', md: '80px' }, // Larger textarea on mobile
          fontSize: { base: '16px', md: '14px' }, // Prevent zoom on iOS
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          mx: { base: 4, md: 'auto' }, // Add margin on mobile to prevent edge-to-edge
          my: { base: 4, md: 'auto' },
          maxW: { base: 'calc(100vw - 32px)', md: 'md' }, // Prevent modal from being too wide on mobile
        },
      },
    },
    Drawer: {
      sizes: {
        sm: { dialog: { maxW: { base: '280px', md: '320px' } } },
        md: { dialog: { maxW: { base: '320px', md: '400px' } } },
        lg: { dialog: { maxW: { base: '360px', md: '500px' } } },
      },
    },
  },
  space: {
    'mobile-safe': '16px', // Safe area for mobile content
  },
  styles: {
    global: {
      // Ensure proper touch scrolling on mobile
      html: {
        scrollBehavior: 'smooth',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      },
      body: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        // Prevent zoom on double tap on mobile
        touchAction: 'manipulation',
      },
      // Make clickable elements more accessible on mobile
      'button, [role="button"], input[type="button"], input[type="submit"]': {
        minHeight: { base: '44px', md: 'auto' },
        minWidth: { base: '44px', md: 'auto' },
      },
    },
  },
});

export default theme;
