import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ORDERS, RELEASE_ORDER } from '../../queries/queries';
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder';
import SingleOrderModal from '../SingleOrderModal/SingleOrderModal';
import MaterialTable from 'material-table';
import Loading from '../Loading/Loading';
import { OrderContext } from '../../context/order.context';
import { RefreshContext } from '../../context/refresh.context';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => (
		<ArrowDownward {...props} ref={ref} />
	)),
	ThirdStateCheck: forwardRef((props, ref) => (
		<Remove {...props} ref={ref} />
	)),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
};

const useStyles = makeStyles(() => ({
	orderList: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 30,
		marginBottom: 40,
	},
	tableHeaderCell: {
		borderBottom: '2px solid #000',
		paddingTop: 10,
		textAlign: 'center',
	},
}));

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

export default function OrderList(props) {
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

	return (
		<>
			<UnClaimEffect />
			<div style={{ maxWidth: '100%', padding: 10, fontSize: 14 }}>
				<MaterialTable
					openOrders={openOrders}
					icons={tableIcons}
					columns={[
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
							field: 'customerName',
							filtering: false,
							search: false,
						},
						{
							title: 'Cust Acct ID',
							field: 'custAccountId',
							filtering: false,
							search: false,
						},
						{
							title: 'Cust ID',
							field: 'customerId',
							filtering: false,
							search: false,
						},
						{
							title: 'Date',
							field: 'orderSubmitDate',
							filtering: false,
							search: false,
						},
						{
							title: 'Req Del Date',
							field: 'orderRequiredDate',
							filtering: false,
						},
						{
							title: 'Sell Warehouse',
							field: 'sellWhse',
							filtering: false,
							search: false,
						},
						{
							title: 'Sell Logon',
							field: 'sellLogon',
							filtering: false,
							search: false,
						},
					]}
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
						Action: (thisData) => (
              <div>
                <SingleOrder
                  order={thisData.data}
                />
                <SingleOrderModal 
                  order={thisData.data}
                />
              </div>
						),
						Header: () => (
							<thead>
								<tr>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										&nbsp;
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Web Order #
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Customer
										<br />
										Name
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Customer
										<br />
										Account
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Customer ID
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Date
										<br />
										Submitted
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Requested
										<br />
										Delivery
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Sell
										<br />
										Warehouse ID
									</td>
									<td
										className={classes.tableHeaderCell}
										tabIndex="-1"
									>
										Sell
										<br />
										Warehouse Logon
									</td>
								</tr>
							</thead>
						),
					}}
				/>
			</div>
		</>
	);
}
