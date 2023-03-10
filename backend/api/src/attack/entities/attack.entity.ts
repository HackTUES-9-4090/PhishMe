import {
  Entity,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunicationType } from '@/attack/enums';
import { AttackTargetEntity } from './attack-target.entity';
import { Options } from '@nestjs/common';

@Entity('attack')
export class AttackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CommunicationType,
  })
  communicationType: CommunicationType;

  @Column()
  fromName: string;

  @Column()
  fromRelationship: string;

  @Column()
  theme: string;

  @Column({ nullable: true })
  scrapeUrl?: string;

  @Column({
    nullable: true,
  })
  generatedEmailContent?: string;

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
