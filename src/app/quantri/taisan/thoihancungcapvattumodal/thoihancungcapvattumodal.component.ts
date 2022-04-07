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
import { ModalchontaisanThanhlyCopyComponent } from '../modal/modalchontaisan-thanhly-copy/modalchontaisan-thanhly-copy.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';
import { ThoihancungcapmodalluachonComponent } from '../modal/thoihancungcapmodalluachon/thoihancungcapmodalluachon.component';


@Component({
  selector: 'app-thoihancungcapvattumodal',
  templateUrl: './thoihancungcapvattumodal.component.html',
  styleUrls: ['./thoihancungcapvattumodal.component.css']
})
export class ThoihancungcapvattumodalComponent implements OnInit {

  opt: any = "";
  title: any = "";
  listNam: any = [];
  item: any = {};
  itemNhaCungUng: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  listNhaCungUng = [];
  store: any;
  tongThanhTien: any = 0;

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
    if (this.item.NgayUnix !== 0) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
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
    // this.GetListNhaCungUng();
    this.getList();
  }

  ChonNhaCungUng(e) {
    let NhaCungUng;
    if (!validVariable(e.IddmNhaCungUng)) {
      NhaCungUng = this.itemNhaCungUng.find(ele => ele.IddmNhaCungUng === e.IdNhaCungUng);
      e.DonGia = NhaCungUng?.DonGia;
    }
  }

  GetListNhaCungUng() {
    this._serviceTaiSan.ThoiHanCungCap().GetListNhaCungUng(this.item.listTaiSan[0]?.IdTaiSan).subscribe((res: any) => {
      this.itemNhaCungUng = res.Data[0]?.listItem;
      this.listNhaCungUng = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.ThoiHanCungCap().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.item = {};
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
      this.GetListNhaCungUng();
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.NgayUnix = DateToUnix(this.item.Ngay);
    // this.item.IdDuAn = this.store.getCurrent();
    return this.item;
  }
  GhiLai() {
    this._serviceTaiSan.ThoiHanCungCap().Set(this.setData()).subscribe((res: any) => {
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

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.ThoiHanCungCap().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.ThoiHanCungCap().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.ThoiHanCungCap().Delete(this.item.Id).subscribe((res: any) => {
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

  Tong() {
    this.tongThanhTien = 0;
    this.item.listTaiSan.forEach(item => {
      item.ThanhTien = (item.SoLuong || 0) * (item.DonGia || 0);
      // this.tongThanhTien += (item.ThanhTien || 0);
    });
  }
  getList() {
    this.Tong();
  }
}