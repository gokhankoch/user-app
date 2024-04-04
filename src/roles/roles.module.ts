import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
})
export class RolesModule {}
