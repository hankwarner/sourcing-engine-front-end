import React from 'react';
import OrderAddresses from './OrderAddresses';

const mockData = {
	name: 'John Doe',
	address1: '123 Main St',
	address2: 'Suite 100',
	city: 'Atlanta',
	state: 'GA',
	zip: '30303',
	phone: '(315)7295356',

};
const { state, ...mockDataWithoutState } = mockData;
const {
	phone: phone2,
	...mockDataWithoutPhoneNumber
} = mockData;

// This default export determines where you story goes in the story list
export default {
	title: 'OrderAddresses',
	component: OrderAddresses,
};

const Template = (args) => <OrderAddresses shipTo={{ ...args }} />;

export const defaultComponent = Template.bind({});
defaultComponent.args = { ...mockData };

export const withoutState = Template.bind({});
withoutState.args = { ...mockDataWithoutState };

export const withoutPhoneNumber = Template.bind({});
withoutPhoneNumber.args = { ...mockDataWithoutPhoneNumber };

export const withoutAnyAddressParts = (args) => {
	return (
		<div>
			<OrderAddresses shipTo={{ ...args }} />
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
	name: '',
	address1: '',
	address2: '',
	city: '',
	state: '',
	zip: '',
	phone: ''
};
