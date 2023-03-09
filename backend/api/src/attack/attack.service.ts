import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttackDto } from './dtos';
import { AttackEntity } from './entities';

@Injectable()
export class AttackService {
  constructor(
    @InjectRepository(AttackEntity)
    private readonly attacksRepository: Repository<AttackEntity>,
  ) {}

  async create(dto: AttackDto): Promise<AttackEntity> {
    const attack = this.attacksRepository.create(dto);
    return await this.attacksRepository.save(attack);
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
    const attack = this.attacksRepository.create({
      id: id,
      ...dto,
    });

    return await this.attacksRepository.save(attack);
  }

  async delete(id: number): Promise<void> {
    await this.attacksRepository.delete(id);
  }
}
