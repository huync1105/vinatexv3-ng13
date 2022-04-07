import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-sua-nha-cung-ung-modal',
  templateUrl: './sua-nha-cung-ung-modal.component.html',
  styleUrls: ['./sua-nha-cung-ung-modal.component.css']
})
export class SuaNhaCungUngModalComponent implements OnInit {

  item: any = {};
  title: string = "";
  quyTrinh: any;
  listDiemDaDanhGia=[];
  phieuDanhGia: any = {};

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetNhaCungUng();
  }

  GetNhaCungUng() {
    if (this.item.IddmNhaCungUng) {
      this.taiSanService.NhaCungUng().Get(this.item.IddmNhaCungUng)
      .subscribe((res: any)=>{
        this.item = res.Data;
      })
    }
  }

  SetNhaCungUng() {
    if (this.Validate()) {
      let data = {
        // ...this.quyTrinh,
        // listPhieuDanhGia: [
          ...this.phieuDanhGia,
        // ]
      }
      this.activeModal.close(data)
      // this.taiSanService.DanhGiaNhaCungUng().Set(data).subscribe((res: any)=>{
      //   if (res.StatusCode === 200) {
      //     this.toast.success(res.Message);
      //     this.activeModal.close();
      //   } else {
      //     this.toast.error(res.Message);
      //   }
      // })
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

