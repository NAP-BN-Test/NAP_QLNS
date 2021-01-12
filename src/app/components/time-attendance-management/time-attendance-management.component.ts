import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-time-attendance-management',
  templateUrl: './time-attendance-management.component.html',
  styleUrls: ['./time-attendance-management.component.less'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TimeAttendanceManagementComponent implements OnInit {
  isEdit = false;
  dataSource = [];
  listDays = [];

  constructor(
    public mService: AppModuleService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.mService.LoadAppConfig(5);
    if (!this.mService.getUser()) {
      this.mService.publishPageRoute('login');
    }
  }

  async onLoadData() {
    this.spinner.show();
    this.listDays = [];
    this.displayedColumnsAll = [];
    this.displayedColumns = ['staffName'];
    let date = this.monthYear
      ? this.datePipe.transform(this.monthYear.value, 'yyyy-MM')
      : null;
    await this.mService
      .getApiService()
      .sendRequestDATA_TIMEKEEPING(date)
      .then((data) => {
        console.log(data);

        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.dataSource = data.array;
          this.listDays = data.arrayDays;
          this.getDaysInMonth();
        }
      });
    this.spinner.hide();
  }

  monthYear = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.monthYear.value;
    ctrlValue.year(normalizedYear.year());
    this.monthYear.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.monthYear.value;
    ctrlValue.month(normalizedMonth.month());
    this.monthYear.setValue(ctrlValue);
    datepicker.close();
  }

  displayedColumnsAll;
  displayedColumns;

  updateList(event, id) {
    this.mService
      .getApiService()
      .sendRequestUPDATE_TIMEKEEPING(id, event.target.innerText);
  }

  async getDaysInMonth() {
    await this.listDays.forEach((element) => {
      this.displayedColumnsAll.push({
        name: element,
        cell: element,
      });
      this.displayedColumns.push(element);
    });
    this.displayedColumns.push(
      'workingDay',
      'dayOff',
      'takeLeave',
      'holiday',
      'freeBreak'
    );
  }

  // export excel
  fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  async ExportToExcel() {
    let dataValidateExcel = [];
    let amountColumn = 0;

    let date = this.monthYear
      ? this.datePipe.transform(this.monthYear.value, 'yyyy-MM')
      : null;
    await this.mService
      .getApiService()
      .sendRequestDATA_EXPORT_EXCEL(date)
      .then((data) => {
        dataValidateExcel = data.array;
        amountColumn = data.count;
      });
    let merge = [];

    // r :số thứ tự hàng
    // c :số thứ tự cột
    for (let index = 1; index <= dataValidateExcel.length; index++) {
      if (index % 2 > 0) {
        merge.push({ s: { r: index, c: 0 }, e: { r: index + 1, c: 0 } });
        merge.push({
          s: { r: index, c: amountColumn - 1 },
          e: { r: index + 1, c: amountColumn - 1 },
        });
        merge.push({
          s: { r: index, c: amountColumn - 2 },
          e: { r: index + 1, c: amountColumn - 2 },
        });
        merge.push({
          s: { r: index, c: amountColumn - 3 },
          e: { r: index + 1, c: amountColumn - 3 },
        });
        merge.push({
          s: { r: index, c: amountColumn - 4 },
          e: { r: index + 1, c: amountColumn - 4 },
        });
        merge.push({
          s: { r: index, c: amountColumn - 5 },
          e: { r: index + 1, c: amountColumn - 5 },
        });
      }
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataValidateExcel);
    const wb: XLSX.WorkBook = {
      Sheets: { 'Dữ liệu chấm công': ws },
      SheetNames: ['Dữ liệu chấm công'],
    };

    ws['!merges'] = merge;
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, getDateNow());
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}

function getDateNow() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  return 'FileExport_' + dd + '/' + mm + '/' + yyyy;
}
