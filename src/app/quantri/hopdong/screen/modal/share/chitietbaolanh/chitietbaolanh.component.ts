
import { DateToUnix } from 'src/app/services/globalfunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, Input, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { ChitietbaolanhmodalComponent } from './chitietbaolanhmodal/chitietbaolanhmodal.component';


@Component({
  selector: 'app-chitietbaolanh',
  templateUrl: './chitietbaolanh.component.html',
  styleUrls: ['./chitietbaolanh.component.css']
})
export class ChitietbaolanhComponent implements OnInit, DoCheck {

  item: any = {};
  
  @Input('listBaoLanh') listBaoLanh: any = {};
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };


  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    console.log(this.itemChange.emit(this.listBaoLanh));
    
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.listBaoLanh);

  }
  add() {
    this.item.hieuLucBaoLanhUnix = DateToUnix(this.item.hieuLucBaoLanh);
    let modalRef = this._modal.open(ChitietbaolanhmodalComponent, { size: 'xl', backdrop: 'static' });   
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listBaoLanh.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    if(item.listFileDinhKem === null)
      item.listFileDinhKem = [];
    let modalRef = this._modal.open(ChitietbaolanhmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    // modalRef.componentInstance.item.hieuLucBaoLanh = new Date(item.hieuLucBaoLanh);
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listBaoLanh.splice(i, 1);
      this.listBaoLanh.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listBaoLanh.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listBaoLanh.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listBaoLanh[i].isXoa = true;
    // this.listBaoLanh.push(this.listBaoLanh.splice(i,1));
    console.log(item);
    console.log(this.listBaoLanh);
  }
}
