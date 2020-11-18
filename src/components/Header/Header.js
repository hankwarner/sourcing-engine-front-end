import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FergLogo from '../../img/ferguson-logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { RefreshContext } from '../../context/refresh.context';
import { isTest } from '../../helpers';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logoImage: {
		width: 250,
	},
	navbar: {
		paddingTop: 10,
		fontWeight: 700,
	},
	refreshLink: {
		cursor: 'pointer',
		right: 0,
		display: 'block',
		padding: '5px 10px',
		backgroundColor: '#fff',
		width: '100%',
		color: '#00446b',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 700,
		'&:hover': {
			backgroundColor: '#222223',
			color: '#fff',
		},
	},
	table: {
		borderBottom: 0,
		color: '#fff',
	},
	buttonRight: {
		borderBottom: 0,
		color: '#fff',
		textAlign: 'right',
		width: 170,
	},
	version: {
		display: 'none',
	},
}));

const headerDetail = isTest
	? ` Sourcing App TEST branch: ${
			process.env.REACT_APP_BRANCH_NAME
	  } commit: ${process.env.REACT_APP_LAST_COMMIT.substring(0, 7)}`
	: ` Sourcing App v. ${process.env.REACT_APP_VERSION}`;

export default function Header() {
	const classes = useStyles();
	const { setReloadTrigger } = useContext(RefreshContext);

	return (
		<div className={classes.root}>
			<AppBar className={classes.navbar} position="static">
				<Toolbar variant="dense">
					<CssBaseline />
					<Container maxwidth="lg">
						<TableContainer className={classes.table}>
							<Table aria-label="simple table">
								<TableBody>
									<TableRow>
										<TableCell className={classes.table}>
											<img
												className={classes.logoImage}
												src={FergLogo}
												alt="Ferguson Logo"
											/>
											{headerDetail}
										</TableCell>
										<TableCell
											className={classes.buttonRight}
											align="right"
										>
											<span
												className={classes.refreshLink}
												onClick={() =>
													setReloadTrigger()
												}
											>
												Refresh List
											</span>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
}
