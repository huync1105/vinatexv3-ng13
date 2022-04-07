import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhancong',
  templateUrl: './nhancong.component.html',
  styleUrls: ['./nhancong.component.css']
})
export class NhancongComponent implements OnInit {

  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  listTenNhanVien: any = [];

  constructor(private _services: SanXuatService,) { }

  ngOnInit(): void {
    this._services.GetListUser().subscribe((res: any) => {
      this.listTenNhanVien = mapArrayForDropDown(res, 'TenNhanVien', 'IdUser');
    });
  }
  add2() {
    if (this.item.listNhanCong == undefined || this.item.listNhanCong == null)
      this.item.listNhanCong = [];
    this.item.listNhanCong.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.listNhanCong.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listNhanCong.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
