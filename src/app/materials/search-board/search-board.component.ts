import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface ConditionFields {
  name: string;
}

export interface Fields {
  name: string;
}
@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.less'],
})
export class SearchBoardComponent implements OnInit {
  @Input('listFields') listFields = [];
  @Input('hasAdd') hasAdd = false;
  @Input('hasOption') hasOption = false;
  @Input('hasTemplate') hasTemplate = false;
  @Input('hasImport') hasImport = false;
  @Input('hasExport') hasExport = false;
  @Input('title') title = '';

  @Output('search') search = new EventEmitter();
  @Output('clickAdd') clickAdd = new EventEmitter();
  @Output('clickOption') clickOption = new EventEmitter();
  @Output('clickTemplate') clickTemplate = new EventEmitter();
  @Output('clickImport') clickImport = new EventEmitter();
  @Output('clickExport') clickExport = new EventEmitter();

  listConditions: ConditionFields[] = [
    { name: 'And' },
    { name: 'Or' },
    { name: 'Not' },
  ];

  searchNormal = true;
  myForm: FormGroup;
  hasSearch = false;

  filteredConditions: Observable<ConditionFields[]>[] = [];
  filteredFields: Observable<Fields[]>[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.removeItem(0);
  }

  createForm() {
    this.myForm = this.fb.group({
      search: [''],
      items: this.initItems(),
    });
    this.ManageNameControl(0);
  }

  initItems() {
    var formArray = this.fb.array([]);

    formArray.push(
      this.fb.group({
        conditionFields: [''],
        fields: [''],
        searchFields: [''],
      })
    );
    return formArray;
  }

  ManageNameControl(index: number) {
    var arrayControl = this.myForm.get('items') as FormArray;
    this.filteredConditions[index] = arrayControl
      .at(index)
      .get('conditionFields')
      .valueChanges.pipe(
        startWith<string | ConditionFields>(''),
        map((value) =>
          typeof value === 'string' || value === null ? value : value.name
        ),
        map((name: string | null) =>
          name ? this._filterConditions(name) : this.listConditions.slice()
        )
      );
    this.filteredFields[index] = arrayControl
      .at(index)
      .get('fields')
      .valueChanges.pipe(
        startWith<string | Fields>(''),
        map((value) =>
          typeof value === 'string' || value === null ? value : value.name
        ),
        map((name: string | null) =>
          name ? this._filterFields(name) : this.listFields.slice()
        )
      );
  }

  addNewItem() {
    const controls = <FormArray>this.myForm.controls['items'];
    let formGroup = this.fb.group({
      conditionFields: [''],
      fields: [''],
      searchFields: [''],
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1);
  }
  removeItem(i: number) {
    const controls = <FormArray>this.myForm.controls['items'];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredConditions.splice(i, 1);
    this.filteredFields.splice(i, 1);
  }

  private _filterConditions(value: string): ConditionFields[] {
    const filterValue = value.toLowerCase();
    return this.listConditions.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterFields(value: string): Fields[] {
    const filterValue = value.toLowerCase();

    return this.listFields.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFnConditions(ConditionFields?: ConditionFields): string | undefined {
    return ConditionFields ? ConditionFields.name : undefined;
  }

  displayFnFields(Fields?: Fields): string | undefined {
    return Fields ? Fields.name : undefined;
  }

  onClickClear() {
    this.myForm.reset();
  }

  onSubmit(value) {
    value.items.forEach((element) => {
      if (element.conditionFields == null || element.fields == null) {
        value.items = [];
        return;
      }
    });
    this.search.emit(value);
  }

  onClickSearch() {
    this.hasSearch = !this.hasSearch;
  }

  onClickOption(event) {
    this.clickOption.emit();
  }

  onClickAddNew() {
    this.clickAdd.emit();
  }

  onClickTemplate() {
    this.clickTemplate.emit();
  }

  onClickImport() {
    this.clickImport.emit();
  }

  onClickExport() {
    this.clickImport.emit();
  }

  // Khi nhập thông tin conditionFields chỉ cho phép nhập And Or Not không thì sẽ reset
  InputControlConditionFields(event) {
    setTimeout(() => {
      let isValueTrue = this.listConditions.filter(
        (myAlias) => myAlias === event.target.value
      );
      if (isValueTrue.length === 0) {
        this.myForm.get('items').value.forEach((element, index) => {
          if (element.conditionFields === event.target.value) {
            this.myForm
              .get('items')
              ['controls'][index].controls['conditionFields'].setValue('');
          }
        });
      }
    }, 300);
  }

  // Khi nhập thông tin Fields chỉ cho phép nhập các trường không thì sẽ reset
  InputControlFields(event) {
    setTimeout(() => {
      let isValueTrue = this.listFields.filter(
        (myAlias) => myAlias === event.target.value
      );
      if (isValueTrue.length === 0) {
        this.myForm.get('items').value.forEach((element, index) => {
          if (element.fields === event.target.value) {
            this.myForm
              .get('items')
              ['controls'][index].controls['fields'].setValue('');
          }
        });
      }
    }, 300);
  }
}
