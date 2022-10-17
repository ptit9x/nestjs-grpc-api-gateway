import { Controller, Get, Inject, OnModuleInit, Param, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserById } from './interfaces/user-by-id.interface';
import { User } from './interfaces/user.interface';
import { UserServiceClient, USER_SERVICE_NAME } from './user.pb';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController implements OnModuleInit {
  private readonly items: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private userService: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
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
