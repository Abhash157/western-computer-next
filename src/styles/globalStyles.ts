import { css } from '@emotion/react';

export const globalStyles = css`
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Account for fixed header */
  }

  body {
    /* scroll-behavior: smooth; */ /* Already in html, and body scroll is usually default */
    /* Note: General body styling (font, bg, color) is handled by theme.ts and globals.css */
  }

  /* Scrollbar styles here might be redundant if theme.ts global scrollbar styles are preferred */
  /* Consider consolidating scrollbar styling to one place (either here or in theme.ts) */
  
  /*
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(49, 130, 206, 0.5) transparent;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(49, 130, 206, 0.5);
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(49, 130, 206, 0.8);
  }

  @supports (scrollbar-color: auto) {
    * {
      scrollbar-color: rgba(49, 130, 206, 0.5) transparent;
      scrollbar-width: thin;
    }
  }
  */
`; 