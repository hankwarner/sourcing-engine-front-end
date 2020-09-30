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
					phone
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
				}
			}
			sourcing {
				shipFrom
				sourceComplete
				shipFromLogon
				items {
					lineItemId
					unitPrice
					unitPriceCode
					extendedPrice
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
			notes
		}
	}
`;

export const CHECK_CLAIM = gql`
	query CheckClaimStatus($id: String) {
		checkClaim(id: $id) {
			claimed
		}
	}
`;

export const CLAIM_ORDER = gql`
	mutation ClaimOrderMutation($id: String) {
		claimOrder(id: $id)
	}
`;

export const RELEASE_ORDER = gql`
	mutation ReleaseOrderMutation($id: String) {
		releaseOrder(id: $id)
	}
`;

export const COMPLETE_ORDER = gql`
	mutation CompleteOrderMutation($id: String) {
		completeOrder(id: $id)
	}
`;

export const SAVE_NOTE = gql`
	mutation SaveOrderNote($id: String, $note: String) {
		saveOrderNote(id: $id, note: $note)
	}
`;
