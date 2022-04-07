import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';

@Component({
  selector: 'app-modalcapnhatbaoduong',
  templateUrl: './modalcapnhatbaoduong.component.html',
  styleUrls: ['./modalcapnhatbaoduong.component.css']
})
export class ModalcapnhatbaoduongComponent implements OnInit {
  item: any = {};
  listDonVi: any = [];
  opt: any = "";
  title: any = "";
  lang: any = vn;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới";
    }
    else {
      this.title = "Cập nhật";
    }
  }

}
