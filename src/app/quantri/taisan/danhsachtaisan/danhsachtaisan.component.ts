import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, formatdate, mapArrayForDropDown, } from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
// import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";

@Component({
  selector: 'app-danhsachtaisan',
  templateUrl: './danhsachtaisan.component.html',
  styleUrls: ['./danhsachtaisan.component.css']
})
export class DanhsachtaisanComponent implements OnInit {

  filter: any = {};
  Keyword: any = '';
  eAction: any = "";
  loaiTab: any = 0;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.Loaddata();
  }

  resetFilter() {
    this.filter = {};
    this.Keyword = '';
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      tabTrangThai: this.loaiTab,
      IddmLoaiTaisan: this.filter.IddmLoaiTaisan ? this.filter.IddmLoaiTaisan : '',
      Keyword: this.Keyword,
      isGiaTriCao:this.filter.isGiaTriCao,
      isCanDuTru:this.filter.isCanDuTru,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0,
      IdBoPhanSuDung:this.filter.IdBoPhanSuDung,
     
    };
    this._serviceTaiSan.ListDanhSachTaiSan().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      // this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "TenLoaiTaiSan", 'IddmLoaiTaiSan');
      let items = [];
      this.items = [];
      items = res.Data.Items;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            obj_copy.children.push({ data: element });
          });
          obj.listTaiSan = undefined;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item.Id;
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {

      });
  }

  delte(item) {

  }
  changeTab(e) {
    // this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.Loaddata();
  }
}
