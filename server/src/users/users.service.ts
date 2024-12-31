import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dtos/update-user.dto';
import { hash } from 'bcryptjs';
import { UpdateUserRoleDto } from './dtos/update-user-role.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const hashedPassword = await hash(updateUserDto.password, 10);
    return this.usersRepository.updateUser(updateUserDto, id, hashedPassword);
  }

  async deleteUserImage(userId: string) {
    await this.usersRepository.getUser(userId);
    return this.usersRepository.deleteUserImage(userId);
  }

  async addUserImage(userId: string, imageLink: string) {
    await this.usersRepository.getUser(userId);
    return this.usersRepository.addUserImage(userId, imageLink);
  }

  async getProductsByUserId(userId: string) {
    await this.usersRepository.getUser(userId);
    return this.usersRepository.getProductsByUserId(userId);
  }

  updateUserRole(userId: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.usersRepository.updateUserRole(userId, updateUserRoleDto);
  }
}
