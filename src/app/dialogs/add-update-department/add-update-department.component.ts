import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-department',
  templateUrl: './add-update-department.component.html',
  styleUrls: ['./add-update-department.component.less'],
})
export class AddUpdateDepartmentComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateDepartmentComponent>
  ) {
    this.myForm = this.formBuilder.group({
      departmentName: [mData ? mData.departmentName : ''],
      departmentCode: [mData ? mData.departmentCode : ''],
      idChiNhanh: [mData ? mData.idChiNhanh : ''],
    });
  }

  filterBranch: Observable<string[]>;
  listBranch = [];

  ngOnInit() {
    this.mService.LoadAppConfig();
    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_DM_CHINHANH()
      .then((data) => {
        this.listBranch = data.array;
        this.filterBranch = this.myForm.controls.idChiNhanh.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null
              ? value
              : value.idChiNhanh
          ),
          map((name: string | null) =>
            name ? this._filterBranch(name) : this.listBranch.slice()
          )
        );
        if (this.mData) {
          this.myForm.controls.idChiNhanh.setValue(this.mData.idChiNhanh);
        }
      });
  }

  _filterBranch(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listBranch.filter((option: any) =>
      option.branchName.toLowerCase().includes(filterValue)
    );
  }

  branchDisplayFn = (value) =>
    Object.values(this.listBranch).find((branch) => branch.id === value.id)
      ?.branchName;

  onSubmit(value) {
    this.dialogRef.close({
      departmentName: value.departmentName,
      departmentCode: value.departmentCode,
      idChiNhanh: value.idChiNhanh.id,
    });
  }
}
