import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-phuhung2',
  templateUrl: './phuhung2.component.html',
  styleUrls: ['./phuhung2.component.css']
})
export class Phuhung2Component implements OnInit {checkbutton: any = {
  Ghi: false
};
listLoBong: any = [];
item: any = {};
block1: any = [];
block2: any = [];
block3: any = [];
block4: any = [];
block5: any = [];
poolLoBong: any = [];
banBong: any = {};
ngoaiQuan: any = [];
SoViTriNgoaiQuan: number = 0;
ViTriNgoaiQuan: any = '';
// 18, 24, 30, 33, 36, 42, 47
listBongNgoaiQuan: any = [];
focusedSlot: any = null;
length: number = 0;
canCopy: boolean = false;
listBanBong: any = [];
BanBongForCopy: any = {};
banBongCopy: any = {};
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
  this.renderBanDau();

}
renderBanDau() {
  this.length = this.item.listLoBong.reduce((total, ele) => {
    return total + ele.SoLuong
  }, 0)
  for (let i = 1; i <= (this.length + this.item.SoViTriNgoaiQuan); i++) {
    let isNgoaiQuan = this.ngoaiQuan.findIndex(ele => ele === i) > -1;
    this.banBong[`${i}`] = {
      _focus: false,
      _ngoaiQuan: isNgoaiQuan,
      labelLoBong: isNgoaiQuan ? 'Ngoại quan bông' : null,
      STT: `${i}. `,
      IdLoBong: null,
      Mau: 'white'
    }
    // if (i <= 2) { //thang 5
    //   this.block1.push(`${i}`)
    // }
    // if (2 < i && i <= 15) {
    //   this.block2.push(`${i}`)
    // }
    // if (45 <= i && i <= 46) {
    //   this.block3.push(`${i}`)
    // }
    // if (16 <= i && i <= 30) {
    //   this.block4.push(`${i}`)
    // }
    // if (31 <= i && i <= 44) {
    //   this.block5.push(`${i}`)
    // }
    if(i%4===1){
      this.block1.push(`${i}`)
    }
    if(i%4===2){
      this.block2.push(`${i}`)
    }
    if(i%4===3){
      this.block3.push(`${i}`)
    }
    if(i%4===0){
      this.block4.push(`${i}`)
    }
  };
  if (validVariable(this.item.Id)) {
    for (let i = 1; i <= (this.length + this.item.SoViTriNgoaiQuan); i++) {
      let data = this.item.listItem.find(ele => ele.ThuTu === i);
      this.banBong[`${i}`] = {
        _focus: false,
        _ngoaiQuan: data?.isNgoaiQuan,
        labelLoBong: data?.TenLoBong,
        STT: `${i}. `,
        IdLoBong: data?.IdLoBong,
        Mau: data?.Mau
      }
    }
    this.item.listLoBong.forEach(lobong => {
      lobong.DaXep = this.item.listItem.filter(banbong => banbong.IdLoBong === lobong.IdLoBong && banbong.TenLoBong !== "Ngoại quan bông")?.length || 0;
    });
    this._services.XepBanBong().GetListForCopyXepBanBong({ IdPhuongAnXepBanBong: this.item.Id }).subscribe((res: any) => {
      this.listBanBong = mapArrayForDropDown(res.map(ele => {
        return {
          ...ele,
          HienThi: `${ele.SoQuyTrinh} / ${ele.ThuTu_BanBong}`
        }
      }), 'HienThi', 'Id');
    })
  }
}

GetBanBongConLai(event) {
  this._services.XepBanBong().Get(event.value).subscribe((res: any) => {
    if (res?.Id) {
      if (validVariable(res.listItem) && res.listItem !== 0) {
        this._toastr.success(`Tải thành công bàn bông số phiếu: ${res.SoQuyTrinh}! Bạn có thể sao chép!`)
        this.BanBongForCopy = res;
        this.canCopy = true;
      } else {
        this._toastr.warning(`Bàn bông này chưa được xếp!`);
        this.canCopy = false;
      }
    } else {
      this._toastr.error(`Tải thành công bàn bông không thành công! Vui lòng thử lại bàn khác!`)
      this.canCopy = false;
    }
  })
}

