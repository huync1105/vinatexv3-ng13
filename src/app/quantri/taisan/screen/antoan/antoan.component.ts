import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-antoan',
  templateUrl: './antoan.component.html',
  styleUrls: ['./antoan.component.css']
})
export class AntoanComponent implements OnInit {

  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};

  constructor(public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  addThongSo() {
    if (this.item === undefined || this.item === null)
    this.item = [];
    this.item.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.push(JSON.parse(JSON.stringify(item)));
    }
  }

}