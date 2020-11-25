import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppModuleService } from 'src/app/services/app-module.service';
import { BUTTON_TYPE } from 'src/app/services/constant/app-constant';
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
      { name: 'HỌ VÀ TÊN', cell: 'staffName' },
      {
        name: 'LƯƠNG CHÍNH',
        cell: 'luongChinh',
      },
      {
        name: 'LƯƠNG BHXH',
        cell: 'luongBHXH',
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
        cell: 'gtGiaCanh',
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
    'staffName',
    'luongChinh',
    'luongBHXH',
    'bhxh',
    'bhyt',
    'congDoan',
    'bhtn',
    'gtGiaCanh',
    'luongTinhThueTNCN',
    'thueTNCN',
    'tongKhoanTru',
    'thucLinh',
  ];

  dataExample = [
    {
      stt: 1,
      staffName: 'Nhân viên A',
      luongChinh: '10,000,000',
      luongBHXH: '10,000,000',
      bhxh: '800,000',
      bhyt: '150,000',
      congDoan: '50,000',
      bhtn: '100,000',
      gtGiaCanh: 0,
      luongTinhThueTNCN: '10,000,000',
      thueTNCN: '1,000,000',
      tongKhoanTru: '2,100,000',
      thucLinh: '7,900,000',
    },
    {
      stt: 2,
      staffName: 'Nhân viên B',
      luongChinh: '10,000,000',
      luongBHXH: '10,000,000',
      bhxh: '800,000',
      bhyt: '150,000',
      congDoan: '50,000',
      bhtn: '100,000',
      gtGiaCanh: 0,
      luongTinhThueTNCN: '10,000,000',
      thueTNCN: '1,000,000',
      tongKhoanTru: '2,100,000',
      thucLinh: '7,900,000',
    },
    {
      stt: 3,
      staffName: 'Nhân viên C',
      luongChinh: '10,000,000',
      luongBHXH: '10,000,000',
      bhxh: '800,000',
      bhyt: '150,000',
      congDoan: '50,000',
      bhtn: '100,000',
      gtGiaCanh: 0,
      luongTinhThueTNCN: '10,000,000',
      thueTNCN: '1,000,000',
      tongKhoanTru: '2,100,000',
      thucLinh: '7,900,000',
    },
  ];

  collectionSize;
  page: number = 1;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

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

  onLoadData(page) {
    // this.spinner.show();
    // this.mService
    //   .getApiService()
    //   .sendRequestGET_LIST_MANAGEMENT_JOB_HR(page, JSON.stringify(dataSearch))
    //   .then((data) => {
    //     if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
    //       this.collectionSize = data.count;
    //       this.mService.publishEvent(EVENT_PUSH.TABLE, {
    //         page: this.page,
    //         collectionSize: this.collectionSize,
    //         listData: data.array,
    //         listTbData: this.listTbData,
    //       });
    //     }
    //   });
    // this.spinner.hide();
  }

  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event);
  }

  onClickEdit(event) {}

  onClickSort(event) {}
}
