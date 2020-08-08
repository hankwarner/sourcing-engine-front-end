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

  const oauth = require('axios-oauth-client');
  const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://login.microsoftonline.com/709d83f1-791a-41c2-9419-e01e392dd57b/oauth2/v2.0/token',
    grant_type: 'client_credentials',
    client_id: '3672d596-f05d-4458-82ae-ca6048aab8c5',
    client_secret: 'BNbnlL6y43c-39.MWe4_ChPP39llhh9d_b',
    scope: 'https://fergusonsourcingengine.azurewebsites.net/.default'
  });
 
const auth =  getClientCredentials();
console.log(auth.token);

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
