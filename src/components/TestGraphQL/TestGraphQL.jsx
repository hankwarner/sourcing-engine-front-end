import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const testQuery = gql`
  query Books {
    books {
      title
      author
    }
  }
`;

export const PRODUCT_SHIPPING_ESTIMATES = gql`
  query ProductShippingEstimatesQuery($items: [Int!]!, $zipCode: String) {
    productShippingEstimates(items: $items, zipCode: $zipCode) {
      id
      totalInStock
      shippingMessage
      preShippingMessage
      isInStock
      cutoffUTC
      inventoryAvailability {
        quantity
        arrives
        arrivalDate
      }
    }
  }
`;

export const TestGraphQL = () => {
  const { data } = useQuery(testQuery);
  return (
    <div>
      Test query from graphql server: <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
