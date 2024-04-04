import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
