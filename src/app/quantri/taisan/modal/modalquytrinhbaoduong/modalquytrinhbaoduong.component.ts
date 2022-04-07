import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongluachontaisanComponent } from '../modalbaoduongluachontaisan/modalbaoduongluachontaisan.component';


@Component({
  selector: 'app-modalquytrinhbaoduong',
  templateUrl: './modalquytrinhbaoduong.component.html',
  styleUrls: ['./modalquytrinhbaoduong.component.css']
})
export class ModalquytrinhbaoduongComponent implements OnInit {
  opt: any = "";
  listNam: any = [];
  item: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  store: any;

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.item.NgayBaoDuongUnix !== 0) {
      this.item.NgayBaoDuong = UnixToDate(this.item.NgayBaoDuongUnix);
    }
    this.GetNextSoQuyTrinh();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }

    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();

    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });

    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhBaoDuong().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  ThemMoiDanhSachTaiSan() {
    // if (!validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.IdDmLoaiTaiSan)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc !");
    //   return;
    // }
    let modalRef = this._modal.open(ModalbaoduongluachontaisanComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {

      let listKetQua = [];
      this.item.listTaiSan.forEach(Tai_San => {
        let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien !== undefined) {
          listKetQua.push(Tai_San);
        }
      });
      // vong lap 2
      res.forEach(Tai_San => {
        let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien === undefined) {
          listKetQua.push(Tai_San);
        }
      });
      this.item.listTaiSan = listKetQua;
      console.log(this.item.listTaiSan)
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.NgayBaoDuongUnix = DateToUnix(this.item.NgayBaoDuong);

    // if (!validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.IddmLoaiTaiSan)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc !");
    //   return;
    // }
    // this.item.IdDuAn = this.store.getCurrent();
    return this.item;
  }
  ValidateData() {
    if (!validVariable(this.item.NgayBaoDuong)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
      return false;
    }
    return true;
  }
  GhiLai() {
    if (this.ValidateData()) {
    this._serviceTaiSan.QuyTrinhBaoDuong().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.item = res.Data;
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.QuyTrinhBaoDuong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.QuyTrinhBaoDuong().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.QuyTrinhBaoDuong().Delete(this.item.Id).subscribe((res: any) => {
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
  changeTab(e) {
    // this.trangThai = e.index + 1;
    // this.loaiTab = e.index;
    // this.Loaddata(true);
  }
  delete(index) {
    let item = this.item.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listTaiSan.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
