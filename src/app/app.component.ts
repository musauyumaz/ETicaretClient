import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, {static:true})
  dynamicLoadComponentDirective : DynamicLoadComponentDirective;

  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService : DynamicLoadComponentService
  ) {
    // httpClientService.put({ controller: 'baskets' },{basketItemId:"af60d5eb-553f-4f56-8120-50b4325a9cfa",quantity:125}).subscribe((data) => {
    //   debugger;
    // });

    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message('Oturum Kapatılmıştır.', 'Oturum Kapatıldı.', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight,
    });
  }

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }
}



// $.get("https://localhost:7071/api/products",data => {
//   console.log(data);
// });
