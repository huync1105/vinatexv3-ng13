import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhmuctieuchidanhgiamodal',
  templateUrl: './danhmuctieuchidanhgiamodal.component.html',
  styleUrls: ['./danhmuctieuchidanhgiamodal.component.css']
})
export class DanhmuctieuchidanhgiamodalComponent implements OnInit {
  item: any = {};
  title: any = '';
  type = '';
  listTieuChiCha: any = [];

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: HopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
  this.getlistTieuChiCha();
  }
  SetData() {
    let data: any = {
      "id":this.item.id || '',
      "ma": this.item.ma,
      "ten": this.item.ten,
      "tieuChuan": this.item.tieuChuan,
      "ghiChu": this.item.ghiChu,
      "hoatDong": this.item.hoatDong,
      "noiDung": this.item.noiDung,
      "thuTu": this.item.thuTu  || 0,
      "diemToiDa": this.item.diemToiDa || 0,
      "iddmTieuChiCha": this.item.iddmTieuChiCha,
      "loai": this.item.loai  || 0,
    };
    return data;
  }
  GhiLai() {
      this._danhMucHopDong.dmTieuChiDanhGia().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toastr.success(res.message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        } 
      })
  }
  getlistTieuChiCha(){
    let data = {
      PageSize: 20,
    };
    this._danhMucHopDong.dmTieuChiDanhGia().GetList(data).subscribe((res: any) => {
      let listTieuChiCha = res.data.filter(e => e.iddmTieuChiCha === null || e.iddmTieuChiCha === '');
      this.listTieuChiCha = mapArrayForDropDown(listTieuChiCha, 'ten', 'id');
    })
  }
  
}
