import { OmitType } from "@nestjs/mapped-types"
import { Book } from "./book.entity"
import { IsInt, IsNotEmpty , IsOptional, Length, Max, Min, MinLength} from "class-validator"
import { Type } from "class-transformer";


//data transfer object (dto)

export class BookDto {
    @IsOptional()
    id : number

    @IsNotEmpty({message : "title tidak boleh kosong"})
    @Length(5 , 1000,  {message : "minimal 5 karakter"})
    title : string;

    @IsNotEmpty()
    author : string

    @IsInt()
    @Min(2020)
    @Max(2024)
    year : number

    @IsNotEmpty()
    @MinLength(10)
    deskripsi : string
}


export class CreateBookDto extends OmitType(BookDto , ["id"]){} // OmitType = pengecualian dari yang dipilih  misal = id
export class UpdateBookDto extends BookDto {}
export class FindBookDto {
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
