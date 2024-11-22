import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Space Grotesk, Arial, sans-serif',
    h1: {
      fontFamily: 'Robson, sans-serif',
    },
  },
});

export default theme;