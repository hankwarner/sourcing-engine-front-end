import React, { useState, useEffect } from 'react'; 
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import axios from 'axios'

function App() {

  const [orderData, setOrderData] = useState({}); 

  useEffect(function effectFunction() {
    async function fetchOrders() {
        const response =  await axios({
          params: {
            code: 'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='
          },
          method:'get',
          url: 'https://fergusonsourcingengine.azurewebsites.net/api/manual-orders',
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });        
        setOrderData(response.data)  
    }
    fetchOrders();
    console.log(orderData)
}, []);
 
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
