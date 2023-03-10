import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '@/mail/mail.module';
import { GeneratorModule } from '@/generator/generator.module';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';
import { AttackEntity, AttackTargetEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttackEntity, AttackTargetEntity]),
    GeneratorModule,
    MailModule,
  ],
  controllers: [AttackController],
  providers: [AttackService],
})
export class AttackModule {}
