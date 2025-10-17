import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';
import { FilterCategoryInvDto } from './dto/filter.category.inv.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.inventoryService.findAll();
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
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

  @Post('category')
  async findByCategory(@Body() dto: FilterCategoryInvDto) {
    try {
      const res = await this.inventoryService.findByCategory(dto);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.inventoryService.remove(id);
      return {
        message: `El ítem con ID ${id} ha sido eliminado exitosamente.`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al eliminar el ítem del inventario.',
      );
    }
  }
}
