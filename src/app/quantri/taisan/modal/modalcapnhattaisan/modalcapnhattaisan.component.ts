import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhattaisanconComponent } from '../modalcapnhattaisancon/modalcapnhattaisancon.component';
import { ModalthemmoiluachontaisanComponent } from '../modalthemmoiluachontaisan/modalthemmoiluachontaisan.component';

@Component({
  selector: 'app-modalcapnhattaisan',
  templateUrl: './modalcapnhattaisan.component.html',
  styleUrls: ['./modalcapnhattaisan.component.css']
})
export class ModalcapnhattaisanComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  NameFile: string;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true};
  itemDonVi: any = {};
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listCungSanXuat: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];
  qrcode: any = {
    size: 250
  };
  listPhanXuong = [];
  filter:{MaCongDoan,};

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) {

  }

  ngOnInit() {
    if (this.item.TaiSan.NgayNhapUnix !== 0 || this.item.TaiSan.NgayNhapUnix === 0) {
      this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);
    }
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.GetIem();
    }
    this.GetListdmPhanXuong();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan:'', };

    // this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
    //   console.log(res.Data);
    //   this.listLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    //   console.log(this.listLoaiTaiSan)
    // })
   

    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1,ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id"); 
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data, "Ten", "Id");  
    });
  }

  GetListdmPhanXuong() {
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.NhapTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  GetIem() {
    this._serviceTaiSan.NhapTaiSan().Get(this.item.Id || "").subscribe((res: any) => {
      this.item = res.Data;
      this.item.TaiSan.ThoiGianDuaVaoSuDung = UnixToDate(this.item.TaiSan.ThoiGianDuaVaoSuDungUnix);
      this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);
      this.itemDonVi = this.listDonVi_copy.find(obj => obj.Id === this.item.TaiSan.IddmDonViTinh);
      if (this.item.TaiSan.listTaiSan.length > 0) {
        this.item.TaiSan.listTaiSan.forEach(element => {
          element.ThoiGianDuaVaoSuDung = UnixToDate(element.ThoiGianDuaVaoSuDungUnix);
          element.NgayNhap = UnixToDate(element.NgayNhapUnix);
          if (validVariable(this.item.IddmDonViTinh)) {
            element.TenDonViTinh = this.listDonVi_copy.find(obj => obj.Id === element.IddmDonViTinh).Ten;
          }
        });
      }
    });
  }

  // Validate() {
  //   if (!validVariable(this.item.TaiSan.Ma) ||
  //     !validVariable(this.item.TaiSan.Ten) ||
  //     !validVariable(this.item.TaiSan.NgayNhap) ||
  //     !validVariable(this.item.TaiSan.SoSeri) ||
  //     !validVariable(this.item.TaiSan.IddmLoaiTaiSan) ||      
  //     !validVariable(this.item.TaiSan.IddmTinhTrang)) {
  //     this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
  //     return false;
  //   }
  //   return true;
  // }


  setData() {
    this.item.TaiSan.NgayNhapUnix = DateToUnix(this.item.TaiSan.NgayNhap);
    this.item.TaiSan.ThoiGianDuaVaoSuDungUnix = DateToUnix(this.item.TaiSan.ThoiGianDuaVaoSuDung);
    return this.item;
  }
  GhiLai() {
      this._serviceTaiSan.NhapTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.item = res.Data;
          // this.activeModal.close();
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.Message);
        }
      })
  }

  ChuyenDuyet() {
      this._serviceTaiSan.NhapTaiSan().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
  }
  KhongDuyet() {
      this._serviceTaiSan.NhapTaiSan().KhongDuyet(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.NhapTaiSan().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  ThemMoiTaiSanCon() {
    let modalRef = this._modal.open(ModalthemmoiluachontaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item =  {
        Id: "",
        isXoa: false,
        listFileDinhKem: [],
        Created: new Date(),
        Modified: new Date(),
        listTaiSan: [],
        listLichBaoDuong: [],
        listThongSoKyThuat: [],
        listThongSoAnToan: [],
    };
    modalRef.componentInstance.listTaiSan = this.item.TaiSan.listTaiSan;
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listCungSanXuat = this.listCungSanXuat;
    modalRef.result
      .then((res: any) => {
        this.item.TaiSan.listTaiSan=res
      })
      .catch((er) => {
      });
  }

  CapNhatTaiSanCon(item) {
    let modalRef = this._modal.open(ModalthemmoiluachontaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;
    // modalRef.componentInstance.listTaiSan = this.item.TaiSan.listTaiSan;
    // console.log(this.item.TaiSan.listTaiSan)
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listCungSanXuat = this.listCungSanXuat;
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {
      });
  }

  delete(index) {
    let item = this.item.TaiSan.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.push(JSON.parse(JSON.stringify(item)));
    }
  }

  changeTab(e) {
    // this.trangThai = e.index + 1;
    // this.loaiTab = e.index;
    // this.Loaddata(true);
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
