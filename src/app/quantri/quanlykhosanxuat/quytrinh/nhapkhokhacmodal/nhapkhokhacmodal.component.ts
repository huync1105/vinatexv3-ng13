import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown,UnixToDate,DateToUnix } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhapkhokhacmodal',
  templateUrl: './nhapkhokhacmodal.component.html',
  styleUrls: ['./nhapkhokhacmodal.component.css']
})
export class NhapkhokhacmodalComponent implements OnInit {
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
  // type: any = '';
  editField: any = false;
  nametype: any = '';
  TenLoaiBong: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
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
    this.getListCapBong();
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
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined) {
        this.addBongHoi();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapLoBong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._services.QuyTrinhPhieuNhapLoBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    this.item.Loai = 6;

    // if (this.opt !== 'edit') {
    //   if (this.type === 'bonghoi')
    //   else if (this.type === 'bongphe')
    //     this.item.Loai = 7;
    // }
    let isCheck = false;

    if(this.item.listItem!== undefined || this.item.listItem !== null){
      for(let i = 0; i < this.item.listItem.length; i++) {
        if(this.item.listItem[i].IddmViTri === null || this.item.listItem[i].IddmViTri === undefined){
          isCheck= true;
          break;
        }
      }
    }
   
    if (isCheck === true ) {
      this.toastr.error("Bạn chưa chọn  vị trí");
    }
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmLoaiBong === null || this.item.IddmLoaiBong === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục loại bông");
    }
    else {
      if ( this.newTableItem.IddmLoaiBong!= undefined && this.newTableItem.SoCan!= undefined)
          this.addBongHoi();

      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapLoBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.Ngay = UnixToDate(this.item.NgayUnix);
            // console.log(this.type)
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
      this._services.QuyTrinhPhieuNhapLoBong().Delete(this.item).subscribe((res: any) => {
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

  getListKho() {
    this.data.Loai = 6;

    // if (this.opt === 'edit') {
    //   this.data.Loai = this.item.Loai;
    // }
    // else{
    //  if (this.type === 'bonghoi'){
    //     this.data.IddmLoaiBong = this.item.IddmLoaiBong;
    //   }
    //   else  if (this.type === 'bongphe'){
    //     this.data.Loai = 7;
    //   }
    // }
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBong() {
    // if (this.opt === 'edit') {
    //   if (this.type === 'bong')
    //     this.data.Loai = 2;
    //   else
    //     this.data.Loai = this.item.Loai;
    // }
    // else{
    //  if (this.type === 'bonghoi'){
        this.data.Loai = 6;
        this.data.IddmLoaiBong = this.item.IddmLoaiBong;
    //   }
    //   else  if (this.type === 'bongphe'){
    //     this.data.Loai = 7;
    //   }
    // }
    this._services.GetListdmLoaiBong(this.data).subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
      var loaiBong: any = this.listLoaiBong.filter((e: any) => e.value === this.item.IddmLoaiBong);
      this.newTableItem.Ten = loaiBong[0].label;
      this.TenLoaiBong = loaiBong[0].label
    })
  }
  
  addBongHoi() {
    if (this.item.listKien == undefined || this.item.listKien == null)
      this.item.listKien = [];
      // this.newTableItem.IddmLoaiBong = this.item.IddmLoaiBong
    this.item.listKien.push(deepCopy(this.newTableItem));
    this.newTableItem = {Ten:this.TenLoaiBong};
  }
 
  deleteBongHoi(index) {
    let item = this.item.listKien.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listKien.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  Onclose() {
    this.activeModal.close();
  }
  
  getnewitem(item){
    var loaiBong: any = this.listLoaiBong.filter((e: any) => e.value === item.IddmLoaiBong);
    console.log(loaiBong)
    item.Ten = loaiBong[0].label;
    // if(this.item.listKien !== undefined && this.item.listKien.length > 0 && this.item.listKien !== null){
    //   this.item.listKien.forEach(element => {
    //     element.Ten = loaiBong[0].label;
    //     element.IddmLoaiBong = loaiBong[0].value;
    // });
    // }
  }
}
