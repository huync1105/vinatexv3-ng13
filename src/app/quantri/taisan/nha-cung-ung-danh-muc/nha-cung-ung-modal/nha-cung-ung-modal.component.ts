import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nha-cung-ung-modal',
  templateUrl: './nha-cung-ung-modal.component.html',
  styleUrls: ['./nha-cung-ung-modal.component.css']
})
export class NhaCungUngModalComponent implements OnInit {

  item: any = {};
  title: string = "";

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetNhaCungUng();
    console.log('item ben modal 1', this.item);
  }

  GetNhaCungUng() {
    if (this.item.Id) {
      this.taiSanService.NhaCungUng().Get(this.item.Id).subscribe((res: any)=>{
        this.item = res.Data;
      })
    }
  }

  SetNhaCungUng() {
    if (this.Validate()) {
      if (!validVariable(this.item.listItem)) {
        this.item.listItem = [];
      } else if (!validVariable(this.item.listPhieuDanhGia)) {
        this.item.listPhieuDanhGia = [];
      } else if (!validVariable(this.item.listHopDong)) {
        this.item.listHopDong = [];
      }
      this.taiSanService.NhaCungUng().Set(this.item)
      .subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
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

}
