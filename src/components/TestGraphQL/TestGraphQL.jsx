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

export const TestGraphQL = () => {
  const { data } = useQuery(testQuery);
  return (
    <div>
      Test query from graphql server: <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
