import { formatNumber } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { CVMic, CVMic2, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';
import { ThemlotuonglaimodalComponent } from '../layoutmodals/themlotuonglaimodal/themlotuonglaimodal.component';
import { TimbongtheobanmodalComponent } from '../timbongtheobanmodal/timbongtheobanmodal.component';

@Component({
  selector: 'app-phabongmodal',
  templateUrl: './phabongmodal.component.html',
  styleUrls: ['./phabongmodal.component.css'],
})
export class PhabongmodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  listBanBong: any = [];
  listTrienKhaiKeHoach: any = [];
  listItems: any = [];
  listProps: any = [];
  listCol: any = [];
  listFixedCol: any = [];
  editVal: any = 0;
  checkbutton: any = {};
  opt: any = '';
  listLoBong: any = [];
  itemSoKienTrenBan = {};
  itemMicBQ = {};
  itembBQ = {};
  itemCVMic = {};
  itemGiaTrungBinh: any = {};
  itemTrongLuong1Ban: any = {};
  itemTrongLuong1BanTruBongHoi: any = {};
  itemDeltaPlusB: any = {};
  itemSoKienTrenBanTruBongHoi = {};
  SoBanCongThem:number=null;
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  isCopying: boolean = false;
  copyItem: any = {
    name: null,
    listSoKien: [],
    BanSo: null
  };
  TongKhoiLuongDung: any = null;
  TongTyLe: number = 100;
  itemTrienKhaiKeHoach: any = {};
  SoNgayTrienKhaiKeHoach: any = null;
  ChatLuongBinhQuan: any = {
    Rd: 0,
    Mic: 0,
    b: 0
  }
  labelBong: any = {
  }
  ThongSoKienTheoLoaiBong: any = {

  };
  listCotDaXuat: Array<string> = []
  checkbuttonDieuChinh: boolean = false;
  trongLuongLoBong: any = {};
  itemMicTT: any = {};
  itemCVMicTT: any = {};
  itemTyLeHoiPha: any = {};
  listLoaiBong: any = [];
  listdmLoaiBong: any = [];
  isEditing: boolean = false;
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal, private zone: NgZone, private changeDec: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false
    }
    if (validVariable(this.item.listCotDaXuat)) {
      this.listCotDaXuat = this.item.listCotDaXuat.map((ele: number) => ele.toString())
    }
    this.GetListdmLoaiBong_PAPB();
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
      isHoanThanh: false
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'NoiDung', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
    })
  }
  GetChiTietTrienKhaiKeHoachForMatHang(event) {
    this._services.TrienKhaiKeHoachSanXuat().Get(event.value, false).subscribe((res: any) => {
      this.itemTrienKhaiKeHoach = res;
      if (validVariable(this.item.KhoiLuongBong) && validVariable(this.item.TongSoKien) && validVariable(this.item.KhoiLuongKienTrungBinh) && validVariable(this.item.listLoBong) && validVariable(this.item.TrongLuongBongHoi) && validVariable(this.item.SoKienBongHoi)) {
        let SoNgayTrienKhai = Math.floor((this.itemTrienKhaiKeHoach.DenNgayUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1);
        let _1NgayCan = this.item.KhoiLuongBong / SoNgayTrienKhai;
        let TrongLuongTrungBinh1Ban = (this.item.KhoiLuongKienTrungBinh * (this.item.TongSoKien - this.item.SoKienBongHoi)) + this.item.TrongLuongBongHoi;
        let TyLeBongCan = _1NgayCan / TrongLuongTrungBinh1Ban;
        console.log('Số ngày triển khai', SoNgayTrienKhai);
        console.log('Khối lượng bông cần dùng', this.item.KhoiLuongBong);
        console.log('1 ngày cần bao nhiêu bông', _1NgayCan);
        console.log('Khối lượng kiện trung bình', this.item.KhoiLuongKienTrungBinh);
        console.log('Trọng lượng trung bình 1 bàn (chỉ tính bông nguyên)', this.item.KhoiLuongKienTrungBinh * (this.item.TongSoKien - this.item.SoKienBongHoi));
        console.log('Trọng lưọng trung bình 1 bàn', TrongLuongTrungBinh1Ban);
        console.log('Tỷ lệ bông cần', TyLeBongCan);
        this.item.listLoBong.forEach((lobong) => {
          if (lobong.isLoBongTuongLai) {
            let SoNgayDuKien = Math.floor((lobong.NgayVeDuKienUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1);
            lobong.lim = Math.floor(SoNgayDuKien * TyLeBongCan);
            console.log(`Lô bông ${lobong.Ma} - Số ngày dự kiến ${SoNgayDuKien} - Số bàn có thể điền ${lobong.lim} - Số bàn có thể điền không làm tròn ${SoNgayDuKien * TyLeBongCan}`);
            if (lobong.NgayVeDuKien === null) {
              lobong.canDelete = true;
            }
          }
        })
        if (validVariable(this.item.SoBanBong) && this.item.SoBanBong !== 0) {
          this.rebindDataToTable()

        }
      }
      this.GetLoBongTrongKho();
    })
  }
  ThemBanBong(){
    if(this.SoBanCongThem&&this.SoBanCongThem>0){
      for(let i = this.item.SoBanBong+1;i<=(this.item.SoBanBong + this.SoBanCongThem);i++){
        this.listProps.push(`${i}`)
        this.item.listLoBong.forEach((lobong, index) => {
          let data = {
            SoKien:null,
            tabIndex: index + 1 + (i * this.item.listLoBong.length)
          }
          lobong.tempBanBong[`${i}`] = data;
        })
      }
      this.item.SoBanBong+=this.SoBanCongThem;
      this.SoBanCongThem =null;
    }
  }
  rebindDataToTable() {
    console.log('rebind data')
    this.listProps = [];
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      this.listProps.push(`${i}`);
    }
    this.item.listLoBong.forEach((lobong, index) => {
      if (!validVariable(lobong.temBanBong)) {
        lobong.tempBanBong = {};
      }
      lobong.listItem.forEach((item) => {
        let data = {
          ...item,
          SoKien: (lobong.isLoBongTuongLai && item.ThuTu < lobong.lim) ? null : item.SoLuongKien,
          tabIndex: index + 1 + (item.ThuTu * this.item.listLoBong.length)
        }
        lobong.tempBanBong[`${item.ThuTu}`] = data;
      });
    });
    let TongChatLuong = {
      Mic: 0,
      Rd: 0,
      b: 0,
      Mat: 0,
      Str: 0,
      Tap: 0,
      Am: 0,
      UHML: 0,
      SFI: 0
    }
    this.item.listLoBong.forEach(lobong => {
      for (let chatluong in TongChatLuong) {
        if (validVariable(lobong[chatluong])) {
          TongChatLuong[chatluong] += lobong[chatluong];
        }
      }
    });
    this.ChatLuongBinhQuan = {}
    for (let chatluong in TongChatLuong) {
      this.ChatLuongBinhQuan[chatluong] = TongChatLuong[chatluong] / (this.item.listLoBong.length - this.item.listLoBong.filter(ele => !validVariable(ele[chatluong])).length);
    }
    this.labelBong = {}
    this.trongLuongLoBong = {}
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.labelBong[lobong.IddmLoaiBong.split('-').join('_')])) {
        this.labelBong[lobong.IddmLoaiBong.split('-').join('_')] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.labelBong[lobong.IddmLoaiBong.split('-').join('_')] += lobong.TyLe;
      }
    });
    this.item.TyLePhaBong = `${formatNumber(this.labelBong.BR, 'en-EN', '0.0-1')}% Brazil + ${formatNumber(this.labelBong.MY, 'en-EN', '0.0-1')}% Mỹ + ${formatNumber(this.labelBong.TP, 'en-EN', '0.0-1')}% Tây Phi + ${formatNumber(this.labelBong.zH, 'en-EN', '0.0-1')}% Hồi`
    for (let i = 0; i < this.item.listLoBong.length; i++) {
      for (let j = 1; j <= this.item.SoBanBong; j++) {
        this.CalAllTable(i, `${j}`);
      }
    }
    this.TinhThongTinKienTheoLoaiBong();
    if (validVariable(this.item.listThongSo)) {
      this.item.listThongSo.forEach(thongso => {
        this.itemMicTT[`${thongso.ThuTu}`] = thongso.MicTT;
        this.itemCVMicTT[`${thongso.ThuTu}`] = thongso.CVMicTT;
        this.itemTyLeHoiPha[`${thongso.ThuTu}`] = thongso.TyLeHoiPha;
      });
    }
  }
  GetLoBongTrongKho() {
    this._services.PhuongAnPhaBong().GetLoBongTrongKho(this.itemTrienKhaiKeHoach.IdDuAn, this.itemTrienKhaiKeHoach.IddmPhanXuong).subscribe((res: any) => {
      this.listLoBong = res;
    })
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.itemTrienKhaiKeHoach.listItem || [];
    modalRef.componentInstance.selectedItems = this.item.listItem || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "KhoiLuongSanXuat";
    modalRef.result.then(res => {
      this.item.listItem = res;
      let data = {
        listItem: res,
        IdDuAn: this.itemTrienKhaiKeHoach.IdDuAn,
        IddmPhanXuong: this.itemTrienKhaiKeHoach.IddmPhanXuong
      }
      this._services.PhuongAnPhaBong().TinhKhoiLuongBong(data).subscribe((result: any) => {
        if (result.State === 1) {
          this.item.KhoiLuongBong = parseFloat(result.message);
          if (validVariable(this.item.TongSoKien)) {
            this.TinhSoBanBong({ value: this.item.TongSoKien });
          }
        } else {
          this._toastr.error(result.message);
        }
      })
    })
      .catch(er => {
        console.log(er);
      })
  }
  chonLoBong() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.listLoBong || [];
    modalRef.componentInstance.selectedItems = this.item.listLoBong || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "LoBong";
    modalRef.result.then(res => {
      this.item.listLoBong = res;
      if (res.length > 0) {
        let TongKhoiLuong = res.filter(ele => ele.IdLoBong !== null).reduce((sum, ele) => {
          return sum + ele.TrongLuong
        }, 0)
        this.item.KhoiLuongKienTrungBinh = TongKhoiLuong / (res.filter(ele => ele.IdLoBong !== null).length);
        // .filter(ele=>!ele.isLoBongTuongLai)
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0,
          Mat: 0,
          Str: 0,
          Tap: 0,
          Am: 0,
          UHML: 0,
          SFI: 0
        }
        this.item.listLoBong.forEach(lobong => {
          for (let chatluong in TongChatLuong) {
            if (validVariable(lobong[chatluong])) {
              TongChatLuong[chatluong] += lobong[chatluong];
            }
          }
        });
        this.ChatLuongBinhQuan = {}
        for (let chatluong in TongChatLuong) {
          this.ChatLuongBinhQuan[chatluong] = TongChatLuong[chatluong] / (this.item.listLoBong.length - this.item.listLoBong.filter(ele => !validVariable(ele[chatluong])).length);
        }
        let unique = [...new Set(this.item.listLoBong.map(ele => ele.IddmLoaiBong))]
        this.listLoaiBong = unique.map((ele: string) => {
          return {
            prop: ele.split('-').join('_'),
            name: this.listdmLoaiBong.filter(loaibong => loaibong.Id === ele)?.[0]?.Ten,
          }
        })
        if (validVariable(this.item.TongSoKien)) {
          this.TinhSoBanBong({ value: this.item.TongSoKien });
        }
      }

    })
      .catch(er => {
        console.log(er);
      })
  }
  themLoTuongLai() {
    let modalRef = this._modal.open(ThemlotuonglaimodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = deepCopy((this.listLoBong || []).filter(ele => ele.isLoBongTuongLai));
    modalRef.componentInstance.selectedItems = deepCopy((this.item.listLoBong || []).filter(ele => ele.isLoBongTuongLai));
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      console.log(res);
      let SoNgayTrienKhai = Math.floor((this.itemTrienKhaiKeHoach.DenNgayUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1);
      let _1NgayCan = this.item.KhoiLuongBong / SoNgayTrienKhai;
      let TrongLuongTrungBinh1Ban = this.item.KhoiLuongKienTrungBinh * this.item.TongSoKien;
      let TyLeBongCan = _1NgayCan / TrongLuongTrungBinh1Ban;
      res.forEach((lobong, index) => {
        lobong.tempBanBong = {};
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          lobong.tempBanBong[`${i}`] = deepCopy({
            SoKien: null,
            tabIndex: -1
          });
        }
        if (lobong.isLoBongTuongLai) {
          console.log('tuonglaiiiiii')
          let SoNgayDuKien = Math.floor((lobong.NgayVeDuKienUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1)
          lobong.lim = Math.floor(SoNgayDuKien * TyLeBongCan);
        }
      })
      this.item.listLoBong = [...this.item.listLoBong, ...res];
    })
      .catch()
  }
  xoaLoTuongLai(item) {
    item.isXoa = true;
    // console.log(this.item.listLoBong.filter(ele=>ele.NgayVeDuKien===null&&ele.isLoBongTuongLai));
  }
  TinhSoBanBong(e?) {
    if (validVariable(this.item.KhoiLuongBong) && validVariable(this.item.TongSoKien) && validVariable(this.item.KhoiLuongKienTrungBinh) && validVariable(this.item.listLoBong) && validVariable(this.item.TrongLuongBongHoi) && validVariable(this.item.SoKienBongHoi)) {
      this.item.SoBanBong = Math.ceil(this.item.KhoiLuongBong / (((this.item.TongSoKien - this.item.SoKienBongHoi) * this.item.KhoiLuongKienTrungBinh) + this.item.TrongLuongBongHoi));
      this.listProps = [];
      let SoNgayTrienKhai = Math.floor((this.itemTrienKhaiKeHoach.DenNgayUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1);
      let _1NgayCan = this.item.KhoiLuongBong / SoNgayTrienKhai;
      let TrongLuongTrungBinh1Ban = this.item.KhoiLuongKienTrungBinh * this.item.TongSoKien;
      let TyLeBongCan = _1NgayCan / TrongLuongTrungBinh1Ban;
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.listProps.push(`${i}`);
      }
      this.item.listLoBong.forEach((lobong, index) => {
        lobong.tempBanBong = {};
        console.log(this.item.SoBanBong);
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          lobong.tempBanBong[`${i}`] = deepCopy({
            SoKien: null,
            tabIndex: ((i - 1) * this.item.listLoBong.length) + index + 1
          });
        }
        if (lobong.isLoBongTuongLai) {
          let SoNgayDuKien = Math.floor((lobong.NgayVeDuKienUnix - this.itemTrienKhaiKeHoach.TuNgayUnix) / (24 * 60 * 60) + 1)
          lobong.lim = Math.floor(SoNgayDuKien * TyLeBongCan);
        }
      })
      this.itemSoKienTrenBan = {};
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.itemSoKienTrenBan[`${i}`] = null;
      }
      this.voiPintable.active();
      console.log(this.item.KhoiLuongKienTrungBinh);
      console.log(this.item)
    }
  }
  TinhTyLeTong() {
    this.labelBong = {}
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.labelBong[lobong.IddmLoaiBong.split('-').join('_')])) {
        this.labelBong[lobong.IddmLoaiBong.split('-').join('_')] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.labelBong[lobong.IddmLoaiBong.split('-').join('_')] += lobong.TyLe;
      }
    });
    this.item.TyLePhaBong = this.listLoaiBong.reduce((Tong, ele, index) => { return Tong + `${index === 0 ? '' : ' + '}${formatNumber(this.labelBong[ele.prop], 'en-EN', '0.0-2')}% ${ele.name}` }, '')
  }
  TinhTongTrongLuong() {
    this.trongLuongLoBong = {};
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.trongLuongLoBong[lobong.IddmLoaiBong.split('-').join('_')])) {
        this.trongLuongLoBong[lobong.IddmLoaiBong.split('-').join('_')] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.trongLuongLoBong[lobong.IddmLoaiBong.split('-').join('_')] += lobong.TongTrongLuong;
      }
    });
    this.item.TyLeTrongLuong = this.listLoaiBong.reduce((Tong, ele, index) => { return Tong + `${index === 0 ? '' : ' + '}${formatNumber(this.trongLuongLoBong[ele.prop], 'en-EN', '0.0-2')}kg ${ele.name}` }, '')
  }
  TinhDeltaB() {
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      this.itembBQ[`${i}`] = Math.round(this.itembBQ[`${i}`] * 100) / 100;
    }
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (i === 1) {
        this.itemDeltaPlusB[`${i}`] = 0;
      } else {
        this.itemDeltaPlusB[`${i}`] = (this.itembBQ[`${i}`] - this.itembBQ[`${i - 1}`]);
      }
    }
  }
  TinhThongTinKienTheoLoaiBong() {
    this.ThongSoKienTheoLoaiBong = {};
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')])) {
        this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')] = {
          TonDau: 0,
          TonCuoi: 0,
          SoLuongDung: 0,
          Mau: null
        }
      }
      this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')].TonDau += lobong.SoLuongKien;
      this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')].TonCuoi += lobong.TonCuoi ? lobong.TonCuoi : 0;
      this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')].SoLuongDung += lobong.SoLuongDung ? lobong.SoLuongDung : 0;
      this.ThongSoKienTheoLoaiBong[lobong.IddmLoaiBong.split('-').join('_')].Mau = lobong.Mau;
    });
  }
  TinhLuyKeTyLeBong() {
    for (let i = 1; i < this.item.listLoBong.length; i++) {
      let tempLK = 0
      for (let j = 0; j <= i; j++) {
        if (validVariable(this.item.listLoBong[j].TyLe)) {
          tempLK += this.item.listLoBong[j].TyLe;
        }
      }
      this.item.listLoBong[i].LuyKeTyLe = tempLK;
    }
  }
  CalAllTable(y, x) {
    let tempSLD = 0;
    let tempSoKien1Line = 0;
    let tempSoKien1LineTruBongHoi = 0;
    let tempTongCLMic = 0;
    let tempTongCLRd = 0;
    let tempTongCLb = 0;
    let tempTongGia = 0;
    let tempTongTrongLuong = 0;
    let tempTongKhoiLuongDung = 0;
    let tempTongTrongLuongTruBongHoi = 0;
    let arrayMic = [];
    let arrayKien = [];
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`]?.SoKien) && i !== parseInt(x)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong.forEach((lobong, index) => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien) && index !== y) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
      }
    });
    // if (tempSLD + this.item.listLoBong[y].tempBanBong[`${x}`].SoKien > this.item.listLoBong[y].SoLuongKien) {
    //   this._toastr.warning('Bạn vừa nhập quá số lượng kiện tồn trong kho! Chúng tôi sẽ điều chỉnh về 0 tránh gây lỗi nghiêm trọng!');
    //   this.item.listLoBong[y].tempBanBong[`${x}`].SoKien = null;
    // }
    if (tempSoKien1Line + this.item.listLoBong[y].tempBanBong[`${x}`].SoKien > this.item.TongSoKien) {
      this._toastr.warning('Bạn vừa nhập quá số lượng kiện bông trên 1 bàn bông! Chúng tôi sẽ điều chỉnh về 0 tránh gây lỗi nghiêm trọng!');
      this.item.listLoBong[y].tempBanBong[`${x}`].SoKien = null;
    }
    tempSLD = 0;
    tempSoKien1Line = 0;
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        tempTongTrongLuong += (lobong.tempBanBong[`${x}`].SoKien * (lobong.IdLoBong !== null ? lobong.TrongLuong : (this.item.TrongLuongBongHoi / this.item.SoKienBongHoi)));
        if (validVariable(lobong.Mic)) {
          tempTongGia += (lobong.tempBanBong[`${x}`].SoKien * lobong.GiaBong * lobong.TrongLuong);
          tempTongTrongLuongTruBongHoi += (lobong.tempBanBong[`${x}`].SoKien * lobong.TrongLuong);
          tempSoKien1LineTruBongHoi += lobong.tempBanBong[`${x}`].SoKien;
          tempTongCLMic += (lobong.tempBanBong[`${x}`].SoKien * lobong.Mic);
        }
        if (validVariable(lobong.b)) {
          tempTongCLb += (lobong.tempBanBong[`${x}`].SoKien * lobong.b);
        }
      }
    });
    this.item.listLoBong[y].SoLuongDung = tempSLD;
    this.item.listLoBong[y].TonCuoi = this.item.listLoBong[y].SoLuongKien - tempSLD;
    this.itemMicBQ[`${x}`] = tempTongCLMic / tempSoKien1LineTruBongHoi;
    this.itembBQ[`${x}`] = tempTongCLb / tempSoKien1LineTruBongHoi;
    this.itemSoKienTrenBan[`${x}`] = tempSoKien1Line > this.item.TongSoKien ? this.item.TongSoKien : tempSoKien1Line;
    this.itemSoKienTrenBanTruBongHoi[`${x}`] = tempSoKien1LineTruBongHoi;
    this.itemTrongLuong1BanTruBongHoi[`${x}`] = tempTongTrongLuongTruBongHoi;
    this.itemTrongLuong1Ban[`${x}`] = tempTongTrongLuong;
    this.itemGiaTrungBinh[`${x}`] = tempTongGia / tempTongTrongLuongTruBongHoi;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * (lobong.IdLoBong !== null ? lobong.TrongLuong : (this.item.TrongLuongBongHoi / this.item.SoKienBongHoi)));
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * (lobong.IdLoBong !== null ? lobong.TrongLuong : (this.item.TrongLuongBongHoi / this.item.SoKienBongHoi))) / tempTongKhoiLuongDung * 100;
        lobong.TongTrongLuong = lobong.SoLuongDung * (lobong.IdLoBong !== null ? lobong.TrongLuong : (this.item.TrongLuongBongHoi / this.item.SoKienBongHoi));
      }
      if (validVariable(lobong.Mic) || lobong.isLoBongTuongLai) {
        if (validVariable(lobong.Mic) && validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
          for (let i = 0; i < lobong.tempBanBong[`${x}`].SoKien; i++) {
            arrayMic.push(lobong.Mic)
          }
        }
        // arrayMic.push(validVariable(lobong.Mic) ? lobong.Mic : 0);
        // arrayKien.push(validVariable(lobong.tempBanBong[`${x}`].SoKien) ? lobong.tempBanBong[`${x}`].SoKien : 0);
      }
    });
    // this.itemCVMic[`${x}`] = CVMic([...arrayMic, ...arrayKien], tempSoKien1LineTruBongHoi);
    this.itemCVMic[`${x}`] = CVMic2([...arrayMic], tempSoKien1LineTruBongHoi)
    this.TinhTyLeTong();
    this.TinhTongTrongLuong()
    this.TinhDeltaB();
    this.TinhThongTinKienTheoLoaiBong();
    this.TinhLuyKeTyLeBong();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      console.log(this.checkbutton = res);
      this.checkbutton = res;
    })
  }
  KiemTraButtonDieuChinhPhuongAnPhaBong() {
    this._services.PhuongAnPhaBong().KiemTraButtonDieuChinhPhuongAnPhaBong(this.item.Id || '').subscribe((res: any) => {
      this.checkbuttonDieuChinh = res;
    })
  }
  GetListdmLoaiBong_PAPB() {
    this._services.PhuongAnPhaBong().GetListdmLoaiBong_PAPB().subscribe((res: Array<any>) => {
      this.listdmLoaiBong = res;
      if (validVariable(this.item.listLoBong) && this.item.listLoBong?.length !== 0) {
        let unique = [...new Set(this.item.listLoBong.map(ele => ele.IddmLoaiBong))]
        this.listLoaiBong = unique.map((ele: string) => {
          return {
            prop: ele.split('-').join('_'),
            name: res.filter(loaibong => loaibong.Id === ele)?.[0]?.Ten,
          }
        })
      }
      if (validVariable(this.item.Id)) {
        this.KiemTraButtonDieuChinhPhuongAnPhaBong()
      }
      this.KiemTraButtonModal();
      if (this.opt !== 'edit') {
        this.GetNextSoQuyTrinh();
      }
      this.GetListTrienKhaiKeHoach()
    })
  }
  ValidData() {
    if (!validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
      this._toastr.error('Vui lòng chọn triển khai kế hoạch!')
      return false
    }
    if (!validVariable(this.item.TongSoKien) && this.item.TongSoKien <= 0) {
      this._toastr.error('Vui lòng nhập số kiện trên 1 bàn!')
      return false
    }
    if (!validVariable(this.item.listLoBong) || this.item.listLoBong.length === 0) {
      this._toastr.error('Vui lòng chọn lô bông!')
      return false
    }
    if (!validVariable(this.item.KhoiLuongBong)) {
      this._toastr.error('Vui lòng chọn mặt hàng!')
      return false
    }
    return true
  }
  SetData() {
    this.item.listLoBong.forEach(lobong => {
      // if (!validVariable(lobong.listItem)) {
      lobong.listItem = [];
      // }
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        let data = {
          SoLuongKien: lobong.tempBanBong[`${i}`].SoKien,
          ThuTu: i
        };
        lobong.listItem.push(data)
      }
    });

    this.item.listThongSo = [];
    for (let prop in this.itemMicBQ) {
      this.item.listThongSo.push({
        Mic: this.itemMicBQ[prop],
        b: this.itembBQ[prop],
        CVMic: this.itemCVMic[prop],
        ThuTu: prop
      })
    }
    return this.item;
  }
  GhiLai() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().Set(this.SetData()).subscribe((res: any) => {
        console.log(res);
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.opt = 'edit';
            res.objectReturn.listLoBong.forEach(lobong => {
              if (!validVariable(lobong.temBanBong)) {
                lobong.tempBanBong = {};
              }
              lobong.listItem.forEach(item => {
                let data = {
                  ...item,
                  SoKien: item.SoLuongKien
                }
                lobong.tempBanBong[`${item.ThuTu}`] = data;
              });
            });
            this.item = res.objectReturn;
            this.GetListTrienKhaiKeHoach();
            this.KiemTraButtonModal();
            this.KiemTraButtonDieuChinhPhuongAnPhaBong()
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }

  }
  DieuChinh() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().UpdateDieuChinhPhuongAnPhaBong(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.isEditing = false;
            this._toastr.success(res.message);
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }
  }
  LamMoiDeDieuChinh() {
    this._services.PhuongAnPhaBong().LamMoiDuLieu(this.item.Id).subscribe((res: any) => {
      res.listLoBong.forEach(lobong => {
        if (!validVariable(lobong.temBanBong)) {
          lobong.tempBanBong = {};
        }
        lobong.listItem.forEach(item => {
          let data = {
            ...item,
            SoKien: item.SoLuongKien
          }
          lobong.tempBanBong[`${item.ThuTu}`] = data;
        });
      });
      this.item = res;
      this.GetListTrienKhaiKeHoach();
      this.KiemTraButtonModal();
      this.KiemTraButtonDieuChinhPhuongAnPhaBong();
      this.GetLoBongTrongKho();
      this.isEditing = true;
    })
  }
  ChuyenDuyet() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this._activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().KhongDuyet(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this._activeModal.close();
          } else {
            this._toastr.error(res.message);
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
      this._services.PhuongAnPhaBong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this._activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  GetNextSoQuyTrinh() {
    this._services.PhuongAnPhaBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  nextFocus(e) {
    console.log(e);
  }
  move(event, index) {
    let string = 'ArrowRightArrowUpArrowDownArrowLeftTabEnter'
    if (string.includes(event.key)) {
      event.preventDefault()
      let listInput = document.querySelectorAll('.dat09focus');
      let listTabIndex = [];
      listInput.forEach(ele => listTabIndex.push(ele.getAttribute('tabindex')));
      if (event.key === 'ArrowRight' || event.key === 'Tab') {
        let nextFocusIndex = `${this.item.listLoBong.length + index}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
      if (event.key === 'ArrowLeft') {
        let nextFocusIndex = `${index - this.item.listLoBong.length}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        let nextFocusIndex = `${index + 1}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
      if (event.key === 'ArrowUp') {
        let nextFocusIndex = `${index - 1}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
    }
  }
  copy(ban) {
    this.isCopying = true;
    this.copyItem = deepCopy({
      name: `(Đang sao chép bàn số ${ban})`,
      listSoKien: this.item.listLoBong.map(lobong => {
        return lobong.tempBanBong[`${ban}`].SoKien;
      }),
      BanSo: ban
    })
    console.log(this.copyItem);
  }
  doneCopy() {
    this.isCopying = false;
    this.copyItem = deepCopy({
      name: null,
      listSoKien: [],
      BanSo: null
    })
  }
  paste(ban) {
    for (let i = 0; i < this.item.listLoBong.length; i++) {
      this.item.listLoBong[i].tempBanBong[`${ban}`].SoKien = this.copyItem.listSoKien[i];
      this.CalAllTable(i, ban);
    }
  }
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev, x, y, sokien) {
    let data = {
      x: x,
      y: y,
      SoKien: sokien
    }
    ev.dataTransfer.setData("data", JSON.stringify(data));
  }

  drop(ev, x, y) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("data"));
    data.c = parseInt(data.x)
    if (data.y !== y) {
      this._toastr.error('Vui lòng chỉ kéo trong lô bông!');
    } else if (data.y === y) {
      let c = parseInt(x);
      for (let i = (c > data.c ? data.c : c); i <= (c > data.c ? c : data.c); i++) {
        this.item.listLoBong[y].tempBanBong[`${i}`].SoKien = data.SoKien;
        this.CalAllTable(y, i);
      }
    }
  }

  ExportExcel() {
    this._services.PhuongAnPhaBong().ExportPhuongAnPhaBong(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  test() {
    console.log(this.item)
  }
  timTheoBan(item) {
    let modalref = this._modal.open(TimbongtheobanmodalComponent)
    modalref.componentInstance.BanBong = '';
    modalref.componentInstance.TenLo = item.Ma;
    modalref.result.then(res => {
      if (validVariable(res.trim())) {
        item.SoBanTimTuDongMax = res;
      }
      else {
        item.SoBanTimTuDongMax = null;
      }
    })
  }
}
