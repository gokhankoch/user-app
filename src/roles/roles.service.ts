import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { DATASOURCE } from '../dynamicDbSwitcher/dynamic-db-switcher.utils';

@Injectable()
export class RoleService {
  private roleRepository: Repository<Role>;
  constructor(@Inject(DATASOURCE) dataSource: DataSource) {
    this.roleRepository = dataSource.getRepository(Role);
  }

  async createRole(name: string): Promise<Role> {
    const isExist = await this.roleRepository.findOneBy({
      name,
    });

    if (isExist) {
      throw new BadRequestException({ message: 'Role already exists' });
    }
    const newRole = this.roleRepository.create({ name });
    await this.roleRepository.save(newRole);
    return newRole;
  }

  async getRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['users'] });
  }

  async updateRole(id: number, name: string): Promise<Role> {
    const role = await this.roleRepository.preload({
      id: id,
      name: name,
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.roleRepository.save(role);
  }

  async deleteRole(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Role not found');
    }
  }
}
