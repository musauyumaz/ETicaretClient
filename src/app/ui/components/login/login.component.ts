import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider) {
        case 'GOOGLE':
          await userService.googleLogin(user, () => {
            authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          });
          break;
        case 'FACEBOOK':
          await userService.facebookLogin(user, () => {
            authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          });
          break;
      }
    });
  }

  ngOnInit(): void {}

  async login(txtUsernameOrEmail: string, txtPassword: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(txtUsernameOrEmail, txtPassword, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
