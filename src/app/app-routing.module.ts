import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidayComponent } from './components/category-management/holiday/holiday.component';
import { TypeTimekeepingComponent } from './components/category-management/type-timekeeping/type-timekeeping.component';
import { LoginComponent } from './layout/login/login.component';
import { MenuComponent } from './layout/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'login' },
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'type-timekeeping',
        component: TypeTimekeepingComponent,
      },
      {
        path: 'holiday',
        component: HolidayComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' },
  },
  {
    path: '**',
    component: LoginComponent,
    data: { title: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
