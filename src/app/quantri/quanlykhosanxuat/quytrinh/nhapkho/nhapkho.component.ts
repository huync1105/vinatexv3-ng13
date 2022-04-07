import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/internal/operators/filter';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, formatdate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { NhapkhomodalComponent } from '../nhapkhomodal/nhapkhomodal.component';

@Component({
  selector: 'app-nhapkho',
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapkhoComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPLOBONG";
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Số hợp đồng',
      field: 'SoHopDong',
      width: 'unset'
    },
    {
      header: 'Ngày nhập kho',
      field: '_Ngay',
      width: 'unset'
    },
    {
      header: 'Mã Invoice',
      field: 'MaInvoice',
      width: 'unset'
    },
    {
      header: 'Lô bông',
      field: 'TenLoBong',
      width: 'unset'
    },
    {
      header: 'Loại bông',
      field: 'TendmLoaiBong',
      width: 'unset'
    },
  ];
  listLoBong: any = [];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  title: any = "";
  type: any = "";
  nametype: any = "";
  constructor(public _modal: NgbModal, public _toastr: ToastrService, 
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {
      super(store)
     }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      this.title = res.kho;
      // console.log(res.id)
      if(res.id!=='0'){
        this.update(res.id);
      }
      // else
        // this.GetListQuyTrinh();
      //
      
      this.title === 'khobong'
      this.type = 'bong';
      this.nametype = 'bông';
    })
    let data={
      CurrentPage: 0,
      Loai: 2
    }
    this._service.GetListLoBong(data).subscribe((res:any)=>{
      res.sort((a,b)=>{
        return a.Ten.localeCompare(b.Ten)
      })
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
      this.KiemTraTabTrangThai();

  }
  
  changeParam(id) {
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/nhapkho/${id}`], { replaceUrl: true })
  }
  
  addPhieu() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.nametype = this.nametype;
    
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);

    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0); })
  }
 
  update(Id) {
    this._service.QuyTrinhPhieuNhapLoBong().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapkhomodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.componentInstance.type = this.type;
      modalRef.componentInstance.nametype = this.nametype;
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => { console.log(er) 
          this.GetListQuyTrinh();
          this.changeParam(0);})
        .finally(()=>{
          this.GetListQuyTrinh();
          this.changeParam(0);
        })
    })
  }
  changeTab(e) {
    this.trangThai = e.index+1;
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
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay) ,
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IdLoBong: this.filter.IdLoBong,
    }
    // if(this.title === 'khobong'){
      data.Loai = 2;
    // }
    // else if(this.title === 'khoxo'){
    //   data.Loai = 5;
    // }

    this._service.QuyTrinhPhieuNhapLoBong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      if (this.items.length > 0) {
        this.items.forEach(element => {
          element._Ngay = element.NgayUnix > 0 ? formatdate(element.Ngay, false) : null;
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
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
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
      }
      this._service.QuyTrinhPhieuNhapLoBong().ExportBangKeNhapKhoBong(data).subscribe((res: any) => {
        this._service.download(res.TenFile);
      })
    }
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
