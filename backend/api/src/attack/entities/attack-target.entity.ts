import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { AttackEntity } from './attack.entity';

@Entity('attack_target')
export class AttackTargetEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  generatedEmailContent?: string;

  @Column({ type: 'boolean', default: false })
  isFailedClick: boolean;

  @Column({ type: 'boolean', default: false })
  isFailedSubmit: boolean;

  @ManyToOne(() => AttackEntity, (attack) => attack.targets, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  attack: AttackEntity;
}
