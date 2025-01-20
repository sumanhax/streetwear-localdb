
import './App.css';
import './Fonts/fonts.css';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';

import Routing from './Routing/Routing';

function App() {
  return (
    <div>
  
      <ThemeProvider theme={theme}>
    <Routing/>
     </ThemeProvider>
     
    </div>
  );
}

export default App;
