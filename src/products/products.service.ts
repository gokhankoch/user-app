import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { DATASOURCE } from '../dynamicDbSwitcher/dynamic-db-switcher.utils';

@Injectable()
export class ProductService {
  private productRepository: Repository<Product>;
  constructor(
    @Inject(DATASOURCE) dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.productRepository = dataSource.getRepository(Product);
  }

  async createProduct(
    userId: number,
    productData: CreateProductDto,
  ): Promise<Product> {
    const isExist = await this.productRepository.findOneBy({
      name: productData.name,
    });

    if (isExist) {
      throw new BadRequestException({ message: 'Product already exists' });
    }
    const newProduct = this.productRepository.create({
      ...productData,
      user: { id: userId },
    });
    return this.productRepository.save(newProduct);
  }

  async getAllProducts(dbName): Promise<Product[]> {
    const cachedProductsKey = `${dbName}_allProducts`;

    const cachedData =
      await this.cacheManager.get<Product[]>(cachedProductsKey);
    if (cachedData) {
      console.log('cached data: ', cachedData);
      return cachedData;
    }

    const products = await this.productRepository.find();
    await this.cacheManager.set(cachedProductsKey, products);
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }
}
