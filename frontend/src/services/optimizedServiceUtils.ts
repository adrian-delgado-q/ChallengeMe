/**
 * Optimized Service utilities with selective retry logic
 *
 * This module provides lightweight wrappers that only add retry logic
 * for operations that actually need it, improving performance.
 */

import { withExponentialBackoff, type RetryOptions } from '../utils/exponentialBackoff';

/**
 * Lightweight retry options for critical operations only
 */
export const criticalOperationRetryOptions: RetryOptions = {
  maxRetries: 2,
  initialDelay: 300,
  maxDelay: 2000,
  backoffMultiplier: 1.5,
  useJitter: false, // No jitter for performance
  shouldRetry: (error: Error) => {
    const errorMessage = error.message.toLowerCase();

    // Only retry on network/server errors, not client errors
    return (
      errorMessage.includes('network') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('500') ||
      errorMessage.includes('502') ||
      errorMessage.includes('503') ||
      errorMessage.includes('504')
    );
  },
};

/**
 * Selective retry wrapper - only adds retry for critical operations
 */
export function withSelectiveRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  operationType: 'critical' | 'standard' = 'standard'
): T {
  if (operationType === 'standard') {
    // Return original function without retry overhead for standard operations
    return fn;
  }

  // Only add retry for critical operations
  return ((...args: Parameters<T>) => {
    return withExponentialBackoff(() => fn(...args), criticalOperationRetryOptions);
  }) as T;
}

/**
 * Mark operations that should have retry logic
 */
export const CriticalOperations = {
  // Auth operations
  signIn: true,
  signUp: true,
  resetPassword: true,
  updatePassword: true,

  // Data mutations (create/update/delete)
  createChallenge: true,
  updateChallenge: true,
  deleteChallenge: true,
  createTeam: true,
  updateTeam: true,
  deleteTeam: true,
  createActivity: true,
  updateActivity: true,
  deleteActivity: true,

  // Read operations generally don't need retry (they're fast and less critical)
  getChallenge: false,
  getTeam: false,
  getActivity: false,
  listChallenges: false,
  listTeams: false,
  listActivities: false,
} as const;

/**
 * Simple service wrapper that applies retry only to marked critical operations
 */
export function createOptimizedService<T extends Record<string, (...args: any[]) => Promise<any>>>(
  service: T,
  serviceName: string
): T {
  const optimizedService = {} as T;

  Object.keys(service).forEach(methodName => {
    const method = service[methodName];
    if (typeof method === 'function') {
      // Check if this operation is marked as critical
      const isCritical = (CriticalOperations as any)[methodName] === true;

      if (isCritical) {
        // Add retry logic with logging
        (optimizedService as any)[methodName] = withSelectiveRetry((...args: any[]) => {
          try {
            return method(...args);
          } catch (error) {
            console.warn(`${serviceName}.${methodName} failed:`, error);
            throw error;
          }
        }, 'critical');
      } else {
        // Use original method without retry overhead
        (optimizedService as any)[methodName] = method;
      }
    } else {
      (optimizedService as any)[methodName] = method;
    }
  });

  return optimizedService;
}

/**
 * Performance monitoring wrapper (optional, can be disabled in production)
 */
export function withPerformanceMonitoring<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  operationName: string,
  enabled: boolean = process.env.NODE_ENV === 'development'
): T {
  if (!enabled) {
    return fn;
  }

  return ((...args: Parameters<T>) => {
    const startTime = performance.now();
    const result = fn(...args);

    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - startTime;
        if (duration > 1000) {
          // Only log slow operations
          console.warn(`Slow operation detected: ${operationName} took ${duration.toFixed(2)}ms`);
        }
      });
    }

    return result;
  }) as T;
}

export default {
  withSelectiveRetry,
  createOptimizedService,
  withPerformanceMonitoring,
  criticalOperationRetryOptions,
  CriticalOperations,
};
