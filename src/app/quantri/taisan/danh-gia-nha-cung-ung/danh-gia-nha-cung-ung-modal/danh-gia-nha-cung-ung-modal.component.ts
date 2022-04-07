import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemNhaCungUngModalComponent } from '../them-nha-cung-ung-modal/them-nha-cung-ung-modal.component';
import { SuaNhaCungUngModalComponent } from '../sua-nha-cung-ung-modal/sua-nha-cung-ung-modal.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-gia-nha-cung-ung-modal',
  templateUrl: './danh-gia-nha-cung-ung-modal.component.html',
  styleUrls: ['./danh-gia-nha-cung-ung-modal.component.css']
})
export class DanhGiaNhaCungUngModalComponent implements OnInit {

  title: any;
  quyTrinh: any = {};
  data: any;
  listPhieuDanhGia_copy: any = [];
  filter: any = {};
  paging: any = {};
  opt: any = "";
  checkbutton: any = {};
  listTinhTrang: any[] = [];
  listPheDuyet: any[] = [];
  user: any;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    private _serviceSanXuat: SanXuatService,
    private _serviceAuth: AuthenticationService,
    public toast: ToastrService,
  ) {
    this.listPheDuyet = [
      { id: 'DUYET', label: 'Phê duyệt' },
      { id: 'CHUADUYET', label: 'Chưa phê duyệt' },
    ]
    this.user = this._serviceAuth.currentUserValue;
  }

  ngOnInit(): void {
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
    }
    else {
      this.title = "Cập nhật quy trình đánh giá nhà cung ứng";
      this.quyTrinh.Ngay = new Date(this.quyTrinh.Ngay)
      // this.GetQuyTrinh();
    }
    this.GetListTinhTrang();
    this.ResetFilter();
  }

  GetListTinhTrang() {
    this._serviceTaiSan.NhaCungUng().GetListTinhTrang().subscribe((res: any) => {
      this.listTinhTrang = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._serviceSanXuat.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ResetFilter() {
    this.filter = {};
    this.GetListNhaCungUng(true);
  }

  GetListNhaCungUng(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    this.paging.TotalCount = this.quyTrinh.listPhieuDanhGia.length;
  }

  ValidateData() {
    if(!validVariable(this.quyTrinh.Ngay)){
      this.toast.error('Vui lòng nhập ngày đánh giá!')
      return false
    }
    return true
  }

  SetData() {
    this.quyTrinh.NgayUnix = DateToUnix(this.quyTrinh.Ngay);
    return this.quyTrinh
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.DanhGiaNhaCungUng().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  UpdateQuyTrinh() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.quyTrinh = res.Data;
          // this.quyTrinh.Id = res.Data.Id;
          this.GetListNhaCungUng(true)
          
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  DeleteQuyTrinh() {
    this._serviceTaiSan.DanhGiaNhaCungUng().Delete(this.quyTrinh).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toast.success(res.Message);
        this.activeModal.close();
      } else {
        this.toast.error(res.Message);
      }
    })
  }

  KhongDuyetQuyTrinh() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().KhongDuyet(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  ChuyenTiepQuyTrinh() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  // =================================================================
  //Nha cung ung
  // =================================================================

  AddNhaCungUng() {
    let modalRef = this._modal.open(ThemNhaCungUngModalComponent, {
      size: "xl",
      backdrop: "static"
    })
    modalRef.componentInstance.checkListItem = this.quyTrinh?.listPhieuDanhGia || [];
    modalRef.result
      .then((res: any) => {
        this.quyTrinh.listPhieuDanhGia = (this.quyTrinh?.listPhieuDanhGia || []).concat(res);
        // this.listPhieuDanhGia_copy = this.quyTrinh.listPhieuDanhGia;
        // console.log('list phieu danh gia copy', this.listPhieuDanhGia_copy);
        
      })
      .catch(er => { })
      .finally()
  }


  UpdateNhaCungUng(item) {
    let modalRef = this._modal.open(SuaNhaCungUngModalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.quyTrinh = this.quyTrinh;
    modalRef.componentInstance.listDiemDaDanhGia = item.listTieuChi;
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {
        item.KetQuaDanhGia = res.KetQuaDanhGia;
        item.listTieuChi = res.listTieuChi;
        // console.log('quy trinh sau khi save', this.quyTrinh);
      })
      .catch(er => {})
      .finally(()=>{})
  }

  DeleteNhaCungUng(id: string) {
    let idItem = this.quyTrinh.listPhieuDanhGia.findIndex(item => item.IddmNhaCungUng === id);
    this.quyTrinh.listPhieuDanhGia.splice(idItem, 1);
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListNhaCungUng(false);
  }

  test(item){
    console.log(item);
    console.log(DateToUnix(item));
    // console.log(new Date(item));
  }
}
