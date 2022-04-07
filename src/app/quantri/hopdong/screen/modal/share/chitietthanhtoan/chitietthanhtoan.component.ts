import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chitietthanhtoan',
  templateUrl: './chitietthanhtoan.component.html',
  styleUrls: ['./chitietthanhtoan.component.css']
})
export class ChitietthanhtoanComponent implements OnInit {
  @Input('listThanhToan') listThanhToan: any = [];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  mapXuatNhapRoute = {
    BongXo: '/quantri/hopdongsanxuat/quytrinhthanhtoanbong/',
    Soi: '/quantri/hopdongsanxuat/quytrinhthanhtoansoi/',
    VatTuPhu: '/quantri/hopdongsanxuat/quytrinhthanhtoanvattuphu/'
  }
  constructor(public _modal: NgbModal,) { }
  ngOnInit(): void {
  }

  viewThanhToan(item){
    if(item.loai === 11){
      window.open(`#${this.mapXuatNhapRoute.Soi}${item.id || ''}`, "_blank");
    }
    else if(item.loai === 23){
      window.open(`#${this.mapXuatNhapRoute.VatTuPhu}${item.id ||''}`, "_blank");
    }
    else{
      window.open(`#${this.mapXuatNhapRoute.BongXo}${item.id || ''}`, "_blank");
    }
  }
}
