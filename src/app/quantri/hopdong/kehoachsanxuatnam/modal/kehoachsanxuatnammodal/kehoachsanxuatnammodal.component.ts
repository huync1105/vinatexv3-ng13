import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { UnixToDate, mapArrayForDropDown, validVariable, deepCopy, DateToUnix } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-kehoachsanxuatnammodal',
  templateUrl: './kehoachsanxuatnammodal.component.html',
  styleUrls: ['./kehoachsanxuatnammodal.component.css']
})
export class KehoachsanxuatnammodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
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
  listKeHoachKinhDoanh: any = []
  listKeHoachKinhDoanhRef: any = []
  dummyList: any = [1, 2, 3, 4];
  checkbutton: any = {};
  lstThoiGianCurrent: any = [];
  showThoiGianHopDong: boolean = false;
  newHopDong: any = {};
  isKetThuc: any;
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.getListNhaMay();
    this.getKeHoachKinhDoanhNam();
    if (this.type === 'themmoi') {
      this.item.TenNguoiLap = this.userInfo.TenNhanVien;
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButton();
    if (this.type === 'capnhat') {
      // this.rebindData()
    }
    if (this.item.isKetThuc) {
      // this.isKetThuc = true;
    }
  }
  TinhSoLuongDaLapKeHoach(rootItem, parentItem) {
    rootItem.SoLuongDaLapKeHoach = this.propThang.reduce((total, prop) => (rootItem[prop] | 0) + total, 0);
    parentItem.SoLuongDaLapKeHoach = parentItem.lstKH_KeHoachSanXuat_SanPham_PhanXuong.reduce((total, ele) => (ele.SoLuongDaLapKeHoach | 0) + total, 0);
    this.propThang.forEach(prop => {
      parentItem.SanXuat[prop] = parentItem.lstKH_KeHoachSanXuat_SanPham_PhanXuong.reduce((total, ele) => (ele[prop] | 0) + total, 0);
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
        this.listKeHoachKinhDoanh = mapArrayForDropDown(res.Data, "HienThi", "Id");
        this.listKeHoachKinhDoanhRef = res.Data;
      });
  }
  getData() {
    if (validVariable(this.item.IdKeHoachKinhDoanh)) {
      this.item.Nam = this.listKeHoachKinhDoanhRef.find(ele => ele.Id === this.item.IdKeHoachKinhDoanh)?.Nam
      if (validVariable(this.item.IdDuAn)){
        let tenNhaMay = this.listNhaMay.find(ele=>ele.value===this.item.IdDuAn)?.label;
        this._danhMucHopDong.KeHoachSanXuatNam().KiemTraTonTaiQuyTrinh(this.item.IdDuAn, this.item.Nam).subscribe(res => {
          if (res) {
            this.toastr.warning(`Đã tồn tại kế hoạch ${tenNhaMay}`)
          } else {
            this._danhMucHopDong.KeHoachSanXuatNam().GetListSanPhamTheoKeHoachKinhDoanhNam(this.item.IdKeHoachKinhDoanh, this.item.IdDuAn).subscribe(res => {
              this.item.lstKeHoachSanXuatNam_SanPham = res;
              this.renderDataToTable();
            })
          }
        })
      }
    }
  }
  renderDataToTable(){
    this.item.lstKeHoachSanXuatNam_SanPham.forEach(sp => {
      sp.TongKeHoach=0;
      sp.SanXuat={};
      for(let i =1;i<=12;i++){
        sp[`Thang${i}`] = sp.lstKH_KeHoachSanXuat_SanPham_KeHoachKinhDoanhNam.find(thang=>thang.Thang===i)?.SanLuongKeHoachNhaMay;
        sp.TongKeHoach += sp[`Thang${i}`];
      }
      sp.lstKH_KeHoachSanXuat_SanPham_PhanXuong.forEach(px => {
        for(let i =1;i<=12;i++){
          px[`Thang${i}`] = px.lstKH_KeHoachSanXuat_SanPham_PhanXuong_Thang.find(thang=>thang.Thang===i)?.SanLuong;
        }
      });
    });
    console.log(this.item.lstKeHoachSanXuatNam_SanPham)
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
      });
  }
  XoaMatHang(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent)
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xoá mặt hàng này không?"
    modalRef.result.then(_ => {
      this.item.lstKH_KeHoachKinhDoanh_SanPham.splice(index, 1);
      this.item.selectedItems = this.item.lstKH_KeHoachKinhDoanh_SanPham.map(ele => ele.IdSanPham);
    })
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  showModalThoiGianHopDong(item) {
    this.showThoiGianHopDong = true;
    console.log(item.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong)
    this.lstThoiGianCurrent = item.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong;
  }

  validData() {
    // if (this.item.lstKH_KeHoachKinhDoanh_SanPham?.length === 0) {
    //   this.toastr.error('Bạn chưa chọn mặt hàng để lập kế hoạch');
    //   return false;
    // }
    // let invalid = [];
    // this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(mathang => {
    //   if (!mathang.lstKH_KeHoachKinhDoanh_SanPham_NhaMay || mathang.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.length === 0) {
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
    this.item.lstKeHoachSanXuatNam_SanPham.forEach(mathang => {
      mathang.lstKH_KeHoachSanXuat_SanPham_PhanXuong.forEach(phanXuong => {
        // phanXuong.lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH = [];
        // phanXuong.TongSanLuongThang = 0;
        for (let i = 1; i <= 12; i++) {
          let found = phanXuong.lstKH_KeHoachSanXuat_SanPham_PhanXuong_Thang.find(ele=>ele.Thang===i)
          found.SanLuong = phanXuong[`Thang${i}`];
        }
      });
    });
    this.item.NgayLapUnix = DateToUnix(this.item.NgayLap)
    this.item.NgayDieuChinhUnix = DateToUnix(this.item.NgayDieuChinh)
    return this.item
  }

  GhiLai() {
    // console.log(this.item);
    if (this.validData()) {
      console.log(this.SetData())
      this._danhMucHopDong.KeHoachSanXuatNam().Set(this.SetData()).subscribe((res: any) => {
        console.log(res)
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
          
        } else {
          this.toastr.success(res.Message);
          // this.activeModal.close();
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._danhMucHopDong.KeHoachSanXuatNam().NextQuyTrinh().subscribe((res: any) => {
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
      this._danhMucHopDong.KeHoachSanXuatNam().ChuyenTiep(this.SetData()).subscribe((res: any) => {
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
      this._danhMucHopDong.KeHoachSanXuatNam().KhongDuyet(this.SetData()).subscribe((res: any) => {
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
