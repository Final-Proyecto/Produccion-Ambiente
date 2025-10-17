import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post('create')
  async create(@Body() createLoteDto: CreateLoteDto) {
    try {
      await this.loteService.create(createLoteDto);
      return {
        message: 'Se ha creado en el Lote exitosamente.',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.loteService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) {
    try {
      await this.loteService.update(+id, updateLoteDto);
      return {
        message: 'Se ha actualizado en el inventario exitosamente.',
      };
    } catch (error) {}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteService.remove(+id);
  }
}
