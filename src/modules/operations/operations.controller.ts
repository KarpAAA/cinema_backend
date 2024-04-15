import { Controller, Get, Post, Body,  Param} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  userPurchase(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.create(createOperationDto);
  }

  @Get(':id')
  findAllUsersOperations(@Param('id') id: string) {
    return this.operationsService.findAllUsersOperations(+id);
  }

}
