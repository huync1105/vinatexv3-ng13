import { Validatable } from '@amcharts/amcharts4/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalnhapvattuluachontaisanComponent } from '../modal/modalnhapvattuluachontaisan/modalnhapvattuluachontaisan.component';
// import { ModalchontaisanCopyComponent } from '../modalchontaisan-copy/modalchontaisan-copy.component';
// import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';

@Component({
  selector: 'app-nhapvattu',
  templateUrl: './nhapvattu.component.html',
  styleUrls: ['./nhapvattu.component.css']
})
export class NhapvattuComponent implements OnInit {
  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {};
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  listNhaCungCap: any = [];
  NameFile: string;
  title: any = '';
  tongThanhTien: any = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    if (this.item.NgayUnix !== 0) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }

    this.GetListdmPhanXuong();
    this.KiemTraButtonModal();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, };
    this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).subscribe((res: any) => {
      this.listNhaCungCap = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    });
    this.getList();
  }
  Tong() {
    this.tongThanhTien = 0;
    this.item.listTaiSan.forEach(item => {
      item.ThanhTien = (item.SoLuong || 0) * (item.DonGia || 0);
      this.tongThanhTien += (item.ThanhTien || 0);
    });
  }
  getList() {
    this.Tong();
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add() {
    if (this.item.listTaiSan == undefined || this.item.listTaiSan == null)
      this.item.listTaiSan = [];
    this.item.listTaiSan.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.listTaiSan.splice(index, 1)[0];
    this.Tong();
  }
  setData() {
    this.item.NgayUnix = DateToUnix(this.item.Ngay);
    this.item.IdDuAn = this.store.getCurrent();
    this.item.IdTaiSan='';
    return this.item;
  }
  GhiLai() {
    if (this.Validate()) {
      this._serviceTaiSan.QuyTrinhNhapTu().Set(this.setData()).subscribe((res: any) => {
        console.log(this.item)
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          res.Data.Ngay = UnixToDate(res.Data.NgayUnix)
          this.item = res.Data;
          console.log(this.item)
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
          this.activeModal.close();
  
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    } else {
      this.toastr.error('Vui lòng nhập đày đủ trường bắt buộc')
    }
  }
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhNhapTu().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalnhapvattuluachontaisanComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    // modalRef.componentInstance.item = {};
    modalRef.componentInstance.item.IdBoPhanSuDung = this.item.IdBoPhanSuDung;
    modalRef.componentInstance.checkedAll = false;
    modalRef.result.then((res: any) => {
      let listKetQua = [];
      this.item.listTaiSan.forEach(Tai_San => {
        let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien !== undefined) {
          listKetQua.push(Tai_San);
        }
      });
      res.forEach(Tai_San => {
        let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien === undefined) {
          listKetQua.push(Tai_San);
        }
      });
      this.item.listTaiSan = listKetQua;
    })
      .catch((er) => {
      });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.QuyTrinhNhapTu().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.QuyTrinhNhapTu().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }
  
  Validate() {
    if (!validVariable(this.item.Ngay)) {
      return false
    }
  }
  
  
}
