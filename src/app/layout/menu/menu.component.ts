import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ModulesList } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  indexMenu: number;

  constructor(
    private ren: Renderer2,
    public dialog: MatDialog,
    public mService: AppModuleService
  ) {
    this.modulesList = ModulesList;
    this.indexMenu = this.mService.getIndexMenu();
  }

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        if (button['_elementRef']) {
          this.ren.removeClass(
            button['_elementRef'].nativeElement,
            'cdk-focused'
          );
          this.ren.removeClass(
            button['_elementRef'].nativeElement,
            'cdk-program-focused'
          );
        }
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1, trigger2, button) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
        if (trigger.menu.items.first) {
          this.ren.removeClass(
            trigger.menu.items.first['_elementRef'].nativeElement,
            'cdk-focused'
          );
          this.ren.removeClass(
            trigger.menu.items.first['_elementRef'].nativeElement,
            'cdk-program-focused'
          );
        }
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
        if (trigger.menu.items.first) {
          this.ren.removeClass(
            trigger.menu.items.first['_elementRef'].nativeElement,
            'cdk-focused'
          );
          this.ren.removeClass(
            trigger.menu.items.first['_elementRef'].nativeElement,
            'cdk-program-focused'
          );
        }
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  onClickLogout() {
    // const dialogRef = this.dialog.open(LogoutComponent, {
      // width: '500px',
    // });

    // dialogRef.afterClosed().subscribe((res) => {
      // if (res) {
        // localStorage.removeItem('user-login');
        // this.mService.publishPageRoute('login');
      // }
    // });
  }

  onclickChildMenu(indexMenu) {
    this.indexMenu = indexMenu;
    this.mService.setIndexMenu(indexMenu);
  }
}
