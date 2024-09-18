
// siswa.controller.ts

import { Controller, Get, Post, Body, Param, Put, NotFoundException } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto } from './create-siswa.dto';
import { UpdateSiswaDto } from './update-siswa.dto.';


@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

  @Get('list')
  findAll() {
    return this.siswaService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    const siswa = this.siswaService.findOne(+id);
    if (!siswa) {
      throw new NotFoundException('Siswa tidak ditemukan');
    }
    return siswa;
  }

  @Post('create')
  create(@Body() createSiswaDto: CreateSiswaDto) {
    return this.siswaService.create(createSiswaDto);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSiswaDto: UpdateSiswaDto) {
    return this.siswaService.update(+id, updateSiswaDto);
  }

}