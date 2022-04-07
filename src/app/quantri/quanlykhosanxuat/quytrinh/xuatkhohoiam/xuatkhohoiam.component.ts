import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { XuatkhohoiammodalComponent } from '../xuatkhohoiammodal/xuatkhohoiammodal.component';

@Component({
  selector: 'app-xuatkhohoiam',
  templateUrl: './xuatkhohoiam.component.html',
  styleUrls: ['./xuatkhohoiam.component.css']
})
export class XuatkhohoiamComponent extends StoreBase implements OnInit,OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "NHAPTHANHPHAM";
  cols: any = [
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
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listdmKho: any = [];
  constructor(public _modal: NgbModal, public _toastr: ToastrService, 
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) { super(store)}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      console.log(res.id)
      if(res.id!=='0'){
        this.update(res.id);
      }
      let data = {
        CurrentPage: 0,
        Loai: 11
      };
      this._service.GetListdmKho(data).subscribe((res: any) => {
        this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
      // else
        this.GetListQuyTrinh();
      this.KiemTraTabTrangThai();
      //
    })
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlysanxuatkhohoiam/khohoiam/xuatkho/${id}`], { replaceUrl: true })
  }
  
  update(Id) {
    this._service.PhieuNhapThanhPham().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhohoiammodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.nametype = 'kho thành phẩm';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => { console.log(er)
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
    this._service.PhieuNhapThanhPham().GetList(data).subscribe((res: any) => {
      this.items = res.items;
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
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
