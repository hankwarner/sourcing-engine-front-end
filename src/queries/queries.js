import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query AllOrdersQuery {
    getOrders {
      atgOrderId
      custAccountId
      customerId
      customerName
      orderSubmitDate
      orderRequiredDate
      sellWhse
      sourcingMessage
      shipFrom
      claimed
      orderComplete
      paymentOnAccount {
        payment {
          cardType
          address1
          address2
          city
          state
          zip
        }
      }
      shipping {
        shipViaCode
        price 
        shipTo {
          name
          address1
          address2
          city
          country
          state
          zip
          shipInstructionsPhoneNumberAreaDialing
          shipInstructionsPhoneNumberDialNumber
        }
      }
      sourcing { 
        shipFrom
        sourceComplete
        items {
          lineItemId
          unitPriceCode
          description
          quantity
          sourcingMessage
          masterProdId
          itemComplete
        }
      }     
      sourceSystem
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
