import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    pageExposition: {
        border:'1px solid #F0E68C',
        backgroundColor:'#C0C0C0',
        color:'#F0E68C',
        padding:'10px'
    }
    
  }));

export default function OrderDetails(props) {
    const classes = useStyles();
    const order = props.order

    return (
        <div>
          <div className={classes.pageExposition}>
                Please do not hit refresh button or the back button while on this page.
            </div>
            <h3>Order Details</h3>
            <div className={classes.row}>
              <div className={classes.column}>
              <span><strong>Customer #</strong> {order.customerId}</span>
              <span><strong>Order Submitted On:</strong> {order.orderSubmitDate}</span>
              <span><strong>Requested Delivery:</strong>{order.orderRequiredDate}</span>
              <span><strong>Ship Via Code:</strong>{order.shipping.shipViaCode}</span> 
              </div>
            </div>
        </div>
    )
}
