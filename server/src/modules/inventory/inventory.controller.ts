import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateInventoryDto) {
    try {
      const res = await this.inventoryService.update(+id, updateInventoryDto);
      return {
        message: 'Se ha actualizado en el inventario exitosamente.',
      };
    } catch (error) {
      console.log('error al actualizar el inventario', error);
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
