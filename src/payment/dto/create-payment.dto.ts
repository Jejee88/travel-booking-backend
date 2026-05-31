import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  bookingId: number;

  @ApiProperty({ example: 500000 })
  @IsInt()
  amount: number;

  @ApiProperty({ example: 'TRANSFER' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: 'https://bukti-transfer.jpg' })
  @IsString()
  paymentProof: string;
}