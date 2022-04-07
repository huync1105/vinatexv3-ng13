import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { TonkhodanhsachchitietComponent } from '../tonkhodanhsachchitiet/tonkhodanhsachchitiet.component';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html',
  styleUrls: ['./tonkho.component.css']
})
export class TonkhoComponent  extends StoreBase implements OnInit,OnDestroy {
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
      header: 'Tên lô hàng',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'SoLuong',
      width: 'unset',
      align:'center'

    },
    {
      header: 'Trọng lượng',
      field: 'TongTrongLuong',
      width: 'unset',
      align:'center'

    },
  ];
  mapLoaiKhoBong:any={
    khobong:3,
    khoxo:5,
    khobonghoi:6,
    khobongphe:7,
    khohoiam:10,
    khothanhpham:11,
  }
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  loai : any = 0;
  tenkho : any = "kho thành phẩm";
  constructor(public _modal:NgbModal,public store:StoreService,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) {
    super(store)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>{
      console.log(this.mapLoaiKhoBong[`${res.kho}`])
      console.log(res);
      this.getListdmKho(this.mapLoaiKhoBong[`${res.kho}`]);
      this.loai = this.mapLoaiKhoBong[`${res.kho}`];
      if(this.loai === 10)
        this.tenkho = "kho hồi ẩm";
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
        // this.listdmKho[0].select = true
        this.GetListQuyTrinh();
      }
    })
  }
  // getListCaSanXuat() {
  //   this._service.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
  //     this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
  //   })
  // }
  // getListPhanXuong() {
  //   this._service.GetListdmPhanXuongOpt().subscribe((res: any) => {
  //     this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
  //   })
  // }
  
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    // if(item.value !== undefined){
    //   this.listdmKho.forEach(element => {
    //     element.select = false;
    //   });
    //   item.select = true;
    // }
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any = {
      IddmKho: this.filter.IddmKho,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.filter.KeyWord
    }
    // this._service.getLuuKhoKhac(this.filter.IddmKho, '', this.paging.CurrentPage, this.filter.KeyWord).subscribe((res: any) => {
    this._service.GetLuuKhoTheKho(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={
      IddmKho: this.listdmKho[0].value,
      Loai:this.loai,
      KeyWord:''
    };
    this.GetListQuyTrinh(true);
  }
  GetTheKho(item) {
    item.IddmKho = this.filter.IddmKho
    let modalRef = this._modal.open(TonkhodanhsachchitietComponent, {
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
