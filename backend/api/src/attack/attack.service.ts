import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttackDto } from './dto';
import { AttackEntity } from './entities';

@Injectable()
export class AttackService {
  constructor(
    @InjectRepository(AttackEntity)
    private readonly attacksRepository: Repository<AttackEntity>,
  ) {}

  async create(dto: AttackDto): Promise<AttackEntity> {
    return await this.attacksRepository.save(dto);
  }

  async findAll(): Promise<AttackEntity[]> {
    return await this.attacksRepository.find();
  }

  async findOne(id: number): Promise<AttackEntity> {
    return await this.attacksRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, dto: AttackDto): Promise<AttackEntity> {
    const attack = await this.findOne(id);
    return await this.attacksRepository.save({
      ...attack,
      ...dto,
    });
  }

  async delete(id: number) {
    return await this.attacksRepository.delete(id);
  }
}
