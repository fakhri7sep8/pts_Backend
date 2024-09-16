import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePtsDto, FindPtsDto } from './siswa.dto';
import { ResponsePaginationPts, ResponseSuccessPts } from 'src/interface/response_pts_interface';
import { siswa } from './siswa.entity';
import BaseResponsePts from 'src/utils/response_pts';

@Injectable()
export class SiswaService extends BaseResponsePts {
    constructor(@InjectRepository(siswa)  private readonly siswaRepository : Repository<siswa>
) {
  super()
}

//disini kita akan membuat api untuk mengakses semua data di tabel book
async findAllBook(query : FindPtsDto) : Promise <ResponsePaginationPts>{
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

  }

  console.log(page , pageSize );

  const result = await this.siswaRepository.find(
    {
      where : keyword ? search : filter,
      skip : limit,
      take : Number(pageSize)
    }
  );

  const total = await this.siswaRepository.count({
    where : keyword ? search : filter
  })

  return this._pagination("ok" , result , total , page , pageSize)
}

//menambah buku
async create(payload: CreatePtsDto): Promise<ResponseSuccessPts> {
    try {
      const save = await this.siswaRepository.save(payload);
      return this._success("Siswa berhasil ditambahkan");
    } catch (err) {
      throw new HttpException('Terjadi kesalahan saat menambahkan siswa', HttpStatus.BAD_REQUEST);
    } finally {
      console.log('Proses selesai');
    }
  }

// detail book

async detail(id : number) : Promise <ResponseSuccessPts>{

    const result = await this.siswaRepository.findOne({
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

async update(id : number,payload : any,) : Promise <ResponseSuccessPts> {
try {
    // const result = await this.bookRepository.save({
    //   title : payload.title ,
    //   year : payload.year ,
    //   deskripsi : payload.deskripsi ,
    //   author : payload.author ,
    //   id : id
    // })

  const result = await this.siswaRepository.update(
  {
      id : id
  },
  {
      nama : payload.nama ,
      tempat_lahir : payload.tempat_lahir ,
      tanggal_lahir : payload.tanggal_lahir ,
      nisn : payload.nisn ,
      nik : payload.nik ,
      alamat : payload.alamat ,
  },
)
return this._success("update berhasil")
} catch (err) {
throw new HttpException('ada kesalahan' , HttpStatus.BAD_REQUEST)
}
}


//menghapus data

async delete(id : number) : Promise <ResponseSuccessPts>{

const deleted = await this.siswaRepository.delete(id);

if(deleted.affected === 0) {
throw new HttpException('data sudah tidak ada' , HttpStatus.BAD_REQUEST)
}
return this._success("buku berhasil dihapus" )
}

// menghapus data lebih dari 1


async deleteMulti(array : string[]) : Promise <ResponseSuccessPts>{

const deleted = await this.siswaRepository.delete(array);

if(deleted.affected === 0) {
throw new HttpException('data sudah tidak ada' , HttpStatus.BAD_REQUEST)
}
return this._success("buku berhasil dihapus")
}
}
