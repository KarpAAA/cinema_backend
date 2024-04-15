import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}


  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id);
  }


}
