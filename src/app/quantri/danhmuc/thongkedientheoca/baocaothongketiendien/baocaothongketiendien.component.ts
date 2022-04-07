import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { BaocaothongketiendienmodalComponent } from './baocaothongketiendienmodal/baocaothongketiendienmodal.component';

@Component({
  selector: 'app-baocaothongketiendien',
  templateUrl: './baocaothongketiendien.component.html',
  styleUrls: ['./baocaothongketiendien.component.css']
})
export class BaocaothongketiendienComponent extends StoreBase implements OnInit, OnDestroy {
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  itemThangs: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = { LoaiThoiGian: 0 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Tên lô hàng',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'SoLuong',
      width: 'unset',
      align: 'center'

    },
    {
      header: 'Trọng lượng',
      field: 'TongTrongLuong',
      width: 'unset',
      align: 'center'

    },
  ];
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  listKhungGio: any = [];
  listThang: any = [];
  listNam: any = [];
  listdmPhanXuong: any = [];
  constructor(public _modal: NgbModal, public store: StoreService, public _toastr: ToastrService, private _service: SanXuatService) {
    super(store)
  }

  ngOnInit(): void {
    let data: any = {};
    this._service.ThongKeDien().GetDanhSachLoaiKhungGio(data).subscribe((res: any) => {
      this.listKhungGio = res;
    })

    for (let i = 1; i < 13; i++) {
      let thang = { value: i, label: "Tháng " + i };
      this.listThang.push(thang);
    }
    let date = new Date();
    let namHienTai = date.getFullYear();
    this.filter.nNam = namHienTai;
    this.filter.nThang = date.getMonth() + 1;
    for (let i = 0; i < 20; i++) {
      this.listNam.push({ value: namHienTai - i, label: namHienTai - i });
    }
    this.filter.TuNgay = (new Date(namHienTai, date.getMonth(), 1));
    this.filter.DenNgay = (new Date(namHienTai, date.getMonth(), date.getDate()));
    this._service.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listdmPhanXuong[0].value;

      this.GetListQuyTrinhThang();

      this.GetListQuyTrinh();
    })


  }

  GetListQuyTrinh() {
    if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay)) {
      if (this.filter.TuNgay > this.filter.DenNgay) {
        this._toastr.error("Từ ngày không được lớn hơn đến ngày!!!");
      }
      else {
        let data: any = {
          TuNgay: DateToUnix(this.filter.TuNgay),
          DenNgay: DateToUnix(this.filter.DenNgay),
          LoaiThoiGian: 0,
          IddmPhanXuong: this.filter.IddmPhanXuong
        }
        this._service.ThongKeDien().GetBaoCaoThongKeTienDien(data).subscribe((res: any) => {
          this.items = res;
        })
      }
    }
    else {
      this._toastr.error("Bạn chưa chọn ngày!!!");
    }
  }
  GetListQuyTrinhThang() {
    if (validVariable(this.filter.nThang) && validVariable(this.filter.nNam)) {
      let data: any = {
        LoaiThoiGian: 2,
        nThang: this.filter.nThang,
        nNam: this.filter.nNam,
        IddmPhanXuong: this.filter.IddmPhanXuong
      }
      this._service.ThongKeDien().GetBaoCaoThongKeTienDien(data).subscribe((res: any) => {
        this.itemThangs = res;
      })
    }
    else {
      this._toastr.error("Bạn chưa chọn đủ dữ liệu!!!");
    }
  }
  GetListQuyTrinhFull() {
    this.GetListQuyTrinhThang()
    this.GetListQuyTrinh()
  }
  resetFilter() {
    this.filter = {
      KeyWord: ''
    };
    this.GetListQuyTrinh();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  GetBaoCao(item) {
    this._service.ThongKeDien().GetItemBaoCaoThongKeTienDien(item).subscribe((res: any) => {
      let modalRef = this._modal.open(BaocaothongketiendienmodalComponent, {
        backdrop: 'static', size: 'fullscreen',
      });
      modalRef.componentInstance.items = res;
      modalRef.componentInstance.NgayNhap = item.NgayNhap;
      modalRef.result.then(res => {
      }).catch(er => console.log(er))
    })
  }
  xuatBaoCaoTienDien() {
    let data = {
      nThang: this.filter.nThang,
      nNam: this.filter.nNam,
      IddmPhanXuong: this.filter.IddmPhanXuong
    }
    this._service.BaoCao().ExportBaoCaoThongKeTienDien(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (validVariable(res.State)) {
          this._toastr.error(res.message);
        } else {
          this._service.download(res.TenFile);
        }
      }
    })
  }
}
