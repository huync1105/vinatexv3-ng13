import { ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { NhaphoiammathangmodalComponent } from '../nhaphoiammathangmodal/nhaphoiammathangmodal.component';

@Component({
  selector: 'app-nhapkhohoiammodal',
  templateUrl: './nhapkhohoiammodal.component.html',
  styleUrls: ['./nhapkhohoiammodal.component.css']
})
export class NhapkhohoiammodalComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumbers:any;
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
  listPhanXuong: any = [];
  listCaMay: any = [];
  listKho: any = [];
  listKgCone: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  checkedAll: boolean = false;
  listCaSanXuat: any = [];
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
      this.GetPhanXuongTheoUser();
      this.GetNextSoQuyTrinh();
    }
    else {
      this.KiemTraButtonModal();
    }
    console.log(this.item)
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.TinhAllKLTT();
    this.data.CurrentPage = 0;
    this.getListKho();
    this.getListCaMay();
    this.getListPhanXuong();
    this.getListKgCone();
    this.getListCaSanXuat();
  }
  getListCaSanXuat() {
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ApDung(item) {
    let cloneId = item.KgCone;
    this.item.listItem.forEach(abc => {
      abc.KgCone = cloneId;
    });
  }
  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày!");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn danh mục kho!");
    }else if(!this.item.listItem.every(ele=>validVariable(ele.KgCone))){
      this.toastr.error("Vui lòng chọn Kg/cone ở tất cả các mặt hàng!")
    }
    else {
      if (this.newTableItem.Ten != undefined && this.newTableItem.SoCan != undefined && this.newTableItem.SoKien != undefined && this.newTableItem.ViTri != undefined) {
        this.add();
      }
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem.forEach(element => {
        element.IddmKho = this.item.IddmKho
      });
      this._services.PhieuNhapHoiAm().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.activeModal.close();
            this.Onclose();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapHoiAm().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày!");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn danh mục kho!");
    }
    else if(!this.item.listItem.every(ele=>validVariable(ele.KgCone) && ele.isXoa !== true)){
      console.log(this.item.listItem)
      this.toastr.error("Vui lòng chọn Kg/cone ở tất cả các mặt hàng!")
    }
    else {
      if (this.newTableItem.Ten != undefined && this.newTableItem.SoCan != undefined && this.newTableItem.SoKien != undefined && this.newTableItem.ViTri != undefined) {
        this.add();
      }
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem.forEach(element => {
        element.IddmKho = this.item.IddmKho
      });
      this._services.PhieuNhapHoiAm().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.TinhAllKLTT();
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
      this._services.PhieuNhapHoiAm().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    this.data.Loai = 10;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      if(!validVariable(this.item.IddmKho)){
        this.item.IddmKho = res[0]?.Id
      }
    })
  }
  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaMay() {
    this._services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaMay = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetPhanXuongTheoUser() {
    this._services.GetListPhanXuongTheoUser().subscribe((res: any) => {
      if (res != null && res.length > 0)
        this.item.IddmPhanXuong = res[0].Id;
    })
  }
  GetMatHangTheoKho() {
    let itemSearch: any = {};
    itemSearch.IddmCaSanXuatThucTe = this.item.IddmCaSanXuatThucTe;
    if (this.item.Ngay !== undefined)
      itemSearch.Ngay = DateToUnix(this.item.Ngay);
    itemSearch.IddmPhanXuong = this.item.IddmPhanXuong;
    let listItem : any = (this.item.listItem || []).filter(ele => ele.isXoa !== true)
    this._services.PhieuNhapHoiAm().GetListMatHang(itemSearch).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhaphoiammathangmodalComponent, {
        backdrop: 'static',
        size: 'lg',
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = listItem;
      modalRef.result.then((data) => {
        this.item.listItem.forEach(element => {
          element.isXoa = true;
        });
        console.log(data.data)
        for (let i = 0; i < data.data.length; i++) {
          for (let j = 0; j < listItem.length; j++) {
            if (data.data[i].IddmItem === listItem[j].IddmItem && data.data[i].IdLoBong === listItem[j].IdLoBong) {
              listItem[j].isXoa = false;
              data.data[i].isXoa = true;
            }
          }
        }
        this.item.listItem = this.item.listItem.concat(data.data);
        console.log(this.item.listItem)
        this.TinhAllKLTT()
      }, (reason) => {
        // không
      });
    })
  }
  enter(i){
    if(i+1<this.inputNumbers.toArray().length){
      this.inputNumbers.toArray()[i+1].el.nativeElement.children[0].children[0].focus();
    }else{
      this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
    }
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  Onclose() {
    if (this._modal.hasOpenModals()) {
      // this._modal.dismissAll()
      this.activeModal.close();

    }
  }
  getListKgCone() {
    this._services.GetListKgCone().subscribe((res: any) => {
      this.listKgCone = mapArrayForDropDown(res, 'GiaTri', 'GiaTri');
    })
  }
  tinhKLTT(item) {
    item.KLTT = (item.SoQuaSoiThucTe||0) * (item.KgCone||0);
  }
  TinhAllKLTT(){
    this.item.listItem.forEach(mh => {
      mh.KLTT = (mh.SoQuaSoiThucTe||0) * (mh.KgCone||0);
    });
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
      this.tinhKLTT(item);
    })
  }
}
