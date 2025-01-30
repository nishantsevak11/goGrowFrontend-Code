// src/theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2', dark: '#115293' },
    secondary: { main: '#ff4081', dark: '#c60055' },
    background: { default: '#f5f5f5', paper: '#fff' },
    text: { primary: '#333', secondary: '#666' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9', dark: '#5d99c6' },
    secondary: { main: '#f48fb1', dark: '#bf5f82' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#fff', secondary: '#aaa' },
  },
});
