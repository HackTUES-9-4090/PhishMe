import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttackDto } from './dtos';
import { AttackEntity } from './entities';
import { GeneratorService } from '@/generator/generator.service';
import { MailService } from '@/mail/mail.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AttackService {
  private readonly logger = new Logger(AttackService.name);

  constructor(
    @InjectRepository(AttackEntity)
    private readonly attacksRepository: Repository<AttackEntity>,
    private readonly generator: GeneratorService,
    private readonly mail: MailService,
  ) {}

  async generateAndSendEmails(dto: AttackDto) {
    this.logger.log(`Generating emails for ${dto.targets.length} targets`);

    for (const target of dto.targets) {
      const generatePhishingEmail = await this.generator.generatePhishingEmail({
        attack: dto,
        target,
      });

      this.logger.log(
        `Generated email for ${target.name} with length ${generatePhishingEmail.message.length}`,
      );

      await this.mail.sendEmail({
        receiverEmail: target.email,
        senderEmail: 'noreply @ tuesplace <noreply@tuesplace.com>',
        subject: `${target.name}, It's ${dto.fromName}`,
        text: generatePhishingEmail.message,
        html: generatePhishingEmail.message,
      });

      this.logger.log(`Sent email to ${target.email}`);
    }
  }

  async create(dto: AttackDto): Promise<AttackEntity> {
    const attack = this.attacksRepository.create(dto);
    return await this.attacksRepository.save(attack);
  }

  async findAll(): Promise<AttackEntity[]> {
    return await this.attacksRepository.find();
  }

  async findOne(id: string): Promise<AttackEntity> {
    return await this.attacksRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, dto: AttackDto): Promise<AttackEntity> {
    const attack = this.attacksRepository.create({
      id: id,
      ...dto,
    });

    return await this.attacksRepository.save(attack);
  }

  async delete(id: string): Promise<void> {
    await this.attacksRepository.delete(id);
  }
}
