import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppModuleService } from 'src/app/services/app-module.service';
import { BUTTON_TYPE, STATUS } from 'src/app/services/constant/app-constant';
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
import { DatePipe } from '@angular/common';
import { ParamsKey } from 'src/app/services/constant/paramskey';

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
  selector: 'app-keep-track-of-premiums',
  templateUrl: './keep-track-of-premiums.component.html',
  styleUrls: ['./keep-track-of-premiums.component.less'],
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
export class KeepTrackOfPremiumsComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'STT', cell: 'stt' },
      { name: 'HỌ VÀ TÊN', cell: 'nameStaff' },
      {
        name: 'LƯƠNG BHXH',
        cell: 'bhxhSalary',
      },
      {
        name: 'Cty',
        cell: 'bhxhCT',
      },
      {
        name: 'NV',
        cell: 'bhxhNV',
      },
      {
        name: 'Cty',
        cell: 'bhytCT',
      },
      {
        name: 'NV',
        cell: 'bhytNV',
      },
      {
        name: 'Cty',
        cell: 'bhtnCT',
      },
      {
        name: 'NV',
        cell: 'bhtnNV',
      },
      {
        name: 'Cty',
        cell: 'congdoanCT',
      },
      {
        name: 'NV',
        cell: 'congdoanNV',
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
    ],
  };

  displayedColumns = [
    'stt',
    'nameStaff',
    'bhxhSalary',
    'bhxhCT',
    'bhxhNV',
    'bhytCT',
    'bhytNV',
    'bhtnCT',
    'bhtnNV',
    'reduce',
    'luongTinhThueTNCN',
    'thueTNCN',
    'tongKhoanTru',
  ];

  collectionSize;
  page: number = 1;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
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
  companyBHTN;
  companyBHXH;
  companyBHYT;
  staffBHTN;
  staffBHXH;
  staffBHYT;

  async onLoadData() {
    let date = this.monthYear
      ? this.datePipe.transform(this.monthYear.value, 'yyyy-MM')
      : null;
    console.log(date);

    this.spinner.show();
    await this.mService
      .getApiService()
      .sendRequestTRACK_INSURANCE_PREMIUMS(date)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data);
          this.dataTable = data.array;
          this.companyBHTN = data.objInsurance.companyBHTN;
          this.companyBHXH = data.objInsurance.companyBHXH;
          this.companyBHYT = data.objInsurance.companyBHYT;
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
    } else {
      event.target.innerHTML = 0;
      this.dataTable[i].thueTNCN = 0;
      this.dataTable[i].tongKhoanTru = 0;
    }
  }
}
