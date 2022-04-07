import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { BongphemathangmodalComponent } from '../../bongphemathangmodal/bongphemathangmodal.component';

@Component({
  selector: 'app-xuatkhovattuphumodal',
  templateUrl: './xuatkhovattuphumodal.component.html',
  styleUrls: ['./xuatkhovattuphumodal.component.css']
})
export class XuatkhovattuphumodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listKhachHang: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  paging: any = { CurrentPage: 1 };
  TongKhoiLuong = 0;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal, private decimalPipe: DecimalPipe,) { }

  ngOnInit(): void {
    if (this.opt === 'edit') {
      this.GetQuyTrinh();
    }
    let data: any = {
      CurrentPage: 0
    }
    data.Loai = 23;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetQuyTrinh() {
    this.services.PhieuXuatVatTuPhu().Get(this.item.Id).subscribe((res1: any) => {
      this.item = res1;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
      }
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      this.TinhTongKhoiLuong();
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);

      this.services.PhieuXuatVatTuPhu().ChuyenTiep(this.item).subscribe((res: any) => {
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
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatVatTuPhu().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
      this.services.PhieuXuatVatTuPhu().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;

            if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
              this.item.Ngay = UnixToDate(this.item.NgayUnix);
            }
            if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
              this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
            }
            this.KiemTraButtonModal();
            this.TinhTongKhoiLuong();
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
      this.services.PhieuXuatVatTuPhu().Delete(this.item).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  GetLuuKho(sFilter) {
    console.log(this.item)
    this.services.GetLuuKhoBongPhe(this.item.IddmKho, '', 0, sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(BongphemathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.result.then((data) => {
        console.log(data.data)
        if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
          this.item.listItem.forEach(element => {
            element.isXoa = true
          });
        }

        data.data.forEach(element => {
          console.log(element)
          element.TonSoLuong = element.SoLuong
          element.TonTrongLuong = element.TrongLuong

          if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
            var data = this.item.listItem.filter(
              function (obj) {
                return obj.IddmItem == element.IddmItem;
              });
            if (data != undefined && data.length > 0) {
              element.Id = data[0].Id;
              element.isXoa = false;
              element.TrongLuong = data[0].TrongLuong;
              element.SoLuong = data[0].SoLuong;
            }
            else {
              element.TrongLuong = null;
              element.SoLuong = null;
            }
          }
          else {
            element.TrongLuong = null;
            element.SoLuong = null;
          }
          // element.SoLuongTon = parseInt(element.SoLuong);
          // element.TrongLuongTon = parseFloat(element.TrongLuong);
        });
        this.item.listItem = data.data;
      }, (reason) => {
        // không
      });
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start, end);
  }
  Onclose() {
    this.activeModal.close();
  }
  TinhTongKhoiLuong() {
    this.TongKhoiLuong = 0;
    for (let i = 0; i < this.item.listItem.length; i++) {
      if (this.item.listItem[i].isXoa !== true) {
        this.TongKhoiLuong += ((this.item.listItem[i].TonTrongLuong || 0) * (this.item.listItem[i].SoLuong || 0)) + (this.item.listItem[i].TongTrongLuongChenhLech || 0);
        // this.TongKhoiLuong += (this.item.listItem[i].TonTrongLuong * this.item.listItem[i].SoLuong) || 0;
        // if(validVariable(this.item.listItem[i].TongTrongLuongChenhLech)){
        //   this.TongKhoiLuong += (this.item.listItem[i].TongTrongLuongChenhLech || 0)
        // }
      }
    }
  }
 
}
