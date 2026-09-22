import { Redis } from "ioredis";


export const REDIS = "REDIS";


export const RedisProvider = {
  provide: REDIS,

  useFactory() {
    return new Redis(process.env.REDIS_URL!);
  },
};