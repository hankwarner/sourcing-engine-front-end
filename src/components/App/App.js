import React from 'react';
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'



function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <div className="App">
        <Header />
        <MainContent />
      </div>
      </ThemeProvider>
  );
}

export default App;
