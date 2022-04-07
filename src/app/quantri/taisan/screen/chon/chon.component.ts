import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon',
  templateUrl: './chon.component.html',
  styleUrls: ['./chon.component.css']
})
export class ChonComponent implements OnInit {
  item: any = {};
  items: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  ItemDaChon: any = '';
  checkedAll: boolean;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  GetList() {
    this._serviceTaiSan.NhapTaiSan().GetListNhomTaiSan(this.item.IddmLoaiTaiSan).subscribe((res: any) => {
      this.items = res.Data;
      this.items.forEach(ele => {
        ele.checked = this.ItemDaChon === ele.Id;
      })
    })
  }

  checked() {
    this.timCheck();
  }

  timCheck() {
    this.checkedAll = this.items.every(ele => ele.checked);
  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked;
    })
    this.timCheck();
  }

  FilterTree() {
    let data = [];
    data = this.items.map(ele => {
      if (ele.checked) {
        return {
          MaTaiSan: ele.Ma,
          Id: ele.Id,
          TenTaiSan: ele.Ten,
        }
      }
    })
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }
}
