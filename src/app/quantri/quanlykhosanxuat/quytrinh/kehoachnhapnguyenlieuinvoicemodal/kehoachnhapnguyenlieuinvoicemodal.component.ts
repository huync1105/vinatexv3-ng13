import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kehoachnhapnguyenlieuinvoicemodal',
  templateUrl: './kehoachnhapnguyenlieuinvoicemodal.component.html',
  styleUrls: ['./kehoachnhapnguyenlieuinvoicemodal.component.css']
})
export class KehoachnhapnguyenlieuinvoicemodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  canEdit:any=false;
  newTableItem: any = {
    "Id": "",
    "IdKeHoachNhapNguyenLieu_Item": this.item.Id,
  };
  editTableItem: any = [];
  listKho: any = [];
  listKeHoachNguyenLieuFull: any = [];
  listKeHoachNguyenLieu: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
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
      this.canEdit = true;
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.forEach(obj => {
          obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);
          obj.ThoiGianCapCang = UnixToDate(obj.ThoiGianCapCangUnix);
        });
        this.sort()
      }
      this.KiemTraButtonModal();
      this.getListKho(this.item.IdKeHoachNhapNguyenLieu_Item);
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix );
    }
    if (this.item.ThoiGianCapCangUnix !== null && this.item.ThoiGianCapCangUnix !== undefined) {
      this.item.ThoiGianCapCang = UnixToDate(this.item.ThoiGianCapCangUnix);
    }
    if (this.item.ThoiGianDuKienUnix !== null && this.item.ThoiGianDuKienUnix !== undefined) {
      this.item.ThoiGianDuKien = UnixToDate(this.item.ThoiGianDuKienUnix);
    }
    if(this.item.isKetThuc == true)
    {
      this.listKeHoachNguyenLieu = [{
            label: this.item.TenKeHoachNhapNguyenLieuItem,
            value: this.item.IdKeHoachNhapNguyenLieu_Item
      }];
    }
    else{
      this._services.NhapKeHoachNguyenLieuInvoice().KeHoachForInvoice().subscribe((res: any) => {
        this.listKeHoachNguyenLieu = mapArrayForDropDown(res, 'Ten', 'Id');
        this.listKeHoachNguyenLieuFull = res;
      })
    }
    
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res:any) => {
      this.checkbutton = res;
      console.log(res);
      if(res.ChuyenTiep || this.item.Id ===''){
        this.canEdit = true;
      }else{
        this.canEdit = false;
      }
      console.log(this.canEdit);
      if (this.item.IdUserHienTai === this.item.CreatedBy){
        this.checkbutton.Ghi = true;
        if(this.item.isEdit === true){
          this.checkbutton.Ghi = true;
          this.canEdit = true;
        }
      }
    })
  }


  ChuyenTiep() {
    if ((this.newTableItem.IddmLoaiBong !== undefined) && (this.newTableItem.IddmCapBong !== undefined) && (this.newTableItem.ThoiGianDuKien !== undefined)) {
      this.add();
    }
  }
  ChuyenDuyet() {
    var isCheck: any = false;
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("B???n ch??a ch???n  ng??y ch???ng t???");
      isCheck = true;
    }
    else {
      this.item.listItem.forEach(element => {
        if (element.ThoiGianDuKien === null || element.ThoiGianDuKien === undefined || element.ThoiGianCapCang === null || element.ThoiGianCapCang === undefined) {
          this.toastr.error("B???n ch??a ch???n ch???n th???i gian d??? ki???n ho???c th???i gian c???p c???ng");
          isCheck = true;
        }
        if (element.IddmKho === null || element.IddmKho === undefined) {
          this.toastr.error("B???n ch??a ch???n kho");
          isCheck = true;
        }
      });
    }

    if (this.newTableItem.ThoiGianDuKien != undefined && this.newTableItem.ThoiGianDuKien != null
      && this.newTableItem.ThoiGianCapCang != undefined && this.newTableItem.ThoiGianCapCang != null
      && this.newTableItem.Container != undefined &&
      this.newTableItem.TongSoKien != undefined) {
      this.add();
    }
    if (isCheck == false) {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
            obj.ThoiGianDuKienUnix = DateToUnix(obj.ThoiGianDuKien);
          if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
            obj.ThoiGianCapCangUnix = DateToUnix(obj.ThoiGianCapCang);
        });
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.NhapKeHoachNguyenLieuInvoice().ChuyenTiep(this.item).subscribe((res: any) => {
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
  }

  KhongDuyet() {
    if ((this.newTableItem.IddmLoaiBong !== undefined) && (this.newTableItem.IddmCapBong !== undefined) && (this.newTableItem.ThoiGianDuKien !== undefined)) {
      this.add();
    }
    if (this.item.listItem.length > 0) {
      this.item.listItem.filter(obj => {
        if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
          obj.ThoiGianDuKienUnix = DateToUnix(obj.ThoiGianDuKien);
        if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
          obj.ThoiGianCapCangUnix = DateToUnix(obj.ThoiGianCapCang);
      });
    }
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = DateToUnix(this.item.Ngay);


    this._services.NhapKeHoachNguyenLieuInvoice().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this._services.NhapKeHoachNguyenLieuInvoice().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    var isCheck: any = false;
    if (this.newTableItem.ThoiGianDuKien != undefined && this.newTableItem.ThoiGianDuKien != null
      && this.newTableItem.ThoiGianCapCang != undefined && this.newTableItem.ThoiGianCapCang != null
      && this.newTableItem.Container != undefined &&
      this.newTableItem.TongSoKien != undefined) {
      this.add();
    }

    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("B???n ch??a ch???n  ng??y");
      isCheck = true;
    }
    else {
      this.item.listItem.forEach(element => {
        if (element.ThoiGianDuKien === null || element.ThoiGianDuKien === undefined || element.ThoiGianCapCang === null || element.ThoiGianCapCang === undefined) {
          this.toastr.error("B???n ch??a ch???n th???i gian d??? ki???n ho???c th???i gian c???p c???ng");
          isCheck = true;
        }
        if (element.IddmKho === null || element.IddmKho === undefined) {
          this.toastr.error("B???n ch??a ch???n kho");
          isCheck = true;
        }
      });
    }


    if (isCheck == false) {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
            obj.ThoiGianDuKienUnix = DateToUnix(obj.ThoiGianDuKien);
          if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
            obj.ThoiGianCapCangUnix = DateToUnix(obj.ThoiGianCapCang);
        });
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.NhapKeHoachNguyenLieuInvoice().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this._services.NhapKeHoachNguyenLieuInvoice().Get(res.objectReturn.Id).subscribe((res1: any) => {
              this.item = res1;
              if (this.item.ThoiGianCapCangUnix !== null && this.item.ThoiGianCapCangUnix !== undefined) {
                this.item.ThoiGianCapCang = UnixToDate(this.item.ThoiGianCapCangUnix);
              }
              if (this.item.ThoiGianDuKienUnix !== null && this.item.ThoiGianDuKienUnix !== undefined) {
                this.item.ThoiGianDuKien = UnixToDate(this.item.ThoiGianDuKienUnix);
              }
              if (this.item.listItem.length > 0 && this.item.listItem !== null) {
                this.item.listItem.filter(obj => {
                  obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
                  obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
                });
              }

              this.KiemTraButtonModal();
            })
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
    modalRef.componentInstance.message = "B???n c?? ch???c ch???n mu???n x??a quy tr??nh n??y ch????"
    modalRef.result.then(res => {
      this._services.NhapKeHoachNguyenLieuInvoice().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  gettonkho(data_idKho, item) {
    let data: any = {
      idKho: validVariable(data_idKho) ? data_idKho : "",
      idNguyenLieu: validVariable(item.IddmLoaiBong) ? item.IddmLoaiBong : "",
    }
    this._services.GetOptions().GetTonKhoCuaNguyenLieu(data.idKho, data.idNguyenLieu).subscribe((res: any) => {
      item.TonKho = res.TonKho;
    })
  }

  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.newTableItem.Id = "";
    this.newTableItem.IdKeHoachNhapNguyenLieuInvoice = this.item.Id;
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {
      "Id": "",
      "IdKeHoachNhapNguyenLieuInvoice": this.item.Id,
    }
    this.sort()
  }
  edit(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
    this.sort()
  }
  sort() {
    this.item.listItem.sort((a: any, b: any) => {
      return (new Date(a.ThoiGianDuKien).getTime() - new Date(b.ThoiGianDuKien).getTime())
    })
  }
  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
    this.sort()
  }
  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }
  Onclose() {
    this.activeModal.close();
  }
  getKeHoachNhapNguyenLieu() {
    for (let i = 0; i < this.listKeHoachNguyenLieuFull.length; i++) {
      if (this.listKeHoachNguyenLieuFull[i].Id === this.item.IdKeHoachNhapNguyenLieu_Item) {
        this.item.GiaBong = this.listKeHoachNguyenLieuFull[i].GiaBong;
        this.item.SoLuongNhap = this.listKeHoachNguyenLieuFull[i].SoLuongNhap;
        this.item.Container = this.listKeHoachNguyenLieuFull[i].Container;
        this.item.ThoiGianCapCang = UnixToDate(this.listKeHoachNguyenLieuFull[i].ThoiGianCapCangUnix);
        this.item.ThoiGianDuKien = UnixToDate(this.listKeHoachNguyenLieuFull[i].ThoiGianDuKienUnix);
        this.getListKho(this.listKeHoachNguyenLieuFull[i].Id)
        break;
      }
    }
  }
  exportExcel() {
    this._services.NhapKeHoachNguyenLieuInvoice().ExportExcel(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
    })
  }
  getListKho(IdKeHoachNhapNguyenLieu_Item) {
    this._services.GetListdmKhoForLoaiBong(IdKeHoachNhapNguyenLieu_Item).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
}
