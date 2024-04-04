import { Global, Module } from '@nestjs/common';
import { connectionFactory, DATASOURCE } from './dynamic-db-switcher.utils';

@Global()
@Module({
  providers: [connectionFactory],
  exports: [DATASOURCE],
})
export class DynamicDbSwitcherModule {}
