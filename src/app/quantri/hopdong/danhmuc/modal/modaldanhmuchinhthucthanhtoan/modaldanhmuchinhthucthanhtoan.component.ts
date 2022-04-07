import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmuchinhthucthanhtoan',
  templateUrl: './modaldanhmuchinhthucthanhtoan.component.html',
  styleUrls: ['./modaldanhmuchinhthucthanhtoan.component.css']
})
export class ModaldanhmuchinhthucthanhtoanComponent implements OnInit {
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
      "ten": this.item.ten,
      "ghiChu": this.item.ghiChu,
      "created": this.type == "hinhthucthanhtoan" ? new Date() : this.item.created,
      "modified":new Date() ,
      "isDelete":this.type == "hinhthucthanhtoan" ? false : this.item.isDelete,
    };
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã hình thuc thanh toán!");
      return false;
    }
    if (!validVariable(this.item.ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên hình thức thanh toán!");
      return false;
    }
    return true;
  }

   GhiLai() {
    if (this.ValidateData()) 
   {
      this._danhMucHopDong.DanhMucHinhThucThanhToan().Set(this.SetData()).subscribe((res: any) => {
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