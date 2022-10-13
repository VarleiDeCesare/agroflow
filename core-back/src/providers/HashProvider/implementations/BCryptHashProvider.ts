import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcryptjs';
import IHashProvider from '../hash-provider.interface';

@Injectable()
export default class BCryptHashProvider implements IHashProvider {
  async generateHash(
    payload: string,
    salt: string | number = 8,
  ): Promise<string> {
    return hash(payload, salt);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
