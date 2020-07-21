import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    leftColumn: {
        display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
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
                <span>Expedited: <b>NEED</b></span>
                <span>Number of Sources: {order.numsources}</span>
              </div>
              <div className={classes.leftColumn}>
                <span>Sub Total: ${order.subtotal}</span>
                <span>Tax: ${order.tax}</span>
                <span>Shipping: ${order.shipping}</span>
                <span>Total: ${order.total}</span>
              </div>
            </div>
        </div>
    )
}
