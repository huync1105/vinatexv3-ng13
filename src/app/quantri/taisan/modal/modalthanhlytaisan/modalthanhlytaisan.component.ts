import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanCopyComponent } from '../modalchontaisan-copy/modalchontaisan-copy.component';
import { ModalchontaisanThanhlyCopyComponent } from '../modalchontaisan-thanhly-copy/modalchontaisan-thanhly-copy.component';
import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';
@Component({
  selector: 'app-modalthanhlytaisan',
  templateUrl: './modalthanhlytaisan.component.html',
  styleUrls: ['./modalthanhlytaisan.component.css']
})
export class ModalthanhlytaisanComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = { listTaiSan: [] };
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  listTaiSan_copy: any = [];
  NameFile: string;
  title: any = '';
  TongGiaTri: any = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.item.NgayThanhLyUnix !== 0) {
      this.item.NgayThanhLy = UnixToDate(this.item.NgayThanhLyUnix);
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButtonModal();
    this.GetListdmPhanXuong();
    // this.GetListTaiSanChuaBanGiao();

    // this.GetPhanXuong();
    this.getList();
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListTaiSanChuaBanGiao() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      this.listdsTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
      this.listTaiSanRef = res.Data;
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
  edit(item) {
    item.edit = true;
  }
  save(item) {
    item.edit = false;
  }
  xoa(item) {
  }
  setData() {
    this.item.NgayThanhLyUnix = DateToUnix(this.item.NgayThanhLy);
    this.item.IdDuAn = this.store.getCurrent();
    return this.item;
  }
  ValidateData() {
    if (!validVariable(this.item.NgayThanhLy)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
      return false;
    }
    return true;
  }
  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.ThanhLyTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data; // khi Ghi hiện duyệt >> KiemTraButtonModal()
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
          // this.activeModal.close();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.ThanhLyTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalchontaisanThanhlyCopyComponent, {
      size: "xl",
      backdrop: "static",
    });

    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];

    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = res;

      // let listTaiSan = [];
      // res.forEach(element => {
      //   if (!validVariable(element.TaiSan.IdTaiSan)) {
      //     listTaiSan.push({ data: element, children: [] });
      //     res.filter(e => {
      //       if (element.TaiSan.Id === e.TaiSan.IdTaiSan) {
      //         listTaiSan[listTaiSan.length - 1].children.push({ data: e });
      //       }
      //     });
      //   }
      //   else {
      //     listTaiSan.push({ data: element, children: [] });
      //   }
      // });
      // this.listTaiSan_copy = listTaiSan;
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
    this._serviceTaiSan.ThanhLyTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.ThanhLyTaiSan().Delete(this.item.Id).subscribe((res: any) => {
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

  Tong() {
    this.TongGiaTri = 0;
    this.item.listTaiSan.forEach(item => {
      console.log('item.GiaTriThanhL', item.GiaTriThanhLy);
      this.TongGiaTri += (item.GiaTriThanhLy || 0);
    })
  }
  getList() {
    this.Tong();
  }
}