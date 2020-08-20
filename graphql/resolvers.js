const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const getBooks = () => books;
const getOrders = async (root, args, { dataSources }) => {
  return await dataSources.FergusonSourcingEngineAPI.getOrders();
};

const checkClaim = async (root, { id }, { dataSources }) => {
  return await dataSources.FergusonSourcingEngineAPI.checkClaim(id);
};

const claimOrder = async (root, { id }, { dataSources }) => {
  return await dataSources.FergusonSourcingEngineAPI.claimOrder(id);
}

const releaseOrder = async (root, { id }, { dataSources }) => {
  return await dataSources.FergusonSourcingEngineAPI.releaseOrder(id);
}

const completeOrder = async (root, { id }, { dataSources }) => {
  return await dataSources.FergusonSourcingEngineAPI.completeOrder(id);
}

module.exports = {
  books,
  resolvers: {
    Query: {
      getBooks,
      getOrders,
      checkClaim
    },
    Mutation: {
      claimOrder,
      releaseOrder,
      completeOrder
    }
  },
};
