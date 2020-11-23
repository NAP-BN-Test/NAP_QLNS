import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppModuleService } from 'src/app/services/app-module.service';
import { EVENT_PUSH } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-table-readonly',
  templateUrl: './table-readonly.component.html',
  styleUrls: ['./table-readonly.component.less'],
})
export class TableReadonlyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input('hasPagination') hasPagination = true;

  @Output('clickPagination') clickPagination = new EventEmitter();

  listTbData: any;
  itemPerPage = localStorage.getItem('item-per-page')
    ? JSON.parse(localStorage.getItem('item-per-page'))
    : 10;
  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  displayedColumns: string[] = [];
  displayedColumnsAll: any[] = [];
  displayedColumnsAction: any[] = [];

  page;
  collectionSize;

  dataSource: MatTableDataSource<any>;

  dataSubscribe: any;

  constructor(public mService: AppModuleService) {}

  ngOnInit() {
    // Bắt event thay đổi list
    this.dataSubscribe = this.mService.currentEvent.subscribe((sData) => {
      // event update data trong bảng
      if (sData.name == EVENT_PUSH.TABLE) {
        //thông tin pagination
        this.page = sData.params.page;
        this.collectionSize = sData.params.collectionSize;
        //thông tin data trong bảng
        this.dataSource = new MatTableDataSource(sData.params.listData);
        this.dataSource.sort = this.sort;

        //thông tin setup bảng
        this.displayedColumns = [];
        this.displayedColumnsAll = [];
        this.listTbData = sData.params.listTbData;

        setTimeout(() => {
          this.listTbData.listColum.forEach((item) => {
            this.displayedColumns.push(item.cell);
          });
          this.displayedColumnsAll = this.listTbData.listColum;
        });
      }
    });
  }

  ngOnDestroy() {
    this.dataSubscribe.unsubscribe();
  }

  /** Event when click pagination */
  onClickPagination(event) {
    if (event) {
      this.mService.getApiService().setItemPerPage(event.pageSize);
      this.clickPagination.emit(event.pageIndex + 1);
    }
  }
}
