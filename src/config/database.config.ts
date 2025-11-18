import { registerAs } from '@nestjs/config';

export const DatabaseConfigName = 'database';

export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  maxConnections: number;
  minConnections: number;
  ssl?: boolean;
}

export default registerAs(DatabaseConfigName, () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  logging: process.env.DB_LOGGING === 'true' || false,
  maxConnections: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
  minConnections: parseInt(process.env.DB_MIN_POOL_SIZE || '2'),
  ssl: process.env.DB_SSL === 'true' || false,
}));