// app/components/Layouts/ChakraProviderWrapper.tsx
// app/components/Layouts/ChakraProviderWrapper.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '@/styles/theme';

interface Props {
  children: ReactNode;
}

export const ChakraProviderWrapper = ({ children }: Props) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};
