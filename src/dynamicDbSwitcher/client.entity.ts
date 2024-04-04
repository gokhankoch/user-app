import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define the entity for the client database connections
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  databaseName: string;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
