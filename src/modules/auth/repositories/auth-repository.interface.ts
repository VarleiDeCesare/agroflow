import { StorageSessionDto } from '../dto/storage-session.dto';
import { Session } from '../entities/session.entity';

export default interface IAuthRepository {
  storageSession(data: StorageSessionDto): Promise<Session>;
  recoverUserSession(user_id: string): Promise<Session | undefined>;
  removeUserSession(user_id: string): Promise<void>;
  removeAllSessions(): Promise<void>;
}
