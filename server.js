const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');

// Setup express server to serve files in production generated from `npm run build`
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// GraphQL setup
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'graphql', 'schema.graphql'),
  'utf8'
);
const { resolvers } = require('./graphql/resolvers');
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Start express server
const port = 4000; // if you change this, also change the port for 'proxy' in package.json
app.listen(port, () => {
  console.log(`🚀 Graphql running at http://localhost:${port}/graphql`);
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development');
  }
});
