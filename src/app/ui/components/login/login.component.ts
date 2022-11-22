import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userService: UserService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {}

  async login(txtUsernameOrEmail: string, txtPassword: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(txtUsernameOrEmail, txtPassword, () =>
      this.hideSpinner(SpinnerType.BallAtom)
    );
  }
}
