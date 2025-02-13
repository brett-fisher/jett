import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { ConnectionManager } from './models/ConnectionManager.js';
import { DB } from './models/database.js';

async function createDbClient(): Promise<Kysely<DB>> {
    const { SQL_DB_NAME, SQL_HOSTNAME, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = process.env;

    if (
        !SQL_DB_NAME ||
        !SQL_HOSTNAME ||
        !SQL_USERNAME ||
        !SQL_PASSWORD ||
        !SQL_PORT
    ) {
        throw new Error('Missing SQL environment variables');
    }

    const {
        dbname = SQL_DB_NAME,
        hostname = SQL_HOSTNAME,
        username = SQL_USERNAME,
        password = SQL_PASSWORD,
        port = parseInt(SQL_PORT),
    } = {
        dbname: SQL_DB_NAME,
        hostname: SQL_HOSTNAME,
        username: SQL_USERNAME,
        password: SQL_PASSWORD,
        port: parseInt(SQL_PORT),
    };

    const dialect = new PostgresDialect({
        pool: new Pool({
            database: dbname,
            host: hostname,
            user: username,
            port: port,
            max: 10,
        }),
    });

    return new Kysely<DB>({
        dialect,
    });
}

export class SupabaseConnectionManager
    implements ConnectionManager<Kysely<DB>>
{
    private static instance: Kysely<DB> | null = null;

    async getInstance(): Promise<Kysely<DB>> {
        if (!SupabaseConnectionManager.instance) {
            SupabaseConnectionManager.instance = await createDbClient();
        }

        return SupabaseConnectionManager.instance;
    }
}
