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
              <span>Order Submitted On : <strong>{order.orderSubmitDate}</strong></span>
              <span>Requested Delivery : <strong>{order.orderRequiredDate}</strong></span>
              <span>Ship Via Code : <strong>{order.shipping.shipViaCode}</strong></span> 
              </div>
            </div>
        </div>
    )
}
