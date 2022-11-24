import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthService,private toastrService : CustomToastrService,private router : Router) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatılmıştır.","Oturum Kapatıldı.",{
      messageType:ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    });

  }
}

// $.get("https://localhost:7071/api/products",data => {
//   console.log(data);
// });
