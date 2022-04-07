import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tieu-chi-danh-gia-modal',
  templateUrl: './tieu-chi-danh-gia-modal.component.html',
  styleUrls: ['./tieu-chi-danh-gia-modal.component.css']
})
export class TieuChiDanhGiaModalComponent implements OnInit {

  opt: string = '';
  title: string = "";
  item: any = {};
  listTieuChiCha: any[] = [];

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.opt==='add') {
      this.title = "Thêm tiêu chí đánh giá";
    } else {
      this.title = "Chỉnh sửa tiêu chí đánh giá";
    }
    this.GetdmNhomNhaCungUng();
    this.GetlistTieuChiCha();
  }

  AddTieuChi() {
    if (this.Validate()) {
      this.taiSanService.TieuChiDanhGia().Set(this.item).subscribe((res: any) => {
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
      this.taiSanService.TieuChiDanhGia().Get(this.item.Id).subscribe((res: any) => {
        this.item = res.Data;
        // console.log(this.item);
      })
    }
  }

  GetlistTieuChiCha() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      TieuChiCha: true,
      Keyword: "",
      GhiChu: "",
    }
    this.taiSanService.TieuChiDanhGia().GetList(data).subscribe((res: any) => {
      this.listTieuChiCha = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  Validate() {
    if (!validVariable(this.item.Ma)) {
      this.toast.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

}
