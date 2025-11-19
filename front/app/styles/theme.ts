// app/theme.ts
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#E0F7F1',
      100: '#B3EBDB',
      200: '#80DFC5',
      300: '#4DD1AF',
      400: '#26C6A1',
      500: '#1ABC9C', // principal
      600: '#16A085', // hover
      700: '#12876F',
      800: '#0E5F4D',
      900: '#092F26',
    },
    button: {
      50: '#DCEEFB',
      100: '#B6E0FE',
      200: '#84C5F4',
      300: '#62B0E8',
      400: '#4098D7',
      500: '#3498DB', // principal
      600: '#2980B9', // hover
      700: '#1F618D',
      800: '#1A4F7D',
      900: '#153D6B',
    },
  },
});
