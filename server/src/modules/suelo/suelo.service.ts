import { Injectable } from '@nestjs/common';
import { CreateSueloDto } from './dto/create-suelo.dto';
import { UpdateSueloDto } from './dto/update-suelo.dto';

@Injectable()
export class SueloService {
  create(createSueloDto: CreateSueloDto) {
    return 'This action adds a new suelo';
  }

  findAll() {
    return `This action returns all suelo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suelo`;
  }

  update(id: number, updateSueloDto: UpdateSueloDto) {
    return `This action updates a #${id} suelo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suelo`;
  }
}
