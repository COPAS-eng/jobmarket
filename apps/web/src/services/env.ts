export interface Env {
  VITE_API_URL: string;
  VITE_STRIPE_PUBLISHABLE_KEY: string;
  VITE_APP_NAME: string;
}

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;
  
  const env = import.meta.env;
  
  cachedEnv = {
    VITE_API_URL: env.VITE_API_URL || 'http://localhost:3001/api',
    VITE_STRIPE_PUBLISHABLE_KEY: env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    VITE_APP_NAME: env.VITE_APP_NAME || 'JobMarket',
  };
  
  return cachedEnv;
}