import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
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
              Order # {order.ordernum}
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
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              X
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              LOGO
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.mainContent}>
          <div width="650">
            <h1>Order # {order.ordernum}</h1>
            <span>Customer # <b>NEED</b></span>

            <OrderDetails order={order} />

            <h3>Order Addresses</h3>
            <div className={classes.row}>
              {order.addresses.map(addresses => (
                <div className={`${classes.column} ${classes.address}`}>
                  <span>{addresses.addressType} Address</span>
                  <span>{addresses.fname} {addresses.lname}</span>
                  <span>{addresses.street1}</span>
                  <span>{addresses.street2}</span>
                  <span>{addresses.city}, {addresses.state} {addresses.postalcode}</span>
                </div>
              ))}
            </div>

            <SourcingTable sources={order.sourcing} />   

            <div className={classes.button}>
              <Button variant="contained">Complete Order</Button>
            </div>
            
          </div>
        </div>
      </Dialog>
    </div>
  );
}