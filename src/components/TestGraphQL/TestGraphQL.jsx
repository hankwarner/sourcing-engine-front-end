import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';

export const testQuery = gql`
	query GetBooks {
		getBooks {
			title
			author
		}
	}
`;

const GET_ORDERS = gql`
	query AllOrdersQuery {
		getOrders {
			atgOrderId
			custAccountId
		}
	}
`;

export const TestGraphQL = () => {
	const { data } = useQuery(GET_ORDERS);
	return (
		<div>
			Test query from graphql server:{' '}
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
