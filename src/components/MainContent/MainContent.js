import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import OrderList from '../OrderList/OrderList';
import { Alert } from '../Alert/Alert';

export default function MainContent() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxwidth='sm'>
        <Typography component='div' style={{ height: '100vh' }}>
          <Alert />
          <OrderList />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
