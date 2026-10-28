import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseOptions } from './options.js';

export default new DataSource(databaseOptions);