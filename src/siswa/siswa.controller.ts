import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreatePtsDto, FindPtsDto, UpdatePtsDto } from './siswa.dto';
import { FindBookDto } from 'src/book/book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('siswa')
export class SiswaController {
    
    constructor(private SiswaService: SiswaService) {}

    @Get('list')
    async findAllBook(@Pagination() query: FindPtsDto ) {
        return this.SiswaService.findAllBook(query);
    }

    @Post('create')
    async createBook(@Body() payload : CreatePtsDto){
        return this.SiswaService.create(payload)
    }

    @Get("detail/:id")
    async detail(@Param('id') id: number){
        return this.SiswaService.detail(+id)
    }

    @Put("update/:id")
    async update(@Body() payload : UpdatePtsDto , @Param("id") id : string){
        return this.SiswaService.update(+id , payload)
    }

    @Delete("delete/:id")
    async delete(@Param("id") id: number){
        return this.SiswaService.delete(id)
    }

    @Delete("delete")
    async deleteMulti(@Query("id") id : string) {
        const idArray = id.split(",")
        return this.SiswaService.deleteMulti(idArray)
    }

}
