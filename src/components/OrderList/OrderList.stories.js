import React from 'react';
import OrderList from './OrderList';
import { mockResponseData } from './OrderList.mock-data.js';
import { MockedProvider } from '@apollo/react-testing';
import { GET_ORDERS } from './../../queries/queries';

export default {
	title: 'OrderList',
	component: OrderList,
};

const Template = (args) => {
	// TODO:
	// Mocks are duplicated becuase of the refetch in the useEffect on OrderList
	// Might want to look and see if we have to do a refetch on the first page
	// load. I'm thinking not but something in the dependencies of useEffect is
	// triggering it. Might be able to bypass the refetch on first load by
	// checking to see if component is mounted or ready yet.
	const mocks = [
		{
			request: {
				query: GET_ORDERS,
			},
			result: args,
		},
		{
			request: {
				query: GET_ORDERS,
			},
			result: args,
		},
	];
	return (
		<MockedProvider mocks={mocks} addTypename={false}>
			<OrderList />
		</MockedProvider>
	);
};

export const defaultComponent = Template.bind({});
defaultComponent.args = mockResponseData;
