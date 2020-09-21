import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
	addressContainer: {
		marginBottom: 20,
	},
	upperCase: {
		textTransform: 'uppercase',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	row: {
		display: 'flex',
	},
}));

export default function OrderAddresses({ shipTo }) {
	const classes = useStyles();
	const {
		name,
		address1,
		address2,
		city,
		state,
		zip,
		shipInstructionsPhoneNumberAreaDialing,
		shipInstructionsPhoneNumberDialNumber,
	} = shipTo;
	const showAddressSection =
		name ||
		address1 ||
		address2 ||
		city ||
		state ||
		zip ||
		shipInstructionsPhoneNumberAreaDialing ||
		shipInstructionsPhoneNumberDialNumber;

	return (
		showAddressSection && (
			<div className={classes.addressContainer}>
				<div className={classes.row}>
					<Grid container spacing={8}>
						<Grid item>
							<h4 className={classes.upperCase}>
								Shipping Address Information
							</h4>
							<div className={classes.column}>
								<span> {name}</span>
								<span>{address1}</span>
								<span>{address2}</span>
								<span>
									{city}
									{state ? `, ${state} ` : ` `}
									{zip}
								</span>
								<span>
									{shipInstructionsPhoneNumberAreaDialing &&
										`(${shipInstructionsPhoneNumberAreaDialing}) `}
									{shipInstructionsPhoneNumberDialNumber}
								</span>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		)
	);
}
