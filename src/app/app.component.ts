import { Component } from '@angular/core';
import { MessageType } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService : CustomToastrService) {
    toastrService.message("Merhaba","Musa",{messageType :ToastrMessageType.Info,position :ToastrPosition.TopCenter});
    toastrService.message("Merhaba","Musa",{messageType :ToastrMessageType.Success,position :ToastrPosition.TopCenter});
    toastrService.message("Merhaba","Musa",{messageType :ToastrMessageType.Error,position :ToastrPosition.TopCenter});
    toastrService.message("Merhaba","Musa",{messageType :ToastrMessageType.Warning,position :ToastrPosition.TopCenter});
  }

}
