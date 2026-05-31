import { IsString, IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DestinationType } from '@prisma/client';

export class CreateDestinationDto {
  @ApiProperty({ example: 'Bali Adventure' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Wisata seru di Bali' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1500000 })
  @IsInt()
  price: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  quota: number;

  @ApiProperty({ example: '3 Hari 2 Malam' })
  @IsString()
  duration: string;

  @ApiProperty({ enum: DestinationType, example: DestinationType.SINGLE_DESTINATION })
  @IsEnum(DestinationType)
  type: DestinationType;
}