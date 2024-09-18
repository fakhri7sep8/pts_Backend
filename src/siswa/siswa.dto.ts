import { IsEmail, IsNotEmpty, IsDate, Length, IsOptional } from 'class-validator';

export class SiswaDto {
  @IsOptional()
  @Length(1, 100, { message: "Nama tidak boleh kosong dan harus antara 1 hingga 100 karakter" })
  nama?: string; // Perhatikan penggunaan optional jika perlu

  @IsNotEmpty({ message: "Tempat lahir tidak boleh kosong" })
  tempat_lahir: string;

  @IsNotEmpty({ message: "Tanggal lahir tidak boleh kosong" })
  @IsDate({ message: "Tanggal lahir harus berupa tanggal" })
  tanggal_lahir: Date;

  @IsEmail({}, { message: "Email tidak valid" })
  email: string;

  @IsNotEmpty({ message: "NISN tidak boleh kosong" })
  nisn: string;

  @IsNotEmpty({ message: "NIK tidak boleh kosong" })
  nik: string;

  @IsNotEmpty({ message: "Alamat tidak boleh kosong" })
  alamat: string;
}
