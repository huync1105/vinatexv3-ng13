import { NhansuthuchienmodalComponent } from './nhansuthuchienmodal/nhansuthuchienmodal.component';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-chitietnhansuthuchien',
//   templateUrl: './chitietnhansuthuchien.component.html',
//   styleUrls: ['./chitietnhansuthuchien.component.css']
// })
// export class ChitietnhansuthuchienComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { DateToUnix } from 'src/app/services/globalfunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, Input, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
// import { ChitietdieukhoanmodalComponent } from './chitietdieukhoanmodal/chitietdieukhoanmodal.component';

@Component({
  selector: 'app-chitietnhansuthuchien',
  templateUrl: './chitietnhansuthuchien.component.html',
  styleUrls: ['./chitietnhansuthuchien.component.css']
})
export class ChitietnhansuthuchienComponent implements OnInit, DoCheck {

  item: any = {};

  @Input() listNhanSu: any = [];
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };


  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.listNhanSu);

  }
  add() {


    this.item.ngayBatDauUnix = DateToUnix(this.item.ngayBatDau);
    this.item.ngayKetThucUnix = DateToUnix(this.item.ngayKetThuc);
    this.item.ngayQuyetDinhUnix = DateToUnix(this.item.ngayQuyetDinh);
    let modalRef = this._modal.open(NhansuthuchienmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: "",


    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listNhanSu.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    let modalRef = this._modal.open(NhansuthuchienmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listNhanSu.splice(i, 1);
      this.listNhanSu.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  
  delete(i) {
    let item = this.listNhanSu.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listNhanSu.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listNhanSu[i].isXoa = true;
    // this.listNhanSu.push(this.listNhanSu.splice(i,1));
    console.log(item);
    console.log(this.listNhanSu);
  }
}
