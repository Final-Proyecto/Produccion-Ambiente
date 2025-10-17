import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}
  async create(inventoryDto: CreateInventoryDto) {
    const inventory = await this.prisma.inventario.create({
      data: { ...inventoryDto, empresaId: 1 },
    });
    console.log(inventory);
    return inventory;
  }

  async findAll() {
    return await this.prisma.inventario.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.inventario.findUnique({ where: { id } });
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.prisma.inventario.update({
      where: { id },
      data: updateInventoryDto,
    });

    if (!inventory)
      throw new BadRequestException('No se pudo actualizar el inventario');

    return inventory;
  }

  remove(id: number) {
    //todavia nada
  }
}
