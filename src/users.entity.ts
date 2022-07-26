import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;
  
  @IsEmail()
  @Column()
  email: string;
  
  @IsNotEmpty()
  @Column()
  country: string;
}
