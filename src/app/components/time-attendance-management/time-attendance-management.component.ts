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
  constructor() {}
  ngOnInit() {
    // console.log(getDaysInMonth(2, 2021));
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

  dataExample = [
    {
      id: 1,
      nameStaff: 'Nhân viên A',
      ngayLV: 24,
      ngayN: 6,
      nghiPhep: 0,
      nghiLe: 0,
      nghiTuDo: 0,
      '01/11': 'lv',
      '02/11': 'lv',
      '03/11': 'lv',
      '04/11': 'lv',
      '05/11': 'lv',
      '06/11': 'lv',
      '07/11': 'lv',
      '08/11': 'lv',
      '09/11': 'lv',
      '10/11': 'lv',
      '11/11': 'lv',
      '12/11': 'lv',
      '13/11': 'lv',
      '14/11': 'lv',
      '15/11': 'lv',
      '16/11': 'lv',
      '17/11': 'lv',
      '18/11': 'lv',
      '19/11': 'lv',
      '20/11': 'lv',
      '21/11': 'lv',
      '22/11': 'lv',
      '23/11': 'lv',
      '24/11': 'lv',
      '25/11': 'lv',
      '26/11': 'lv',
      '27/11': 'lv',
      '28/11': 'lv',
      '29/11': 'lv',
      '30/11': 'lv',
    },
    {
      nameStaff: 'Nhân viên A Nhân viên A',
      ngayLV: 24,
      ngayN: 6,
      nghiPhep: 0,
      nghiLe: 0,
      nghiTuDo: 0,
      '01/11': 'lv',
      '02/11': 'lv',
      '03/11': 'lv',
      '04/11': 'lv',
      '05/11': 'lv',
      '06/11': 'lv',
      '07/11': 'lv',
      '08/11': 'lv',
      '09/11': 'lv',
      '10/11': 'lv',
      '11/11': 'lv',
      '12/11': 'lv',
      '13/11': 'lv',
      '14/11': 'lv',
      '15/11': 'lv',
      '16/11': 'lv',
      '17/11': 'lv',
      '18/11': 'lv',
      '19/11': 'lv',
      '20/11': 'lv',
      '21/11': 'lv',
      '22/11': 'lv',
      '23/11': 'lv',
      '24/11': 'lv',
      '25/11': 'lv',
      '26/11': 'lv',
      '27/11': 'lv',
      '28/11': 'lv',
      '29/11': 'lv',
      '30/11': 'lv',
    },
    {
      nameStaff: 'Nhân viên A',
      ngayLV: 24,
      ngayN: 6,
      nghiPhep: 0,
      nghiLe: 0,
      nghiTuDo: 0,
      '01/11': 'lv',
      '02/11': 'lv',
      '03/11': 'lv',
      '04/11': 'lv',
      '05/11': 'lv',
      '06/11': 'lv',
      '07/11': 'lv',
      '08/11': 'lv',
      '09/11': 'lv',
      '10/11': 'lv',
      '11/11': 'lv',
      '12/11': 'lv',
      '13/11': 'lv',
      '14/11': 'lv',
      '15/11': 'lv',
      '16/11': 'lv',
      '17/11': 'lv',
      '18/11': 'lv',
      '19/11': 'lv',
      '20/11': 'lv',
      '21/11': 'lv',
      '22/11': 'lv',
      '23/11': 'lv',
      '24/11': 'lv',
      '25/11': 'lv',
      '26/11': 'lv',
      '27/11': 'lv',
      '28/11': 'lv',
      '29/11': 'lv',
      '30/11': 'lv',
    },
  ];

  displayedColumnsAll = [
    { name: '01/11', cell: '01/11' },
    { name: '02/11', cell: '02/11' },
    { name: '03/11', cell: '03/11' },
    { name: '04/11', cell: '04/11' },
    { name: '05/11', cell: '05/11' },
    { name: '06/11', cell: '06/11' },
    { name: '07/11', cell: '07/11' },
    { name: '08/11', cell: '08/11' },
    { name: '09/11', cell: '09/11' },
    { name: '10/11', cell: '10/11' },
    { name: '11/11', cell: '11/11' },
    { name: '12/11', cell: '12/11' },
    { name: '13/11', cell: '13/11' },
    { name: '14/11', cell: '14/11' },
    { name: '15/11', cell: '15/11' },
    { name: '16/11', cell: '16/11' },
    { name: '17/11', cell: '17/11' },
    { name: '18/11', cell: '18/11' },
    { name: '19/11', cell: '19/11' },
    { name: '20/11', cell: '20/11' },
    { name: '21/11', cell: '21/11' },
    { name: '22/11', cell: '22/11' },
    { name: '23/11', cell: '23/11' },
    { name: '24/11', cell: '24/11' },
    { name: '25/11', cell: '25/11' },
    { name: '26/11', cell: '26/11' },
    { name: '27/11', cell: '27/11' },
    { name: '28/11', cell: '28/11' },
    { name: '29/11', cell: '29/11' },
    { name: '30/11', cell: '30/11' },
  ];

  displayedColumns = [
    'nameStaff',
    '01/11',
    '02/11',
    '03/11',
    '04/11',
    '05/11',
    '06/11',
    '07/11',
    '08/11',
    '09/11',
    '10/11',
    '11/11',
    '12/11',
    '13/11',
    '14/11',
    '15/11',
    '16/11',
    '17/11',
    '18/11',
    '19/11',
    '20/11',
    '21/11',
    '22/11',
    '23/11',
    '24/11',
    '25/11',
    '26/11',
    '27/11',
    '28/11',
    '29/11',
    '30/11',
    'ngayLV',
    'ngayN',
    'nghiPhep',
    'nghiLe',
    'nghiTuDo',
  ];

  updateList(event, i, row, item) {
    console.log(event);
    console.log(i);
    console.log(row);
    console.log(item);
  }
}

// function getDaysInMonth(month, year) {
//   return new Date(year, month, 0).getDate();
// }
