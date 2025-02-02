import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique: true})
  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user ', this.id);
  }
}
