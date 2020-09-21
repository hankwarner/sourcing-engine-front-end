import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ORDERS, RELEASE_ORDER } from '../../queries/queries';
import { makeStyles } from '@material-ui/core/styles';
import SingleOrderModal from '../SingleOrderModal/SingleOrderModal';
import MaterialTable from 'material-table';
import Loading from '../Loading/Loading';
import { OrderContext } from '../../context/order.context';
import { RefreshContext } from '../../context/refresh.context';

import { forwardRef } from 'react';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
};

const useStyles = makeStyles(() => ({
	tableHeaderCell: {
		borderBottom: '2px solid #000',
		paddingTop: 10,
		textAlign: 'center',
	},
}));

const columnConfig = [
	{
		displayTitle: '&nbsp;',
	},
	{
		title: 'Web Order #',
		field: 'atgOrderId',
		filtering: false,
		cellStyle: {
			color: '#1c88c7',
			fontWeight: '700',
		},
	},
	{
		title: 'Customer Name',
		displayTitle: 'Customer<br />Name',
		field: 'customerName',
		filtering: false,
		search: false,
	},
	{
		title: 'Cust Acct ID',
		displayTitle: 'Logon',
		field: 'custAccountId',
		filtering: false,
		search: false,
	},
	{
		title: 'Cust ID',
		displayTitle: 'Customer ID',
		field: 'customerId',
		filtering: false,
		search: false,
	},
	{
		title: 'Date',
		displayTitle: 'Date<br />Submitted',
		field: 'orderSubmitDate',
		filtering: false,
		search: false,
	},
	{
		title: 'Req Del Date',
		displayTitle: 'Requested<br />Delivery',
		field: 'orderRequiredDate',
		filtering: false,
	},
	{
		title: 'Sell Warehouse',
		displayTitle: 'Sell<br />Warehouse ID',
		field: 'sellWhse',
		filtering: false,
		search: false,
	},
	{
		title: 'Ship Via Code',
		dipslayTitle: 'Ship<br />Via Code',
		field: 'shipping.shipViaCode',
		filtering: false,
		search: false,
	},
];

const UnClaimEffect = () => {
	// This has to be its own component so changes in context don't trigger a re-render of the OrderList
	const { currentClaimedOrder } = useContext(OrderContext);
	const [releaseOrder] = useMutation(RELEASE_ORDER);

	useEffect(() => {
		const sleep = (milliseconds) => {
			const date = Date.now();
			let currentDate = null;
			do {
				currentDate = Date.now();
			} while (currentDate - date < milliseconds);
		};
		const releaseOrderOnUnload = () => {
			releaseOrder({ variables: { id: currentClaimedOrder } });
			// We have to add a forced pause here to give time for the graphql call to succeed.
			// The beforeunload event does not wait for asynchronous calls to finish
			sleep(500);
		};
		window.addEventListener('beforeunload', releaseOrderOnUnload);
		return () => {
			window.removeEventListener('beforeunload', releaseOrderOnUnload);
		};
	}, [currentClaimedOrder, releaseOrder]);

	return null;
};

export default function OrderList() {
	const classes = useStyles();

	const { data, loading, refetch } = useQuery(GET_ORDERS);

	const { reloadTrigger } = useContext(RefreshContext);
	const [fakeLoading, setFakeLoading] = useState(false);
	useEffect(() => {
		refetch();

		// Doing this bit with the fakeLoading because refetch doesn't
		// seem to update loading and we want to see the loading spinner
		// for a bit to indicate that the order list is being updated
		setFakeLoading(true);
		const timer = setTimeout(() => setFakeLoading(false), 500);
		// Making sure to cleanup timer on unload. Probably don't need to
		// for this use case, but it's safer
		return () => clearTimeout(timer);
	}, [reloadTrigger, refetch, setFakeLoading]);

	if (loading || fakeLoading) {
		return <Loading />;
	}
	const openOrders = data.getOrders;

	const header = () => (
		<thead>
			<tr>
				{columnConfig.map((column, idx) => (
					<td
						key={idx}
						className={classes.tableHeaderCell}
						tabIndex="-1"
						dangerouslySetInnerHTML={
							column.displayTitle
								? {
										__html: column.displayTitle,
								  }
								: null
						}
					>
						{!column.displayTitle ? column.title : null}
					</td>
				))}
			</tr>
		</thead>
	);

	const openOrderButton = (thisData) => (
		<SingleOrderModal order={thisData.data} />
	);

	return (
		<>
			<UnClaimEffect />
			<div style={{ maxWidth: '100%', padding: 10, fontSize: 14 }}>
				<MaterialTable
					icons={tableIcons}
					columns={columnConfig.slice(1)}
					localization={{
						header: {
							actions: '',
						},
						pagination: {},
					}}
					style={{ padding: 10 }}
					options={{
						sorting: false,
						headerStyle: {
							borderBottom: '1px solid black',
							fontWeight: '700',
						},
						pageSize: 12,
						pageSizeOptions: [12, 24, 48],
						showTitle: false,
						cellStyle: {
							textAlign: 'center',
						},
						showDetail: false,
					}}
					// actions was done like this to get around a console error
					// https://github.com/mbrn/material-table/issues/657
					actions={[() => ({})]}
					data={openOrders}
					title="Sourcing Data"
					components={{
						Header: header,
						Action: openOrderButton,
					}}
				/>
			</div>
		</>
	);
}
