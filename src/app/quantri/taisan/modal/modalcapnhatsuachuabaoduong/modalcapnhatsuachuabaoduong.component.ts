import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalcapnhatsuachuabaoduong',
  templateUrl: './modalcapnhatsuachuabaoduong.component.html',
  styleUrls: ['./modalcapnhatsuachuabaoduong.component.css']
})
export class ModalcapnhatsuachuabaoduongComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  checkbutton: any = {};
  uploader: FileUploader;

  listdmPhanXuong: any = [];
  listTaiSanDaBanGiao: any = [];
  listTaiSanDaBanGiao_copy: any = [];
  listDonVi: any = [];
  NameFile: string = "";
  listTaiSan_copy: TreeNode[];

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
    this._servicesSanXuat.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.KiemTraButtonModal();
      if (this.opt === 'add') {
        this.title = "Thêm mới";
        this.GetNextSoQuyTrinh();
      }
      else {
        this.title = "Cập nhật";
        this.GetIem();
      }
    });
  }

  GetNhaMay() {
    this._servicesSanXuat.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.item.IddmPhanXuong = undefined;
      if (validVariable(this.item.IdDuAn)) {
        this._servicesSanXuat.GetOptions().GetPhanXuong(this.item.IdDuAn).subscribe((res: any) => {
          this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
        });
      }
    });
  }

  GetListTaiSanDaBanGiao() {
    this.item.IdTaiSan = undefined;
    this._serviceTaiSan.GetOptions().GetListTaiSanDaBanGiao(this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listTaiSanDaBanGiao = mapArrayForDropDown(res.Data, "Ten", 'Id');
      this.listTaiSanDaBanGiao_copy = res.Data;
    });
  }

  SelectTaiSan() {
    this.item.TaiSan = this.listTaiSanDaBanGiao_copy.find(e => e.Id === this.item.IdTaiSan);
    this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);    
    this.listTaiSan_copy = [];
    this.item.TaiSan.listTaiSan.forEach(obj => {
      let obj_copy: any = {};
      if (validVariable(obj.listTaiSan)) {
        obj_copy.children = [];
        obj.listTaiSan.forEach(element => {
          obj_copy.children.push({ data: element });
        });
        delete obj.listTaiSan;
      }
      obj_copy.data = obj;
      this.listTaiSan_copy.push({ data: obj_copy.data, children: obj_copy.children });
    });
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.SuCoSuaChua().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  GetIem() {
    this._serviceTaiSan.SuCoSuaChua().Get(this.item.Id || "").subscribe((res: any) => {
      this.item = res.Data;
      this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);
      if (validVariable(this.item.IdDuAn)) {
        this._servicesSanXuat.GetOptions().GetPhanXuong(this.item.IdDuAn).subscribe((res: any) => {
          this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
        });
      }
      if (validVariable(this.item.IddmPhanXuong)) {
        this._serviceTaiSan.GetOptions().GetListTaiSanDaBanGiao(this.item.IddmPhanXuong).subscribe((res: any) => {
          this.listTaiSanDaBanGiao = mapArrayForDropDown(res.Data, "Ten", 'Id');
          this.listTaiSanDaBanGiao_copy = res.Data;
        });
      }
    });
  }

  Validate() {
    if (!validVariable(this.item.IddmPhanXuong) ||
      !validVariable(this.item.IdDuAn) ||
      !validVariable(this.item.IdTaiSan)) {
      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  Setdata() {
    this.item.NgayBaoGiaoUnix = DateToUnix(this.item.NgayBanGiao);
  }

  GhiLai() {
    if (this.Validate()) {
      this.Setdata();
      // if (this.opt === 'add') {
      //   this.item.Created = new Date();
      //   this.item.Modified = new Date();
      // }
      this._serviceTaiSan.SuCoSuaChua().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          // this.GetIem();
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  ChuyenDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.SuCoSuaChua().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  KhongDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.SuCoSuaChua().KhongDuyet(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.SuCoSuaChua().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }
}
