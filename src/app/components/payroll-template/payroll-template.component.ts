import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
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
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { DatePipe } from '@angular/common';

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
  selector: 'app-payroll-template',
  templateUrl: './payroll-template.component.html',
  styleUrls: ['./payroll-template.component.less'],
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
export class PayrollTemplateComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'STT', cell: 'stt' },
      { name: 'HỌ VÀ TÊN', cell: 'nameStaff' },
      {
        name: 'LƯƠNG CHÍNH',
        cell: 'workingSalary',
      },
      {
        name: 'LƯƠNG BHXH',
        cell: 'bhxhSalary',
      },
      {
        name: 'BHXH 8%',
        cell: 'bhxh',
      },
      {
        name: 'BHYT 1.5%',
        cell: 'bhyt',
      },
      {
        name: 'CÔNG ĐOÀN',
        cell: 'congDoan',
      },
      {
        name: 'BHTN 1%',
        cell: 'bhtn',
      },
      {
        name: 'GT GIA CẢNH',
        cell: 'reduce',
      },
      {
        name: 'LƯƠNG TÍNH THUẾ TNCN',
        cell: 'luongTinhThueTNCN',
      },
      {
        name: 'THUẾ TNCN',
        cell: 'thueTNCN',
      },
      {
        name: 'TỔNG CÁC KHOẢN TRỪ',
        cell: 'tongKhoanTru',
      },
      { name: 'THỰC LĨNH', cell: 'thucLinh' },
    ],
  };

  displayedColumns = [
    'stt',
    'nameStaff',
    'workingSalary',
    'bhxhSalary',
    'bhxh',
    'bhyt',
    'bhtn',
    'reduce',
    'luongTinhThueTNCN',
    'thueTNCN',
    'tongKhoanTru',
    'thucLinh',
  ];

  staffBHTN;
  staffBHXH;
  staffBHYT;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig(2);
    if (!this.mService.getUser()) {
      this.mService.publishPageRoute('login');
    }
  }

  isEdit = false;

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

  dataTable;

  async onLoadData() {
    let date = this.monthYear
      ? this.datePipe.transform(this.monthYear.value, 'yyyy-MM')
      : null;
    console.log(date);

    this.spinner.show();
    await this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_BANGLUONG(date)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data);
          this.dataTable = data.array;
          this.staffBHTN = data.objInsurance.staffBHTN;
          this.staffBHXH = data.objInsurance.staffBHXH;
          this.staffBHYT = data.objInsurance.staffBHYT;
        }
      });
    this.spinner.hide();
  }

  compute(event, element, i) {
    let salaryTaxCompute = Number(event.target.innerHTML);
    if (salaryTaxCompute || salaryTaxCompute === 0) {
      this.dataTable[i].thueTNCN = salaryTaxCompute - this.dataTable[i].reduce;
      this.dataTable[i].tongKhoanTru =
        this.dataTable[i].thueTNCN +
        (element.bhxhSalary * this.staffBHTN) / 100 +
        (element.bhxhSalary * this.staffBHXH) / 100 +
        (element.bhxhSalary * this.staffBHYT) / 100;
      this.dataTable[i].thucLinh =
        element.workingSalary - this.dataTable[i].tongKhoanTru;
    } else {
      event.target.innerHTML = 0;
      this.dataTable[i].thueTNCN = 0;
      this.dataTable[i].tongKhoanTru = 0;
      this.dataTable[i].thucLinh = 0;
    }
  }
}
