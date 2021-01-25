import { Pool, PoolClient, ConnectionConfig } from "pg";

const CONFIG: PoolClient={
  user : 'postgres',
  host : 'localhost',
  database : 'caquetasig2',
  password : 'root',
  port : 5432
}

export const dbconnection = {
  provide: 'dbconnection',
  useFactory: async (): Promise<ConnectionConfig> => {
    return await new Pool(CONFIG);
  },
};