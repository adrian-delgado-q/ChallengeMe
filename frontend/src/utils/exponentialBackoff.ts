/**
 * Exponential backoff utility for API calls
 * Provides retry logic with increasing delays to handle network failures gracefully
 */

export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay in milliseconds (default: 1000) */
  initialDelay?: number;
  /** Maximum delay in milliseconds (default: 10000) */
  maxDelay?: number;
  /** Backoff multiplier (default: 2) */
  backoffMultiplier?: number;
  /** Whether to add random jitter to prevent thundering herd (default: true) */
  useJitter?: boolean;
  /** Function to determine if error should trigger retry (default: always retry) */
  shouldRetry?: (error: Error, attempt: number) => boolean;
  /** Callback for retry attempts */
  onRetry?: (error: Error, attempt: number, delay: number) => void;
}

/**
 * Execute a function with exponential backoff retry logic
 */
export async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    useJitter = true,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Check if we should retry this error
      if (!shouldRetry(lastError, attempt)) {
        break;
      }

      // Calculate delay with exponential backoff
      let delay = Math.min(initialDelay * Math.pow(backoffMultiplier, attempt), maxDelay);

      // Add jitter to prevent thundering herd
      if (useJitter) {
        delay = delay + Math.random() * delay * 0.1;
      }

      // Call retry callback if provided
      if (onRetry) {
        onRetry(lastError, attempt + 1, delay);
      }

      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Unknown error occurred during retry attempts');
}

/**
 * Default retry options for API calls
 */
export const defaultApiRetryOptions: RetryOptions = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  useJitter: true,
  shouldRetry: (error: Error) => {
    // Don't retry on 4xx errors (client errors) except 429 (rate limit) and 408 (timeout)
    if (
      error.message.includes('4') &&
      !error.message.includes('429') &&
      !error.message.includes('408')
    ) {
      return false;
    }
    // Always retry on network errors, 5xx errors, and timeouts
    return true;
  },
  onRetry: (error: Error, attempt: number, delay: number) => {
    console.warn(
      `API call failed (attempt ${attempt}), retrying in ${Math.round(delay)}ms:`,
      error.message
    );
  },
};

/**
 * Wrap store actions with exponential backoff
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: RetryOptions = defaultApiRetryOptions
): T {
  return ((...args: Parameters<T>) => {
    return withExponentialBackoff(() => fn(...args), options);
  }) as T;
}
