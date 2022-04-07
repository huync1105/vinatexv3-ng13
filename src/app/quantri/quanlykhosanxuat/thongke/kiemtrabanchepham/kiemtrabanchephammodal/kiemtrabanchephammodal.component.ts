import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonmathangkiemtrabanchephammodalComponent } from '../chonmathangkiemtrabanchephammodal/chonmathangkiemtrabanchephammodal.component';

@Component({
  selector: 'app-kiemtrabanchephammodal',
  templateUrl: './kiemtrabanchephammodal.component.html',
  styleUrls: ['./kiemtrabanchephammodal.component.css']
})
export class KiemtrabanchephammodalComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumbers: any;
  @ViewChild('voiPintable') voiPintable:PintableDirective;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listCongDoan: any = [];
  listPhanXuong: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  TongKhoiLuong: any = 0;
  userInfo: any ;
  listdmTieuChiBanChePham: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, 
    private _auth: AuthenticationService,
    public _modal: NgbModal, ) {

  }

  ngOnInit(): void {
    this.getListCongDoan();
    if (this.item.isTruVaoSanLuong === undefined)
      this.item.isTruVaoSanLuong = false;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetPhanXuongTheoUser()
    }
    else {
      this.services.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(this.item.CongDoan).subscribe((res: any) => {
        this.listdmTieuChiBanChePham = mapArrayForDropDown(res, 'Ten', 'Id');
      })
    this.userInfo = this._auth.currentUserValue;
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if(this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }
  ChuyenDuyet() {
      this.services.KiemTraBanChePham().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }

  GetNextSoQuyTrinh() {
    this.services.KiemTraBanChePham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
      this.services.KiemTraBanChePham().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
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
      this.services.KiemTraBanChePham().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListCongDoan() {
    this.services.GetlistCongDoanBoDayBongDayPE().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');

    })
  }
  
  GetPhanXuongTheoUser() {
    this.services.GetListPhanXuongTheoUser().subscribe((res: any) => {
      if (res != null && res.length > 0)
        this.item.IddmPhanXuong = res[0].Id;
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetMatHang() {
    if (this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.KiemTraBanChePham().GetMatHang(this.item.IddmPhanXuong, this.item.NgayUnix, this.item.CongDoan).subscribe((res: any) => {
        let modalRef = this._modal.open(ChonmathangkiemtrabanchephammodalComponent, {
          size: 'xl',
          backdrop: 'static'
        })
        modalRef.componentInstance.opt = 'edit';
        modalRef.componentInstance.listMatHang = res;
        modalRef.componentInstance.listItem = deepCopy( this.item.listItem);
        modalRef.result.then((data) => {
          this.item.listItem = data.data;
          this.voiPintable.active();
        });
      })
    }
  }
  
  onClose() {
    this.activeModal.close();
  }
 
  changeCongDoan() {
    this.item.listItem = [];
    this.services.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(this.item.CongDoan).subscribe((res: any) => {
      this.listdmTieuChiBanChePham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  xuongDong(i,length,indexcon){
    let nextIndex = i * length + indexcon+1
    let nextFocus = this.inputNumbers.toArray().find(ele => ele.tabindex === nextIndex+length);
      if (validVariable(nextFocus)) {
        nextFocus.el.nativeElement.children[0].children[0].focus();
        nextFocus.el.nativeElement.children[0].children[0].select();
        // this.item.listItem[i+1].listdmTieuChiBanChePham[indexcon]
      } else {
        this.inputNumbers.toArray()[(indexcon+1>=length?0:indexcon+1)].el.nativeElement.children[0].children[0].focus();
        this.inputNumbers.toArray()[(indexcon+1>=length?0:indexcon+1)].el.nativeElement.children[0].children[0].select();
      }
  }
}
