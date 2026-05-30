import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../auth/common/enums/role.enum';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  pay(@Body() dto: any, @Request() req) {
    return this.paymentService.createPayment(dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get('my')
  getMyPayments(@Request() req) {
    return this.paymentService.getMyPayments(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('confirm/:id')
  confirm(
    @Param('id') id: string,
    @Body() body: { status: 'CONFIRMED' | 'REJECTED' },
  ) {
    return this.paymentService.confirmPayment(Number(id), body.status);
  }
}