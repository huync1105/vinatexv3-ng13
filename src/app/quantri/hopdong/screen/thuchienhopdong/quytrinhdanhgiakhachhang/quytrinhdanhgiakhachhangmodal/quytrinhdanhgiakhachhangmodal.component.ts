import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChinhsuadanhgiakhachhangmodalComponent } from '../chinhsuadanhgiakhachhangmodal/chinhsuadanhgiakhachhangmodal.component';
import { ChonkhachhangmodalComponent } from '../chonkhachhangmodal/chonkhachhangmodal.component';

@Component({
  selector: 'app-quytrinhdanhgiakhachhangmodal',
  templateUrl: './quytrinhdanhgiakhachhangmodal.component.html',
  styleUrls: ['./quytrinhdanhgiakhachhangmodal.component.css']
})
export class QuytrinhdanhgiakhachhangmodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  lang: any = vn;
  data: any = {};
  type: any = '';
  nametype: any = '';
  listKhachHang: any = [];
  IdDuAn: any = 0;
  userInfo: any;
  listTieuChiDanhGia: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService,) {
      this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        listPhieuDanhGia  : [],
        idDuAn: this.IdDuAn,
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
    this.getListKhachHang();
    this.getListdmTieuChiDanhGia();
  }
  getListKhachHang(){
    this._services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listKhachHang = res;
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    this.item.listPhieuDanhGia.forEach(element => {
      delete element.khachHang;
      delete element.listHopDong;
    });
      this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhDanhGia().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }
  KhongDuyet() {
    this.item.listPhieuDanhGia.forEach(element => {
      delete element.khachHang;
      delete element.listHopDong;
    });
      this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhDanhGia().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }
  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhDanhGia().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    this.item.listPhieuDanhGia.forEach(element => {
      delete element.khachHang;
      delete element.listHopDong;
    });
      this._hopdong.QuyTrinhDanhGia().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.getQuyTrinh(res.data.id)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._hopdong.QuyTrinhDanhGia().Delete(this.item.id).subscribe((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getQuyTrinh(Id) {
    this._hopdong.QuyTrinhDanhGia().Get(Id).subscribe((res1: any) => {
      this.item=res1.data;
      this.KiemTraButtonModal();
    })
  }
  delete(index) {
    let item = this.item.listPhieuDanhGia.splice(index, 1)[0];
    if (item.id === '' || item.id === null || item.id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listPhieuDanhGia.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }
  chonKhachHang(){
    let modalRef = this._modal.open(ChonkhachhangmodalComponent, {
      size: 'xl', backdrop: 'static'
    })
    modalRef.componentInstance.items = this.listKhachHang;
    modalRef.componentInstance.selectedItems = deepCopy(this.item.listPhieuDanhGia || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.id;
    modalRef.componentInstance.listTieuChiDanhGia = deepCopy(this.listTieuChiDanhGia);
    modalRef.componentInstance.opt = "";    
    modalRef.result.then(res => {
      this.item.listPhieuDanhGia = deepCopy(res);
    }).catch(er => {
      console.log(er);
    })
  }
  chinhsua(item){
    let modalRef = this._modal.open(ChinhsuadanhgiakhachhangmodalComponent, {
      size: 'xl', backdrop: 'static'
    })
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.IdQuyTrinh = this.item.id;
    modalRef.componentInstance.opt = "";    
    modalRef.result.then(res => {
      item = deepCopy(res);
    }).catch(er => {
      console.log(er);
    })
  }
  getListdmTieuChiDanhGia(){
    let data: any = {currentPage: 0}
    this._hopdong.dmTieuChiDanhGia().GetList(data).subscribe((res1: any) => {
      this.listTieuChiDanhGia = [] ;
      res1.data.forEach(element => {
        let data: any = {
          id: '',
          iddmTieuChiDanhGia: element.id,
          diemToiDa: element.diemToiDa,
          ten: element.ten,
          diem: 0,
          iddmTieuChiCha: element.iddmTieuChiCha,
        }
        this.listTieuChiDanhGia.push(data);
      });
    })
  }
  
}
