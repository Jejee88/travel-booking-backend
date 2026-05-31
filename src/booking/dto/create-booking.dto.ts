import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  destinationId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  totalPerson: number;

  @ApiProperty({ example: '2026-06-01' })
  @IsDateString()
  bookingDate: string;
}