import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import IUsersRepository from './repositories/users-repository.interface';
import errorsMessages from '../../errors/errorsMessage';
import IHashProvider from 'src/providers/HashProvider/hash-provider.interface';
import { User } from './entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

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
      delete data.passwordConfirmation;

      const hashedPassword = await this.hashProvider.generateHash(password);

      return this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
    }
    return this.userRepository.create(data);
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, password, oldPassword, passwordConfirmation } =
      updateUserDto;

    delete updateUserDto.oldPassword;
    delete updateUserDto.passwordConfirmation;

    const user: User = await this.findOne(id);

    if (email && user.email !== email) {
      const userAlreadyExists = await this.userRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new HttpException(
          errorsMessages.USER_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (password) {
      if (!oldPassword) {
        throw new HttpException(
          errorsMessages.OLD_PASSWORD_INCORRECT,
          HttpStatus.BAD_REQUEST,
        );
      }

      const oldPasswordMatches = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );

      if (!oldPasswordMatches) {
        throw new HttpException(
          errorsMessages.OLD_PASSWORD_INCORRECT,
          HttpStatus.FORBIDDEN,
        );
      }

      if (password !== passwordConfirmation) {
        throw new HttpException(
          errorsMessages.PASSWORDS_MUST_MATCH,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      return this.userRepository.update(id, {
        ...updateUserDto,
        password: hashedPassword,
      });
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);

    delete updatedUser.password;

    return updatedUser;
  }

  // Apenas usado pelo serviço de auth
  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  // Se não enviar a senha ele cria uma aleatória
  public async resetPassword(data: ResetPasswordDto): Promise<string> {
    const { userId } = data;

    let password = data?.password;

    if (!password) {
      password = uuidv4();
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    await this.userRepository.update(userId, { password: hashedPassword });

    return password;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
