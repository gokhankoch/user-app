import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpInputDto } from './dtos/signUp-input.dto';
import { SignUpOutputDto } from './dtos/signUp-output.dto';
import { User } from './entities/user.entity';
import { DATASOURCE } from '../dynamicDbSwitcher/dynamic-db-switcher.utils';
import { DataSource, Repository } from 'typeorm';
import { UserUpdate } from './dtos/userUpdate.input.dto';
import { UserDetails } from './entities/userDetails.entity';
import { Role } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  private usersDetailsRepository: Repository<UserDetails>;
  private roleRepository: Repository<Role>;
  constructor(@Inject(DATASOURCE) dataSource: DataSource) {
    this.usersRepository = dataSource.getRepository(User);
    this.usersDetailsRepository = dataSource.getRepository(UserDetails);
    this.roleRepository = dataSource.getRepository(Role);
  }

  async findOne(username: string): Promise<any> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    const isUserExist = await this.usersRepository.findOneBy({
      username: signUpInputDto.username,
    });

    if (isUserExist) {
      throw new BadRequestException({ message: 'User already exists' });
    }
    const user = new User();

    user.username = signUpInputDto.username;
    user.password = signUpInputDto.password;

    const userResponse = await this.usersRepository.save(user);
    return { username: userResponse.username, id: userResponse.id };
  }

  async updateMe(userId: number, userUpdate: UserUpdate) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['userDetails', 'roles'],
    });

    if (!user) {
      throw new NotFoundException({
        message: ' Invalid user id',
      });
    }

    const userDetails = new UserDetails();

    userDetails.firstName = userUpdate.firstName;

    userDetails.lastName = userUpdate.lastName;

    if (user.userDetails) {
      userDetails.id = user.userDetails.id;
    }

    if (userUpdate.roleId) {
      // check role assigned before
      if (!user.roles.find((role) => role.id === userUpdate.roleId)) {
        const role = await this.roleRepository.findOne({
          where: { id: userUpdate.roleId },
          relations: ['users'],
        });

        if (!role) {
          throw new NotFoundException({ message: ' Role not found' });
        }

        user.roles.push(role);

        await this.roleRepository.save(role);
      }
      //TODO: add logic to remove role from user
    }

    const resUserDetails = await this.usersDetailsRepository.save(userDetails);

    await this.usersRepository.save({ ...user, userDetails: resUserDetails });

    return { userId, roles: user.roles, userUpdate };
  }

  async getMe(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['userDetails', 'roles'],
    });

    if (!user) {
      throw new NotFoundException({
        message: ' Invalid user id',
      });
    }

    return {
      id: user.id,
      username: user.username,
      roles: user.roles,
      userDetails: { ...user.userDetails },
    };
  }
}
