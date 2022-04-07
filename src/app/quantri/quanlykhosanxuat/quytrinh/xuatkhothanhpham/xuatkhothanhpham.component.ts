import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, formatdate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { XuatkhothanhphammodalComponent } from '../xuatkhothanhphammodal/xuatkhothanhphammodal.component';

@Component({
  selector: 'app-xuatkhothanhpham',
  templateUrl: './xuatkhothanhpham.component.html',
  styleUrls: ['./xuatkhothanhpham.component.css']
})
export class XuatkhothanhphamComponent extends StoreBase implements OnInit,OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Ngày',
      field: '_Ngay',
      width: 'unset'
    },
    {
      header: 'Tên kho',
      field: 'TendmKho',
      width: 'unset'
    },
    {
      header: 'Tổng số quả sợi',
      field: 'TongSoLuong',
      width: 'unset'
    },
    {
      header: 'Tổng khối lượng',
      field: 'TongKhoiLuong',
      width: 'unset'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  eAction = 'XUATTHANHPHAM';
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService,
    private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {super(store) }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id);
      }
    })
    this.getListKho();
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/${id}`], { replaceUrl: true })
  }

  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(XuatkhothanhphammodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        console.log(er)
        this.GetListQuyTrinh();

        this.changeParam(0);
      })
  }
  update(Id) {
    this._service.PhieuXuatThanhPham().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhothanhphammodalComponent, {
        size: 'fullscreen-100',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => {
          console.log(er)
          this.GetListQuyTrinh();

          this.changeParam(0);
        })
    })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }

  getListKho() {
    let data = {
      CurrentPage: 0,
      Loai: 11
    };
    this._service.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IddmKhoThanhPham: this.filter.IddmKho,
    }
    this._service.PhieuXuatThanhPham().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      if (this.items.length > 0) {
        this.items.forEach(element => {
          element._Ngay = element.NgayUnix > 0 ? formatdate(element.Ngay, false) : null;
          this.listKho.filter(obj => {
            if (element.idKhoXuat == obj.value) {
              element.TenKho = obj.label;
            }
          });
        });
      }
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    //
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  validateFilter() {
    if (!validVariable(this.filter.TuNgay) || !validVariable(this.filter.DenNgay) || DateToUnix(this.filter.DenNgay) < DateToUnix(this.filter.TuNgay)) {
      this._toastr.error('Vui lòng nhập khoảng thời gian hợp lệ!')
      return false
    }
    return true
  }

  exportExcel() {
    if (this.validateFilter()) {
      let data = {
        TuNgayUnix:DateToUnix(this.filter.TuNgay),
        DenNgayUnix:DateToUnix(this.filter.DenNgay),
        IddmKho:this.filter.IddmKho,
      }
      this._service.PhieuXuatThanhPham().ExportBangKeXuatKhoThanhPham(data).subscribe((res: any) => {
        this._service.download(res.TenFile);
      })
    }
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
