import { SnakeNamingStrategy } from './snake-naming.strategy';

import { join } from 'path';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'main',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true,
  entities: [join(__dirname, './src/**/**/*.entity{.ts,.js}')],
};

const test = {
  collection: {
    info: {
      _postman_id: '69584a41-0072-4e84-b3d1-110f865374ed',
      name: 'User-App',
      schema:
        'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      updatedAt: '2024-04-03T20:20:43.000Z',
      uid: '13309462-69584a41-0072-4e84-b3d1-110f865374ed',
      createdAt: null,
      lastUpdatedBy: null,
    },
    item: [
      {
        name: 'Auth',
        item: [
          {
            name: 'Sing Up',
            id: 'a95f0802-1a61-453a-8e64-d205e5ac9cf1',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: 'POST',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "password": "password",\n    "username":"admin@test.com"\n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/auth/signup',
                host: ['{{base_url}}'],
                path: ['v1', 'auth', 'signup'],
              },
            },
            response: [],
            uid: '13309462-a95f0802-1a61-453a-8e64-d205e5ac9cf1',
          },
          {
            name: 'Sing In',
            event: [
              {
                listen: 'test',
                script: {
                  id: '1cae4db2-09b9-48d9-953b-d583b6819803',
                  exec: [
                    'pm.environment.set("jwt", pm.response.json().access_token);',
                  ],
                  type: 'text/javascript',
                },
              },
            ],
            id: '04dd7553-0c55-49ec-93a3-591d72d74aef',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              method: 'POST',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "password": "password",\n    "username":"admin@test.com"\n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/auth/signin',
                host: ['{{base_url}}'],
                path: ['v1', 'auth', 'signin'],
              },
            },
            response: [],
            uid: '13309462-04dd7553-0c55-49ec-93a3-591d72d74aef',
          },
        ],
        id: 'c5f377f0-7cc5-479b-9ed6-d79b6aa8026b',
        uid: '13309462-c5f377f0-7cc5-479b-9ed6-d79b6aa8026b',
      },
      {
        name: 'Users',
        item: [
          {
            name: 'Get me',
            id: 'd36f6834-d383-473b-9f93-2d534e637480',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'GET',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "password": "password",\n    "username":"admin@test.com"\n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/users/me',
                host: ['{{base_url}}'],
                path: ['v1', 'users', 'me'],
              },
            },
            response: [],
            uid: '13309462-d36f6834-d383-473b-9f93-2d534e637480',
          },
          {
            name: 'Update me',
            id: '9ec9ca43-1c76-4f15-a249-1cb381584b5d',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'PUT',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "firstName": "test_FN",\n    "lastName": "test_LN"\n \n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/users/me',
                host: ['{{base_url}}'],
                path: ['v1', 'users', 'me'],
              },
            },
            response: [],
            uid: '13309462-9ec9ca43-1c76-4f15-a249-1cb381584b5d',
          },
        ],
        id: 'c44f07c8-9e86-4df7-af3f-70f6c30b20aa',
        uid: '13309462-c44f07c8-9e86-4df7-af3f-70f6c30b20aa',
      },
      {
        name: 'Roles',
        item: [
          {
            name: 'Add role',
            id: 'ff3edcd4-0451-418b-8015-03ed6bc8e81b',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'POST',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n   "name": "admin"\n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/roles',
                host: ['{{base_url}}'],
                path: ['v1', 'roles'],
              },
            },
            response: [],
            uid: '13309462-ff3edcd4-0451-418b-8015-03ed6bc8e81b',
          },
          {
            name: 'Delete role',
            id: '75050b8b-c463-4666-805e-835e8626ce09',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'DELETE',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "firstName": "test_FN",\n    "lastName": "test_LN"\n \n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/roles/1',
                host: ['{{base_url}}'],
                path: ['v1', 'roles', '1'],
              },
            },
            response: [],
            uid: '13309462-75050b8b-c463-4666-805e-835e8626ce09',
          },
          {
            name: 'Get roles',
            id: 'eace12f5-24b3-4e9b-adb0-9a246596fb5e',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'GET',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "firstName": "test_FN",\n    "lastName": "test_LN"\n \n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/roles',
                host: ['{{base_url}}'],
                path: ['v1', 'roles'],
              },
            },
            response: [],
            uid: '13309462-eace12f5-24b3-4e9b-adb0-9a246596fb5e',
          },
        ],
        id: 'e4b1de3c-fa25-445a-a5cf-6da6d2b17b34',
        uid: '13309462-e4b1de3c-fa25-445a-a5cf-6da6d2b17b34',
      },
      {
        name: 'Products',
        item: [
          {
            name: 'Add product',
            id: '5ad6b98a-37d9-4b03-80f8-9fe3a743004f',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'POST',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              body: {
                mode: 'raw',
                raw: '{\n    "name": "product1",\n    "description": "test"\n \n}',
                options: { raw: { language: 'json' } },
              },
              url: {
                raw: '{{base_url}}/v1/products',
                host: ['{{base_url}}'],
                path: ['v1', 'products'],
              },
            },
            response: [],
            uid: '13309462-5ad6b98a-37d9-4b03-80f8-9fe3a743004f',
          },
          {
            name: 'Get products',
            id: 'ace21cb7-2859-44f8-b6af-3ce4af2c88ac',
            protocolProfileBehavior: { disableBodyPruning: true },
            request: {
              auth: {
                type: 'bearer',
                bearer: [{ key: 'token', value: '{{jwt}}', type: 'string' }],
              },
              method: 'GET',
              header: [{ key: 'x-db-name', value: '{{dbname}}', type: 'text' }],
              url: {
                raw: '{{base_url}}/v1/products',
                host: ['{{base_url}}'],
                path: ['v1', 'products'],
              },
            },
            response: [],
            uid: '13309462-ace21cb7-2859-44f8-b6af-3ce4af2c88ac',
          },
        ],
        id: '6d150856-04d8-400c-bf50-fdd141a456e1',
        uid: '13309462-6d150856-04d8-400c-bf50-fdd141a456e1',
      },
    ],
    variable: [{ key: 'tenantID', value: 'test1' }],
  },
};
