import {
  Entity,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttackTargetEntity } from './attack-target.entity';

@Entity('attack')
export class AttackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AttackTargetEntity, (target) => target.attack, {
    eager: true,
    cascade: true,
  })
  targets: AttackTargetEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
