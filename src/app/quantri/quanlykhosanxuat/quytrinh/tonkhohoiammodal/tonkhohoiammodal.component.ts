import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tonkhohoiammodal',
  templateUrl: './tonkhohoiammodal.component.html',
  styleUrls: ['./tonkhohoiammodal.component.css']
})
export class TonkhohoiammodalComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  item:any={};
  itemTongCong:any={};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  data: any = {};
  mapXuatNhapRoute = {
    Xuat: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/',
    Nhap: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/',
    KiemKe: '/quantri/quanlykhosanxuat/khothanhpham/kiemkekho/'
  }
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    public activeModal: NgbActiveModal) { }

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
      "IddmItem": this.item.IddmItem,
      "TuNgay": DateToUnix(this.filter.TuNgay),
      "DenNgay": DateToUnix(this.filter.DenNgay),
      "IddmKho": this.item.IddmKho,
      "IdLoHang": this.item.IdLoHang,
      "CurrentPage": this.paging.CurrentPage,
    }
    this._service.GetTheKho(this.data).subscribe((res: any) => {
      this.items = res.items;
      this.itemTongCong = res.items[0];
      this.paging = res.paging;
      console.log(res)
    })
  }
  exportExcel() {
    this._service.ExportGetTheKho(this.data).subscribe((res: any) => {
      this._service.download(res.TenFile);
    })
  }
  navigateKiemKe(item) {
    if(validVariable(item.IdPhieuKiemKeThanhPham)){
      window.open(`#${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKeThanhPham || 0}`, "_blank");
    }
    else if(item.Id === 'N'){
      window.open(`#${this.mapXuatNhapRoute.Nhap}${item.IdPhieuNhapThanhPham || 0}`, "_blank");
    }
    else if(item.Id === 'X'){
      window.open(`#${this.mapXuatNhapRoute.Xuat}${item.IdPhieuXuatThanhPham || 0}`, "_blank");
    }
  }
}
