import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService
      .get<Product[]>({ controller: 'products' })
      .subscribe((data) => {
        for (const product of data) {
          console.log(
            `İsim : ${product.name} \n Adet:${product.stock}\n Fiyat:${product.price}\n Toplam Tutar:${product.stock * product.price}`
          );
        }
      });

    // this.httpClientService.post(
    //   {
    //     controller: 'products',
    //   },
    //   {
    //     name: 'Kalem',
    //     stock: 100,
    //     price: 15,
    //   }
    // ).subscribe(data=>console.log(data));
    // this.httpClientService.put({
    //   controller:"products"
    // },{
    //   id:"f3ff36b9-14cd-4d2e-b728-c514d90716cc",
    //   name:"Karton",
    //   stock:350,
    //   price:11
    // }).subscribe();
    // this.httpClientService
    //   .delete(
    //     { controller: 'products' },
    //     'f2606182-c9b5-4877-b363-5e830010fcdb'
    //   )
    //   .subscribe();
    // this.httpClientService.get({
    //   // baseUrl:"https://jsonplaceholder.typicode.com",
    //   // controller:"posts",
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=>console.log(data));
  }
}
