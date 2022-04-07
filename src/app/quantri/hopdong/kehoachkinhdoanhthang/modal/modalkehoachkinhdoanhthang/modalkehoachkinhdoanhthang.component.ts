import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { UnixToDate, mapArrayForDropDown, validVariable, deepCopy, DateToUnix } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-modalkehoachkinhdoanhthang',
  templateUrl: './modalkehoachkinhdoanhthang.component.html',
  styleUrls: ['./modalkehoachkinhdoanhthang.component.css']
})
export class ModalkehoachkinhdoanhthangComponent implements OnInit {
  public newitemlap: any = {};
  public newItem: any = {};
  item: any = {};
  copyItem: any = {};
  filter: any = {};
  listPhanXuong: any = [];
  idSanPham: string = "";
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  idDuAn: string = ""
  showDropDown: boolean = false;
  userBtn: any;
  userInfo: any;
  userSub: any;
  oldEditItem: any = {};
  listNam: any = [];
  lang: any = vn;
  listMatHang: any = [];
  listMatHangRef: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  type: any = '';
  intervalArray: any = {};
  lstKH_KeHoachKinhDoanh_SanPham: any = [];
  dummyList: any = [1, 2, 3, 4];
  checkbutton: any = {};
  showThoiGianHopDong: boolean = false;
  listThang: any;
  listKeHoachNam: any = [];
  listKeHoachNamRef: any = [];
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.listThang = [];
    console.log(this.item, this.type);
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
    }
    this.getKeHoachKinhDoanhNam();
    if (this.type === 'themmoi') {
      this.item.TenNguoiLap = this.userInfo.TenNhanVien;
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButton();
    if (this.type === 'capnhat') {
      this.item.lstKH_KeHoachKinhDoanhThang_SanPham.forEach(sp => {
        sp.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay.forEach(nhaMay => {
          nhaMay.TongSanLuongThangTheoKeHoachThang = nhaMay.lstKH_KeHoachKinhDoanhThang_SanPham_PhanXuong.reduce((total, ele) => (ele.SanLuongThang | 0) + total, 0);
        });
        sp.firstNhaMay = sp.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay.splice(0, 1)[0];
      });
      this.item.NgayLap = UnixToDate(this.item.NgayLapUnix)
    }
  }

  GetListMatHang() {
    this._services.GetOptions().GetChiTietMatHangChoKHKD().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listMatHangRef = res;
    })
  }

  getKeHoachKinhDoanhNam() {
    this._danhMucHopDong
      .DanhSachKeHoachKinhDoanh()
      .GetKeHoachKinhDoanhDangThucHien()
      .subscribe((res: any) => {
        res.Data.forEach(kh => {
          kh.HienThi = `${kh.TenKeHoach} - ${kh.SoQuyTrinh}`
        });
        this.listKeHoachNam = mapArrayForDropDown(res.Data, "HienThi", "Id");
        this.listKeHoachNamRef = res.Data;
      });
  }
  GetThongTinChoKeHoachThang() {
    console.log(this.item.IdKeHoachKinhDoanhNamGoc);
    console.log(this.item.Thang)
    if (validVariable(this.item.IdKeHoachKinhDoanhNamGoc)) {
      this.item.Nam = this.listKeHoachNamRef.find(ele => ele.Id === this.item.IdKeHoachKinhDoanhNamGoc)?.Nam;
      if (validVariable(this.item.Thang)) {
        this._danhMucHopDong.KeHoachKinhDoanhThang().KiemTraTonTaiQuyTrinh(this.item.Thang, this.item.IdKeHoachKinhDoanhNamGoc).subscribe(res => {
          if (res) {
            this.toastr.warning(`Đã tồn tại kế hoạch kinh doanh tháng ${this.item.Thang} năm ${this.item.IdKeHoachKinhDoanhNamGoc}`)
          } else {
            this._danhMucHopDong.KeHoachKinhDoanhThang().GetListSanPhamTheoKeHoachKinhDoanhNam(this.item.IdKeHoachKinhDoanhNamGoc, this.item.Thang).subscribe((res: any) => {
              console.log(res);
              res.forEach(sp => {
                sp.firstNhaMay = sp.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay.splice(0, 1)[0];
              });
              this.item.lstKH_KeHoachKinhDoanhThang_SanPham = res;
            })
          }
        })

      }
    }
  }
  TinhTongSanLuongKeHoachNhaMay(rootItem) {
    rootItem.TongSanLuongThangTheoKeHoachThang = rootItem.lstKH_KeHoachKinhDoanhThang_SanPham_PhanXuong.reduce((total, ele) => {
      console.log(ele, total);
      return (ele.SanLuongThang | 0) + total
    }, 0);
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  showModalThoiGianHopDong() {
    this.showThoiGianHopDong = true;
  }

  validData() {
    if (!validVariable(this.item.IdKeHoachKinhDoanhNamGoc)) {
      this.toastr.error('Bạn chưa chọn kế hoạch năm!');
      return false;
    }
    if (!validVariable(this.item.Thang)) {
      this.toastr.error('Bạn chưa chọn tháng lập kế hoạch!');
      return false;
    }
    if (!validVariable(this.item.IdKeHoachKinhDoanhNamGoc)) {
      this.toastr.error('Bạn chưa chọn kế hoạch năm');
      return false;
    }
    // let invalid = [];
    // this.item.lstKH_KeHoachKinhDoanhThang_SanPham.forEach(mathang => {
    //   if (!mathang.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay || mathang.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay.length === 0) {
    //     invalid.push(mathang.TenMatHang)
    //   }
    // })
    // console.log(invalid)
    // if (invalid.length > 0) {
    //   this.toastr.error(`Các mặt hàng chưa chọn nhà máy:${invalid.join(', ')}`);
    //   return false
    // }
    return true
  }
  SetData() {
    let clone;
    this.item.NgayLapUnix = DateToUnix(this.item.NgayLap);
    clone = deepCopy(this.item);
    clone.lstKH_KeHoachKinhDoanhThang_SanPham.forEach(mathang => {
      mathang.lstKH_KeHoachKinhDoanhThang_SanPham_NhaMay.push(mathang.firstNhaMay);
    });
    return clone
  }

  GhiLai() {
    console.log(this.item)
    if (this.validData()) {
      console.log(this.SetData())
      this._danhMucHopDong.KeHoachKinhDoanhThang().Set(this.SetData()).subscribe((res: any) => {
        console.log(res)
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._danhMucHopDong.KeHoachKinhDoanhThang().NextQuyTrinh().subscribe((res: any) => {
      console.log(res);
      this.item.SoQuyTrinh = res.Data;
    })
  }
  KiemTraButton() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChapNhan() {
    if (this.validData()) {
      console.log(this.SetData())
      this._danhMucHopDong.KeHoachKinhDoanhThang().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        console.log(res)
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }
  KhongDuyet() {
    if (this.validData()) {
      console.log(this.SetData())
      this._danhMucHopDong.KeHoachKinhDoanhThang().KhongDuyet(this.SetData()).subscribe((res: any) => {
        console.log(res)
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }
}
