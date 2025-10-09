// Environment loader utility - simplified since Vite plugin handles the loading

/**
 * Get a specific environment variable with fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || fallback || '';
}

/**
 * Validate that all required environment variables are present
 */
export function validateRequiredEnvVars(requiredVars: string[]): void {
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Detect if we're running in a CI/CD environment
 */
export function isDeploymentEnvironment(): boolean {
  return !!(
    import.meta.env.VITE_VERCEL ||
    import.meta.env.VITE_CI ||
    import.meta.env.PROD
  );
}

// Export commonly used env vars with deployment-aware loading
export const ENV = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  IS_DEPLOYMENT: isDeploymentEnvironment(),
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),
} as const;
