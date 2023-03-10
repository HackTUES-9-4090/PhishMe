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

  @Column({
    nullable: true,
  })
  refreshToken?: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  organization: OrganizationEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  private tempPassword?: string = null;

  @Exclude()
  private tempRefreshToken?: string = null;

  @AfterLoad()
  private loadTemp(): void {
    this.tempPassword = this.password;
    this.tempRefreshToken = this.refreshToken;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hash(): Promise<void> {
    if (this.password && this.tempPassword !== this.password) {
      this.password = await argon2.hash(this.password);
    }

    if (this.refreshToken && this.tempRefreshToken !== this.refreshToken) {
      this.refreshToken = await argon2.hash(this.refreshToken);
    }
  }
}
