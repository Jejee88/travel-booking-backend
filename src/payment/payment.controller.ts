import {
  Body, Controller, Get, Param,
  Patch, Post, Request, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../auth/common/enums/role.enum';

@ApiTags('Payment')
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: 'Customer melakukan pembayaran booking' })
  @ApiBody({ type: CreatePaymentDto })
  pay(@Body() dto: CreatePaymentDto, @Request() req) {
    return this.paymentService.createPayment(dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Admin melihat semua data payment' })
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('confirm/:id')
  @ApiOperation({ summary: 'Admin konfirmasi / tolak payment' })
  @ApiBody({ schema: { example: { status: 'CONFIRMED' } } })
  confirm(
    @Param('id') id: string,
    @Body() body: { status: 'CONFIRMED' | 'REJECTED' },
  ) {
    return this.paymentService.confirmPayment(Number(id), body.status);
  }
}