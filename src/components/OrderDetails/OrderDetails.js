import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	pageExposition: {
		border: '3px solid #F0E68C',
		backgroundColor: '#C0C0C0',
		color: '#00446b',
		padding: '10px',
		fontWeight: '700',
	},
}));

export default function OrderDetails(props) {
	const classes = useStyles();
	const order = props.order;

	return (
		<div>
			<h3>Order Details</h3>
			<div className={classes.row}>
				<div className={classes.column}>
					<span>
						<strong>Customer #</strong>&nbsp;{order.customerId}
					</span>
					<span>
						<strong>Order Submitted On:</strong>&nbsp;
						{order.orderSubmitDate}
					</span>
					<span>
						<strong>Sell Warehouse ID:</strong>&nbsp;
						{order.sellWhse}
					</span>
					<span>
						<strong>Sell Warehouse Logon:</strong>&nbsp;
						{order.sellLogon}
					</span>
					<span>
						<strong>Requested Delivery:</strong>&nbsp;
						{order.orderRequiredDate}
					</span>
					<span>
						<strong>Ship Via Code:</strong>&nbsp;
						{order.shipping.shipVia}
					</span>
				</div>
			</div>
		</div>
	);
}
