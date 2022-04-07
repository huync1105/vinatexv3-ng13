import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { TonkhobongphemodalComponent } from '../tonkhobongphemodal/tonkhobongphemodal.component';
import { StoreBase } from 'src/app/services/storebase.class';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-tonkhobongphe',
  templateUrl: './tonkhobongphe.component.html',
  styleUrls: ['./tonkhobongphe.component.css']
})
export class TonkhobongpheComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  listdmKho:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'SoLuong',
      width: 'unset'
    },
    {
      header: 'Trọng lượng',
      field: 'TrongLuong',
      width: 'unset'
    },
  ];
  mapLoaiKhoBong:any={
    khobong:2,
    khoxo:5,
    khobonghoi:6,
    khobongphe:7,
    khohoiam:10,
    khothanhpham:11,
  }
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  Loai:any=7;
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,
    private router:Router,public store:StoreService) {
      super(store)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      console.log(this.mapLoaiKhoBong[`${res.kho}`])
      console.log(res);
      // this.getListdmKho(this.mapLoaiKhoBong[`${res.kho}`]);
      // this.filter.Loai = this.mapLoaiKhoBong[`${res.kho}`];
      this.getListdmKho(7);
      this.filter.Loai = 7;
    })
    this.filter.KeyWord = '';
  }
  getListdmKho(Loai?) {
    let data = {
      CurrentPage : 0,
      Loai:Loai
    }
    this._service.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res,'Ten','Id');
      if(this.listdmKho.length > 0 && this.listdmKho !== undefined){
        this.filter.IddmKho = this.listdmKho[0].value;
        this.GetListQuyTrinh();
      }
    })
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
    let data: any = {
      IddmKho: this.filter.IddmKho,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.filter.KeyWord,
      Loai: this.filter.Loai
    }
    this._service.GetLuuKhoTheKho(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={
      Loai:this.Loai,
      IddmKho:this.listdmKho[0].value,
      KeyWord:''
    };
    this.GetListQuyTrinh(true);
  }
  GetTheKho(item) {
    item.IddmKho = this.filter.IddmKho
    let modalRef = this._modal.open(TonkhobongphemodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) 
        this.GetListQuyTrinh();
    })
  }
  exportExcel(IddmItem) {
    let data: any = {
      IddmKho: this.filter.IddmKho,
      IddmItem: IddmItem,
    }
    this._service.ExportNhuCauXuatHangTheoMatHang(data).subscribe((res: any) => {
      this._service.download(res.TenFile);
    })
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
