import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalcapnhattaisancon',
  templateUrl: './modalcapnhattaisancon.component.html',
  styleUrls: ['./modalcapnhattaisancon.component.css']
})
export class ModalcapnhattaisanconComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listNhaSanXuat: any = [];
  listTaiSan: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới tài sản con";
      this.item = {
        Id: "",
        isXoa: false,
        listFileDinhKem: [],
        Created: new Date(),
        Modified: new Date(),
      }
    }
    else {
      this.title = "Cập nhật tài sản con";
    }
  }

  Validate() {
    if (!validVariable(this.item.Ma) ||
      !validVariable(this.item.Ten) ||
      !validVariable(this.item.NgayNhap) ||
      !validVariable(this.item.SoSeri) ||
      !validVariable(this.item.IddmLoaiTaiSan) ||
      !validVariable(this.item.IddmTinhTrang)) {
      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.Validate()) {
      this.item.NgaySanXuatUnix = DateToUnix(this.item.NgaySanXuat);
      this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
      this.item.MaTinhTrang = this.listTinhTrangTaiSan_copy.find(obj => obj.Id === this.item.IddmTinhTrang).Ma;
      if (validVariable(this.item.IddmDonViTinh)) {
        this.item.TenDonViTinh = this.listDonVi_copy.find(obj => obj.Id === this.item.IddmDonViTinh).Ten;
      }
      this.listTaiSan.push(this.item);
      this.activeModal.close();
    }
  }
}
