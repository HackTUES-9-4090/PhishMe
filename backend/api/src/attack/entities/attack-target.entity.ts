import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttackEntity } from './attack.entity';

@Entity('attack_target')
export class AttackTargetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => AttackEntity, (attack) => attack.targets, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  attack: AttackEntity;
}
