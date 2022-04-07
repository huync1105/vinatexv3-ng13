
import { AuthenticationService } from "./../../../../../services/auth.service";
import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { FileUploader } from "ng2-file-upload";
import { ChonquycachdonggoimodalComponent } from "../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
import { ChonhanghoamodalComponent } from "../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";

import { Component, DoCheck, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CalcmodalComponent } from "src/app/quantri/modal/calcmodal/calcmodal.component";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { UploadmodalComponent } from "src/app/quantri/modal/uploadmodal/uploadmodal.component";
import { Dat09Service } from "src/app/services/callApi";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToDatePicker,
  DateToUnix,
  deepCopy,
  mapArrayForDropDown,
  merge,
  UnixToDate,
  validVariable,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: 'app-modallaphopdongsoi',
  templateUrl: './modallaphopdongsoi.component.html',
  styleUrls: ['./modallaphopdongsoi.component.css']
})
export class ModallaphopdongsoiComponent implements OnInit {
  opt: any = "add";
  title: string
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = [];
  userInfo: any;
  newItem: any = {};
  isXo: boolean = true
  isSoi: boolean = true
  lang: any = vn;
  isBongXo: boolean = true
  listdmMatHang: any = [];
  filter: any = {
    keyWord: "",
  };

  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }

  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      this.title = 'Thêm mới hợp đồng sợi';
    } else {
      this._servicesSanXuat.GetListdmItemByHangHoa(1).subscribe((res: any) => {
        this.listdmMatHang = res;
      });
      this.title = "Chỉnh sửa hợp đồng sợi";
      this.KiemTraButtonModal();
      this.GetQuyTrinh(this.item.hopDong.id);
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat
      .KiemTraButton(this.item.hopDong.id || "", this.item.hopDong.idTrangThai || "")
      .subscribe((res: any) => {
        this.checkbutton = res;
      });
  }
  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.data
      this.item.hopDong.idTrangThai = res1.data.hopDong.idTrangThai;
      this.item.hopDong.id = res1.data.hopDong.id;
      this.item.hopDong.ngayKy = UnixToDate(this.item.hopDong.ngayKyUnix);
      this.item.hopDong.ngayHieuLuc = UnixToDate(this.item.hopDong.ngayHieuLucUnix);
      this.item.hopDong.ngayGiaoHang = UnixToDate(this.item.hopDong.ngayGiaoHangUnix);
      if (this.item.listHangHoa.length > 0) {
          this.item.hopDong.thanhTien = this.item.listHangHoa.reduce((total, ele) => {
              return total + ((ele.soLuong || 0) * (ele.donGia || 0)* (1 + (ele.thueGTGT || 0)/100))}, 0)
      }
      if (this.item.hopDong.isBenBanChiu) {
        this.item.hopDong.BenBanChiu = this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.BenBanChiu;
      }
      else {
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenBanChiu = !this.item.hopDong.BenMuaChiu;
      }
      this.KiemTraButtonModal();
      if (this.item.listDieuKhoanThanhToan.length > 0) {
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.ngayThanhToan = UnixToDate(element.ngayThanhToanUnix);
          if (element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc = [];
        });
      }
      if (this.item.listBaoLanh.length > 0) {
        this.item.listBaoLanh.forEach(element => {
          element.hieuLucBaoLanh = UnixToDate(element.hieuLucBaoLanhUnix);
        });
      }
      if (validVariable(this.item.hopDong.idHopDong)) {
        this.item.hopDong.isPhuLuc = true;
      }
    })
  }
  GetNextSoQuyTrinh() {
    this._service.QuyTrinhHopDong().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.hopDong.soQuyTrinh = res.data;
    });
  }

  ValidData() {
    if (!validVariable(this.item.hopDong.tenHopDong)) {
      this._toastr.error("Vui lòng chọn tên hợp đồng");
      return false;
    }
    if (!validVariable(this.item.hopDong.soHopDong)) {
      this._toastr.error("Vui lòng chọn số hợp đồng");
      return false;
    }
    return true;
  }
  GhiLai() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
    this.item.hopDong.ngayGiaoHangUnix = DateToUnix(this.item.hopDong.ngayGiaoHang);
    if (this.item.hopDong.BenBanChiu) {
      this.item.hopDong.isBenBanChiu = true;
    }
    this.item.listHangHoa.forEach((element, index) => {
      element.thutu = index + 1;
    });
    if (this.ValidData()) {
      this._service.QuyTrinhHopDong().Set(this.item).subscribe((res: any) => {
        console.log(this.item);
        if (res) {
          if (res?.statusCode === 200) {
            this.item.Loai = 2
            this._toastr.success(res.message);
            this.GetQuyTrinh(res.data)
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._service
          .QuyTrinhHopDong()
          .Deletes(this.item.hopDong.id)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.message);
            } else {
              this._toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }
  ChuyenTiep() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
    this.item.hopDong.ngayGiaoHangUnix = DateToUnix(this.item.hopDong.ngayGiaoHang);
    if (this.item.hopDong.BenBanChiu) {
      this.item.hopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
      console.log(res);

      if (res) {
        console.log(res);
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })

  }
  KhongDuyet() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
    this.item.hopDong.ngayGiaoHangUnix = DateToUnix(this.item.hopDong.ngayGiaoHang);
    if (this.item.hopDong.BenBanChiu) {
      this.item.hopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })
  }
}
