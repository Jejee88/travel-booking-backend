import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'Masukkan email yang valid',
  })
  @IsEmail({}, { message: 'Penulisan email belum tepat' })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}