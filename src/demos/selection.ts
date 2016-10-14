import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {
  TableOptions,
  TableColumn,
  SelectionType,
  ColumnMode
} from '../index';
import '../themes/material.scss';
import { selectAllRows } from '../utils/selection';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>selection</h3>
      <div style='float:left;width:75%'>
        <datatable
          class='material'
          [rows]='rows'
          [selected]='selections'
          [options]='options'
          (onSelectionChange)='onSelectionChange($event)'>
          <template #checkBoxHeader let-row="row" let-value="value" let-i="index">
            <input type="checkbox" (click)="selectAll(selections,rows)"
             style="height:30px;" id="AllCheckbox" aria-label="...">
          </template>
          <template #checkBoxColumn let-row="row" let-value="value" let-index="index">
            <input type="checkbox"  [(ngModel)]="row.selected" style="height:30px;" id="blankCheckbox" aria-label="...">
          </template>
        </datatable>
      </div>

      <div class='selected-column' style='float:right;width:25%;'>
        <h4>Selections</h4>
        <ul>
          <li *ngFor='let sel of selections'>
            {{sel | json}}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class App implements OnInit  {

  @ViewChild('checkBoxHeader') checkBoxHeader: TemplateRef<any>;
  @ViewChild('checkBoxColumn') checkBoxColumn: TemplateRef<any>;

  rows = [];
  selections = [];
  options: TableOptions;

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  selectAll(x,y){
    selectAllRows(x,y);
  }

  onSelectionChange(selected) {
    this.selections =  selected;
    console.log('Selection!', selected);
  }

  ngOnInit(): void {
    this.options = new TableOptions({
      columnMode: ColumnMode.force,
      headerHeight: 50,
      footerHeight: 50,
      limit: 5,
      rowHeight: 'auto',
      selectionType: SelectionType.multi,
      selectionCheckbox: true, 
      columns: [
        new TableColumn({ headerTemplate: this.checkBoxHeader, cellTemplate: this.checkBoxColumn, width: 1}),
        new TableColumn({ name: 'Name' }),
        new TableColumn({ name: 'Gender' }),
        new TableColumn({ name: 'Company' })
      ]
    });
  }

}
