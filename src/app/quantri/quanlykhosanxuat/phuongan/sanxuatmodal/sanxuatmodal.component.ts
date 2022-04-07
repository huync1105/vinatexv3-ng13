import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable, CVMic, deepCopy, CVMic2 } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-sanxuatmodal',
  templateUrl: './sanxuatmodal.component.html',
  styleUrls: ['./sanxuatmodal.component.css']
})
export class SanxuatmodalComponent implements OnInit {
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
  itemCheckBan = {};
  itemSoKienTrenBanTruBongHoi = {};
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  ghostItem: any = {};
  TongKhoiLuongDung: any = null;
  TongTyLe: number = 100;
  itemTrienKhaiKeHoach: any = {};
  ChatLuongBinhQuan: any = {
    Rd: 0,
    Mic: 0,
    b: 0
  }
  labelBong: any = {
  }
  itemGiaTrungBinh: any = {};
  itemTrongLuong1Ban: any = {};
  ThongSoKienTheoLoaiBong: any = {

  };
  trongLuongLoBong: any = {};
  itemDeltaPlusB: any = {};
  itemMicTT: any = {};
  itemCVMicTT: any = {};
  itemTyLeHoiPha: any = {};
  PoolLoBong: any = {

  }
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false
    }
    this.KiemTraButtonModal();
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        // this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
      if (validVariable(this.item.SoBanBong) && this.item.SoBanBong !== 0) {
        this.listProps = [];
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          this.listProps.push(`${i}`);
          this.itemCheckBan[`${i}`] = {
            checked: false,
            isDisabled: false
          };
        }
        if (validVariable(this.item.listCotDaXuat) && this.item.listCotDaXuat.length !== 0) {
          this.item.listCotDaXuat.forEach(cot => {
            this.itemCheckBan[`${cot}`] = {
              checked: true,
              isDisabled: true
            }
          });
        }
        this.item.listLoBong.forEach((lobong, index) => {
          if (!validVariable(lobong.temBanBong)) {
            lobong.tempBanBong = {};
          }
          lobong.listItem.forEach((item) => {
            let data = {
              ...item,
              listItem: (validVariable(item.listItem) && item.listItem?.length !== 0) ? item.listItem : [],
              SoKien: item.SoLuongKien,
              tabIndex: index + 1 + (item.ThuTu * this.item.listLoBong.length)
            }
            lobong.tempBanBong[`${item.ThuTu}`] = data;
          });
        });
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0
        }
        this.item.listLoBong.forEach(lobong => {
          if (validVariable(lobong.Mic)) {
            TongChatLuong.Mic += lobong.Mic;
          }
          if (validVariable(lobong.Rd)) {
            TongChatLuong.Rd += lobong.Rd;
          }
          if (validVariable(lobong.b)) {
            TongChatLuong.b += lobong.b;
          }
        });
        this.ChatLuongBinhQuan = {
          Mic: TongChatLuong.Mic / res.length,
          Rd: TongChatLuong.Rd / res.length,
          b: TongChatLuong.b / res.length,
        }
        this.labelBong = {}
        this.item.listLoBong.forEach(lobong => {
          if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
            this.labelBong[lobong.MadmLoaiBong] = 0;
          }
          if (validVariable(lobong.TyLe)) {
            this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
          }
        });
        for (let i = 0; i < this.item.listLoBong.length; i++) {
          for (let j = 1; j <= this.item.SoBanBong; j++) {
            this.CalAllTable(i, `${j}`);
          }
        }
        if (validVariable(this.item.listThongSo)) {
          this.item.listThongSo.forEach(thongso => {
            this.itemMicTT[`${thongso.ThuTu}`] = thongso.MicTT;
            this.itemCVMicTT[`${thongso.ThuTu}`] = thongso.CVMicTT;
            this.itemTyLeHoiPha[`${thongso.ThuTu}`] = thongso.TyLeHoiPha;
          });
        }
      }
    })
  }
  TinhTyLeTong() {
    this.labelBong = {}
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
        this.labelBong[lobong.MadmLoaiBong] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
      }
    });
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
        tempTongTrongLuong += (lobong.tempBanBong[`${x}`].SoKien * lobong.TrongLuong);
        if (validVariable(lobong.Mic)) {
          tempTongGia += (lobong.tempBanBong[`${x}`].SoKien * lobong.GiaBong * lobong.TrongLuong);
          tempTongTrongLuongTruBongHoi += (lobong.tempBanBong[`${x}`].SoKien * lobong.TrongLuong)
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
    this.itemTrongLuong1Ban[`${x}`] = tempTongTrongLuong;
    this.itemGiaTrungBinh[`${x}`] = tempTongGia / tempTongTrongLuongTruBongHoi;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * lobong.TrongLuong);
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
        lobong.TongTrongLuong = lobong.SoLuongDung * lobong.TrongLuong;
      }
      if (validVariable(lobong.Mic) || lobong.isLoBongTuongLai) {
        if(validVariable(lobong.Mic)&&validVariable(lobong.tempBanBong[`${x}`].SoKien)){
          for(let i=0;i<lobong.tempBanBong[`${x}`].SoKien;i++){
            arrayMic.push(lobong.Mic)
          }
        }

      }
    });
    this.itemCVMic[`${x}`]=CVMic2([...arrayMic],tempSoKien1LineTruBongHoi)
    this.TinhTyLeTong();
    this.TinhTongTrongLuong()
    this.TinhDeltaB();
    this.TinhThongTinKienTheoLoaiBong();
    this.TinhLuyKeTyLeBong();
  }

  TinhTongTrongLuong() {
    this.trongLuongLoBong = {};
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.trongLuongLoBong[lobong.MadmLoaiBong])) {
        this.trongLuongLoBong[lobong.MadmLoaiBong] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.trongLuongLoBong[lobong.MadmLoaiBong] += lobong.TongTrongLuong;
      }
    });
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
      if (!validVariable(this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong])) {
        this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong] = {
          TonDau: 0,
          TonCuoi: 0,
          SoLuongDung: 0,
          Mau: null
        }
      }
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].TonDau += lobong.SoLuongKien;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].TonCuoi += lobong.TonCuoi;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].SoLuongDung += lobong.SoLuongDung;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].Mau = lobong.Mau;
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
  SetData() {

    let data = [];
    let status = true;
    let banLoi ={};
    for (let prop in this.itemCheckBan) {
      if (this.itemCheckBan[prop].checked && !this.itemCheckBan[prop].isDisabled) {
        data.push(prop)
      }
    }
    this.item.listLoBong.forEach(lobong => {
      data.forEach(ban=>{
        if((lobong.tempBanBong[ban].SoLuongKien?lobong.tempBanBong[ban].SoLuongKien:0) !== lobong.tempBanBong[ban].SoLuongKienDaTim){
          status = false;
          if(!validVariable(banLoi[ban])){
            banLoi[ban]=[]
          }
          banLoi[ban].push(lobong.Ma);
        }
      })
    });
    if(!status){
      for(let key in banLoi){
        let string = '';
        banLoi[key].forEach(lo => {
          string += `${lo};  `
        });
        this._toastr.error(`Bàn ${key} - Lô ${string} chưa được tìm bông!`)
      }
    }
    return {
      status: status,
      data: {
        Id: this.item.Id,
        IdPhuongAnSanXuat: this.ghostItem.Id,
        listCotXuat: data
      }
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.ghostItem.Id || '', this.ghostItem.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GhiLai() {
    let res = this.SetData()
    // this.SetData()
    if (res.status) {
      this._services.SanXuat().Set(res.data).subscribe((res: any) => {
        console.log(res);
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this._services.SanXuat().Get(this.ghostItem.Id).subscribe((res: any) => {
              this.item = deepCopy(res.PhuongAnPhaBong);
              res.PhuongAnPhaBong = undefined;
              this.ghostItem = res;
              this.GetListTrienKhaiKeHoach();
              this.KiemTraButtonModal();
            })
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }
  }
  checkBanBong(ban) {
    console.log(ban)
    console.log(this.itemCheckBan);
  }
  ChuyenDuyet() {
    let res = this.SetData()
    if (res.status) {
      this._services.PhuongAnPhaBong().ChuyenTiep(res.data).subscribe((res: any) => {
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
}
