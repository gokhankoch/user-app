import { DataSource } from 'typeorm';
import { Client } from '../src/dynamicDbSwitcher/client.entity';

import * as ormconfig from '../orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// Initialize the master DataSource
const masterDataSource = new DataSource({
  ...(ormconfig as PostgresConnectionOptions),
  entities: [Client],
});

// Function to add a new client to the master database
async function addClient(clientDatas) {
  try {
    await masterDataSource.initialize();
    const clientRepository = masterDataSource.getRepository(Client);

    // clientDatas.forEach(async (clientData) => {

    for (let k = 0; k < clientDatas.length; k++) {
      const clientData = clientDatas[k];
      const client = new Client();
      client.name = clientData.name;
      client.databaseName = clientData.databaseName;
      client.host = clientData.host;
      client.port = clientData.port;
      client.username = clientData.username;
      client.password = clientData.password;

      const isExist = await clientRepository.findOneBy({
        name: clientData.name,
      });

      if (!isExist) {
        await clientRepository.save(client);
        console.log(`${clientData.name} added successfully.`);
        await masterDataSource.query(
          `CREATE DATABASE "${clientData.databaseName}"`,
        );
      } else {
        console.log(`${clientData.name} already exist.`);
      }
    }
    // });
  } catch (error) {
    console.error('Error adding new client:', error);
  } finally {
    await masterDataSource.destroy();
  }
}
const clientData1 = {
  name: 'client1',
  databaseName: 'client1_db',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
};

// Example client data
const clientData2 = {
  name: 'client2',
  databaseName: 'client2_db',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
};

// Add the new client
addClient([clientData1, clientData2]);
