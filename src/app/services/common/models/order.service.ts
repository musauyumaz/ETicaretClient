import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_Order } from 'src/app/contracts/order/list_order';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: 'orders' },
      order
    );
    await firstValueFrom(observable);
  }
  async getAllOrders(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: List_Order[];
    }> = this.httpClientService.get({
      controller: 'orders',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallback())
      .catch((error) => errorCallBack(error));
    return await promiseData;
  }
}
