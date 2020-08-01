import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import OrderList from '../OrderList/OrderList';

export default function MainContent(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxwidth="sm">
        <Typography component="div" style={{ height: '100vh' }}>
            <OrderList orderData={props.orderData} fetchOrders={props.fetchOrders} />
        </Typography>
      </Container>
    </React.Fragment>
  );
}