import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  AfterLoad,
  BeforeUpdate,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationEntity } from '@/organizations/entities';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  organization: OrganizationEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword(): Promise<void> {
    if (this.tempPassword !== this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
}
