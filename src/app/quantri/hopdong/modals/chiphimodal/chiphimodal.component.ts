import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-chiphimodal',
  templateUrl: './chiphimodal.component.html',
  styleUrls: ['./chiphimodal.component.css']
})
export class ChiphimodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  lstSanPham: any = [];
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]

  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnInit(): void {
    this.item;
    console.log(this.item)
    this.GetList();

  }
  GetList() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetChiPhi(this.item.Id).subscribe((res: any) => {
      this.item = res;
      this.item.lstSanPham.forEach(ele => {
        ele.Tong = 0;
        ele.lstChiPhi = [];
        ele.lstNhaMay.forEach(nhamay => {
          ele.Tong = ele.Tong + nhamay.TongChiPhi;
        });
        for (let i = 0; i < 12; i++) {
          let datapush = {
            ChiPhi: 0
          }
          ele.lstNhaMay.forEach(nhamay => {
            datapush.ChiPhi = datapush.ChiPhi + nhamay.lstChiPhi[i].ChiPhi;
          });
          ele.lstChiPhi.push(datapush);
        }
      })
    })
  }
}


