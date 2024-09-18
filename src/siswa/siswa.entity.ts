import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Siswa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string; 

  @Column()
  nama: string;

  @Column({ unique: true })
  email: string;

  @Column()
  tempat_lahir: string;

  @Column('date')
  tanggal_lahir: Date;

  @Column()
  nisn: string;

  @Column()
  nik: string;

  @Column()
  alamat: string;
}
