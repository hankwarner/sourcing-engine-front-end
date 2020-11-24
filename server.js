require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');
const FergusonSourcingEngineAPI = require('./graphql/apis')
	.FergusonSourcingEngineAPI;

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
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		FergusonSourcingEngineAPI: new FergusonSourcingEngineAPI(),
	}),
	introspection: true,
	playground: true,
});
server.applyMiddleware({ app });

// Start express server
// If you change the port number, also change the port for 'proxy' in package.json
// The proxy setting in package.json only takes effect for the React app when it is running
// in development mode (localhost:3000)
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`🚀 Graphql running at http://localhost:${port}/graphql`);
	console.log(
		`🚀 App running at ${
			process.env.WEBSITE_HOSTNAME || 'http://localhost:3000'
		}`
	);
});
