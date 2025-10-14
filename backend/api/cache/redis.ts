import { Redis } from 'ioredis';
import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { cacheHitsTotal, cacheMissesTotal } from '../metrics/prometheus';

export class RedisCache implements KeyValueCache {
  private redis: Redis;

  constructor(redisUrl?: string) {
    this.redis = new Redis(redisUrl || process.env.REDIS_URL || 'redis://localhost:6379');
    
    this.redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
    });

    this.redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    this.redis.on('ready', () => {
      console.log('🎯 Redis ready for operations');
    });

    console.log('🏗️  RedisCache instance created');
  }

  async get(key: string): Promise<string | undefined> {
    try {
      console.log(`🔍 Redis GET: ${key}`);
      const value = await this.redis.get(key);
      if (value) {
        console.log(`✅ Redis HIT: ${key}`);
        cacheHitsTotal.inc({ cache_type: 'redis' });
        return value;
      } else {
        console.log(`❌ Redis MISS: ${key}`);
        cacheMissesTotal.inc({ cache_type: 'redis' });
        return undefined;
      }
    } catch (error) {
      console.error('❌ Redis get error:', error);
      cacheMissesTotal.inc({ cache_type: 'redis' });
      return undefined;
    }
  }

  async set(key: string, value: string, options?: { ttl?: number }): Promise<void> {
    try {
      console.log(`💾 Redis SET called: ${key} (TTL: ${options?.ttl || 'none'})`);
      console.log(`📦 Value length: ${value?.length || 0} characters`);
      if (options?.ttl) {
        await this.redis.setex(key, options.ttl, value);
      } else {
        await this.redis.set(key, value);
      }
      console.log(`✅ Redis SET successful: ${key}`);
    } catch (error) {
      console.error('❌ Redis set error:', error);
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushall();
    } catch (error) {
      console.error('Redis clear error:', error);
    }
  }

  async disconnect(): Promise<void> {
    await this.redis.disconnect();
  }

  // Custom methods for cache invalidation
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Redis invalidatePattern error:', error);
    }
  }

  getRedisClient(): Redis {
    return this.redis;
  }
}

export const redisCache = new RedisCache();
