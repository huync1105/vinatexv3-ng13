import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucthutucthanhtoan',
  templateUrl: './modaldanhmucthutucthanhtoan.component.html',
  styleUrls: ['./modaldanhmucthutucthanhtoan.component.css']
})
export class ModaldanhmucthutucthanhtoanComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.type);
  }

  SetData() {
    let data: any = {

      "id":this.item.id,
      "ma": this.item.ma,
      "ten": this.item.ten,
      "ghiChu": this.item.ghiChu,
      "created": this.type == "thutucthanhtoan" ? new Date() : this.item.created,
      "modified":new Date() ,
      "isDelete":this.type == "thutucthanhtoan" ? false : this.item.isDelete,
    };
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã thủ tục thanh toán!");
      return false;
    }
    if (!validVariable(this.item.ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên thủ tục thanh toán!");
      return false;
    }
    return true;
  }
   GhiLai() {
    if (this.ValidateData()) 
   {
      this._danhMucHopDong.DanhMucThuTucThanhToan().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode !== 200) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        } 
        this.activeModal.close();
      })

    }
  }
}