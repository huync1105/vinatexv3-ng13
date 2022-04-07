import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';

@Component({
  selector: 'app-nhapkhobongphemodal',
  templateUrl: './nhapkhobongphemodal.component.html',
  styleUrls: ['./nhapkhobongphemodal.component.css']
})
export class NhapkhobongphemodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listdmViTri: any = [];
  listCaMay: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  listKeHoach: any = [];
  type: any = '';
  editField: any = false;
  nametype: any = '';
  listPhanXuong: any = []
  listCongDoan: any = []
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListLoaiBong();
    this.getListKho();
    this.getListCongDoan();
    // this.getListCapBong();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  
  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined) {
        this.addBongHoi();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.QuyTrinhPhieuBongPhe().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined) {
        this.addBongHoi();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuBongPhe().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  getListCapBong() {
    this._services.GetListdmCapBong(this.data).subscribe((res: any) => {
      this.listCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetNextSoQuyTrinh() {
    this._services.QuyTrinhPhieuBongPhe().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
   if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if ( this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined)
          this.addBongHoi();
          this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuBongPhe().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.Ngay = UnixToDate(this.item.NgayUnix);
            console.log(this.item)
            console.log(this.type)
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.QuyTrinhPhieuBongPhe().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.toastr.success(res.message)
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  getListCongDoan() {
  this._services.GetListCongDoan().subscribe((res: any) => {
    this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
  })
}
  getListKho() {
      // else  if (this.type === 'bongphe'){
        this.data.Loai = 7;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBong() {
    this.data.Loai = 7;
    this._services.GetListdmLoaiBong(this.data).subscribe((res: any) => {
      res.sort((a,b)=>{
        return a.Ten.localeCompare(b.Ten);
      })
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  addBongHoi() {
    if(validVariable(this.newTableItem.IddmLoaiBong) && validVariable(this.newTableItem.SoKien) && validVariable(this.newTableItem.SoCan)){
      if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(deepCopy(this.newTableItem));
    this.newTableItem = {}
    }
    else{
      this.toastr.warning('Bạn cần nhập đầy đủ thông tin!')

    }
  }
 
  deleteBongHoi(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  Onclose() {
    this.activeModal.close();
  }
  exportHoaDon(){
    if(validVariable(this.item.Id)){
      this._services.QuyTrinhPhieuBongPhe().ExportHoaDonNhapKhoBongPhe(this.item.Id).subscribe((res: any) => {
        this._services.download(res.TenFile);
      })
    }else{
      this.toastr.error('Vui lòng ghi lại sau đó xuất Excel!')
    }
  }
}
