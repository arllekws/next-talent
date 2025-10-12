// Esse pertence a app/layout.tsx
import { ChakraProviderWrapper } from '@/components/Layouts/ChakraProviderWrapper';
import { AuthProvider } from '@/context/AuthContext';
import {theme} from '@/styles/theme';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ChakraProviderWrapper>
            {children}
          </ChakraProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}