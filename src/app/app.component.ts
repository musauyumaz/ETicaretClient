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
  constructor() {

  }

}

// $.get("https://localhost:7071/api/products",data => {
//   console.log(data);
// });
