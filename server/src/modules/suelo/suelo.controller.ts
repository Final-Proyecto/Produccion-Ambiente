import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SueloService } from './suelo.service';
import { CreateSueloDto } from './dto/create-suelo.dto';
import { UpdateSueloDto } from './dto/update-suelo.dto';

@Controller('suelo')
export class SueloController {
  constructor(private readonly sueloService: SueloService) {}

  @Post()
  create(@Body() createSueloDto: CreateSueloDto) {
    return this.sueloService.create(createSueloDto);
  }

  @Get()
  findAll() {
    return this.sueloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sueloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSueloDto: UpdateSueloDto) {
    return this.sueloService.update(+id, updateSueloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sueloService.remove(+id);
  }
}
