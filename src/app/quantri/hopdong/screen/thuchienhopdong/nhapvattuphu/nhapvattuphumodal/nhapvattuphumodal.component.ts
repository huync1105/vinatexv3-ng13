import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nhapvattuphumodal',
  templateUrl: './nhapvattuphumodal.component.html',
  styleUrls: ['./nhapvattuphumodal.component.css']
})
export class NhapvattuphumodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listMatHang: any = [];
  listHopDong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  nametype: any = '';
  listPhanXuong: any = []
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private store: StoreService) {
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListMatHang();
    this.getListKho();
    this.getListHopDong();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  
  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien!= undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.QuyTrinhPhieuNhapVatTuPhu().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien!= undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapVatTuPhu().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  
  GetNextSoQuyTrinh() {
    this._services.QuyTrinhPhieuNhapVatTuPhu().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
   if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if ( this.newTableItem.SoKien!= undefined)
          this.add();
          this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapVatTuPhu().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.GetQuyTrinh(res.objectReturn.Id);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  GetQuyTrinh(Id) {
    this._services.QuyTrinhPhieuNhapVatTuPhu().Get(Id).subscribe((res: any) => {
      this.item = res;
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
      this.KiemTraButtonModal();
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.QuyTrinhPhieuNhapVatTuPhu().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.toastr.success(res.message)
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  getListKho() {
        this.data.Loai = 23;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListMatHang() {
    this.data.Loai = 23;
    this._services.GetOptions().GetMatHangVatTuPhu().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'IddmItem');
    })
  }
  getListHopDong() {
    let IdDuAn = this.store.getCurrent();
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(IdDuAn, 23).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
    })
  }
  
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(deepCopy(this.newTableItem));
    this.newTableItem = {}
  }
 
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  Onclose() {
    this.activeModal.close();
  }
}
