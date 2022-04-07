import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-modalchiphidien',
  templateUrl: './modalchiphidien.component.html',
  styleUrls: ['./modalchiphidien.component.css']
})
export class ModalchiphidienComponent implements OnInit {
  listNam: any = [];
  Nam:number ;
  item: any = {};
  listHienThi: any = [];
  title:any ='';
  listNhaMay: any = [];
  IdDuAn: string = "";
  constructor(public activeModal: NgbActiveModal, 
    private _danhMucHopDong: DanhMucHopDongService, 
    private _toastr: ToastrService,
   ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
  }
  
  GetListNam() {
    this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Dien').Get(this.Nam).subscribe((res: any) => {
      this.item = res;
console.log(this.item)
    })
  }

  GhiLai() {
    this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this._toastr.error(res.Message);
        } else {
          this._toastr.success(res.Message);
          this.activeModal.close();
        }
      })
  }
}
