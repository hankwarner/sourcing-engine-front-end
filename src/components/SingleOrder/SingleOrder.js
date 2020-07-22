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
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
  box:{
    width: 225,
    maxWidth:225,
    overflow:'hidden',
    height: 200,
    color:"#00446b",
    borderRight:"1px solid #00446b",
    marginRight:20,
    paddingRight:20
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
  table: {
    borderBottom:0
  },
  tableDataCont: {
    marginBottom:10
  },
  tableLabel: {
    textTransform:'uppercase',
    fontWeight:700
  }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const order = props.order
  const shipping = props.order.shipping;
  const shipto = shipping.shipTo;
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
              <Box className={classes.box}>
                <h2>Order #<br /> {order.atgOrderId}</h2>
              </Box>
              <TableContainer >
                <Table  aria-label="simple table">
                    <TableBody >
                        <TableRow >
                        <TableCell className={classes.table}>
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer Name:</span><br />{order.customerName}<br />
                          </div>
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer Account ID:</span><br />{order.custAccountId}
                          </div>
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer ID:</span><br />{order.customerId}
                          </div>
                        </TableCell>
                        <TableCell className={classes.table} align="right">
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Submitted:</span><br />{order.orderSubmitDate}
                          </div>
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Req Delivery:</span><br />{order.orderRequiredDate}
                          </div>
                          <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Ship From:</span><br />{order.shipFrom}
                          </div>                     
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
          <Grid container spacing={8}>              
              <Grid item>
              <h4 className={classes.upperCase}>Shipping Address Information</h4>
              <div className={classes.column}>
                <span> {shipto.name}</span>
                <span>{shipto.address1}</span>
                <span>{shipto.address2}</span>
                <span>{shipto.city}, {shipto.state} {shipto.zip}</span>
                <span>({shipto.shipInstructionsPhoneNumberAreaDialing}) {shipto.shipInstructionsPhoneNumberDialNumber}</span>
              </div>
              </Grid>
              <Grid item>
              <h4 className={classes.upperCase}>Billing Address Information</h4>
              <div className={classes.column}>
                <span>Card Type: {payment.cardType}</span>
                <span>{payment.address1}</span>
                <span>{payment.address2}</span>
                <span>{payment.city}, {payment.state} {payment.zip}</span>
              </div>
              </Grid>
        
            </Grid>
          </div>


          <h3 className={classes.upperCase}>Items</h3>

         
          <SourcingTable order={order} />  

        </div>
        </Container>
      </Dialog>
    </div>
  );
}