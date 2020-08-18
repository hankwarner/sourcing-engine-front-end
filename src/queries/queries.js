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
          sourcingGuide
          vendor
        }
      }     
      sourceSystem
      sellLogon
    }
  }
`;

export const CHECK_CLAIM = gql`
  query CheckClaimStatus {
    checkClaim {
      claimed
    }
  }
`

// export const CLAIM_ORDER = gql`
//     mutation ClaimTicketQuery($input: atgOrderId!) {
//       claimOrder(atgOrderId: String!)
//     }
// `;

// export const RELEASE_TICKET = gql`
//     query ReleaseTicketQuery {

//     }
// `;
