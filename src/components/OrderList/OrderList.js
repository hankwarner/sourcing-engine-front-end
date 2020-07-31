import React from 'react'
import MockOrders from '../../MockOrders'
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




export default function OrderList() {

    const classes = useStyles();

    const openOrders = MockOrders.filter(order => order.claimed === false)

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
