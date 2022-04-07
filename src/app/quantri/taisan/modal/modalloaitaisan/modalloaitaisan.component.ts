import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
@Component({
  selector: 'app-modalloaitaisan',
  templateUrl: './modalloaitaisan.component.html',
  styleUrls: ['./modalloaitaisan.component.css']
})
export class ModalloaitaisanComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  listCongDoan:any =[];
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  Keyword="";

  constructor(public activeModal: NgbActiveModal,
     private _danhMucTaiSan:DanhmuctaisanService,
     private services: SanXuatService,
      public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
    this.getListCongDoan();
  }

  // ValidateData() {
  //   if (!validVariable(this.item.Ma)) {
  //     this.toastr.error("Yêu cầu nhập đầy đủ mã !");
  //     return false;
  //   }
  //   if (!validVariable(this.item.Ten)) {
  //     this.toastr.error("Yêu cầu nhập đầy đủ tên!");
  //     return false;
  //   }
  //   return true;
  // }
  
  getListCongDoan(){
    this._danhMucTaiSan.GetlistCongDoan().GetList().subscribe((res:any)=>{
      this.listCongDoan = mapArrayForDropDown(res.Data, "Ten", "Ma");
    })
  }
  GhiLai() {
      this._danhMucTaiSan.DanhMucLoaiTaiSan().Set(this.item).subscribe((res: any) => {
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

