import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  ColumnMode
} from '../index';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>basic: fixed row height</h3>
      <datatable
        class='material striped'
        [rows]='rows'
        [options]='options'>
      </datatable>
    </div>
  `
})
export class App {

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 50,
    columns: [
      new TableColumn({ prop: 'name' }),
      new TableColumn({ name: 'Company' }),
      new TableColumn({ name: 'Gender' })
    ]
  });

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

}
