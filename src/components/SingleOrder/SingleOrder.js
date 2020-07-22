import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OrderList from '../OrderList/OrderList';
import SourcingTable from '../SourcingTable/SourcingTable'
import OrderDetails from '../OrderDetails/OrderDetails';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  triggerStyle: {
    width: 800,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 10,
    textTransform:"none"
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  row: {
    display: 'flex'
  },
  upperCase : {
    textTransform:'uppercase'
  },
  italics : {
    fontStyle: 'italics'
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  address: {
    width: "200px"
  },
  marginForDetailBody: {
    marginTop: "84px"
  },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const order = props.order
  const shipping = props.order.shipping;
  const payment = props.order.paymentOnAccount.payment;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.triggerStyle} variant="outlined" color="primary" onClick={handleClickOpen}>

              <h2>Order #<br /> {order.atgOrderId}</h2>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                        <TableCell>
                            Customer Name:<br /><strong>{order.customerName}</strong><br />
                            Customer Account ID:<br /><strong>{order.custAccountId}</strong><br />
                            Customer ID:<br /><b>{order.customerId}</b>  
                        </TableCell>                        
                        <TableCell align="right">
                            Submitted:<br /><strong>{order.orderSubmitDate}</strong><br />
                            Req Delivery:<br /><strong>{order.orderRequiredDate}</strong><br />
                            Ship From:<br /><strong>{order.shipFrom}</strong>                        
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                </TableContainer>

          
      </Button>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>           
            <Typography variant="h6" className={classes.title}>
            Order # {order.atgOrderId}
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              X
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container fixed className={classes.marginForDetailBody}>
        <div className={classes.column}>
          <span>Customer # <b>{order.customerId}</b></span>

            <OrderDetails order={order} />

           

          <h3 className={classes.upperCase}>Order Addresses</h3>
          
          <div className={classes.row}>
          {/* <Grid container spacing={8}>              
              <Grid item>
              <h4 className={classes.upperCase}>Shipping Address Information</h4>
              <div className={classes.column}>
                <span> {addresses.lname}</span>
                <span>{addresses.street1}</span>
                <span>{addresses.street2}</span>
                <span>{addresses.city}, {addresses.state} {addresses.postalcode}</span>
              </div>
              </Grid>
              <Grid item>
              <h4 className={classes.upperCase}>Billing Address Information</h4>
              <div className={classes.column}>
                <span>{addresses.fname} {addresses.lname}</span>
                <span>{addresses.street1}</span>
                <span>{addresses.street2}</span>
                <span>{addresses.city}, {addresses.state} {addresses.postalcode}</span>
              </div>
              </Grid>
        
            </Grid> */}
          </div>


          <h3 className={classes.upperCase}>Items</h3>

         
          <SourcingTable order={order} />  

        </div>
        </Container>
      </Dialog>
    </div>
  );
}