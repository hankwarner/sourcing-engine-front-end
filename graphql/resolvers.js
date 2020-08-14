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

module.exports = {
  books,
  resolvers: {
    Query: {
      getBooks,
      getOrders,
    },
  },
};
