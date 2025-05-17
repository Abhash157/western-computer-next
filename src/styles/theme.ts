import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Type ThemeComponents is available in newer versions if needed for deep component styling,
// but for this v2 theme structure, it might not be directly used in this file's top level.

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// Interface ThemeProps was used for props.colorMode in global styles within the theme.
// It can be defined as { colorMode: 'light' | 'dark' } if needed by functions.
// For extendTheme structure, props are often inferred or passed by Chakra internally.

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: (props: { colorMode: 'light' | 'dark' }) => ({ // Added props typing for variants if they use it
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        }),
        outline: (props: { colorMode: 'light' | 'dark' }) => ({
          border: '2px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({ // Added props typing
        container: {
          borderRadius: 'xl',
          boxShadow: 'xl',
          transition: 'all 0.3s ease-in-out',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '2xl',
          },
        },
      }),
    },
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        // Note: Next.js body styles are in globals.css and layout.tsx.
        // These might override or conflict. We should ensure they are harmonized.
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },
      '::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
      },
    }),
  },
});

export default theme; 