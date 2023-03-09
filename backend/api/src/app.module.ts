import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AttackModule } from './attack/attack.module';
import { MailModule } from './mail/mail.module';
import { TasksModule } from './tasks/tasks.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [AuthModule, AttackModule, MailModule, TasksModule, GeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
