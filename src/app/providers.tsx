'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import React from 'react';
import theme from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import MainLayout from '../layouts/MainLayout';
import SmoothScroll from '../components/SmoothScroll';
import ScrollToTop from '../components/ScrollToTop';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Global styles={globalStyles} />
          <SmoothScroll>
            <ScrollToTop />
            <MainLayout>{children}</MainLayout>
          </SmoothScroll>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}