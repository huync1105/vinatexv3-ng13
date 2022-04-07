import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { XuatkhovattuphumodalComponent } from '../xuatkhovattuphumodal/xuatkhovattuphumodal.component';

@Component({
  selector: 'app-xuatkhovattuphu',
  templateUrl: './xuatkhovattuphu.component.html',
  styleUrls: ['./xuatkhovattuphu.component.css']
})
export class XuatkhovattuphuComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PKK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tên kho xuất',
      field: 'TendmKho',
      width: 'unset'
    },
    {
      header: 'Tên khách hàng',
      field: 'TendmKhachHang',
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
  eAction = 'PHIEUXUATVATTUPHU'
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listdmKho: any = [];
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router,public store:StoreService) { 
      super(store)
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0' && res.id!==undefined){
        this.update(res.id);
      }
    })
    this.GetListdmKho();
    this.KiemTraTabTrangThai();
  }
  GetListdmKho() {
    let data2 = {
      CurrentPage: 0,
      Loai: 23,
    };
    this._service.GetListdmKho(data2).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmKho = this.listdmKho[0].value;
    })
  }
  changeParam(id){
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuatbongkhac/khovattuphu/xuatkho/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(XuatkhovattuphumodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);

    })
      .catch(er => { console.log(er) 
        this.GetListQuyTrinh();
        this.changeParam(0);})
  }
  update(item){
    let modalRef = this._modal.open(XuatkhovattuphumodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify({Id:item}));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);
    })
      .catch(er => { console.log(er) 
        this.GetListQuyTrinh();
        this.changeParam(0);})
  }
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      Loai:"6",
      IddmKho: this.filter.IddmKho,
    }
    this._service.PhieuXuatVatTuPhu().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
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
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
