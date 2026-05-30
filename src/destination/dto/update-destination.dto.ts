import { DestinationType } from '@prisma/client';

export class UpdateDestinationDto {
  title?: string;
  description?: string;
  price?: number;
  quota?: number;
  duration?: string;
  type?: DestinationType;
}