import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageSessionDto } from '../dto/storage-session.dto';
import { Session } from '../entities/session.entity';
import IAuthRepository from './auth-repository.interface';

@Injectable()
export class MemoryAuthRepository implements IAuthRepository {
  private data: Session[] = [];

  public async storageSession(data: StorageSessionDto): Promise<Session> {
    const auth: Session = {
      id: uuidv4(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.data.push(auth);

    return auth;
  }

  public async recoverUserSession(
    user_id: string,
  ): Promise<Session | undefined> {
    return this.data.find((auth) => auth.user_id === user_id);
  }

  // public async recoverUserTokens(user_id: string): Promise<Auth[]> {
  //   return this.data.filter((auth) => auth.user_id === user_id);
  // }

  public async removeUserSession(user_id: string): Promise<void> {
    this.data = this.data.filter((auth) => auth.user_id !== user_id);
  }

  // public async removeUserTokens(user_id: string): Promise<void> {
  //   this.data = this.data.filter((auth) => auth.user_id !== user_id);
  // }

  public async removeAllSessions(): Promise<void> {
    this.data = [];
  }
}
