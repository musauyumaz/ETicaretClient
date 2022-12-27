import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdDate: Create_Product) {
    this.listComponents.getProducts();
  }
  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options: {
        width: '1000px',
      },
      afterClosed: () => {},
    });
  }
}