copyBanBong() {
  this.item.ViTriNgoaiQuan = this.BanBongForCopy.ViTriNgoaiQuan;
  this.item.SoViTriNgoaiQuan = this.BanBongForCopy.SoViTriNgoaiQuan;
  this.block1 = [];
  this.block2 = [];
  this.block3 = [];
  this.block4 = [];
  this.block5 = [];
  this.veLayout();
  this.pasteBanBong();
}

pasteBanBong() {
  console.log(this.BanBongForCopy.listItem);
  for (let i = 1; i <= (this.length + this.item.SoViTriNgoaiQuan); i++) {
    let data = this.BanBongForCopy.listItem.find(ele => ele.ThuTu === i);
    this.banBongCopy[`${i}`] = {
      _focus: false,
      _ngoaiQuan: data?.isNgoaiQuan,
      labelLoBong: data?.TenLoBong,
      STT: `${i}. `,
      IdLoBong: data?.IdLoBong,
      Mau: data?.Mau
    }
    if (!validVariable(data.IdLoBong)) {
      if (data?.isNgoaiQuan) {
        this.banBong[`${i}`] = this.banBongCopy[`${i}`];
      } else {
        this.focusedSlot = i;
        let lobong = this.item.listLoBong.find(ele => ele.IdLoBong === data.IdLoBong);
        if (validVariable(lobong)) {
          let index = this.item.listLoBong.findIndex(ele => ele.IdLoBong === data.IdLoBong);
          this.xepLoBong(lobong, index);
        }
      }
      // if(data.TenLoBong ==='')
    }
    else {
      this.focusedSlot = i;
      let lobong = this.item.listLoBong.find(ele => ele.IdLoBong === data.IdLoBong);
      if (validVariable(lobong)) {
        let index = this.item.listLoBong.findIndex(ele => ele.IdLoBong === data.IdLoBong);
        this.xepLoBong(lobong, index);
      }
    }
  }
}

