import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chiphikhac',
  templateUrl: './chiphikhac.component.html',
  styleUrls: ['./chiphikhac.component.css']
})
export class ChiphikhacComponent implements OnInit {
  
  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};

  constructor() { }

  ngOnInit(): void {
  }
 add2() {
    if (this.item.listChiPhiKhac == undefined || this.item.listChiPhiKhac == null)
      this.item.listChiPhiKhac = [];
    this.item.listChiPhiKhac.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.listChiPhiKhac.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listChiPhiKhac.push(JSON.parse(JSON.stringify(item)));
    }
  }
}

