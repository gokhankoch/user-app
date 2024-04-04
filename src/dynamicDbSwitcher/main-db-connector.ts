import { DataSource } from 'typeorm';
import * as ormconfig from '../../orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Client } from './client.entity';

// Initialize the master DataSource
const masterDataSource = new DataSource({
  ...(ormconfig as PostgresConnectionOptions),
  entities: [Client],
});

masterDataSource
  .initialize()
  .then(() => {
    console.log('Connected to the master database.');
  })
  .catch((error) =>
    console.error('Error connecting to the master database:', error),
  );

// Function to dynamically connect to a client's database
export async function getClientDataSource(clientName: string): Promise<Client> {
  const clientRepository = masterDataSource.getRepository(Client);

  return clientRepository.findOneBy({ name: clientName });
}
