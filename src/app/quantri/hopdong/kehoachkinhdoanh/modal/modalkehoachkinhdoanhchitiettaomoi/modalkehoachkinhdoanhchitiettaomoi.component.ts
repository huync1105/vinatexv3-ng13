import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';
import { ChiphimodalComponent } from '../../../modals/chiphimodal/chiphimodal.component';
import { TinhdoanhthumodalComponent } from '../../../modals/tinhdoanhthumodal/tinhdoanhthumodal.component';
import { ModaldongiakehoachthucteComponent } from '../modaldongiakehoachthucte/modaldongiakehoachthucte.component';
import { ModalkehoachkinhdoanhtheodoiComponent } from '../modalkehoachkinhdoanhtheodoi/modalkehoachkinhdoanhtheodoi.component';

@Component({
  selector: 'app-modalkehoachkinhdoanhchitiettaomoi',
  templateUrl: './modalkehoachkinhdoanhchitiettaomoi.component.html',
  styleUrls: ['./modalkehoachkinhdoanhchitiettaomoi.component.css']
})
export class ModalkehoachkinhdoanhchitiettaomoiComponent implements OnInit {
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
  listDonViTienTe: Array<any> = [{value:'VND',label:'Việt Nam Đồng'},{value:'USD',label:'USD'}];
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
  lstThoiGianCurrent: any = [];
  nangLucNhaMay: any;
  showThoiGianHopDong: boolean = false;
  newHopDong: any = {};
  listThangVuotQuaNangLuc = [];
  listNhaMayVuotQuaNangLuc = [];
  TongSanLuongMatHang_NhaMay: any;
  isKetThuc: any;
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    console.log(this.item, this.type);
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.getListNhaMay();
    this.getListPhanXuong();
    this.GetListMatHang();
    this.GetNangLucNhaMay();
    if (this.type === 'themmoi') {
      this.item.TenNguoiLap = this.userInfo.TenNhanVien;
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButton();
    if (this.type === 'capnhat') {
      this.rebindData()
    }
    if (this.item.isKetThuc) {
      this.isKetThuc = true;
    }
  }
  rebindData() {
    console.log(this.item);
    this.item.NgayLap = UnixToDate(this.item.NgayLapUnix);
    this.item.NgayDieuChinh = UnixToDate(this.item.NgayDieuChinhUnix);
    this.item.selectedItems = this.item.lstKH_KeHoachKinhDoanh_SanPham.map(ele => ele.IdSanPham);
    this.item.selectedItems = this.item.lstKH_KeHoachKinhDoanh_SanPham.map(ele => ele.IdSanPham);
    this.retry('SanPham', 'rebindSanPham_NhaMay');
  }
  retry(opt, callback) {
    this.intervalArray[opt] = setInterval(this[callback].bind(this), 500)
  }
  rebindSanPham_NhaMay() {
    if (this.listMatHang.length !== 0 && this.listNhaMay.length !== 0 && this.nangLucNhaMay !== undefined) {
      clearInterval(this.intervalArray['SanPham'])
      this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(sanpham => {
        sanpham.TenMatHang = this.listMatHang.find(ele => ele.value === sanpham.IdSanPham)?.label;
        sanpham.TongSanLuongConLaiPhaiThucHien = sanpham.SoLuongHopDong - sanpham.SoLuongDaThucHien;
        sanpham.selectedNhaMay = sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.map(ele => ele.IdDuAn);
        for (let i = 1; i <= 12; i++) {
          sanpham[`Thang${i}`] = 0;
        }
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.forEach(nhaMay => {
          nhaMay.TenNhaMay = this.listNhaMay.find(ele => ele.value === nhaMay.IdDuAn)?.label;
          nhaMay.SoLuongDaLapKeHoach = 0
          for (let i = 1; i <= 12; i++) {
            nhaMay[`Thang${i}`] = nhaMay.lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.find(ele => ele.Thang === i).SanLuongThang | 0;
            nhaMay.SoLuongDaLapKeHoach += nhaMay[`Thang${i}`];
            sanpham[`Thang${i}`] += nhaMay[`Thang${i}`];
          }
        });
      });
      this.TinhTongSanLuongMatHang_NhaMay()
      this.TinhTongSanLuongTungMatHang()
      this.voiPintable.active()
    }
  }
  TinhSoLuongDaLapKeHoach(rootItem, parentItem) {
    // console.log(rootItem);
    rootItem.SoLuongDaLapKeHoach = this.propThang.reduce((total, prop) => (rootItem[prop] | 0) + total, 0);
    parentItem.SoLuongDaLapKeHoach = parentItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.reduce((total, ele) => (ele.SoLuongDaLapKeHoach | 0) + total, 0);
    this.propThang.forEach(prop => {
      parentItem[prop] = parentItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.reduce((total, ele) => (ele[prop] | 0) + total, 0);
    })
    this.TinhTongSanLuongMatHang_NhaMay();
    // this.TinhTongSanLuongTungMatHang()
  }
  TinhTongSanLuongMatHang_NhaMay() {
    this.TongSanLuongMatHang_NhaMay = {};
    this.listNhaMay.forEach(ele => {
      this.TongSanLuongMatHang_NhaMay[ele.value] = {}
      this.propThang.forEach(thang => {
        this.TongSanLuongMatHang_NhaMay[ele.value][thang] = 0;
      })
    });
    this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(sanPham => {
      sanPham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.forEach(nhaMay => {
        this.propThang.forEach(thang => {
          this.TongSanLuongMatHang_NhaMay[nhaMay.IdDuAn][thang] += nhaMay[thang];
        })
      });
    });
    console.log(this.TongSanLuongMatHang_NhaMay)
    this.CheckNangLuc()
  }
  CheckNangLuc() {
    this.listThangVuotQuaNangLuc = [];
    this.listNhaMayVuotQuaNangLuc = [];
    for (let key in this.TongSanLuongMatHang_NhaMay) {
      this.propThang.forEach(thang => {
        if(this.TongSanLuongMatHang_NhaMay[key][thang]>this.nangLucNhaMay[key].NangLuc){
          this.listNhaMayVuotQuaNangLuc.push(parseInt(key));
          this.listThangVuotQuaNangLuc.push(thang);
        }
      })
    }
    this.listThangVuotQuaNangLuc = [...new Set(this.listThangVuotQuaNangLuc)]
    this.listNhaMayVuotQuaNangLuc = [...new Set(this.listNhaMayVuotQuaNangLuc)]
    if(this.listThangVuotQuaNangLuc.length!==0&&this.listNhaMayVuotQuaNangLuc.length!==0){
      this.toastr.warning('Kế hoạch vượt quá năng lực nhà máy!!!')
    }
    // console.log(this.listThangVuotQuaNangLuc);
    // console.log(this.listNhaMayVuotQuaNangLuc);
  }
  GetListMatHang() {
    this._services.GetOptions().GetChiTietMatHangChoKHKD().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listMatHangRef = res;
    })
  }
  GetNangLucNhaMay() {
    this._danhMucHopDong.DinhMucSanXuat().GetList().subscribe((res: any) => {
      this.nangLucNhaMay = {};
      res.forEach(ele => {
        if (!validVariable(this.nangLucNhaMay[ele.IdDuAn])) {
          this.nangLucNhaMay[ele.IdDuAn] = { NangLuc: 0, TongKeHoach: 0 };
        }
        this.nangLucNhaMay[ele.IdDuAn].NangLuc += (ele.DinhMucSanXuat | 0);
      });
    })
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
      });
  }
  changeNhaMay(rootItem) {
    // console.log(rootItem.selectedNhaMay)
    rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay = rootItem.selectedNhaMay.map(key => {
      return {
        TenNhaMay: this.listNhaMay.find(ele => ele.value === key)?.label,
        IdDuAn: key,
      }
    })
  }
  XoaMatHang(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent);
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xoá mặt hàng này không?";
    modalRef.result.then(_ => {
      this.item.lstKH_KeHoachKinhDoanh_SanPham.splice(index, 1);
      this.item.selectedItems = this.item.lstKH_KeHoachKinhDoanh_SanPham.map(ele => ele.IdSanPham);
    })
  }
  changeItem(rootItem) {
    // rootItem.selectedItems;
    if (!validVariable(rootItem.lstKH_KeHoachKinhDoanh_SanPham)) {
      rootItem.lstKH_KeHoachKinhDoanh_SanPham = [];
    }
    let exist = rootItem.lstKH_KeHoachKinhDoanh_SanPham.map(ele => ele.IdSanPham);
    rootItem.selectedItems.forEach(key => {
      if (!exist.includes(key)) {
        // let alo
        console.log(this.listMatHangRef.find(ele => ele.Id === key));
        rootItem.lstKH_KeHoachKinhDoanh_SanPham.push(
          {
            TenMatHang: this.listMatHang.find(ele => ele.value === key)?.label,
            IdSanPham: key,
            SoLuongHopDong: this.listMatHangRef.find(ele => ele.Id === key)?.TongSanLuongHopDong | 0,
            SoLuongDaThucHien: this.listMatHangRef.find(ele => ele.Id === key)?.TongSanLuongDaThucHien | 0,
            TongSanLuongConLaiPhaiThucHien: this.listMatHangRef.find(ele => ele.Id === key)?.TongSanLuongConLaiPhaiThucHien | 0,
            SoLuongDangDo: 0,
            SoLuongDuKien: 0,
            selectedNhaMay: this.listNhaMay.length > 1 ? [] : [this.listNhaMay[0].value],
            lstKH_KeHoachKinhDoanh_SanPham_NhaMay: this.listNhaMay.length > 1 ? [] : [{ IdDuAn: this.listNhaMay[0].value, TenNhaMay: this.listNhaMay[0].label }],
            lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong: this.listMatHangRef.find(ele => ele.Id === key)?.lstThoiGianHopDong,
          }
        );
        exist.push(key);
      }
    });
    for (let i = exist.length - 1; i >= 0; i--) {
      if (!rootItem.selectedItems.includes(exist[i])) {
        rootItem.lstKH_KeHoachKinhDoanh_SanPham.splice(i, 1)
      }
    }
    this.TinhTongSanLuongTungMatHang();
  }

  addNhaMay(rootItem) {
    !rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay && (rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay = []);
    let exist = rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.map(ele => ele.IdDuAn);
    rootItem.selectedNhaMay.forEach(key => {
      if (!exist.includes(key)) {
        rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.push({
          IdDuAn: key,
          TenNhaMay: this.listNhaMay.find(ele => ele.value === key)?.label
        })
      }
    });
    for (let i = rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.length; i >= 0; i--) {
      if (!rootItem.selectedNhaMay.includes(exist[i])) {
        rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.splice(i, 1);
      }
    }
    // rootItem.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.push({});
  }
  TinhTongSanLuongTungMatHang() {
    this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(matHang => {
      matHang.TongSanLuong = (matHang.SoLuongHopDong | 0) + (matHang.SoLuongDuKien | 0);
      matHang.SoLuongCanLapKeHoach = ((matHang.TongSanLuongConLaiPhaiThucHien | 0) - (matHang.SoLuongDangDo | 0)) + (matHang.SoLuongDuKien | 0);
    });
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
  ThemThoiGianHopDong() {
    this.lstThoiGianCurrent.push(deepCopy(this.newHopDong))
    this.newHopDong = {}
  }
  XoaThoiGianHopDong(i) {
    this.lstThoiGianCurrent.splice(i, 1)
  }
  TheoDoi(item) {
    if (item.Id !== undefined) {
      let modalRef = this._modal.open(ModalkehoachkinhdoanhtheodoiComponent, {
        backdrop: 'static',
        size: 'fullscreen'
      });
      modalRef.componentInstance.opt = 'add';
      modalRef.componentInstance.type = this.listMatHang.find(ele => ele.value === item.IdSanPham)?.label;
      modalRef.componentInstance.title = 'Theo dõi kế hoạch - Thực tế';
      modalRef.componentInstance.item = item;
    }
  }

  addSanPham() {
    if (this.item.lstKH_KeHoachKinhDoanh_SanPham == undefined || this.item.lstKH_KeHoachKinhDoanh_SanPham == null)
      this.item.lstKH_KeHoachKinhDoanh_SanPham = [];
    this.item.lstKH_KeHoachKinhDoanh_SanPham.push(deepCopy(this.newItem));
    this.newItem = {}
  }

  delete(index) {
    let item = this.item.lstKH_KeHoachKinhDoanh_SanPham.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      // this.item.lstKH_KeHoachKinhDoanh_SanPham.push(JSON.parse(JSON.stringify(item)));
    }
  }
  validData() {
    if (this.item.lstKH_KeHoachKinhDoanh_SanPham?.length === 0) {
      this.toastr.error('Bạn chưa chọn mặt hàng để lập kế hoạch');
      return false;
    }
    let invalid = [];
    this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(mathang => {
      if (!mathang.lstKH_KeHoachKinhDoanh_SanPham_NhaMay || mathang.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.length === 0) {
        invalid.push(mathang.TenMatHang)
      }
    })
    console.log(invalid)
    if (invalid.length > 0) {
      this.toastr.error(`Các mặt hàng chưa chọn nhà máy:${invalid.join(', ')}`);
      return false
    }
    return true
  }
  SetData() {
    this.item.lstKH_KeHoachKinhDoanh_SanPham.forEach(mathang => {
      mathang.lstKH_KeHoachKinhDoanh_SanPham_NhaMay.forEach(nhamay => {
        nhamay.lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH = [];
        nhamay.TongSanLuongThang = 0;
        for (let i = 1; i <= 12; i++) {
          nhamay.TongSanLuongThang += (nhamay[`Thang${i}`] | 0);
          nhamay.lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.push({
            IdSanPham: mathang.IdSanPham,
            IdDuAn: nhamay.IdDuAn,
            Nam: this.item.Nam,
            Thang: i,
            SanLuongThang: nhamay[`Thang${i}`] | 0,
            ChiPhiDinhMuc1Kg: 0,
            ChiPhi: 0,
            DonGia: 0,
            DoanhThu: 0
          })
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
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Set(this.SetData()).subscribe((res: any) => {
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

  CapNhatDonGia() {
    let modalRef = this._modal.open(ModaldongiakehoachthucteComponent, {
      backdrop: 'static',
      size: 'fullscreen'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = '';
  }
  GetNextSoQuyTrinh() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().NextQuyTrinh().subscribe((res: any) => {
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
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().ChuyenTiep(this.SetData()).subscribe((res: any) => {
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
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().KhongDuyet(this.SetData()).subscribe((res: any) => {
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
  DieuChinhKeHoach() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().DieuChinh(this.item.Id).subscribe((res: any) => {
      this.item = {};
      res.NgayLap = UnixToDate(res.NgayLapUnix)
      this.item = res;
      this.GetNextSoQuyTrinh();
      this.rebindData();
      this.KiemTraButton();
      console.log(res);
    })
  }
  KiemTraTonTaiQuyTrinh() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().KiemTraTonTaiQuyTrinh(this.item.Nam).subscribe(res => {
      if (res) {
        this.toastr.warning(`Kế hoạch kinh doanh năm ${this.item.Nam} đã tồn tại!\nVui lòng chọn năm lập kế hoạch khác hoặc điều chỉnh kế hoạch đã tồn tại!`)
        this.item.Nam = null;
      }
    })
  }
  UocTinhDoanhThu(){
    let modalRef = this._modal.open(TinhdoanhthumodalComponent,{
      backdrop:"static",
      keyboard:false,
      size:'fullscreen'
    })
  }
  ChiPhi(){
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetChiPhi(this.item.Id).subscribe((res: any) => {
          let modalRef = this._modal.open(ChiphimodalComponent,{
            backdrop:"static",
            size:"fullscreen",
            keyboard:false,
          })
          modalRef.componentInstance.item = {Id:this.item.Id};
          if (!res) {
            this.toastr.warning(`Không có data !!!`)
          }
        })
    }
   
  DanhMucDonGia(){
    
  }
}




