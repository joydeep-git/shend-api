import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const DATABASE_POOL = 'DB';

export const DatabaseProvider: Provider = {

  provide: DATABASE_POOL,

  useFactory: () => {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  },

};