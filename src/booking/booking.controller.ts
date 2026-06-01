import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(userId: number, dto: {
    destinationId: number;
    totalPerson: number;
    bookingDate: string;
  }) {
    const destination = await this.prisma.destination.findUnique({
      where: { id: dto.destinationId },
    });
    if (!destination) throw new NotFoundException('Destination not found');

    const totalPrice = destination.price * dto.totalPerson;

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        destinationId: dto.destinationId,
        totalPerson: dto.totalPerson,
        totalPrice,
        bookingDate: new Date(dto.bookingDate),
        status: 'PENDING',
      },
      include: { destination: true },
    });

    return { message: 'Booking created', data: booking };
  }
  
async updateBooking(id: number, dto: any) {
  return this.prisma.booking.update({
    where: { id },
    data: dto,
  });
}
  async findAll() {
    return this.prisma.booking.findMany({
      include: { user: true, destination: true, payment: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { destination: true, payment: true },
    });
  }
}