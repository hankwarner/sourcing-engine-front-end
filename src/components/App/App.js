import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { GET_ORDERS } from '../../queries/queries';

function App(props) {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const response = await axios({
      params: {
        code: 'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw==',
      },
      method: 'get',
      url: 'https://fergusonsourcingengine.azurewebsites.net/api/manual-orders',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    // TODO: Replace Axios call with this graphql call
    const response2 = await props.client.query({
      query: GET_ORDERS,
    });
    console.log(JSON.stringify(response2.data.getOrders, null, 2));

    setOrderData(response.data);
    setIsLoading(false);
  }, [props.client]);

  useEffect(
    function effectFunction() {
      fetchOrders();
    },
    [fetchOrders]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <Header fetchOrders={fetchOrders} />
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <MainContent orderData={orderData} fetchOrders={fetchOrders} />
        )}
      </div>
    </ThemeProvider>
  );
}
export default App;
