import React, { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { OrderContext } from '../../context/order.context';
import { RefreshContext } from '../../context/refresh.context';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import SourcingTable from '../SourcingTable/SourcingTable';
import OrderDetails from '../OrderDetails/OrderDetails';
import CompleteOrderButton from '../CompleteOrderButton/CompleteOrderButton';
import OrderAddresses from '../OrderAddresses/OrderAddresses';
import SingleOrderTrigger from '../SingleOrderTrigger/SingleOrderTrigger';
import CancelOrderButton from '../CancelOrderButton/CancelOrderButton';
import OrderNotes from '../OrderNotes/OrderNotes';

import {
	CHECK_CLAIM,
	CLAIM_ORDER,
	RELEASE_ORDER,
	GET_ORDERS,
} from '../../queries/queries';

const useStyles = makeStyles((theme) => ({
	box: {
		width: 225,
		maxWidth: 225,
		overflow: 'hidden',
		height: 170,
		color: '#00446b',
		borderRight: '1px solid #00446b',
		marginRight: 20,
		paddingRight: 20,
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
		position: 'relative',
	},
	newTitle: {
		flex: 1,
		position: 'relative',
		padding: '2px 0px',
		fontWeight: 700,
		color: '#00446b',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	orderNotesRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	marginForDetailBody: {
		height: '85vh',
		overflow: 'hidden',
		overflowY: 'scroll',
	},
	textField: {
		padding: 0,
		border: 0,
		color: '#00446b',
		fontSize: '40px',
		fontWeight: 700,
		background: 'transparent',
		paddingTop: 10,
	},
	orderDialog: {
		marginBottom: 40,
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '800px',
		marginBottom: '40px',
	},
	errorMessage: {
		display: 'flex',
		justifyContent: 'flex-end',
		color: '#FF0000',
		fontSize: '14px',
		marginBottom: '5px',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #000',
		boxShadow: theme.shadows[5],
	},
}));

export default function SingleOrderModal(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [completeReady, setCompleteReady] = React.useState(false);
	const [showError, setShowError] = React.useState(false);
	const [selectedItems, setSelectedItems] = React.useState([]);
	const { setCurrentClaimedOrder } = useContext(OrderContext);
	const { setReloadTrigger, setAlertOpen } = useContext(RefreshContext);
	const order = props.order;
	const orderNumber = order.atgOrderId;

	const client = useApolloClient();
	const queryVariable = { variables: { id: orderNumber } };
	const refetchQueries = [{ query: GET_ORDERS }];

	const [claimOrder] = useMutation(CLAIM_ORDER);
	const [releaseOrder] = useMutation(RELEASE_ORDER, {
		refetchQueries,
		awaitRefetchQueries: true,
	});

	const handleClickOpen = () => {
		claimOrder(queryVariable);
		setOpen(true);
		setCurrentClaimedOrder(orderNumber);
		// Pushing to history makes it so the back button won't take them out of the app
		const title = 'Order # ' + orderNumber;
		window.history.pushState('', title, '/');
	};

	const checkForClaim = () => {
		client
			.query({
				query: CHECK_CLAIM,
				variables: queryVariable.variables,
				fetchPolicy: 'network-only',
			})
			.then((data) => {
				if (!data.data.checkClaim.claimed) {
					handleClickOpen();
				} else {
					setAlertOpen(true);
					setReloadTrigger();
				}
			});
	};

	window.addEventListener('popstate', function (e) {
		e.preventDefault();
		handleClose();
	});

	const handleClose = () => {
		releaseOrder(queryVariable);
		setOpen(false);
		window.history.pushState('', 'List', '/');
	};

	return (
		<div>
			<SingleOrderTrigger
				order={props.order}
				handleClickOpen={checkForClaim}
			/>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Container
							fixed
							className={classes.marginForDetailBody}
						>
							<Toolbar className={classes.newTitle}>
								<CssBaseline />
								<Container
									maxwidth="lg"
									className={classes.newTitle}
								>
									<Typography>
										<input
											type="text"
											className={classes.textField}
											value={order.atgOrderId}
											readOnly={true}
										/>
									</Typography>
								</Container>
							</Toolbar>
							<div className={classes.column}>
								<div className={classes.orderNotesRow}>
									<div className={classes.column}>
										<OrderDetails order={props.order} />
										<OrderAddresses
											shipTo={props.order.shipping.shipTo}
											phone={
												props.order.paymentOnAccount
													.payment.phone
											}
										/>
									</div>
									<OrderNotes
										orderNotes={props.order.notes}
										id={props.order.atgOrderId}
									/>
								</div>
								<SourcingTable
									order={props.order}
									selectedItems={selectedItems}
									setSelectedItems={setSelectedItems}
									setCompleteReady={setCompleteReady}
									setShowError={setShowError}
								/>
								{showError ? (
									<span className={classes.errorMessage}>
										You must complete each source before
										completing
									</span>
								) : null}
								<div className={classes.buttonContainer}>
									<div>
										<CancelOrderButton
											handleClose={handleClose}
										/>
									</div>
									<div>
										<CompleteOrderButton
											handleClose={handleClose}
											completeReady={completeReady}
											showError={showError}
											setShowError={setShowError}
											id={props.order.atgOrderId}
										/>
									</div>
								</div>
							</div>
						</Container>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
