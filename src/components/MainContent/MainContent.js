import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import OrderList from '../OrderList/OrderList';

export default function MainContent() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxwidth="lg">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <OrderList />
        </Typography>
      </Container>
    </React.Fragment>
  );
}