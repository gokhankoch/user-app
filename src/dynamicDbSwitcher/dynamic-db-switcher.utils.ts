import { REQUEST } from '@nestjs/core';
import { NotFoundException, Scope } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { DataSource } from 'typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { getClientDataSource } from './main-db-connector';

import * as ormconfig from '../../orm.config';

export const DATASOURCE = Symbol('DATASOURCE');

const dataSources: Map<string, DataSource> = new Map();

export async function getConnection(dbName: string): Promise<DataSource> {
  if (!dataSources.has(dbName)) {
    const client = await getClientDataSource(dbName);

    if (!client) {
      throw new NotFoundException({ message: 'Database not found' });
    }

    const dataSource = new DataSource({
      ...ormconfig,
      host: client.host,
      port: client.port,
      username: client.username,
      password: client.password,
      database: client.databaseName,
    } as PostgresConnectionOptions);

    try {
      await dataSource.initialize();
      dataSources.set(dbName, dataSource);
      return dataSource;
    } catch (err) {
      console.error(err);
      throw new NotFoundException({
        message: `Database not found : x-db-name(${dbName})`,
      });
    }
  }

  return dataSources.get(dbName);
}

export const connectionFactory = {
  provide: DATASOURCE,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { dbName } = request;

    if (dbName) {
      return getConnection(dbName);
    }

    return null;
  },
  inject: [REQUEST],
};
