import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(req.user.userId, createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    const dbName = req.dbName; // used to cache key for each db result
    return this.productService.getAllProducts(dbName);
  }
}
