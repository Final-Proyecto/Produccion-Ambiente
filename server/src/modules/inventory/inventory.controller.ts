import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  //Crear
  @Post('create')
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      const res = await this.inventoryService.create(createInventoryDto);
      return {
        message: 'Se ha creado en el inventario exitosamente.',
      };
    } catch (error) {
      console.log('error al crear el inventario', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //traer todos
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  //buscar por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }
}
