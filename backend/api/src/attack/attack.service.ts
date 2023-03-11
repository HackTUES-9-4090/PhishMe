import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttackDto } from './dtos';
import { AttackEntity } from './entities';
import { GeneratorService } from '@/generator/generator.service';
import { Logger } from '@nestjs/common';
import { ScraperService } from '@/scraper/scraper.service';

@Injectable()
export class AttackService {
  private readonly logger = new Logger(AttackService.name);

  constructor(
    @InjectRepository(AttackEntity)
    private readonly attacksRepository: Repository<AttackEntity>,
    private readonly generator: GeneratorService,
    private readonly scraperService: ScraperService,
  ) {}

  async create(dto: AttackDto): Promise<AttackEntity> {
    let attack = this.attacksRepository.create(dto);
    attack = await this.attacksRepository.save(attack);

    await this.scraperService.callScraperService(dto.scrapeUrl, attack.id);

    for (const target of dto.targets) {
      const generatePhishingEmail = await this.generator.generatePhishingEmail({
        attack: dto,
        target,
      });

      this.logger.log(
        `Generated email for ${target.name} with length ${generatePhishingEmail.message.length}`,
      );

      target.generatedEmailContent = generatePhishingEmail.message;
    }

    return attack;
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
