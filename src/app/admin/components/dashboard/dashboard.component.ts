import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService
  ) {
    super(spinner);
    // signalRService.start(HubUrls.OrderHub);
    // signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(
      HubUrls.OrderHub,
      ReceiveFunctions.OrderAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          position: Position.TopCenter,
          messageType: MessageType.Notify,
        });
      }
    );
    this.signalRService.on(
      HubUrls.ProductHub,
      ReceiveFunctions.ProductAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          position: Position.TopRight,
          messageType: MessageType.Notify,
        });
      }
    );
  }

  m() {
    this.alertify.message('Merhaba', {
      messageType: MessageType.Success,
      delay: 5,
      position: Position.TopRight,
    });
  }
  d() {
    this.alertify.dismiss();
  }
}
