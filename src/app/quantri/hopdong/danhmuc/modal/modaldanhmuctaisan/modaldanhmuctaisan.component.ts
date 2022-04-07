import { DATE } from '@amcharts/amcharts4/core';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { vn } from "./../../../../../services/const";

@Component({
  selector: 'app-modaldanhmuctaisan',
  templateUrl: './modaldanhmuctaisan.component.html',
  styleUrls: ['./modaldanhmuctaisan.component.css']
})
export class ModaldanhmuctaisanComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  listNhaMay: Array<any> = [];
  idDuAn: string = "";
  showDropDown: boolean = false;
  OSName: string = "HỆ THỐNG Quản lý Nhà – Đất";
  userBtn: any;
  userInfo: any;
  userSub: any;
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  filter: any;
  constructor(
    public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.getListNhaMay();

    if ( this.item.ThoiGianBatDauKhauHaoUnix !== 0) {
      this.item.ThoiGianBatDauKhauHao = UnixToDate(this.item.ThoiGianBatDauKhauHaoUnix);
    }
    if ( this.item.ThoiGianHetKhauHaoUnix !== 0) {
      this.item.ThoiGianHetKhauHao = UnixToDate(this.item.ThoiGianHetKhauHaoUnix	);
    }
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id")
      });
  }
  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã !");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên !");
      return false;
    }
    if (!validVariable(this.item.ThoiGianBatDauKhauHao)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày !");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this.Tong();

      this.item.ThoiGianBatDauKhauHaoUnix = DateToUnix(this.item.ThoiGianBatDauKhauHao);
      this.item.ThoiGianHetKhauHaoUnix	 = DateToUnix(this.item.ThoiGianHetKhauHao);

      this._danhMucHopDong.DanhMucTaiSan().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  Tong() {
    let ngaybatdau = new Date(this.item.ThoiGianBatDauKhauHao);
    let year = ngaybatdau.getFullYear() + this.item.SoNamKhauHao;
    this.item.ThoiGianHetKhauHao = new Date(ngaybatdau.setFullYear(year))
    console.log(this.item.ThoiGianHetKhauHao);
  }
}