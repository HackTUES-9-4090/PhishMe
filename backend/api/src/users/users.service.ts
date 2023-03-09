import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: UserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(dto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, dto: UserDto): Promise<UserEntity> {
    const user = this.usersRepository.create({
      id: id,
      ...dto,
    });

    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
