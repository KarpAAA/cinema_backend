import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Goods} from "../../entities/cinema/goods.model";
import {Repository} from "typeorm";

@Injectable()
export class GoodsService {

  constructor(@InjectRepository(Goods) private goodsRepository: Repository<Goods>) {}


  async findAll() {
    const goods = await this.goodsRepository.find({});
    return goods.sort((a,b) => a.price - b.price);
  }

  findOne(id: number) {
    return this.goodsRepository.findOne({where: {id}});
  }

}
