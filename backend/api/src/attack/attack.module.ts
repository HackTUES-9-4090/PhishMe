import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneratorModule } from '@/generator/generator.module';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';
import { AttackEntity, AttackTargetEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttackEntity, AttackTargetEntity]),
    GeneratorModule,
  ],
  controllers: [AttackController],
  providers: [AttackService],
  exports: [AttackService],
})
export class AttackModule {}
