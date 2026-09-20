import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const DB = 'DB';

export const DatabaseProvider: Provider = {

  provide: DB,

  useFactory: () => {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  },

};