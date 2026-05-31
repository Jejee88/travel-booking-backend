import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../auth/common/enums/role.enum';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';

@ApiTags('Destination')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get()
  @ApiOperation({ summary: 'Lihat semua destinasi (Public)' })
  findAll() {
    return this.destinationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lihat destinasi by ID (Public)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.destinationService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Tambah destinasi baru (Admin only)' })
  @ApiBody({ type: CreateDestinationDto })
  create(@Body() dto: CreateDestinationDto) {
    return this.destinationService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update destinasi (Admin only)' })
  @ApiBody({ type: UpdateDestinationDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDestinationDto) {
    return this.destinationService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus destinasi (Admin only)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.destinationService.remove(id);
  }
}