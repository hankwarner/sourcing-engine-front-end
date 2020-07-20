import React from 'react'
import MockOrders from '../../MockOrders'
import SingleOrder from '../SingleOrder/SingleOrder'

export default function OrderList() {
    return (
        <div>
            {MockOrders.map(order => (
                <div>
                    <SingleOrder order={order} />
                </div>
            ))}
        </div>
    )
}
