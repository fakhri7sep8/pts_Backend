

import { IsString, IsNotEmpty,IsOptional, IsEmail } from 'class-validator';

export class CreateSiswaDto {

    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    nama: string;

    @IsNotEmpty()
    @IsString()
    tempat_lahir: string;

    @IsNotEmpty()
    @IsString()
    tanggal_lahir: string;

    @IsNotEmpty()
    @IsString()
    nisn: string;

    @IsNotEmpty()
    @IsString()
    nik: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'email must be a valid email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    alamat: string;
}