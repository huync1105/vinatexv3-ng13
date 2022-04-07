import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachonloaibaoduong',
  templateUrl: './modalluachonloaibaoduong.component.html',
  styleUrls: ['./modalluachonloaibaoduong.component.css']
})
export class ModalluachonloaibaoduongComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: any = [];
  item: any = [];
  listItemDaChon: any = [];
  Lay_Chon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
    // console.log(this.Lay_Chon);
    // console.log(this.Lay_Chon[0]?.listLichBaoDuong);
    
  }

  GetList() {
    this.items = this.Lay_Chon;
   console.log(this.items);
    this.items.forEach(obj => {
      obj.checked = this.listItemDaChon.includes(obj.IddmLoaiBaoDuong);
    });
    this.checkedAll = this.items.every(ele => ele.checked);
  }
  TimCheck() {
     let cha: boolean = false;
    cha = this.items.every(ele => ele.checked);
    if ((cha)) {
      return true;
    }
    else {
      return false;
    }
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.checked = true;
      });
    }
  }
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.checked) {
        data.push({
          IddmLoaiBaoDuong: obj.IddmLoaiBaoDuong,
          Id: '',
          TendmLoaiBaoDuong: obj.TendmLoaiBaoDuong,
        });
      }
    });
    return data;
  }
  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}