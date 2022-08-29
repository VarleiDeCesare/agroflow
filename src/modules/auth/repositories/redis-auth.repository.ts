import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createClient, RedisClientType } from 'redis';
import authConfig from 'src/config/auth.config';
import IAuthRepository from './auth-repository.interface';
import { StorageSessionDto } from '../dto/storage-session.dto';
import { Session } from '../entities/session.entity';

@Injectable()
export class RedisAuthRepository implements IAuthRepository {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: authConfig.storage.redis.url,
    });

    this.client.connect();
  }

  public async storageSession(data: StorageSessionDto): Promise<Session> {
    const { user_id } = data;

    const auth: Session = {
      id: uuidv4(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const key = user_id;
    const stringifiedAuth = JSON.stringify(auth);

    // Quando o refresh token morre não tem sentido guardar a sessão
    // por isso salvamos com um time to live da duração do refresh token
    await this.client.set(key, stringifiedAuth, {
      EX: authConfig.refreshToken.expiresIn,
    });

    return auth;
  }

  public async recoverUserSession(
    user_id: string,
  ): Promise<Session | undefined> {
    const key = user_id;

    const data = await this.client.get(key);

    if (!data) return undefined;

    return JSON.parse(data);
  }

  // public async recoverUserTokens(user_id: string): Promise<Auth[]> {
  //   const pattern = `${user_id}:*`;

  //   const keys = await this.client.keys(pattern);

  //   if (keys.length === 0) return [];

  //   const response = await Promise.all(keys.map((key) => this.client.get(key)));

  //   return response.map((string) => JSON.parse(string));
  // }

  public async removeUserSession(user_id: string): Promise<void> {
    await this.client.del(user_id);
  }

  // public async removeUserTokens(user_id: string): Promise<void> {
  //   const pattern = `${user_id}:*`;

  //   const keys = await this.client.keys(pattern);

  //   const pipeline = this.client.multi();

  //   keys.forEach((key) => {
  //     pipeline.del(key);
  //   });

  //   await pipeline.exec();
  // }

  public async removeAllSessions(): Promise<void> {
    await this.client.flushDb();
  }
}
