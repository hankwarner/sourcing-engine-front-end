import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

import SourcingTable from '../SourcingTable/SourcingTable'
import OrderDetails from '../OrderDetails/OrderDetails';
import CompleteOrderButton from '../CompleteOrderButton/CompleteOrderButton'
import OrderAddresses from '../OrderAddresses/OrderAddresses';
import SingleOrderTrigger from '../SingleOrderTrigger/SingleOrderTrigger'

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
<<<<<<< HEAD
  box:{
    width: 225,
    maxWidth:225,
    overflow:'hidden',
    height: 170,
    color:"#00446b",
    borderRight:"1px solid #00446b",
    marginRight:20,
    paddingRight:20
  },
=======
>>>>>>> 311b2f34732027a19822fcc64e6d3c712ac6a98c
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  marginForDetailBody: {
    marginTop: "84px"
  },
<<<<<<< HEAD
  table: {
    borderBottom:0,
    verticalAlign:'top'
  },
  tableDataCont: {
    marginBottom:10
  },
  tableLabel: {
    textTransform:'uppercase',
    fontWeight:700
  },
  textField: {
    padding: 0,
    border: 0,
    color: "#fff",
    fontSize: "40px",
    fontWeight: 700,
    background: "transparent"
  }

=======
>>>>>>> 311b2f34732027a19822fcc64e6d3c712ac6a98c
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const order = props.order

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
<<<<<<< HEAD
      <Button className={classes.triggerStyle} variant="outlined" color="primary" onClick={handleClickOpen}>
              <Box className={classes.box}>
                <h2><strong>Order #<br /> {order.atgOrderId}</strong></h2>
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
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                </TableContainer>

          
      </Button>

=======
      <SingleOrderTrigger order={props.order} handleClickOpen={handleClickOpen} />
>>>>>>> 311b2f34732027a19822fcc64e6d3c712ac6a98c

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>           
            <Typography className={classes.title}>
              <input type="text" className={classes.textField} value={order.atgOrderId} readOnly="true" />              
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
          <OrderAddresses shipTo={props.order.shipping.shipTo} payment={props.order.paymentOnAccount.payment} />
          <SourcingTable order={order} />
          <CompleteOrderButton />
        </div>
        </Container>
      </Dialog>
    </div>
  );
}