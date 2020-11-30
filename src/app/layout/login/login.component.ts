import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  LOCAL_STORAGE_KEY,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string = '';
  password: string = '';
  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    if (localStorage.getItem(LOCAL_STORAGE_KEY.USER_LOGIN)) {
      let userInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.USER_LOGIN)
      );
      this.username = userInfo.username;
      this.password = userInfo.password;
      this.onClickLogin();
    }
  }

  onClickLogin() {
    // this.mService
    //   .getApiService()
    //   .sendRequestLOGIN(this.username, this.password)
    //   .then((data) => {
    //     if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
    //       this.mService.setUser(data.obj);
    //       this.mService.setToken(data.token);
    this.mService.setIndexMenu('1');
    //       this.mService.getApiService().setUserInfo(data.obj);
    this.router.navigate(['menu/quote'], {
      queryParams: { page: 1 },
    });
    //       } else {
    //         this.dialog.open(DialogErrorLogin);
    //       }
    //     });
  }
}

@Component({
  selector: 'dialog-error-login',
  templateUrl: 'dialog-error-login.html',
})
export class DialogErrorLogin {}
