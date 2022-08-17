import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import IUsersRepository from './repositories/users-repository.interface';
import errorsMessages from '../../errors/errorsMessage';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(data: CreateUserDto) {
    const { email, password, passwordConfirmation } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException(
        errorsMessages.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password) {
      if (password !== passwordConfirmation) {
        throw new HttpException(
          errorsMessages.PASSWORDS_MUST_MATCH,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const hashedPassword = await this.hashProvider.generateHash(password);

      return this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
    }
    return this.userRepository.create(data);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
