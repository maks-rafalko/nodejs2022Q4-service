import { DataSource } from 'typeorm';
import { config } from './db.config';
import 'dotenv/config';

export default new DataSource(config);
