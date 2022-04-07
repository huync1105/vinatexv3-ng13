import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { XuatkhomodalComponent } from '../xuatkhomodal/xuatkhomodal.component';

@Component({
  selector: 'app-xuatkho',
  templateUrl: './xuatkho.component.html',
  styleUrls: ['./xuatkho.component.css']
})
export class XuatkhoComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PKK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  listPhanXuong:any=[];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tên kho xuất',
      field: 'TendmKho',
      width: 'unset'
    },
    {
      header: 'Tên phân xưởng',
      field: 'TendmPhanXuong',
      width: 'unset'
    },
    {
      header: 'Phương án pha bông',
      field: 'TenPhuongAnPhaBong',
      width: 'unset'
    },
    {
      header: 'Số bàn bông',
      field: 'SoBanBong',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  eAction = 'PHIEUXUATBONG'
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) { super(store)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id);
      }
    })
    this.GetdmPhanXuong();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/xuatkho/${id}`], { replaceUrl: true })
  }
  add() {
    let modalRef = this._modal.open(XuatkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
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
    let modalRef = this._modal.open(XuatkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
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
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
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
      Loai: "2",
      IddmPhanXuong: this.filter.IddmPhanXuong,
    }
    this._service.PhieuXuatSanXuat().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  GetdmPhanXuong() {
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._service.GetListdmPhanXuong(data2).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
    })
  }
  validateFilter() {
    if (!validVariable(this.filter.TuNgay) || !validVariable(this.filter.DenNgay) || DateToUnix(this.filter.DenNgay) < DateToUnix(this.filter.TuNgay)) {
      this._toastr.error('Vui lòng nhập khoảng thời gian hợp lệ!')
      return false
    }
    if(!validVariable(this.filter.IddmPhanXuong)){
      this._toastr.error('Vui lòng chọn phân xưởng!')
      return false
    }
    return true
  }

  exportExcel() {
    if (this.validateFilter()) {
      let data = {
        IddmPhanXuong:this.filter.IddmPhanXuong,
        TuNgayUnix:DateToUnix(this.filter.TuNgay),
        DenNgayUnix:DateToUnix(this.filter.DenNgay),
      }
      this._service.PhieuXuatSanXuat().ExportBangKeXuatKhoBong(data).subscribe((res: any) => {
        this._service.download(res.TenFile);
      })
    }
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
