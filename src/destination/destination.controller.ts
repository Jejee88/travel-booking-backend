import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

import { Roles } from '../auth/common/decorators/roles.decorator';
import { Role } from '../auth/common/enums/role.enum';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  // GET ALL (PUBLIC)
  @Get()
  findAll() {
    return this.destinationService.findAll();
  }
  @Get(':id')
findOne(@Param('id') id: string) {
  return this.destinationService.findOne(+id);
}

  // CREATE (ADMIN ONLY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateDestinationDto) {
    return this.destinationService.create(dto);
  }

  // UPDATE (ADMIN ONLY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDestinationDto) {
    return this.destinationService.update(+id, dto);
  }

  // DELETE (ADMIN ONLY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.destinationService.remove(+id);
  }
}