import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateDepartmentComponent } from 'src/app/dialogs/add-update-department/add-update-department.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
})
export class DepartmentComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MÃ PHÒNG BAN/BỘ PHẬN', cell: 'departmentCode' },
      { name: 'TÊN PHÒNG BAN/BỘ PHẬN', cell: 'departmentName' },
      { name: 'CHI NHÁNH', cell: 'branchName' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [
    { name: 'MÃ PHÒNG BAN/BỘ PHẬN' },
    { name: 'TÊN PHÒNG BAN/BỘ PHẬN' },
    { name: 'CHI NHÁNH' },
  ];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  dataExample = [
    {
      stt: 0,
      departmentName: 'Bộ phận A',
      departmentCode: '12198274',
      branchName: 'Chi nhánh A',
    },
    {
      stt: 1,
      departmentName: 'Bộ phận B',
      departmentCode: '12198275',
      branchName: 'Chi nhánh B',
    },
    {
      stt: 2,
      departmentName: 'Bộ phận C',
      departmentCode: '12198276',
      branchName: 'Chi nhánh C',
    },
  ];

  constructor(
    public mService: AppModuleService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.mService.LoadAppConfig();
    // if (this.mService.getUser()) {
    //   let params: any = this.mService.handleActivatedRoute();
    //   this.page = params.page ? params.page : 1;
    this.onLoadData(this.page, this.dataSearch);
    // } else {
    //   this.mService.publishPageRoute('login');
    // }
  }

  async onLoadData(page, dataSearch) {
    // this.spinner.show();
    // await this.mService
    //   .getApiService()
    //   .sendRequestGET_LIST_LABOR_MANAGEMENT_BOOK(
    //     page,
    //     JSON.stringify(dataSearch)
    //   )
    //   .then((data) => {
    //     if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
    this.collectionSize = 3;
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      page: this.page,
      collectionSize: this.collectionSize,
      listData: this.dataExample,
      listTbData: this.listTbData,
    });
    //     }
    //   });
    // this.spinner.hide();
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateDepartmentComponent, {
      width: '900px',
    });
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateDepartmentComponent, {
      width: '900px',
      data: {
        departmentName: event.data.departmentName,
        departmentCode: event.data.departmentCode,
        branchName: event.data.branchName,
      },
    });
  }

  onClickSort(event) {
    this.dataSearch = event;
    this.onLoadData(1, event);
  }
  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.dataSearch);
  }
}
