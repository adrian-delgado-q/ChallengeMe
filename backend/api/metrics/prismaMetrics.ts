import { PrismaClient } from '../../prisma/prisma-client';
import { databaseQueriesTotal, databaseQueryDuration } from './prometheus';

export function addPrismaMetrics(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    const startTime = Date.now();
    
    try {
      const result = await next(params);
      const duration = (Date.now() - startTime) / 1000; // Convert to seconds
      
      // Track successful database queries
      databaseQueriesTotal.inc({
        operation: params.action,
        model: params.model || 'unknown',
      });
      
      databaseQueryDuration
        .labels({
          operation: params.action,
          model: params.model || 'unknown',
        })
        .observe(duration);
      
      return result;
    } catch (error) {
      const duration = (Date.now() - startTime) / 1000;
      
      // Track failed database queries
      databaseQueriesTotal.inc({
        operation: `${params.action}_error`,
        model: params.model || 'unknown',
      });
      
      databaseQueryDuration
        .labels({
          operation: `${params.action}_error`,
          model: params.model || 'unknown',
        })
        .observe(duration);
      
      throw error;
    }
  });
}
