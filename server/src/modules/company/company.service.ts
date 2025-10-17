import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create.company.dto';
@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(companyDto: CreateCompanyDto, userId: number) {
    try {
      return this.prisma.empresa.create({
        data: {
          userId: userId,
          nombre: companyDto.nombreEmpresa,
          superficie: companyDto.superficie,
          ubicacion: companyDto.ubicacion,
          
        },
      });
    } catch (error) {
      console.log('error al crear la empresa', error);
      throw new Error('Error al crear la empresa');
    }
  }
}
