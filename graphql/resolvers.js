const convertShippingCode = (originalCode) => {
	switch (originalCode.toLowerCase()) {
		case 'standard':
			return 'UPS';
		case 'next_day':
			return 'UNN';
		case 'second_day':
			return 'UP2';
		case 'cpu':
			return 'WCL';
		default:
			return originalCode;
	}
};

const getOrders = async (root, args, { dataSources }) => {
	const orders = await dataSources.FergusonSourcingEngineAPI.getOrders();
	return orders.map((order) => {
		return {
			...order,
			shipping: {
				...order.shipping,
				shipViaCode: convertShippingCode(order.shipping.shipViaCode),
			},
		};
	});
};

const checkClaim = async (root, { id }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.checkClaim(id);
};

const claimOrder = async (root, { id }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.claimOrder(id);
};

const releaseOrder = async (root, { id }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.releaseOrder(id);
};

const completeOrder = async (root, { id }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.completeOrder(id);
};

const saveOrderNote = async (root, { id, note }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.saveOrderNote(id, note);
};

module.exports = {
	resolvers: {
		Query: {
			getOrders,
			checkClaim,
		},
		Mutation: {
			claimOrder,
			releaseOrder,
			completeOrder,
			saveOrderNote,
		},
	},
};
