import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';



@Injectable()
export class RedisService {


  constructor(@Inject("REDIS") private readonly redis: Redis ) { }



  public async test(d: string) {

    await this.redis.set("test", d);

    return await this.redis.get("test");

  }

}
