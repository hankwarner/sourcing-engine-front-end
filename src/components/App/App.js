import React, { useState, useEffect } from 'react'; 
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

import axios from 'axios'

function App() {

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    getOrdersFromAPI();
  }, []);

  const getOrdersFromAPI = async () => {
    const response = await axios.get("https://fergusonsourcingengine.azurewebsites.net/api/manual-orders?code=mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw==");
    setOrderData(response.data)
  };
  
  console.log(orderData);

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
