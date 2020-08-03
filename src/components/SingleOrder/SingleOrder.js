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
import CancelOrderButton from '../CancelOrderButton/CancelOrderButton'

import CssBaseline from '@material-ui/core/CssBaseline';

import axios from 'axios'


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
    position:'relative'
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
  },
  orderDialog: {
    marginBottom:40
  },
  buttonContainer: {
     position:'relative',
     width:'100%'
  },
  rightButtons: {
    position:'absolute',
    width:280,
    right:0,
    marginBottom:60
  },
  button: {
    margin:'0px!important'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [completeReady, setCompleteReady] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([])
  const order = props.order
  const orderNumber = order.atgOrderId;
  
  const handleClickOpen = () => {
    async function handleClaim() {
      await axios({
        params: {
          code: 'hmYQxSz505g1dPCNFtaBPhhjeMFQRNxlYAh91owaJGVDcbnpQ4b4hw=='
        },
        method:'post',
        url: `https://fergusonsourcingengine.azurewebsites.net/api/order/claim/${order.atgOrderId}`
      });        
    }
    handleClaim();

    setOpen(true);
    const title = "Order # " + orderNumber;
    const url = orderNumber;
    window.history.pushState('',title,url);
  };

  const checkForClaim = () => {
    async function checkClaim() {
      const response = await axios({
        params: {
          code: 'akU/NdJzya8EPdFGYD/NJtJ/VJRYDgGGI/nco5ujNyDdcrCHQAhWWg=='
        },
        method:'get',
        url: `https://fergusonsourcingengine.azurewebsites.net/api/order/is-claimed/${order.atgOrderId}`
      });        
      response.data ? props.fetchOrders() : handleClickOpen()
    }
    checkClaim();
  }

  window.addEventListener('popstate', function(e) {
    e.preventDefault();
      handleClose();
  });
  
  const handleClose = () => {
    async function handleRelease() {
      await axios({
        params: {
          code: 'O94pZJNzX07aaGJaAfLayaSPl96XF9qRaAajP41Az5wiofHFD4C7zw=='
        },
        method:'post',
        url: `https://fergusonsourcingengine.azurewebsites.net/api/order/release/${order.atgOrderId}`
      });        
    }
    handleRelease().then(() => props.fetchOrders());

    setOpen(false);
    window.history.pushState('','List','/');
  };
  
  
  return (
    <div >     

      <SingleOrderTrigger order={props.order} handleClickOpen={checkForClaim} />

      <Dialog className={classes.orderDialog} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>       
          <CssBaseline />
          <Container maxwidth="lg"> 

              <Typography className={classes.title}>
                <input type="text" className={classes.textField} value={order.atgOrderId} readOnly="true" /> 
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                x cancel
              </IconButton>  
            
              </Typography>   

              
            </Container>
            
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
            setCompleteReady={setCompleteReady} 
            setShowError={setShowError} />
            <div className={classes.buttonContainer}>  
              <div>          
                {/* <CancelOrderButton  handleClose={handleClose} /> */}
              </div>
              <div  className={classes.rightButtons} >
                <CompleteOrderButton handleClose={handleClose} completeReady={completeReady} showError={showError} setShowError={setShowError} id={props.order.atgOrderId} />
              </div>
            </div>

        </div>
        </Container>
      </Dialog>
    </div>
  );
}