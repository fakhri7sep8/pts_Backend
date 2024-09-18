import { Injectable } from '@nestjs/common';
import { CreateSiswaDto } from './create-siswa.dto';
import { UpdateSiswaDto } from './update-siswa.dto.';

@Injectable()
export class SiswaService {
  private siswa = [];

  findAll() {
    return {
      status: 'Success',
      message: 'OK',
      data: this.siswa,
      pagination: {
        total: this.siswa.length,
        page: 1,
        total_page: 1,
        pageSize: 10,
        nextPage: null,
        previosPage: null,
      }
    };
  }

  findOne(id: number) {
    return this.siswa.find(s => s.id === id);
  }

  create(createSiswaDto: CreateSiswaDto) {
    const newSiswa = { id: Date.now(), ...createSiswaDto };
    this.siswa.push(newSiswa);
    return { status: 'Success', message: 'OK', data: newSiswa };
  }

  update(id: number, updateSiswaDto: UpdateSiswaDto) {
    const index = this.siswa.findIndex(s => s.id === id);
    if (index === -1) {
      return { status: 'Error', message: 'Siswa tidak ditemukan' };
    }
    this.siswa[index] = { ...this.siswa[index], ...updateSiswaDto };
    return { status: 'Success', message: 'Data berhasil diupdate', data: this.siswa[index] };
  }
}