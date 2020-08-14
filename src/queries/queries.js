import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query AllOrdersQuery {
    getOrders {
      atgOrderId
      custAccountId
    }
  }
`;

// export const CHECK_CLAIM_STATUS = gql`
//     query CheckClaimStatusQuery {

//     }
// `;

// export const CLAIM_TICKET = gql`
//     query ClaimTicketQuery {

//     }
// `;

// export const RELEASE_TICKET = gql`
//     query ReleaseTicketQuery {

//     }
// `;
