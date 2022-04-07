import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tonkhobongxomodal',
  templateUrl: './tonkhobongxomodal.component.html',
  styleUrls: ['./tonkhobongxomodal.component.css']
})
export class TonkhobongxomodalComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  item:any={};
  itemTongCong:any={};
  data: any = {};
  tenKho: any = '';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  mapXuatNhapRoute = {
    XuatBong: '/quantri/quanlykhosanxuat/khobong/xuatkho/',
    NhapBong: '/quantri/quanlykhosanxuat/khobong/nhapkho/',
    KiemKeBong: '/quantri/quanlykhosanxuat/khobong/kiemkekhobong/',

    XuatXo: '/quantri/quanlykhosanxuat/khoxo/xuatkho/',
    NhapXo: '/quantri/quanlykhosanxuat/khoxo/nhapkho/',
    KiemKeXo: '/quantri/quanlykhosanxuat/khoxo/kiemkekhoxo/'
  }
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = date;

    this.GetTheKho();
  }
  
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetTheKho();
  }
  GetTheKho(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    this.data = {
      "IdLoBong": this.item.IdLoBong,
      "TuNgay": DateToUnix(this.filter.TuNgay),
      "DenNgay": DateToUnix(this.filter.DenNgay),
      "IddmKho": this.item.IddmKho,
      "IdLoHang": this.item.IdLoHang,
      "CurrentPage": this.paging.CurrentPage,
    }
    this._service.GetTheKho(this.data).subscribe((res: any) => {
      this.items = res.items;
      // this.itemTongCong = res.items[0];
      // this.items.shift();
      this.paging = res.paging;
      console.log(res)
      console.log(this.items)
      console.log(this.paging)
    })
  }
  exportExcel() {
    this._service.ExportGetTheKho(this.data).subscribe((res: any) => {
      this._service.download(res.TenFile);
    })
  }
  navigateKiemKe(item) {
    if(this.tenKho === "kho xơ"){
      if(validVariable(item.IdPhieuKiemKeBongXo)){
        window.open(`#${this.mapXuatNhapRoute.KiemKeXo}${item.IdPhieuKiemKeBongXo || 0}`, "_blank");
      }
      else if(item.Id === 'N'){
        window.open(`#${this.mapXuatNhapRoute.NhapXo}${item.IdPhieuNhapLoBong || 0}`, "_blank");
      }
      else if(item.Id === 'X'){
        window.open(`#${this.mapXuatNhapRoute.XuatXo}${item.IdPhieuXuatBong || 0}`, "_blank");
      }
    }
    else{
      if(validVariable(item.IdPhieuKiemKeBongXo)){
        window.open(`#${this.mapXuatNhapRoute.KiemKeBong}${item.IdPhieuKiemKeBongXo || 0}`, "_blank");
      }
      else if(item.Id === 'N'){
        window.open(`#${this.mapXuatNhapRoute.NhapBong}${item.IdPhieuNhapLoBong || 0}`, "_blank");
      }
      else if(item.Id === 'X'){
        window.open(`#${this.mapXuatNhapRoute.XuatBong}${item.IdPhieuXuatBong || 0}`, "_blank");
      }
    }
    
  }
}
