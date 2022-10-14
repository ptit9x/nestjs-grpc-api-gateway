import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
} from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { UserById } from './interfaces/user-by-id.interface';
import { User } from './interfaces/user.interface';

interface UserService {
  findOne(data: UserById): Observable<User>;
  findMany(upstream: Observable<UserById>): Observable<User>;
}

@Controller('user')
export class UserController implements OnModuleInit {
  private readonly items: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getMany(): Observable<User[]> {
    const ids$ = new ReplaySubject<UserById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.userService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<User> {
    return this.userService.findOne({ id: +id });
  }
}
