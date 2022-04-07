import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tonkhobongphemodal',
  templateUrl: './tonkhobongphemodal.component.html',
  styleUrls: ['./tonkhobongphemodal.component.css']
})
export class TonkhobongphemodalComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  item:any={};
  data:any={};
  itemTongCong:any={};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  mapXuatNhapRoute = {
    Xuat: '/quantri/quanlykhosanxuatbongkhac/khobongphe/xuatkho/',
    Nhap: '/quantri/quanlykhosanxuatbongkhac/khobongphe/nhapkho/',
    KiemKe: '/quantri/quanlykhosanxuat/khobongphe/kiemkekhobongphe/'
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
      "IddmLoaiBong": this.item.IddmLoaiBong,
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
    if(validVariable(item.IdPhieuKiemKeBongXo)){
      window.open(`#${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKeBongXo || 0}`, "_blank");
    }
    else if(item.Id === 'N'){
      window.open(`#${this.mapXuatNhapRoute.Nhap}${item.IdPhieuNhapBongPhe || 0}`, "_blank");
    }
    else if(item.Id === 'X'){
      window.open(`#${this.mapXuatNhapRoute.Xuat}${item.IdPhieuXuatBongPhe || 0}`, "_blank");
    }
  }
}
