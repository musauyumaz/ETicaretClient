import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { List_User } from 'src/app/contracts/users/list_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> =
      this.httpClientService.post<CreateUser | User>(
        {
          controller: 'users',
        },
        user
      );

    return (await firstValueFrom(observable)) as CreateUser;
  }
  async updatePassword(
    userId: string,
    resetToken: string,
    password: string,
    passwordConfirm: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: 'users', action: 'update-password' },
      {
        userId: userId,
        resetToken: resetToken,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    const promiseData: Promise<any> = await firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));

    await promiseData;
  }
  async getAllUsers(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{
      totalUsersCount: number;
      users: List_User[];
    }> = this.httpClientService.get({
      controller: 'users',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));
    return await promiseData;
  }
  async assignRoleToUser(
    userId: string,
    roles: string[],
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'assign-role-to-user',
      },
      { userId: userId, roles: roles }
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack())
      .catch((error) => errorCallBack(error));

    await promiseData;
  }
  async getRolesToUser(
    userId: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) :Promise<string[]>{
    const observable: Observable<{userRoles : string[]}> = this.httpClientService.get(
      {
        controller: 'users',
        action: 'get-roles-to-user',
      },
      userId
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack())
      .catch((error) => errorCallBack(error));

    return (await promiseData).userRoles;
  }
}
