import React, { useState, useEffect } from 'react'; 
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import axios from 'axios'
import Loading from '../Loading/Loading'

function App() {

  const [orderData, setOrderData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function effectFunction() {
      fetchOrders();
  }, []);


  async function fetchOrders() {
      setIsLoading(true)
      const response =  await axios({
        params: {
          code: 'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='
        },
        method:'get',
        url: 'https://fergusonsourcingengine.azurewebsites.net/api/manual-orders',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });        
      setOrderData(response.data)
      setIsLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <div className="App">
        <Header fetchOrders={fetchOrders} />
        {isLoading ?
        <Loading /> :
        <MainContent orderData={orderData} fetchOrders={fetchOrders} />}
      </div>
      </ThemeProvider>
  ); 
}
export default App;
