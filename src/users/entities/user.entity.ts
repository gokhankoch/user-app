import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserDetails } from './userDetails.entity';
import { Role } from '../../roles/entities/roles.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => UserDetails)
  @JoinColumn()
  userDetails: UserDetails;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
