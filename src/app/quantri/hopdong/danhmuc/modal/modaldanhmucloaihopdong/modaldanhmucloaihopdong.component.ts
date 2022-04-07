// import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucloaihopdong',
  templateUrl: './modaldanhmucloaihopdong.component.html',
  styleUrls: ['./modaldanhmucloaihopdong.component.css']
})
export class ModaldanhmucloaihopdongComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type: any = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    // console.log(this.type);
    if (this.type == "themmoi") {
      this.title = "Thêm mới loại hơp đồng";
    }
    else if (this.type == "capnhat") {
      this.title = "Cập nhật loại hợp đồng";
    }
  }

  SetData() {
    let data: any = {
      // "id":  this.item.Id  == null ? "": this.item.id,
      "id": this.item.id,
      "ma": this.item.ma,
      "ten": this.item.ten,
      "ghiChu":this.item.ghiChu,
      "created": this.type == "themmoi" ? new Date() : this.item.created,
      "modified": new Date(),
      // "isGiaTriHopDong": this.type == "themmoi" ? true : this.item.isGiaTriHopDong,
      "isDelete": this.type == "themmoi" ? false : this.item.isDelete,
    };
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã loại hợp đồng!");
      return false;
    }
    if (!validVariable(this.item.ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên loại hợp đồng!");
      return false;
    }
    return true;
  }

  GhiLai() {
    // if (validVariable(this.item.ma) == true && validVariable(this.item.ten) == true) 
    if (this.ValidateData ()) {
      console.log(this.SetData());
      this._danhMucHopDong.DanhMucLoaiHopDong().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode !== 200) {
          this.toastr.error(res.message);
        }
        else {
          this.toastr.success(res.message);
          this.activeModal.close();
        }
        // this.activeModal.close();
      })

    }
    // else {
    //   this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc", 'Thông báo');
    // }
  }
}
