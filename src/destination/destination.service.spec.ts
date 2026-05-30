import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.destination.findMany();
  }

  async findOne(id: number) {
    const destination = await this.prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      throw new NotFoundException('Destination tidak ditemukan');
    }

    return destination;
  }

  async update(id: number, dto: UpdateDestinationDto) {
    await this.findOne(id);

    return this.prisma.destination.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.destination.delete({
      where: { id },
    });
  }
}