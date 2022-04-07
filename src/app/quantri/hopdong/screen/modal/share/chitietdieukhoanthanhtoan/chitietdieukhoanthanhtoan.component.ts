import { DateToUnix, deepCopy } from 'src/app/services/globalfunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, Input, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { ChitietdieukhoanmodalComponent } from './chitietdieukhoanmodal/chitietdieukhoanmodal.component';

@Component({
  selector: 'app-chitietdieukhoanthanhtoan',
  templateUrl: './chitietdieukhoanthanhtoan.component.html',
  styleUrls: ['./chitietdieukhoanthanhtoan.component.css']
})
export class ChitietdieukhoanthanhtoanComponent implements OnInit, DoCheck {

  item: any = {};

  @Input('listDieuKhoanThanhToan') listDieuKhoanThanhToan: any = [];
  @Input('hopDong') hopDong: any = {};

  @Output('listDieuKhoanThanhToan') itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };


  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  
  }
  ngDoCheck(): void {  
    this.itemChange.emit(this.listDieuKhoanThanhToan);
  }
  add() {
    if (this.item.ngayThanhToan !== undefined && this.item.ngayThanhToan !== null) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    }
    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitietdieukhoanmodalComponent, { size: 'xl', backdrop: 'static' });    
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.hopDong = deepCopy(this.hopDong);
    modalRef.result.then(res => {
      this.listDieuKhoanThanhToan.push(res.item);
      this.itemChange.emit(this.listDieuKhoanThanhToan);
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    if (this.item.ngayThanhToan !== undefined && this.item.ngayThanhToan !== null) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    }
    let modalRef = this._modal.open(ChitietdieukhoanmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = deepCopy(item);
    modalRef.componentInstance.hopDong = deepCopy(this.hopDong);    
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listDieuKhoanThanhToan[i] = res.item;
      this.itemChange.emit(this.listDieuKhoanThanhToan);
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listDieuKhoanThanhToan.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listDieuKhoanThanhToan.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
