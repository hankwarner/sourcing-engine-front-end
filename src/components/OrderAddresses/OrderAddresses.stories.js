import React from 'react';
import OrderAddresses from './OrderAddresses';

const phone = '(315)729-5356';
const address = {
	name: 'John Doe',
	address1: '123 Main St',
	address2: 'Suite 100',
	city: 'Atlanta',
	state: 'GA',
	zip: '30303',
};
const { state, ...addressWithoutState } = address;

// This default export determines where you story goes in the story list
export default {
	title: 'OrderAddresses',
	component: OrderAddresses,
};

const Template = (args) => (
	<OrderAddresses shipTo={{ ...args.address }} phone={args.phone} />
);

export const defaultComponent = Template.bind({});
defaultComponent.args = { address, phone };

export const withoutState = Template.bind({});
withoutState.args = { address: addressWithoutState, phone };

export const withoutPhoneNumber = Template.bind({});
withoutPhoneNumber.args = { address, phone: null };

export const withoutAnyAddressParts = (args) => {
	return (
		<div>
			<OrderAddresses shipTo={{ ...args.address }} phone={args.phone} />
			<span role="img" aria-label="info" style={{ paddingRight: '1em' }}>
				ℹ️
			</span>
			<em>
				If all address parts are missing, this section will not be
				displayed at all
			</em>
		</div>
	);
};
withoutAnyAddressParts.args = {
	address: {
		name: null,
		address1: null,
		address2: null,
		city: null,
		state: null,
		zip: null,
	},
	phone: null,
};
