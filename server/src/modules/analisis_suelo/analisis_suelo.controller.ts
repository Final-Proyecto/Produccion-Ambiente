import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AnalisisSueloService } from './analisis_suelo.service';
import { CreateAnalisisSueloDto } from './dto/create.analisis.dto';

@Controller('analisis-suelo')
export class AnalisisSueloController {
  constructor(private readonly analisisSueloService: AnalisisSueloService) {}

  @Get('detalles')
  findAll() {
    try {
      return this.analisisSueloService.findAll();
    } catch (error) {
      console.log('mostrar suelos', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('create')
  create(@Body() dto: CreateAnalisisSueloDto) {
    try {
      return this.analisisSueloService.createAnalisis(dto);
    } catch (error) {
      console.log('mostrar suelos', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
