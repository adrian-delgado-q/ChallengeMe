import { Request, Response, NextFunction } from 'express';
import { httpRequestsTotal, activeConnections } from './prometheus';

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
	const startTime = Date.now();

	// Increment active connections
	activeConnections.inc({ type: 'http' });

	// Track the response
	res.on('finish', () => {
		const duration = Date.now() - startTime;

		// Record HTTP request metrics
		httpRequestsTotal.inc({
			method: req.method,
			route: req.route?.path || req.path,
			status_code: res.statusCode.toString(),
		});

		// Decrement active connections
		activeConnections.dec({ type: 'http' });
	});

	next();
}
