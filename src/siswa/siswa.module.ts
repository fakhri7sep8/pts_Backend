import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { siswa } from './siswa.entity';

@Module({
  imports :[TypeOrmModule.forFeature([siswa])],
  providers: [SiswaService],
  controllers: [SiswaController]
})
export class SiswaModule {}
