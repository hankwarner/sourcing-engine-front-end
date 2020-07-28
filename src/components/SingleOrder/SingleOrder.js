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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
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
  textField: {
    padding: 0,
    border: 0,
    color: "#fff",
    fontSize: "40px",
    fontWeight: 700,
    background: "transparent"
  }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [completeReady, setCompleteReady] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([])
  const order = props.order

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SingleOrderTrigger order={props.order} handleClickOpen={handleClickOpen} />

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
         
          <OrderDetails order={props.order} />
          <OrderAddresses shipTo={props.order.shipping.shipTo} payment={props.order.paymentOnAccount.payment} />
          <SourcingTable 
            order={props.order}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setCompleteReady={setCompleteReady} />
          <CompleteOrderButton handleClose={handleClose} completeReady={completeReady} />
        </div>
        </Container>
      </Dialog>
    </div>
  );
}