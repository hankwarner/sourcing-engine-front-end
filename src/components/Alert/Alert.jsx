import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { RefreshContext } from '../../context/refresh.context';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(10),
		},
	},
}));

export const Alert = ({ alertText, alertType = 'info' }) => {
	// Alert types: error, warning, info, success
	// https://material-ui.com/components/snackbars/#simple-snackbars
	const classes = useStyles();
	const { alertOpen, setAlertOpen } = useContext(RefreshContext);

	const handleClose = () => {
		setAlertOpen(false);
	};

	const DemoButton = ({ show }) => {
		const handleClick = () => {
			setAlertOpen(true);
		};
		return show ? (
			<Button variant="outlined" onClick={handleClick}>
				Trigger alert
			</Button>
		) : (
			<div>{/* empty div so alert positions correctly */}</div>
		);
	};

	return (
		<div className={classes.root}>
			{/* Set show to true to display button to manually trigger alert */}
			<DemoButton show={false} />
			<Snackbar
				open={alertOpen}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleClose}
					severity={alertType}
				>
					{alertText}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};
