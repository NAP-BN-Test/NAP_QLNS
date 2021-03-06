import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';

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
import { AddUpdateEmployeeStatusComponent } from './dialogs/add-update-employee-status/add-update-employee-status.component';
import { DecidedToIncreaseTheSalariesComponent } from './components/decided-to-increase-the-salaries/decided-to-increase-the-salaries.component';
import { AddUpdateDecidedIncreaseSalariesComponent } from './dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { AddUpdateStaffComponent } from './dialogs/add-update-staff/add-update-staff.component';
import { DetailStaffComponent } from './page/detail-staff/detail-staff.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddUpdateTrainingAfterComponent } from './dialogs/add-update-training-after/add-update-training-after.component';
import { AddUpdateTrainingBeforeComponent } from './dialogs/add-update-training-before/add-update-training-before.component';
import { AddUpdateStaffStatusComponent } from './dialogs/add-update-staff-status/add-update-staff-status.component';
import { TableReadonlyComponent } from './materials/table-readonly/table-readonly.component';
import { ContractManagementComponent } from './components/contract-management/contract-management.component';
import { AddUpdateContractComponent } from './dialogs/add-update-contract/add-update-contract.component';
import { InsuranceManagementComponent } from './components/insurance-management/insurance-management.component';
import { AddUpdateInsuranceComponent } from './dialogs/add-update-insurance/add-update-insurance.component';
import { HolidaysManagementComponent } from './components/holidays-management/holidays-management.component';
import { AddUpdateHolidaysComponent } from './dialogs/add-update-holidays/add-update-holidays.component';
import { TimeAttendanceManagementComponent } from './components/time-attendance-management/time-attendance-management.component';
import { PayrollTemplateComponent } from './components/payroll-template/payroll-template.component';
import { AddUpdateFamilyRelationshipComponent } from './dialogs/add-update-family-relationship/add-update-family-relationship.component';
import { DepartmentComponent } from './components/category-management/department/department.component';
import { BranchComponent } from './components/category-management/branch/branch.component';
import { AddUpdateDepartmentComponent } from './dialogs/add-update-department/add-update-department.component';
import { AddUpdateBranchComponent } from './dialogs/add-update-branch/add-update-branch.component';
import { KeepTrackOfPremiumsComponent } from './components/keep-track-of-premiums/keep-track-of-premiums.component';
import { RemoveComponent } from './dialogs/remove/remove.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './services/constant/app-constant';
import { DatePipe } from '@angular/common';
import { TypeContractComponent } from './components/category-management/type-contract/type-contract.component';
import { AddUpdateTypeContractComponent } from './dialogs/add-update-type-contract/add-update-type-contract.component';
import { LogoutComponent } from './dialogs/logout/logout.component';
import { TakeLeaveManagementComponent } from './components/take-leave-management/take-leave-management.component';
import { AddUpdateTakeLeaveComponent } from './dialogs/add-update-take-leave/add-update-take-leave/add-update-take-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HolidayComponent,
    EmployeeStatusComponent,
    SearchBoardComponent,
    AddUpdateTypeTimekeepingComponent,
    TablePaginatorComponent,
    AddUpdateEmployeeStatusComponent,
    DecidedToIncreaseTheSalariesComponent,
    AddUpdateDecidedIncreaseSalariesComponent,
    QuoteManagementComponent,
    AddUpdateStaffComponent,
    DetailStaffComponent,
    AddUpdateTrainingAfterComponent,
    AddUpdateTrainingBeforeComponent,
    AddUpdateStaffStatusComponent,
    TableReadonlyComponent,
    ContractManagementComponent,
    AddUpdateContractComponent,
    InsuranceManagementComponent,
    AddUpdateInsuranceComponent,
    HolidaysManagementComponent,
    AddUpdateHolidaysComponent,
    TimeAttendanceManagementComponent,
    PayrollTemplateComponent,
    AddUpdateFamilyRelationshipComponent,
    DepartmentComponent,
    BranchComponent,
    AddUpdateDepartmentComponent,
    AddUpdateBranchComponent,
    KeepTrackOfPremiumsComponent,
    RemoveComponent,
    TypeContractComponent,
    AddUpdateTypeContractComponent,
    LogoutComponent,
    TakeLeaveManagementComponent,
    AddUpdateTakeLeaveComponent,
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
    MatTabsModule,
    PipesModule,
  ],
  providers: [
    DatePipe,
    // Đổi cách display datetimepicker
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
