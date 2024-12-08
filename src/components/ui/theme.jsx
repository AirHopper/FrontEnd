import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set default theme to 'light'
    useSystemColorMode: false, // Disable system color mode
  },
});

export default theme;