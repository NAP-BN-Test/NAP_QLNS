import { Quote } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeStatusComponent } from './components/category-management/employee-status/employee-status.component';
import { HolidayComponent } from './components/category-management/holiday/holiday.component';
import { TypeTimekeepingComponent } from './components/category-management/type-timekeeping/type-timekeeping.component';
import { DecidedToIncreaseTheSalariesComponent } from './components/decided-to-increase-the-salaries/decided-to-increase-the-salaries.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { LoginComponent } from './layout/login/login.component';
import { MenuComponent } from './layout/menu/menu.component';
import { DetailStaffComponent } from './page/detail-staff/detail-staff.component';

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
      {
        path: 'employee-status',
        component: EmployeeStatusComponent,
      },
      {
        path: 'decided-increase-salaries',
        component: DecidedToIncreaseTheSalariesComponent,
      },
      {
        path: 'quote',
        component: QuoteManagementComponent,
      },
      {
        path: 'detail-staff',
        component: DetailStaffComponent,
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
