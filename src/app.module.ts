import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DynamicDbSwitcherMiddleware } from './dynamicDbSwitcher/dynamic-db-switcher.middleware';
import { DynamicDbSwitcherModule } from './dynamicDbSwitcher/dynamic-db-switcher.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';

import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DynamicDbSwitcherModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'test_secret',
      signOptions: { expiresIn: '2h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    }),
    RolesModule,
    ProductsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DynamicDbSwitcherMiddleware).forRoutes('*');
  }
}
