import { Module } from '@nestjs/common';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackEntity, AttackTargetEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([AttackEntity, AttackTargetEntity])],
  controllers: [AttackController],
  providers: [AttackService],
})
export class AttackModule {}
