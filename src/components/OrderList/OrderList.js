import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder'



const useStyles = makeStyles(() => ({
    orderList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        marginBottom:40
    }
}));




export default function OrderList(props) {

    const classes = useStyles();

    const openOrders = props.orderData.filter(order => order.claimed === false && order.orderComplete === false)

    return (
        <div className={classes.orderList}>
            {openOrders.map(order => (
                <div>
                    <SingleOrder order={order} />
                </div>
            ))}            
        </div>
    )
}
