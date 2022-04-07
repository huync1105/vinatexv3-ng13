

import { AuthenticationService } from "./../../../../../services/auth.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
  validVariable,
} from "src/app/services/globalfunction";

@Component({
  selector: 'app-modallaphopdongbongxo',
  templateUrl: './modallaphopdongbongxo.component.html',
  styleUrls: ['./modallaphopdongbongxo.component.css']
})

export class ModallaphopdongbongxoComponent implements OnInit {
  opt: any = "add";
  title: string
  item: any = {};
  hopDong: any = {};
  listLoaiMatHang: any = []
  listLoaiMatHang_ref: any = []
  listDieuKhoanThanhToan: any = [];
  userInfo: any;
  newItem: any = {};
  isBong: boolean = true
  filter: any = {
    keyWord: "",
  };
  lang: any = vn;

  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  };
Id:any = "";
  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      this.title = 'Thêm mới hợp đồng bông xơ'
      this.item.listHangHoa[0].DonGiaThanhToan = 0;
      this.item.listHangHoa[0].donGia = 0;
    } else {
      this.title = "Chỉnh sửa hợp đồng bông xơ"
      this.GetQuyTrinh();
    }
    this._servicesSanXuat.GetListdmLoaiBongForHopDong(this.item.hopDong.loai || 0).subscribe((res: any) => {
      this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
      this.listLoaiMatHang_ref = res;
    })
  }
  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.hopDong.id || "", this.item.hopDong.idTrangThai || "").subscribe((res: any) => {
        this.checkbutton = res;
      });
  }

  GetNextSoQuyTrinh() {
    this._service.QuyTrinhHopDong().GetNextSoQuyTrinh().subscribe((res: any) => {
        this.item.hopDong.soQuyTrinh = res.data;
      });
  }
  GetQuyTrinh() {
    this._service.QuyTrinhHopDong().Get(this.Id).subscribe((res1: any) => {
      this.item = res1.data
      this.item.hopDong.idTrangThai = res1.data.hopDong.idTrangThai;
      this.item.hopDong.id = res1.data.hopDong.id;
      this.item.hopDong.ngayKy = UnixToDate(this.item.hopDong.ngayKyUnix);
      this.item.hopDong.ngayHieuLuc = UnixToDate(this.item.hopDong.ngayHieuLucUnix );
      this.item.hopDong.ngayGiaoHang = UnixToDate(this.item.hopDong.ngayGiaoHangUnix);
      this.item.hopDong.ngayDuKienVeKho = UnixToDate(this.item.hopDong.ngayDuKienVeKhoUnix);
      if(this.item.listHangHoa.length > 0){
        this.item.listHangHoa[0].DonGiaThanhToan =  (this.item.listHangHoa[0].donGia || 0) * 1.1;
        this.item.listHangHoa[0].giaTriHopDongMatHang =  (this.item.listHangHoa[0].DonGiaThanhToan || 0) * (this.item.listHangHoa[0].soLuong || 0);
      }
        this.item.hopDong.BenBanChiu = this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.BenBanChiu;
      
      this.KiemTraButtonModal();
      if(this.item.listDieuKhoanThanhToan.length > 0){
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.ngayThanhToan = UnixToDate(element.ngayThanhToanUnix);
          if(element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc  = [];
        });
      }
      if(this.item.listBaoLanh.length > 0){
        this.item.listBaoLanh.forEach(element => {
          element.hieuLucBaoLanh = UnixToDate(element.hieuLucBaoLanhUnix);
        });
      }
      if(validVariable(this.item.hopDong.idHopDong))
      {
        this.item.hopDong.isPhuLuc = true;
      }
    })
  }
  ValidData() {
    if (!validVariable(this.item.hopDong.iddmLoaiHopDong)) {
      this._toastr.error("Vui lòng chọn loại hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.hopDong.tenHopDong)) {
      this._toastr.error("Vui lòng chọn tên hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.hopDong.soHopDong)) {
      this._toastr.error("Vui lòng chọn số hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.hopDong.loai)) {
      this._toastr.error("Vui lòng chọn loại hàng hóa");
      return false;
    }
    return true;
  }

  GhiLai() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
    this.item.hopDong.ngayGiaoHangUnix = DateToUnix(this.item.hopDong.ngayGiaoHang);
    this.item.hopDong.ngayDuKienVeKhoUnix = DateToUnix(this.item.hopDong.ngayDuKienVeKho);
    if (this.item.hopDong.BenBanChiu) {
      this.item.hopDong.isBenBanChiu = true;
    }
    if (this.ValidData()) {
      this._service.QuyTrinhHopDong().Set(this.item).subscribe((res: any) => {
          console.log(res);
          if (res) {
            if (res?.statusCode === 200) {
              this._toastr.success(res.message);
              this.Id = res.data;
              this.GetQuyTrinh()
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
    this.item.hopDong.ngayDuKienVeKhoUnix = DateToUnix(this.item.hopDong.ngayDuKienVeKho);

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
    this.item.hopDong.ngayDuKienVeKhoUnix = DateToUnix(this.item.hopDong.ngayDuKienVeKho);

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
