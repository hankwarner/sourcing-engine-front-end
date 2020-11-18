const getOrders = async (root, args, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.getOrders();
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

const unCompleteOrder = async (root, { id }, { dataSources }) => {
	return await dataSources.FergusonSourcingEngineAPI.unCompleteOrder(id);
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
			unCompleteOrder,
			saveOrderNote,
		},
	},
};
