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
  }));

export default function OrderDetails(props) {
    const classes = useStyles();
    const order = props.order

    return (
        <div>
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