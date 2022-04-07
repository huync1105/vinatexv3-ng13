import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";

import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { ModalcapnhatsuachuabaoduongComponent } from '../modal/modalcapnhatsuachuabaoduong/modalcapnhatsuachuabaoduong.component';

@Component({
  selector: 'app-sucosuachua',
  templateUrl: './sucosuachua.component.html',
  styleUrls: ['./sucosuachua.component.css']
})
export class SucosuachuaComponent implements OnInit {

  filter: any = {};
  eAction: any = "BAOCAOSUCOSUACHUA";
  loaiTab: any = 0;
  paging: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: any = [];
  trangThai: any = 1;

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceHopDong: HopDongService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetFilter();
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: this.trangThai,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
    };
    this._serviceTaiSan.SuCoSuaChua().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging = res.Data;
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  add() {
    let modalRef = this._modal.open(ModalcapnhatsuachuabaoduongComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {ID:"",TaiSan:{}};
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {

      });
  }

  edit(item) {
    let modalRef = this._modal.open(ModalcapnhatsuachuabaoduongComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {

      });
  }  

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

}