veLayout() {
  this.resetAllPicked();
  this.block1 = [];
  this.block2 = [];
  this.block3 = [];
  this.block4 = [];
  this.block5 = [];
  console.log(this.item.ViTriNgoaiQuan)
  this.ngoaiQuan = this.item.ViTriNgoaiQuan.split(',').map(ele => parseInt(ele));
  console.log(this.ngoaiQuan)
  this.length = this.item.listLoBong.reduce((total, ele) => {
    return total + ele.SoLuong
  }, 0)
  for (let i = 1; i <= (this.length + this.item.SoViTriNgoaiQuan); i++) {
    let isNgoaiQuan = this.ngoaiQuan.findIndex(ele => ele === i) > -1;
    this.banBong[`${i}`] = {
      _focus: false,
      _ngoaiQuan: isNgoaiQuan,
      labelLoBong: isNgoaiQuan ? 'Ngoại quan bông' : null,
      STT: `${i}. `,
      IdLoBong: null,
      Mau: 'white'
    }
    if(i%4===1){
      this.block1.push(`${i}`)
    }
    if(i%4===2){
      this.block2.push(`${i}`)
    }
    if(i%4===3){
      this.block3.push(`${i}`)
    }
    if(i%4===0){
      this.block4.push(`${i}`)
    }
  };
}
changeNgoaiQuanBong() {
  if (validVariable(this.item.ViTriNgoaiQuan) && this.item.ViTriNgoaiQuan.trim() !== '') {
    this.ngoaiQuan = this.item.ViTriNgoaiQuan.split(',').map(ele => parseInt(ele));
    this.ngoaiQuan.forEach(vitri => {
      this.banBong[`${vitri}`]._ngoaiQuan = true;
      if (!validVariable(this.banBong[`${vitri}`].IdLoBong)) {
        this.banBong[`${vitri}`].labelLoBong = 'Ngoại quan bông'
      }
    });
  } else {
    for (let prop in this.banBong) {
      this.banBong[prop]._ngoaiQuan = false;
      if (!validVariable(this.banBong[`${prop}`].IdLoBong)) {
        this.banBong[`${prop}`].labelLoBong = null
      }
    }
  }

}
slotFocus(slot) {
  for (let prop in this.banBong) {
    this.banBong[prop]._focus = false;
  }
  this.banBong[slot]._focus = !this.banBong[slot]._focus;
  this.focusedSlot = parseInt(slot);
}
returnSlot(event: MouseEvent, item) {
  if (validVariable(this.banBong[item].IdLoBong)) {
    let _returnSlot = this.item.listLoBong.find(ele => ele.Id === this.banBong[item].IdLoBong);
    if (validVariable(_returnSlot)) {
      _returnSlot.DaXep--;
      this.banBong[item].IdLoBong = null;
      this.banBong[item].labelLoBong = this.banBong[item]._ngoaiQuan ? 'Ngoại quan bông' : null;
      this.banBong[item].Mau = 'white';
    }
  }
  event.preventDefault();
}
xepLoBong(lobong, i) {
  if (validVariable(this.focusedSlot)) {
    if (validVariable(this.item.listLoBong[i].DaXep)) {
      if (this.item.listLoBong[i].DaXep < this.item.listLoBong[i].SoLuong) {
        if (validVariable(this.banBong[this.focusedSlot].IdLoBong)) {
          let _returnSlot = this.item.listLoBong.find(ele => ele.Id === this.banBong[this.focusedSlot].IdLoBong);
          if (validVariable(_returnSlot)) {
            _returnSlot.DaXep--;
          }
        }
        this.item.listLoBong[i].DaXep++
        this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
        this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
        this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.Id;
        this.clearFocus()
        this.getNextFocus()
      }
    } else {
      if (validVariable(this.banBong[this.focusedSlot].IdLoBong)) {
        let _returnSlot = this.item.listLoBong.find(ele => ele.Id === this.banBong[this.focusedSlot].IdLoBong);
        if (validVariable(_returnSlot)) {
          _returnSlot.DaXep--;
        }
      }
      this.item.listLoBong[i].DaXep = 1;
      this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
      this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
      this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.Id;
      this.clearFocus()
      this.getNextFocus()
    }
  } else {
    this.getNextFocus()
  }
}
clearFocus() {
  for (let prop in this.banBong) {
    this.banBong[prop]._focus = false;
  }
}
getNextFocus() {
  for (let prop in this.banBong) {
    if (!this.banBong[prop]._focus && !validVariable(this.banBong[prop].labelLoBong) && parseInt(prop) <= (this.length + this.item.SoViTriNgoaiQuan)) {
      this.focusedSlot = parseInt(prop);
      this.banBong[prop]._focus = true;
      break;
    } else {
      this.focusedSlot = null;
    }
  }
}
KiemTraButtonModal() {
  this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
    this.checkbutton = res;
  })
}
print() {
  window.print();
}
resetAllPicked() {
  this.item.listLoBong.forEach(lobong => {
    lobong.DaXep = null;
  });
}
SetData() {
  this.item.listItem = []
  console.log(this.banBong)
  for (let soban in this.banBong) {
    let item = {
      TenLoBong: this.banBong[soban].labelLoBong,
      Id: this.banBong[soban].IdLoBong,
      ThuTu: soban,
      isNgoaiQuan: this.banBong[soban]._ngoaiQuan
    }
    this.item.listItem.push(item)
  }
  this.item.TongDaXep = 0;
  this.item.TongSoKien = 0;
  this.item.listLoBong.forEach(ele => {
    this.item.TongDaXep += ele.DaXep;
    this.item.TongSoKien += ele.SoLuong;
  });
  return this.item
}
GhiLai() {
  this._services.XepBanBong().Set(this.SetData()).subscribe((res: any) => {
    if (res?.State === 1) {
      this._toastr.success(res.message)
    } else {
      this._toastr.error(res.message)
    }
  })
}
KhongDuyet() {
  this._services.XepBanBong().KhongDuyet(this.SetData()).subscribe((res: any) => {
    if (res?.State === 1) {
      this._toastr.success(res.message);
      this._activeModal.close();
    } else {
      this._toastr.error(res.message)
    }
  })
}
ChuyenDuyet() {
  this._services.XepBanBong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
    if (res?.State === 1) {
      this._toastr.success(res.message);
      this._activeModal.close();
    } else {
      this._toastr.error(res.message)
    }
  })
}
}
