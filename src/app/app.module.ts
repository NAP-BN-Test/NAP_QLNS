import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from './layout/menu/menu.component';
import { TypeTimekeepingComponent } from './components/category-management/type-timekeeping/type-timekeeping.component';
import { HolidayComponent } from './components/category-management/holiday/holiday.component';
import { EmployeeStatusComponent } from './components/category-management/employee-status/employee-status.component';
import { SearchBoardComponent } from './materials/search-board/search-board.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddUpdateTypeTimekeepingComponent } from './dialogs/add-update-type-timekeeping/add-update-type-timekeeping.component';
import { TablePaginatorComponent } from './materials/table-paginator/table-paginator.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddUpdateHolidayComponent } from './dialogs/add-update-holiday/add-update-holiday.component';
import { AddUpdateEmployeeStatusComponent } from './dialogs/add-update-employee-status/add-update-employee-status.component';
import { DecidedToIncreaseTheSalariesComponent } from './components/decided-to-increase-the-salaries/decided-to-increase-the-salaries.component';
import { AddUpdateDecidedIncreaseSalariesComponent } from './dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { AddUpdateStaffComponent } from './dialogs/add-update-staff/add-update-staff.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    TypeTimekeepingComponent,
    HolidayComponent,
    EmployeeStatusComponent,
    SearchBoardComponent,
    AddUpdateTypeTimekeepingComponent,
    TablePaginatorComponent,
    AddUpdateHolidayComponent,
    AddUpdateEmployeeStatusComponent,
    DecidedToIncreaseTheSalariesComponent,
    AddUpdateDecidedIncreaseSalariesComponent,
    QuoteManagementComponent,
    AddUpdateStaffComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
