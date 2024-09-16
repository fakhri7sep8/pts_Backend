import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository} from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response.utils';
import { CreateBookDto, FindBookDto } from './book.dto';

@Injectable()
export class BookService extends BaseResponse {

    constructor(@InjectRepository(Book)  private readonly bookRepository : Repository<Book>
    ) {
      super()
    }

    //disini kita akan membuat api untuk mengakses semua data di tabel book
    async findAllBook(query : FindBookDto) : Promise <ResponsePagination>{
      console.log('query' , query);

      const {page , pageSize , limit,title , author , from_year , to_year , deskripsi , keyword} = query

      const filter : {
        [key : string] : any
      } = {}

      const search : {
        [key : string] : any 
      }[] = []

      if(keyword){
        search.push(
        {
          title : Like (`%${keyword}%`)
        },
        {
          author : Like (`%${keyword}%`)
        },
        {
          deskripsi : Like (`%${keyword}%`)
        },
        {
          year : Like(`%${keyword}%`)
        }
      )
      } else {
        if(title){
          filter.title = Like(`%${title}%`)
        }
  
        if(author){
          filter.author = Like(`%${author}%`)
        }
  
        if(deskripsi){
          filter.deskripsi = Like(`%${deskripsi}%`)
        }
  
        if(from_year && to_year){
          filter.year = Between(from_year , to_year)
        }
  
        if(from_year && !to_year){
          filter.year = Between(from_year , from_year)
        }
      }

      console.log(page , pageSize );

      const result = await this.bookRepository.find(
        {
          where : keyword ? search : filter,
          skip : limit,
          take : Number(pageSize)
        }
      );

      const total = await this.bookRepository.count({
        where : keyword ? search : filter
      })

      return this._pagination("ok" , result , total , page , pageSize)
    }

    //menambah buku

    async create(payload : CreateBookDto) : Promise <ResponseSuccess>{

      try {

        const save = await this.bookRepository.save(payload)
        return this._success("buku ditambahkan")

      } catch (err) {
        throw new HttpException('ada kesalahan' , HttpStatus.BAD_REQUEST)
      } finally {
        console.log('proses selesai');
      }

    }

    // detail book

    async detail(id : number) : Promise <ResponseSuccess>{

        const result = await this.bookRepository.findOne({
            where: {
                id : id
            }
        });

        if(result === null) {
        throw new HttpException('gak ada buku nya bang' , HttpStatus.BAD_REQUEST)
        }
        return this._success("detail buku" , result)
    }

    // update

  async update(id : number,payload : any,) : Promise <ResponseSuccess> {
    try {
        // const result = await this.bookRepository.save({
        //   title : payload.title ,
        //   year : payload.year ,
        //   deskripsi : payload.deskripsi ,
        //   author : payload.author ,
        //   id : id
        // })

      const result = await this.bookRepository.update(
      {
          id : id
      },
      {
          title : payload.title ,
          year : payload.year ,
          deskripsi : payload.deskripsi ,
          author : payload.author ,
      },
    )
    return this._success("update berhasil")
    } catch (err) {
    throw new HttpException('ada kesalahan' , HttpStatus.BAD_REQUEST)
    }
  }


  //menghapus data

  async delete(id : number) : Promise <ResponseSuccess>{

    const deleted = await this.bookRepository.delete(id);

    if(deleted.affected === 0) {
    throw new HttpException('data sudah tidak ada' , HttpStatus.BAD_REQUEST)
  }
  return this._success("buku berhasil dihapus" )
}

// menghapus data lebih dari 1


async deleteMulti(array : string[]) : Promise <ResponseSuccess>{

  const deleted = await this.bookRepository.delete(array);

  if(deleted.affected === 0) {
    throw new HttpException('data sudah tidak ada' , HttpStatus.BAD_REQUEST)
}
return this._success("buku berhasil dihapus")
}


  
}

