import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MockOrders from '../../MockOrders';

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
    alignItems: 'start',
    margin: 10
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  row: {
    display: 'flex'
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
          <span>Total Order Value: {order.total}</span>
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
        <div className={classes.column}>
          <h1>Order # {order.ordernum}</h1>
          <span>Customer # <b>NEED</b></span>

          <h3>Order Details</h3>
          <span>Expedited: <b>NEED</b></span>
          <span>Number of Sources: {order.numsources}</span>


          <h3>Order Addresses</h3>
          <div className={classes.row}>
            {order.addresses.map(addresses => (
              <div className={classes.column}>
                <span>{addresses.addressType} Address</span>
                <span>{addresses.fname} {addresses.lname}</span>
                <span>{addresses.street1}</span>
                <span>{addresses.street2}</span>
                <span>{addresses.city}, {addresses.state} {addresses.postalcode}</span>
              </div>
            ))}
          </div>


          <h3>Sourcing</h3>
          <span>Source from ID <b>NEED</b></span>
          <span>Source From: <b>NEED</b></span>
        </div>
      </Dialog>
    </div>
  );
}