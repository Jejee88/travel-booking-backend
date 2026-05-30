import { IsString, IsInt, IsEnum } from 'class-validator';
import { DestinationType } from '@prisma/client';

export class CreateDestinationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  quota: number;

  @IsString()
  duration: string;

  @IsEnum(DestinationType)
  type: DestinationType;
}