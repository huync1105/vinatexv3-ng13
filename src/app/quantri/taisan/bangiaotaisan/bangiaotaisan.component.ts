import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { AuthenticationService } from "src/app/services/auth.service";
import { StoreService } from "src/app/services/store.service";

import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";
import { ModalcapnhatbaogiaComponent } from "../modal/modalcapnhatbaogia/modalcapnhatbaogia.component";

@Component({
  selector: 'app-bangiaotaisan',
  templateUrl: './bangiaotaisan.component.html',
  styleUrls: ['./bangiaotaisan.component.css']
})
export class BangiaotaisanComponent implements OnInit {

  filter: any = {};
  eAction: any = "QUYTRINHBANGIAOTAISAN";
  loaiTab: any = 0;
  paging: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: any = [];
  trangThai: any = 1;

  idUser: string = '';
  listdmPhanXuong: any = [];

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceHopDong: HopDongService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private _serviceAuth: AuthenticationService,
    private store: StoreService,
    
  ) { 
    this.idUser = this._serviceAuth.currentUserValue.Id;
  }

  ngOnInit(): void {
    this.resetFilter();
    this.getListdmPhanXuong();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .BanGiaoTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.edit(res);
          });
      }
    });
  }

  changeParam(id) {
    this.router.navigate([`/quantri/taisan/bangiaotaisan/${id}`], {
      replaceUrl: true,
    })
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

  getListdmPhanXuong() {
    this._serviceDungChung.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.currentPage,
      TabTrangThai: this.trangThai,
      KeyWord: this.filter.keyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdUser: this.idUser,
      IdBoPhanSuDung: this.filter.idBoPhan,
    };
    this._serviceTaiSan.BanGiaoTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.totalCount = res.Data.TotalCount;
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  add() {
    let modalRef = this._modal.open(ModalcapnhatbaogiaComponent, {
      // size: "fullscreen-100",
      size: "xl",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.tabTrangThai = 0; 
    modalRef.componentInstance.listdmPhanXuong = this.listdmPhanXuong;   
    modalRef.componentInstance.item = {
      Id: "",
      IdTrangThai: "",
      TenTrangThai: "",
      isKetThuc: false,
      listTaiSan: [],
      listFileDinhKem: [],
      NgayBanGiao: new Date(),
      IdDuAn: this.store.getCurrent(),
    }
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {})
      .finally(()=>{
        this.Loaddata(true);
        this.changeParam(0);
      });
  }

  edit(item) {
    let modalRef = this._modal.open(ModalcapnhatbaogiaComponent, {
      size: "xl",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = "edit";
    // modalRef.componentInstance.tabTrangThai = this.trangThai;  
    modalRef.componentInstance.tabTrangThai = 0;  
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.componentInstance.item.NgayBanGiao = new Date(JSON.parse(JSON.stringify(item.Data.NgayBanGiao)));
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {
      })
      .finally(()=>{
        this.Loaddata(true);
        this.changeParam(0);
      });
  }  

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

}
