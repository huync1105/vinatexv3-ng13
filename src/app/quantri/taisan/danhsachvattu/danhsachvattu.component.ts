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
import { Label } from "@amcharts/amcharts4/core";
import { vn } from "src/app/services/const";
import { ThanhtoanhopdongsoimodalComponent } from "../../hopdong/screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoimodal/thanhtoanhopdongsoimodal.component";
import { fakeData } from "./datafake"

@Component({
  selector: 'app-danhsachvattu',
  templateUrl: './danhsachvattu.component.html',
  styleUrls: ['./danhsachvattu.component.css']
})
export class DanhsachvattuComponent implements OnInit {

  filter: any = {};
  eAction: any = "";
  loaiTab: any = 0;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: any = [];
  listLoaiTaiSan: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listNam: any = [];
  listBoPhanSuDung: any = [];
  labelThang: any[];
  checkList: any = [];
  thang = '1';
  checkedAll: boolean = false;

  listVatTuDaChon: any = [];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private router: Router,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) {
    this.labelThang = [];
  }

  ngOnInit(): void {


    let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.filter.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listBoPhanSuDung = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.labelThang = [];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push({ label: i, value: i })
    }
    this.GetList();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth() + 1;
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: "",
      Nam: this.filter.Nam,
      Thang: this.filter.Thang,
      QuaHan: true,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
      this.CheckExist(this.items);
      this.TimCheck();
    });

  }


  KiemTraNCC() {
    // let data = {
    //   ...this.checkList,
    // };
    this._serviceTaiSan.ListDanhSachVatTu().KiemTraNCC(this.checkList).subscribe((res: any) => {
    })
  }

  checked() {
    this.items.forEach(ele => {
      if (ele.checked) {
        if (!this.listVatTuDaChon.includes(ele.Id)) { // Kiểm tra mảng tạm nhớ, nếu chưa có thì push vào
          this.listVatTuDaChon.push(ele.Id)
        }
      } else {
        if (this.listVatTuDaChon.includes(ele.Id)) { // Kiểm tra mảng tạm nhớ, nếu đã có, mà ta bỏ check thì xóa ra khỏi mảng
          let index = this.listVatTuDaChon.findIndex(a => a === ele.Id);
          this.listVatTuDaChon.splice(index, 1)
        }
      }
    });
    this.TimCheck();
  }

  CheckExist(items) {
    items.forEach(ele => {
      ele.checked = this.listVatTuDaChon.includes(ele.Id);
    })
  }
  TimCheck() {
    this.checkedAll =  this.items.every(ele => ele.checked);
  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked;
    })
    this.checked();
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    })
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;

    modalRef.result
      .then((res: any) => {
        this.GetList();
      })
      .catch((er) => {
      });
  }

  changeTab(e) {
    // this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.GetList(true);
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
}
