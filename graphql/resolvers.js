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

module.exports = {
  books,
  resolvers: {
    Query: {
      getBooks,
      getOrders,
      checkClaim,
    },
  },
};
