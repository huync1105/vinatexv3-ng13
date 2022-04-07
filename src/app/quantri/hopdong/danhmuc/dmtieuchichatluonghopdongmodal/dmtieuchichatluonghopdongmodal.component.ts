import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-dmtieuchichatluonghopdongmodal',
  templateUrl: './dmtieuchichatluonghopdongmodal.component.html',
  styleUrls: ['./dmtieuchichatluonghopdongmodal.component.css']
})
export class DmtieuchichatluonghopdongmodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
  
  }
  SetData() {
    let data: any = {
      "id":this.item.id,
      "ma": this.item.ma,
      "dacTinh": this.item.dacTinh,
      "donVi": this.item.donVi,
      "tieuChuan": this.item.tieuChuan,
      "ghiChu": this.item.ghiChu,
    };
    return data;
  }
  ValidateData() {
    if (!validVariable(this.item.ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      console.log(this.SetData());
      this._danhMucHopDong.DanhMucTieuChuanChatLuong().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toastr.success(res.message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        } 
      })

    }
  }

}
