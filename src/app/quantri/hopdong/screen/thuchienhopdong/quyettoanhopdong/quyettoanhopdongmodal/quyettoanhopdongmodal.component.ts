
import { DateToUnix, dinhDangSo, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { ModalthongbaoComponent } from './../../../../../modal/modalthongbao/modalthongbao.component';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhMucHopDongService } from './../../../../../../services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ChondanhmucthutucthanhtoanmodalComponent } from '../chondanhmucthutucthanhtoanmodal/chondanhmucthutucthanhtoanmodal.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-quyettoanhopdongmodal',
  templateUrl: './quyettoanhopdongmodal.component.html',
  styleUrls: ['./quyettoanhopdongmodal.component.css']
})
export class QuyettoanhopdongmodalComponent implements OnInit {
  item : any = {}
  opt : any = {}
  checkbutton : any = {Ghi: true,
    Xoa: false,
    ChuyenTiep: false,
    KhongDuyet: false,};
  listHopDong: any = [];
  listHopDongFull: any = [];
  lang: any = vn;
  listDotQuyetToan: any = [];
  dinhDangSo = dinhDangSo;
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(      public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    public _modal: NgbModal,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListHopDong();
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
    else{
        this.item.listHoSoDinhKem.forEach(element => {
          element.listTen = "";
          element.listFileDinhKem.forEach(e => {
            element.listTen += `${e.fileName}` + ', ';
        });
      });
      this.item.ngayLapBienBanQT = UnixToDate(this.item.ngayLapBienBanQTUnix)
      this.item.ngayQuyetToan = UnixToDate(this.item.ngayQuyetToanUnix)
      this.KiemTraButtonModal();
      // this.getListThanhToan();
      this._service.QuyTrinhThanhToan().GetListThanhToanHopDong(this.item.idHopDong).subscribe((res1: any) => {
        this.listDotQuyetToan = res1.data;
      })
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.id || "", this.item.idTrangThai || "").subscribe((res: any) => {
        this.checkbutton = res;
      });
  }
  getListHopDong() {
    let IdDuAn = this._store.getCurrent();
    this._servicesSanXuat.GetOptions().GetDanhSachHopDongByNhaThau(IdDuAn, 0).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
      this.listHopDongFull = res;
    })
  }
  GetNextSoQuyTrinh() {
    this._service.QuyetToanHopDong().GetNextSoQuyTrinh().subscribe((res: any) => {
        this.item.soQuyTrinh = res.data;
      });
  }
  ValidData() {
    if (!validVariable(this.item.noiDung)) {
      this._toastr.error("Vui lòng chọn nội dung");
      return false;
    }
    if (!validVariable(this.item.idHopDong)) {
      this._toastr.error('Vui lòng chọn hợp đồng')
      return false
    }
    return true;
  }

  GhiLai() {
    this.item.ngayQuyetToanUnix = DateToUnix(this.item.ngayQuyetToan);
    this.item.ngayLapBienBanQTUnix = DateToUnix( this.item.ngayLapBienBanQT );
    if(this.ValidData()){
    this._service.QuyetToanHopDong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this.item.id = res.data.id;
            this.getQuyTrinh();
            this._toastr.success(res.message);
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
        this._service.QuyetToanHopDong().Delete(this.item).subscribe((res: any) => {
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
    let isChuaNopDu: any = false;
    for(let i = 0; i < this.item.listHoSoDinhKem.length; i++ ){
      if(this.item.listHoSoDinhKem[i].isNopDu !== true)
      {
        isChuaNopDu = true;
        break;
      }
    }
    if (isChuaNopDu === true) {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.message = "Bạn chưa nộp đủ tài liệu bạn chắc chắn muốn lưu quy trình này chứ?"
      modalRef.result.then(res => {
        this._service.QuyetToanHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
          if (res) {
            if (res?.statusCode === 200) {
              this._toastr.success(res.message)
              this.activeModal.close();
            } else {
              this._toastr.error(res.message);
            }
          }
        })
      }).catch()
    }
  }
  KhongDuyet() {
    this._service.QuyetToanHopDong().KhongDuyet(this.item).subscribe((res: any) => {
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
  chonDanhMuc() {
    this._servicesdmHopDong.DanhMucThuTucThanhToan().GetListAll().subscribe((res1: any) => {
      let modalRef = this._modal.open(ChondanhmucthutucthanhtoanmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.componentInstance.listHangHoa = this.item.listHoSoDinhKem;
      modalRef.componentInstance.IdQuyTrinh = this.item.id;
      modalRef.result.then(res => {
        this.item.listHoSoDinhKem= res;  
      }).catch(er => { console.log(er) });
    })
  }
  taiLenFileDinhKem(itemTable) {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      if(!validVariable( itemTable.listFileDinhKem))
        itemTable.listFileDinhKem = [];
      let item: any = {}
      item.id = '';
      item.fileNameGui = data[data.length - 1].Name;
      item.fileName = data[data.length - 1].NameLocal;
      item.Link = data[data.length - 1].Url;
      itemTable.listFileDinhKem.push(item);
      itemTable.listTen = "";
      itemTable.listFileDinhKem.forEach(element => {
        itemTable.listTen += `${element.fileName}` + ', ';
      });
    }, (reason) => {

    });
  }
  getQuyTrinh() {
    this._service.QuyetToanHopDong().Get(this.item.id).subscribe((res1: any) => {
        this.item = res1;
        this.item.ngayLapBienBanQT = UnixToDate(this.item.ngayLapBienBanQTUnix)
        this.item.ngayQuyetToan = UnixToDate(this.item.ngayQuyetToanUnix);
        this.item.listTen = "";
        this.item.listHoSoDinhKem.forEach(element => {
          element.listFileDinhKem.forEach(e => {
            element.listTen += `${e.fileName}` + ', ';
        });
      });
        this.KiemTraButtonModal();
    })
  }
  getListThanhToan(){
    let itemFind = this.listHopDongFull.filter(e => e.id === this.item.idHopDong);
    if(itemFind !== undefined)
      // this.item.giaTriHoanThanh = itemFind[0].giaTriHoanThanh;
      // this.item.khoiLuongHopDong = itemFind[0].khoiLuongHopDong;
      // this.item.giaTriHopDong = itemFind[0].giaTri;

      this.item.loai = itemFind[0].loai
      this._service.QuyTrinhThanhToan().GetListThanhToanHopDong(this.item.idHopDong).subscribe((res1: any) => {
        this.listDotQuyetToan = res1.data;
      })
      this._service.QuyetToanHopDong().GetThongTinQuyetToanByHopDong(this.item.idHopDong).subscribe((res1: any) => {
        this.item.tongGiaTriPhat = res1.data.tongGiaTriPhat;
        this.item.tongGiaTriThanhToan = res1.data.tongGiaTriThanhToan;
        this.item.giaTriHopDong = res1.data.giaTriHopDong;
        this.item.khoiLuongHopDong = res1.data.khoiLuongHopDong;
        this.item.khoiLuongDaNhan = res1.data.khoiLuongDaNhan;
        // this.item.conPhaiThanhToan = res1.data.conPhaiThanhToan;
        this.item.giaTriQuyetToan = res1.data.giaTriQuyetToan;
        this.item.conPhaiThanhToan =  this.item.giaTriQuyetToan - this.item.tongGiaTriThanhToan;
      })
  }
  tinhGiaTri(){
    this.item.giaTriQuyetToan = dinhDangSo(this.item.giaTriQuyetToan);
    this.item.conPhaiThanhToan =  this.item.giaTriQuyetToan - this.item.tongGiaTriThanhToan;
  }
}
