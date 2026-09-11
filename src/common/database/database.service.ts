import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult, type PoolClient, type DatabaseError, QueryResultRow } from 'pg';



@Injectable()
export class DatabaseService {


  constructor(@Inject('DB') private pool: Pool) { }


  private readonly logger = new Logger(DatabaseService.name);


  private async query<T extends QueryResultRow>(query: string, params?: unknown[]): Promise<QueryResult<T>> {

    const client = await this.pool.connect();

    try {

      return await client.query<T>(query, params);

    } catch (err) {

      this.logger.error('Database Error:', err);

      throw err;

    } finally {

      client.release();

    }

  }


  private async createTables(): Promise<void> {

    const query = `
    
    CREATE TABLE IF NOT EXITST users (
    

    
    )

    CREATE TABLE IF NOT EXITST files (



    )

    `

  }


}
