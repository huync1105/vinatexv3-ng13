import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
@Component({
  selector: 'app-modalnhaplieuxuattaisan',
  templateUrl: './modalnhaplieuxuattaisan.component.html',
  styleUrls: ['./modalnhaplieuxuattaisan.component.css']
})
export class ModalnhaplieuxuattaisanComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listTaiSan:any = [];
  listDonViTinh: any =[];
  filter: any;

  constructor(public activeModal: NgbActiveModal, private _serviceTaiSan: TaisanService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    this.getListDonViTinh();
    }

    getListDonViTinh() {
      this._serviceTaiSan.HieuXuatTaiSan().GetListTaiSan(this.item.IddmPhanXuong).subscribe((res: any) => {
        this.listDonViTinh = mapArrayForDropDown(res.Data, "TendmDonViTinh", 'IddmDonViTinh');
  console.log(this.listDonViTinh)
      })
    }
  ValidateData() {
    // if (!validVariable(this.item.Ma)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ mã!");
    //   return false;
    // }
   
  }
  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    return this.item;
  }
  GhiLai() {
      this._serviceTaiSan.HieuXuatTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
        this.activeModal.close();
      })
    }
}