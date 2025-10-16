import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';

// Enable default metrics collection
collectDefaultMetrics();

// GraphQL Resolver Duration Histogram
export const graphqlResolverDuration = new Histogram({
	name: 'graphql_resolver_execution_time_seconds',
	help: 'Duration of GraphQL resolver execution in seconds',
	labelNames: ['resolver_name', 'field_name', 'status'],
	buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

// HTTP Request Counter
export const httpRequestsTotal = new Counter({
	name: 'http_requests_total',
	help: 'Total number of HTTP requests',
	labelNames: ['method', 'route', 'status_code'],
});

// Cache Performance Counters (for Redis response caching)
export const cacheHitsTotal = new Counter({
	name: 'cache_hits_total',
	help: 'Total number of cache hits',
	labelNames: ['cache_type'],
});

export const cacheMissesTotal = new Counter({
	name: 'cache_misses_total',
	help: 'Total number of cache misses',
	labelNames: ['cache_type'],
});

// Database Query Metrics
export const databaseQueriesTotal = new Counter({
	name: 'database_queries_total',
	help: 'Total number of database queries',
	labelNames: ['operation', 'model'],
});

export const databaseQueryDuration = new Histogram({
	name: 'database_query_duration_seconds',
	help: 'Duration of database queries in seconds',
	labelNames: ['operation', 'model'],
	buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2],
});

// Active Connections Gauge
export const activeConnections = new Gauge({
	name: 'active_connections_total',
	help: 'Number of active connections',
	labelNames: ['type'],
});

// Redis Connection Status
export const redisConnectionStatus = new Gauge({
	name: 'redis_connection_status',
	help: 'Redis connection status (1 = connected, 0 = disconnected)',
});

// GraphQL Request Rate
export const graphqlRequestsTotal = new Counter({
	name: 'graphql_requests_total',
	help: 'Total number of GraphQL requests',
	labelNames: ['operation_type', 'operation_name', 'status'],
});

// Memory Usage
export const memoryUsage = new Gauge({
	name: 'nodejs_memory_usage_bytes',
	help: 'Node.js memory usage in bytes',
	labelNames: ['type'],
	collect() {
		const memUsage = process.memoryUsage();
		this.set({ type: 'rss' }, memUsage.rss);
		this.set({ type: 'heapTotal' }, memUsage.heapTotal);
		this.set({ type: 'heapUsed' }, memUsage.heapUsed);
		this.set({ type: 'external' }, memUsage.external);
	},
});

// Export the registry
export { register };
