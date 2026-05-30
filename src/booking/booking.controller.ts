import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../auth/common/enums/role.enum';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  createBooking(@Request() req, @Body() dto: any) {
    return this.bookingService.createBooking(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  myBookings(@Request() req) {
    return this.bookingService.findByUser(req.user.sub);
  }
}