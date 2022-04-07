import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-trienkhaikehoachsanxuathoanthanhmodal',
  templateUrl: './trienkhaikehoachsanxuathoanthanhmodal.component.html',
  styleUrls: ['./trienkhaikehoachsanxuathoanthanhmodal.component.css']
})
export class TrienkhaikehoachsanxuathoanthanhmodalComponent implements OnInit {
  [x: string]: any;
  opt: any = ''
  item: any = {
    Id: '',
  };
  listCongDoan: any = [];
  filter: any = {};
  checkbutton: any = {};
  listGiaoKeHoach: any = [];
  listPhanXuong: any = [];
  tempDataGiaoKeHoach: any = [];
  listMatHangGiaoKeHoach: any = [];
  itemGiaoKeHoach: any = {};
  mapGiaoKeHoachNIdPhanXuong: any = {};
  lang: any = vn;
  yearRangeChonGiaoKeHoach: string = `${((new Date()).getFullYear() - 10)}:${((new Date()).getFullYear())}`;
  maxDateChonMay: Date = null;
  minDateChonMay: Date = null;
  IddmPhanXuong: string = '';
  PoolMaySanXuat: any = {};
  mapCongDoan_TinhTrangMay: any = {};
  constructor(public activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    this.getListPhanXuong();
  }
  validVariable(e) {
    return validVariable(e);
  }
  getListPhanXuong() {
    this._services.GetOptions().GetPhanXuong().subscribe((res: Array<any>) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      if (this.validVariable(this.item.IddmPhanXuong)) {
        this.getListGiaoKeHoach({ value: this.item.IddmPhanXuong });
      }
      if (validVariable(this.item.IdGiaoKeHoachSanXuat)) {
        this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
      }
    })
  }

  GetListMatHangChuaLapKeHoach(event, reset?) {
    if (validVariable(this.item.TuNgayUnix) && this.item.TuNgayUnix !== 0) {
      this.item.TuNgay = UnixToDate(this.item.TuNgayUnix)
    }
    if (validVariable(this.item.DenNgayUnix) && this.item.DenNgayUnix !== 0) {
      this.item.DenNgay = UnixToDate(this.item.DenNgayUnix)
    }
    if (validVariable(this.item.listCongDoan) && this.item.listCongDoan.length !== 0) {
      this.listCongDoan = mapArrayForDropDown(this.item.listCongDoan, 'Ten', 'Ma');
      this.filter.CongDoan = 'ONG';
    }
    this._services.GetOptions().GetListMatHangChuaLapKeHoach(event.value, this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listMatHangGiaoKeHoach = res;
      if (reset) {
        this.item.listItem = [];
        this.item.TuNgay = null;
        this.item.DenNgay = null;
        this.item.listItemMay = [];
        this.item.listCongDoan = [];
        this.filter.CongDoan = null;
      }
      if (validVariable(this.item.listItem) && this.item.listItem?.length !== 0) {
        this.item.listItem.forEach(mathang => {
          if (validVariable(mathang.TuNgayUnix) && validVariable(mathang.DenNgayUnix)) {
            mathang.TuNgay = UnixToDate(mathang.TuNgayUnix);
            mathang.DenNgay = UnixToDate(mathang.DenNgayUnix);
          }
        });
      }
    })
    if (validVariable(this.item.listItemMay) && this.item.listItemMay?.length !== 0) {
      this.item.listCongDoan.forEach(cd => {
        this.TinhLaiTinhTrangMay(cd.Ma)
      });
    }
  }

  getListGiaoKeHoach(event, reset?) {
    this._services.TrienKhaiKeHoachSanXuat().GetListGiaoKeHoachSanXuatChuaLapKeHoach(event.value).subscribe((res: any) => {
      res.sort((a, b) => new Date(b.Modified).getTime() - new Date(a.Modified).getTime());
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'NoiDung', 'Id');
      if (reset) {
        this.item.listItem = [];
        this.item.TuNgay = null;
        this.item.DenNgay = null;
        this.item.listItemMay = [];
        this.item.listCongDoan = [];
        this.filter.CongDoan = null;
      }
    })
  }
  
  GetTrienKhaiKeHoach(IdTrienKhaiKeHoach) {
    this._services.TrienKhaiKeHoachSanXuat().Get(IdTrienKhaiKeHoach).subscribe(res => {
      this.item = res;
      this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
    });
  }
  GhiLai() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn ?"
    modalRef.result.then(res => {
      this._services.TrienKhaiKeHoachSanXuat().HoanThanh(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  resetFilter() {
    this.filter.KeyWord = '';
  }
  chonCongDoan(e) {
    if (e === 'THO') {
      console.log(this.item.listItemMay.filter(ele => ele.CongDoan === 'THO'))
      this.item.listItemMay.filter(ele => ele.CongDoan === 'THO').forEach(mathang => {
        mathang.IddmPhanXuong = this.item.IddmPhanXuong;
        this._services.TrienKhaiKeHoachSanXuat().GetChiSo(mathang).subscribe((res: any) => {
          mathang.listNMtemp = res.map(ele => {
            return {
              label: ele.toString(),
              value: ele
            }
          });
        })
      });
    }
  }
  
  exportExcelMau() {
    this._services.TrienKhaiKeHoachSanXuat().Export(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}
