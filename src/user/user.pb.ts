import { Observable } from "rxjs";
import { User } from './interfaces/user.interface';
import { UserById } from './interfaces/user-by-id.interface';


export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
    findOne(data: UserById): Observable<User>;
    findMany(upstream: Observable<UserById>): Observable<User>;
  }

export const USER_SERVICE_NAME = 'UserService';