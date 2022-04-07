import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongluachontaisanComponent } from '../modal/modalbaoduongluachontaisan/modalbaoduongluachontaisan.component';


@Component({
  selector: 'app-modaldenghixulisuco',
  templateUrl: './modaldenghixulisuco.component.html',
  styleUrls: ['./modaldenghixulisuco.component.css']
})
export class ModaldenghixulisucoComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {  };
  type = '';
  opt = '';
  listPhanXuong = [];
  listDoUuTien = [];
  listLoaiSuCo = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  NameFile: string;
  title:any='';
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }
  
  ngOnInit(): void {
    this.GetNextSoQuyTrinh();
    this.KiemTraButtonModal();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucMucDoUuTien().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucLoaiSuCo().GetList(data).toPromise();

    Promise.all([ls1,ls2]).then((values: any) => {
      this.listDoUuTien = mapArrayForDropDown(values[0].Data.Items, "Ten", "Id");
      this.listLoaiSuCo = mapArrayForDropDown(values[1].Data, "Ten", "Id");
  })
}
  add() {
    if (this.item.listTaiSan == undefined || this.item.listTaiSan == null)
      this.item.listTaiSan = [];
    this.item.listTaiSan.push(this.newitem);
    this.newitem = {}
  }
  
  delete(index) {
    let item = this.item.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listTaiSan.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  setData() {
    this.item.NgayDeNghiUnix = DateToUnix(this.item.NgayDeNghi);
    return this.item;
  }
  GhiLai() {
      this._serviceTaiSan.QuyTrinhXuLySuCo().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
          // this.activeModal.close();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
  }
  
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhXuLySuCo().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  
  ThemMoiDanhSachTaiSan() {
      let modalRef = this._modal.open(ModalbaoduongluachontaisanComponent, {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.Lay_Chon =this.item.IddmPhanXuong; 
      modalRef.componentInstance.item = {};
      modalRef.result.then((res: any) => {
        let listKetQua = [];
        this.item.listTaiSan.forEach(Tai_San => {
          let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
          if (bien !== undefined) {
            listKetQua.push(Tai_San);
          }
        });
      res.forEach(Tai_San => {
        let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien === undefined) {
          listKetQua.push(Tai_San);
        }
      });
      this.item.listTaiSan = listKetQua;
      })
        .catch((er) => {
        });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.QuyTrinhXuLySuCo().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.QuyTrinhXuLySuCo().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }
  GetPhanXuong() {
    this._serviceTaiSan.GetListTaiSanThuHoi().GetListTaiSan(this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listTaiSan = res.Data;
    });
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