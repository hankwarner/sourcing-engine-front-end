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
import MockOrders from '../../MockOrders';
import OrderList from '../OrderList/OrderList';
import SourcingTable from '../SourcingTable/SourcingTable'
import OrderDetails from '../OrderDetails/OrderDetails';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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
    margin: 10
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
  marginTop :{
    marginTop:20
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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
      <Button className={classes.triggerStyle} variant="outlined" color="primary" onClick={handleClickOpen}>
          <div className={classes.column}>
            <span>
              <strong>Order # {order.ordernum}</strong>
            </span>
            <span> 
              Number of Sources: {order.numsources}
            </span>
          </div>
          <span>Expedited: <b>NEED</b></span>
          <span>Total Order Value: ${order.total}</span>
      </Button>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>           
            <Typography variant="h6" className={classes.title}>
            Order # {order.ordernum}
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              X
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container fixed className={classes.marginTop}>
        <div className={classes.column}>
          <span>Customer # <b>NEED</b></span>

            <OrderDetails order={order} />

           

          <h3 className={classes.upperCase}>Order Addresses</h3>
          
          <div className={classes.row}>
          <Grid container spacing={8}>
            {order.addresses.map(addresses => (
              <Grid item>
              <h4 className={classes.upperCase}>{addresses.addressType} Address</h4>
              <div className={classes.column}>
                <span>{addresses.fname} {addresses.lname}</span>
                <span>{addresses.street1}</span>
                <span>{addresses.street2}</span>
                <span>{addresses.city}, {addresses.state} {addresses.postalcode}</span>
              </div>
              </Grid>
            ))}
            </Grid>
          </div>


          <h3 className={classes.upperCase}>Sourcing</h3>

         
          {order.sourcing.map(sourcing =>( 
            <div>                
                <div>
                  <span>Source from ID <b>{sourcing.sourceId}</b></span><br />
                  <span>Source From: <b>{sourcing.name}</b></span>
                </div>
                <div>
                  {sourcing.items.map(item => (
                    <div>
                        <span>Item ID: {item.itemId}</span><br />
                        <span>Qty: {item.qty}</span><br />
                        <span>Each Price: {item.eachprice}</span>
                    </div>
                  ))}
                </div>
             </div>
          ))}          
        </div>
        </Container>
      </Dialog>
    </div>
  );
}