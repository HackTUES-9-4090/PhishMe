import { Module } from '@nestjs/common';
import { AttackService } from './attack.service';
import { AttackController } from './attack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackEntity, AttackTargetEntity } from './entities';
import { GeneratorModule } from '@/generator/generator.module';
import { MailModule } from '@/mail/mail.module';

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
