import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-modalchiphibong',
  templateUrl: './modalchiphibong.component.html',
  styleUrls: ['./modalchiphibong.component.css']
})
export class ModalchiphibongComponent implements OnInit {
  listNam: any = [];
  Nam:number ;
  item: any = {};
  listHienThi: any = [];
  title:any ='';
  listNhaMay: any = [];
  IdDuAn: string = "";
  userInfo: any ='';
  constructor(public activeModal: NgbActiveModal, 
    private _danhMucHopDong: DanhMucHopDongService, 
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private _auth: AuthenticationService) {this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.getListNhaMay();
  }
  //callAPI this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Bong').Get(Nam) sau khi chọn năm
  // this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().Set(item) để ghi lại

  GetListNam() {
    this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Bong').Get(this.Nam).subscribe((res: any) => {
      this.item = res;
console.log(this.item)
    })
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
      });
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
