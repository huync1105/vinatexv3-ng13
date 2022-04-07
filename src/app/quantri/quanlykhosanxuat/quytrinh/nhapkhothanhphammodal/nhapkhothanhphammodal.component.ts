import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';
import { DecimalPipe } from '@angular/common';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';

@Component({
  selector: 'app-nhapkhothanhphammodal',
  templateUrl: './nhapkhothanhphammodal.component.html',
  styleUrls: ['./nhapkhothanhphammodal.component.css']
})
export class NhapkhothanhphammodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  listLoaiBong: any = [];
  listKhoHoiAm: any = [];
  listKhoThanhPham: any = [];
  listdmQuyCachDongGoi: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  format = '0.0-2';
  // listMucDich: any = [
  //   { value: 0, label: 'Xuất khẩu' },
  //   { value: 1, label: 'Nội địa' },
  // ]
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private decimalPipe: DecimalPipe,
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
    else {
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;

    this.getListKho();
    this.getListdmQuyCachDongGoi();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuNhapThanhPham().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapThanhPham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  checkValidate() {
    if (this.item.listItem.length > 0 && this.item.listItem.length !== undefined) {
      for (let i = 0; i < this.item.listItem.length; i++) {
        if (this.item.listItem[i].IdLoHang !== null && this.item.listItem[i].IdLoHang !== undefined) {
          if (this.item.listItem[i].IddmQuyCachDongGoi === null || this.item.listItem[i].IddmQuyCachDongGoi === undefined) {
            return false;
          }
        }
      }
    }
    return true;
  }
  GhiLai() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.PhieuNhapThanhPham().Set(this.item).subscribe((res: any) => {
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
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.PhieuNhapThanhPham().Delete(this.item).subscribe((res: any) => {
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
      this.listKhoHoiAm = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.data.Loai = 11;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoThanhPham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    var data = {
      Ngay: DateToUnix(this.item.Ngay),
      IddmKho: this.item.IddmKhoHoiAm,
    }
    var cols: any = [
      {
        header: 'Tên',
        field: 'Ten',
        width: 'unset'
      },
      {
        header: 'Tên lô',
        field: 'TenLoHang',
        width: 'unset'
      },
      {
        header: 'Số quả',
        field: 'SoLuong',
        width: 'unset'
      },
      {
        header: 'Khối lượng/ quả (kg)',
        field: 'TrongLuong',
        width: 'unset'
      },
    ];
    this._services.GetlistdmMatHangThanhPham(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      // if(res1 !== null && res1 !== undefined){
      //   res1.forEach(element => {
      //     element.SoLuong = this.decimalPipe.transform(element.SoLuong, this.format, 'en-EN');
      //     element.TrongLuong = this.decimalPipe.transform(element.TrongLuong, this.format, 'en-EN');
      //   });
      // }
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.cols = cols;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.result.then((data) => {
        let listItem = deepCopy(this.item.listItem);
        this.item.listItem = data.data;
        this.item.listItem.forEach(element => {
          let isCheck: any = false;
          if (listItem !== undefined && listItem.length > 0) {
            for (let i = 0; i < listItem.length; i++) {
              if (listItem[i].IddmItem === element.IddmItem && listItem[i].IdLoHang === element.IdLoHang) {
                isCheck = true;
                element.SoQuaSoiHoiAm = listItem[i].SoQuaSoiHoiAm;
                element.SoQuaSoiThanhPham = listItem[i].SoQuaSoiThanhPham;
                element.KgCone = listItem[i].KgCone;
                element.IddmKho = this.item.IddmKhoThanhPham;
                element.SoKhoang = listItem[i].SoKhoang;
                element.GhiChu = listItem[i].GhiChu;
                element.SoKien = listItem[i].SoKien;
                element.IddmQuyCachDongGoi = listItem[i].IddmQuyCachDongGoi;
                element.Id = "";
                element.TongKhoiLuong = element.KgCone * element.SoQuaSoiThanhPham;
                break;
              }
            }
          }
          if (isCheck === false) {
            element.SoQuaSoiHoiAm = element.SoLuong;
            element.SoQuaSoiThanhPham = element.SoLuong;
            element.KgCone = element.TrongLuong;
            element.IddmKho = this.item.IddmKhoThanhPham;
            element.Id = "";
            element.TongKhoiLuong = element.KgCone * element.SoQuaSoiThanhPham;
          }
        });
      }, (reason) => {
        // không
      });
    })
  }
  TongKhoiLuong(item) {
    item.TongKhoiLuong = (item.SoQuaSoiThanhPham || 0) * (item.KgCone || 0);
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] =  Math.round(res);
      this.TongKhoiLuong(item);
    })
  }
  ExportExcel() {
    if (validVariable(this.item.Id)) {
      this._services.BaoCao().ExportPhieuNhapKhoThanhPham_Bieu1({ IdPhieuNhapKho: this.item.Id }).subscribe((res: any) => {
        if (res) {
          if (validVariable(res.State)) {
            this.toastr.error(res.message);
          } else {
            this._services.download(res.TenFile);
          }
        }
      })
    } else {
      this.toastr.error('Vui lòng ghi lại phiếu sau đó xuất!')
    }
  }
  KhongDuyet() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuNhapThanhPham().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  TinhKgCone(item) {
    item.KgCone = (item.TongKhoiLuong || 0) / (item.SoQuaSoiThanhPham || 1);
  }
}
