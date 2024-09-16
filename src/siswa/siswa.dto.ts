import { OmitType } from "@nestjs/mapped-types"
import { IsInt, IsNotEmpty , IsOptional, Length, Max, Min, MinLength} from "class-validator"
import { Type } from "class-transformer";


//data transfer object (dto)

export class PtsDto {
    @IsOptional()
    id : number

    @IsNotEmpty({message : "title tidak boleh kosong"})
    @Length(5 , 1000,  {message : "minimal 5 karakter"})
    nama : string;

    @IsNotEmpty()
    tempat_lahir : string

    @IsInt()
    // @Min(2020)
    // @Max(2024)
    tanggal_lahir : number

    @IsInt()
    // @Min(2020)
    // @Max(2024)
    nisn : number

    @IsInt()
    // @Min(2020)
    // @Max(2024)
    nik : number

    @IsNotEmpty()
    // @MinLength(10)
    email : string

    @IsNotEmpty()
    // @MinLength(10)
    alamat : string
}


export class CreatePtsDto extends OmitType(PtsDto , ["id"]){} // OmitType = pengecualian dari yang dipilih  misal = id
export class UpdatePtsDto extends PtsDto {}
export class FindPtsDto {
    @IsInt()
    @Type(() => Number)
    page = 1

    @IsInt()
    @Type(() => Number)
    pageSize = 10

    @IsOptional()
    @IsInt()
    limit : number

    @IsOptional()
    title : string

    @IsOptional()
    author : string

    @IsOptional()
    deskripsi : string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    from_year : number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year : number

    
    @IsOptional()
    keyword : string

}
