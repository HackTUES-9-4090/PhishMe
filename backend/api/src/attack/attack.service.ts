import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttackDto } from './dtos';
import { AttackEntity } from './entities';
import { GeneratorService } from '@/generator/generator.service';
import { Logger } from '@nestjs/common';
import { ScraperService } from '@/scraper/scraper.service';
import { v4 as uuidv4 } from 'uuid';

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
    const attackId = uuidv4();

    this.scraperService.callScraperService(dto.scrapeUrl, attackId);

    for (const target of dto.targets) {
      const targetId = uuidv4();

      dto = {
        ...dto,
        scrapeUrl: `http://localhost:3000/files/${attackId}/${attackId}.html?targetId=${targetId}`,
      };

      const generatePhishingEmail = await this.generator.generatePhishingEmail({
        attack: dto,
        target,
      });

      this.logger.log(
        `Generated email for ${target.name} with length ${generatePhishingEmail.message.length}`,
      );

      target.generatedEmailContent = generatePhishingEmail.message;
      target.id = targetId;
    }

    let attack = this.attacksRepository.create({ ...dto, id: attackId });

    attack = await this.attacksRepository.save(attack);

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
