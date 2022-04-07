import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
@Component({
  selector: 'app-modalloaikhauhao',
  templateUrl: './modalloaikhauhao.component.html',
  styleUrls: ['./modalloaikhauhao.component.css']
})
export class ModalloaikhauhaoComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucTaiSan:DanhmuctaisanService, public toastr: ToastrService) { }

  ngOnInit(): void {
  
  }

  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên !");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucTaiSan.DanhMucLoaiKhauHao().Set(this.item).subscribe((res: any) => {
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
}
