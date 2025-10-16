import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { schema } from './schema';
import { createContext } from './context';
import { redisCache } from './cache/redis';
import { register } from './metrics/prometheus';
import { metricsMiddleware } from './metrics/middleware';
import { metricsPlugin } from './metrics/graphqlPlugin';
import loadEnvironmentVariables from '../utils/envLoader';

loadEnvironmentVariables();

const httpPort: number = parseInt(process.env.GRAPHQL_HTTP_PORT || '4001', 10);
const httpHost: string = (process.env.GRAPHQL_HTTP_HOST || 'localhost').replace(/^https?:\/\//, '');
const httpEndpoint: string = `http://${httpHost}:${httpPort}/graphql`;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	schema,
	cache: redisCache,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		// Cache control plugin with default maxAge - this is KEY!
		ApolloServerPluginCacheControl({
			defaultMaxAge: 300, // 5 minutes default for all operations
			calculateHttpHeaders: true,
		}),
		// Response cache plugin - this will now work because cache control hints are set
		responseCachePlugin({
			sessionId: async () => null, // No session-based caching
		}),
		metricsPlugin,
	],
	introspection: process.env.NODE_ENV !== 'production',
	formatError: err => {
		console.error('GraphQL Error:', err);
		return err;
	},
});

async function startServer() {
	await server.start();

	// Add metrics middleware to all routes
	app.use(metricsMiddleware);

	// Metrics endpoint for Prometheus
	app.get('/metrics', async (req, res) => {
		try {
			res.set('Content-Type', register.contentType);
			res.end(await register.metrics());
		} catch (error) {
			res.status(500).end(error);
		}
	});

	// Health check endpoint
	app.get('/health', (req, res) => {
		res.json({ status: 'ok', timestamp: new Date().toISOString() });
	});

	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(server, {
			context: createContext,
		})
	);

	await new Promise<void>(resolve => httpServer.listen({ port: httpPort, host: httpHost }, resolve));
	console.log(`🚀 Server ready at ${httpEndpoint}`);
	console.log(`📊 Metrics available at http://${httpHost}:${httpPort}/metrics`);
	console.log(`❤️  Health check at http://${httpHost}:${httpPort}/health`);
}

startServer();
