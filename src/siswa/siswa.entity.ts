import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class siswa extends BaseEntity {
   @PrimaryGeneratedColumn()
   id : Number;

   nama : string;

   @Column()
   tempat_lahir:string;

   @Column()
   tanggal_lahir:number;

   @Column()
   nisn:number;

   @Column()
   nik:number;

   @Column()
   email:string;

   @Column({type : 'text'})
   alamat:string;

}