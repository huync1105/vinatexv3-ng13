
import { vn } from './../../../../../../../services/const';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nhansuthuchienmodal',
  templateUrl: './nhansuthuchienmodal.component.html',
  styleUrls: ['./nhansuthuchienmodal.component.css']
})
export class NhansuthuchienmodalComponent implements OnInit {
  lang: any = vn;
 
  listTrangThai: any = []
 
  opt: any = '';
  item: any = {};
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }
  accept(opt){
    // if (this.item.tempCapHang !== undefined && this.item.tempCapHang !== null) {
    //   this.item.IDdmCapHang = this.item.tempCapHang.ID;
    //   this.item.TendmCapHang = this.item.tempCapHang.Ten;
    // }
    console.log(this.item);
    
    this.activeModal.close({ opt: opt, item: this.item });
  }
}
