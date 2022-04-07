
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucvattuphu',
  templateUrl: './modaldanhmucvattuphu.component.html',
  styleUrls: ['./modaldanhmucvattuphu.component.css']
})
export class ModaldanhmucvattuphuComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {

  }

  SetData() {
    let data: any = {
      "Id": this.item.Id,
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "GhiChu": this.item.GhiChu,
      "DonViTinh": this.item.DonViTinh,
      "created": this.type == "vattuphu" ? new Date() : this.item.created,
      "modified":new Date() ,
      "isDelete":this.type == "vattuphu" ? false : this.item.isDelete,
    };
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucHopDong.DanhMucVatTuPhu().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
      
      })

    }
  }
}