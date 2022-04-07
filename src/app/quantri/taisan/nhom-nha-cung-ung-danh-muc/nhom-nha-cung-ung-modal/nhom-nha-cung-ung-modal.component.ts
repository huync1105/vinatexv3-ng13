import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhom-nha-cung-ung-modal',
  templateUrl: './nhom-nha-cung-ung-modal.component.html',
  styleUrls: ['./nhom-nha-cung-ung-modal.component.css']
})
export class NhomNhaCungUngModalComponent implements OnInit {

  opt: string = '';
  title: string = "";
  item: any = {};

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.opt==='add') {
      this.title = "Thêm nhóm nhà cung ứng mới";
    } else {
      this.title = "Cập nhật nhóm nhà cung ứng";
    }
    this.GetdmNhomNhaCungUng();
  }

  AddNhomCungUng() {
    if (this.Validate()) {
      this.taiSanService.NhomNhaCungUng().SetdmNhomNhaCungUng(this.item).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  GetdmNhomNhaCungUng() {
    if (this.item.Id) {
      this.taiSanService.NhomNhaCungUng().GetdmNhomNhaCungUng(this.item.Id).subscribe((res: any) => {
        this.item = res.Data;
        // console.log(this.item);
      })
    }
  }

  Validate() {
    if (!validVariable(this.item.Ma)) {
      this.toast.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  logger() {
    console.log(this.item);
  }

}
