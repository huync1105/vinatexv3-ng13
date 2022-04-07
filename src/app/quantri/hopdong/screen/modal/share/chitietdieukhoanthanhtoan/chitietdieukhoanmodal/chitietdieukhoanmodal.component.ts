import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { mapArrayForDropDown, DateToUnix, deepCopy, validVariable, UnixToDate, dinhDangSo } from 'src/app/services/globalfunction';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;
  isThoiDiem: boolean = false;
  opt: any = '';
  item: any = {
    TheoHopDong: true,
    TheoGiaTri: false,
    listThanhToanThuTuc: [],
    id: "",
    giaTri: 0,
    tyLe: 0,
  };
  listLoaiThanhToan: any = []
  listTheoLoaiThanhToan: any = []
  listLoaiTheoNgay: any = []
  listTinhTrangBaoLanh: any = []
  listThuTucThanhToan_ref: any = []
  listThuTucThanhToan: any = [];
  IdQuyTrinh: any;
  hopDong: any = {};
  optionsLoaiThanhToan = [
    { label: 'Tạm ứng', value: 0 },
    { label: 'Thanh toán', value: 1 },
  ]
  listDieuKhoanThanhToan: any = {}
  dinhDangSo = dinhDangSo;

  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _modal: NgbModal,
    private _serviceDungChung: SanXuatService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetOptions();
    if (this.opt === "edit") {
      if (this.item.isTheoGiaTriHopDong) {
        this.item.TheoHopDong = this.item.isTheoGiaTriHopDong;
        this.item.TheoGiaTri = !this.item.TheoHopDong;
        this.item.ngayThanhToan = UnixToDate(this.item.ngayThanhToanUnix);
      }
      else {
        this.item.TheoGiaTri = !this.item.isTheoGiaTriHopDong;
        this.item.TheoHopDong = !this.item.TheoGiaTri;
      }
    }
  }

  GetOptions() {
    this._servicesdmHopDong
      .DanhMucTrangThaiBaoLanh()
      .GetdmTrangThaiBaoLanh()
      .subscribe((res: any) => {
        this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "ten", "id");
      });

    this._serviceDungChung
      .GetListThanhToanTheo()
      .subscribe((res: any) => {
        this.listLoaiThanhToan = mapArrayForDropDown(res, "ten", "id");
      });
  }

  toggleVisibility() {
    if (this.item.isChonThoiDiemKhac) {
      this.item.soNgayCong = undefined;
      this.item.loaiNgay = undefined;
    }
  }

  onChangeLoaiThanhToan(even) {
    console.log('onChangeLoaiThanhToan>>>>>>>>>>', even.value);
    this.item.loaiThanhToan = even.value
  }

  onChangeLoaiNgay(even) {
    console.log('onChangeLoaiNgay>>>>>>>>>>', even.value);
    this.item.theoThoiGian = even.value
  }

  chonDanhMuc() {
    let modalRef = this._modal.open(ChonthutucthanhtoanmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.listThanhToanThuTuc = deepCopy(this.item.listThanhToanThuTuc);
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.IdQuyTrinh = this.IdQuyTrinh;
    modalRef.result.then((res) => {
      this.item.listThanhToanThuTuc = res;
    }, (reason) => {
      // không
    })
  }

  accept(opt) {
    if (this.item.ngayThanhToan !== undefined && this.item.ngayThanhToan !== null) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    }
    if(this.item.soNgay == null || this.item.soNgay === undefined)
      this.item.soNgay = 0;
    if(this.item.giaTri === null)
      this.item.giaTri = 0;
    if(this.item.tyLe === null)
      this.item.tyLe = 0;
    this.item.isTheoGiaTriHopDong = this.item.TheoHopDong;
    if (this.item.loaiThanhToan!=undefined) {
      this.item.tenLoaiThanhToan = this.optionsLoaiThanhToan.find(obj => obj.value == this.item.loaiThanhToan).label;
    }
    this.activeModal.close({ opt: opt, item: this.item });
  }

  changeGiaTri() {
    if (this.item.TheoHopDong) {
      if (this.hopDong.giaTri != undefined && this.hopDong.giaTri > 0) {
        this.item.tyLe = (this.item.giaTri / this.hopDong.giaTri) * 100;
      }
      else {
        this._toastr.error("Yêu cầu nhập giá trị trong tab Hợp đồng", "Thông báo");
      }
    }
  }

  changeTyLe() {
    if (this.item.TheoHopDong) {
      if (this.hopDong.giaTri != undefined && this.hopDong.giaTri > 0) {
        this.item.giaTri = (this.item.tyLe / 100) * this.hopDong.giaTri;
      }
      else {
        this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
      }
    }
  }

  selectTheoGiaTriHopDong() {
    this.item.TheoGiaTri = !this.item.TheoHopDong;
    if (this.hopDong.giaTri != undefined && this.hopDong.giaTri > 0 && this.item.TheoHopDong === true) {
      this.item.giaTri = (this.hopDong.giaTri || 0) * (this.item.tyLe || 0);
    }
    else {
      this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
    }
  }
  selectTheoTyLeHopDong() {
    this.item.TheoGiaTri = !this.item.TheoHopDong;
    if (this.hopDong.giaTri != undefined && this.hopDong.giaTri > 0 && this.item.TheoHopDong === true) {
      this.item.tyLe = (this.item.giaTri / this.hopDong.giaTri) * 100;
    }
    else {
      this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
    }
  }
  selectTheoGiaTriDotGiaoHang() {
    this.item.TheoHopDong = !this.item.TheoGiaTri;
    this.item.tyLe = 0;
    this.item.giaTri = 0;
  }
}
