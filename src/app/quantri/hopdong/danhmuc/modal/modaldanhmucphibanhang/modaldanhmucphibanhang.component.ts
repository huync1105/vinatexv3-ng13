import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucphibanhang',
  templateUrl: './modaldanhmucphibanhang.component.html',
  styleUrls: ['./modaldanhmucphibanhang.component.css']
})
export class ModaldanhmucphibanhangComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  listLoai: any=[];

  constructor(public activeModal: NgbActiveModal,
    private _services: SanXuatService,
     private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListNoiDiaXuatKhau();
  }

  GetListNoiDiaXuatKhau() {
    this._services.GetOptions().GetDanhMucNoiDiaXuatKhau().subscribe((res: any) => {
      this.listLoai = mapArrayForDropDown(res.Data.Items, 'Ten', 'Id');
    })
  }

  SetData() {
    let data: any = {
      "Id": this.item.Id,
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "GhiChu": this.item.GhiChu,
      "DonViTinh": this.item.DonViTinh,
      "LoaiXuatKhauNoiDia": this.item.LoaiXuatKhauNoiDia,
      "Created": this.type == "phibanhang" ? new Date() : this.item.Created,
      "Modified":new Date() ,
      "isDelete":this.type == "phibanhang" ? false : this.item.isDelete,

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
      this._danhMucHopDong.DanhMucChiPhiBanHang().Set(this.SetData()).subscribe((res: any) => {
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