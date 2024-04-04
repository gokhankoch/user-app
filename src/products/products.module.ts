import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      host: 'localhost', //default host
      port: 6379, //default port
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductsModule {}
