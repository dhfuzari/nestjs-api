import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_DB_HOST,
  port: Number(process.env.TYPEORM_DB_PORT),
  username: process.env.TYPEORM_DB_USERNAME,
  password: process.env.TYPEORM_DB_PASSWORD,
  database: process.env.TYPEORM_DB_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;
