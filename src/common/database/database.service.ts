import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';



@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('DB') private pool: Pool) {}

  private readonly logger = new Logger(DatabaseService.name);

  public async onModuleInit(): Promise<void> {
    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    const devPath = join(
      process.cwd(),
      'src/common/database/migrations/001_init.sql',
    );
    const prodPath = join(__dirname, 'migrations', '001_init.sql');

    const migrationPath = existsSync(prodPath) ? prodPath : devPath;

    try {
      const sql = await fs.readFile(migrationPath, 'utf8');

      await this.query(sql);

      this.logger.log(`Migration executed: ${migrationPath}`);
    } catch (err) {
      this.logger.error('Failed to run migrations.', err);
      throw err;
    }
  }

  private async query<T extends QueryResultRow>(
    query: string,
    params?: unknown[],
  ): Promise<QueryResult<T>> {
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
}
