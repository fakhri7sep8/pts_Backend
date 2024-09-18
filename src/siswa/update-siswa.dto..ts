import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateSiswaDto {

  @IsOptional()
  id : number
  
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  tempat_lahir?: string;

  @IsOptional()
  @IsString()
  tanggal_lahir?: string;

  @IsOptional()
  @IsString()
  nisn?: string;

  @IsOptional()
  @IsString()
  nik?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  alamat?: string;
}