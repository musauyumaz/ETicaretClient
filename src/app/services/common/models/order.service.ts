import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';
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
  async getOrderById(
    id: string,
    successCallback?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const observable: Observable<SingleOrder> =
      this.httpClientService.get<SingleOrder>(
        {
          controller: 'orders',
        },
        id
      );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallback())
      .catch((error) => errorCallBack(error));
    return await promiseData;
  }
  async completeOrder(id: string) {
    const observable: Observable<any> = this.httpClientService.get(
      {
        controller: 'orders',
        action: 'complete-order',
      },
      id
    );
    await firstValueFrom(observable);
  }
}
