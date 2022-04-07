import { PhathopdongmodalComponent } from "./phathopdongmodal/phathopdongmodal.component";

import { ChitiethopdongbongxomodalComponent } from "./../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component";

import { number } from "@amcharts/amcharts4/core";
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

ChitiethopdongbongxomodalComponent;
@Component({
  selector: "app-phathopdong",
  templateUrl: "./phathopdong.component.html",
  styleUrls: ["./phathopdong.component.css"],
})
export class PhathopdongComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  filter: any = {};
  tuNgay: number = 0;
  denNgay: number = 0;
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  type: any = "";
  eAction: any = "PHATHOPDONG";
  nametype: any = "";
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
    private _serviceDungChung: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
          this.update(res.id);
      }
    });
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll();
    }
    this.router.navigate([`quantri/hopdongsanxuat/phathopdong/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(PhathopdongmodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {
      id: "",
      idDuAn: "",
    };
    modalRef.result
      .then((res: any) => {
        this._toastr.success("Cập nhật thành công");
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
      .catch((er) => {
        this.changeParam(0);
        this.GetListQuyTrinh();
      });
  }

  
  update(id) {
    this._service.PhatHopDong().Get(id).subscribe((res: any) => {
    let modalRef = this._modal.open(PhathopdongmodalComponent, {
      size: "fullscreen",
      backdrop: "static",
      // keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res));
    modalRef.result
      .then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
      .catch((er) => {
        this.changeParam(0);
        this.GetListQuyTrinh();
      })
    });
    }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
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
    this._service
      .PhatHopDong()
      .GetList(data)
      .subscribe((res: any) => {
        this.items = res.data.items;
        this.paging.TotalItem = res.data.totalCount;
      });
  }

  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
}
