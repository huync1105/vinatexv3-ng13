import { Component, IterableDiffers, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DinhmuctieuchichatluongsoimodalComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TrangthaimaysanxuatComponent } from '../../../quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';
import { ChoncaapdungmodalComponent } from '../choncaapdungmodal/choncaapdungmodal.component';
import { MathangdaomodalComponent } from '../mathangdaomodal/mathangdaomodal.component';
import { BaseModalNavigation } from '../navigation.class';

@Component({
  selector: 'app-botrimay-ong',
  templateUrl: './botrimay-ong.component.html',
  styleUrls: ['./botrimay-ong.component.css']
})
export class BotrimayOngComponent extends BaseModalNavigation implements OnInit {
  checkbutton: any = {
    Ghi: true,
  };
  filter: any = {};
  addonData: any = {};
  listHangHoa: any = [];
  item: any = {};
  newMay: any = {};
  mapCa_Id: any = {};
  TongMatHang: any = {};
  listCanBoTri: any = {};
  arrCa: any = [];
  tocDoMay: any = [];
  lang: any = vn;
  userInfo: any ;

  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService,
    private _auth: AuthenticationService,
    ) {
    super(activeModal);
  }

  ngOnInit(): void {
    if(this.item.listCanBoTri.length > 0){
      this.userInfo = this._auth.currentUserValue;
      if(this.item.listCanBoTri[0].CreatedBy !== this.userInfo.Id)
        this.checkbutton.Ghi = false;
    }

    let listHangHoaJoinNameTemp = this.item.listCanBoTri.sort((a, b) => {
      return parseInt(a.Ten.split(' ')[0]) - parseInt(b.Ten.split(' ')[0]);
    }).map(mathang => {
      return {
        // Ten:`${mathang.Ten}${mathang.TenLoHang?(' - '+mathang.TenLoHang):''}`,
        Ten: `${mathang.Ten}${mathang.IdLoHang ? (' - Đảo') : ''}`,
        Id: mathang.Id
      }
    })
    this.listHangHoa = mapArrayForDropDown(listHangHoaJoinNameTemp, 'Ten', 'Id');
    console.log(this.listHangHoa);
    console.log(this.item.listDaBoTri.map(ele => ele.IdCanDoiChuyen_CanBoTri))
    // .sort((a,b)=>{
    //   return parseInt(a.label.split(' ')[0])-parseInt(b.label.split(' ')[0]);
    // })
    this.sort();
    this.initSpeedOption();
    this.mapCa_Id = {};
    this.listCanBoTri = {};
    this.item.listCaSanXuat.forEach(ca => {
      this.mapCa_Id[ca.Id.split("-").join("_")] = ca.Id;
    });
    this.item.listCanBoTri.forEach(mathang => {
      mathang.SoCocOng = 0;
    });
    this.arrCa = this.item.listCaSanXuat.map(ele => {
      return {
        Id: ele.Id,
        prop: ele.Id.split("-").join("_"),
        Name: ele.Ten
      }
    })
    this.arrCa.forEach(ca => {
      this.listCanBoTri[`${ca.prop}`] = deepCopy(this.item.listCanBoTri);
      this.TongMatHang[`${ca.prop}`] = {};
    });
    // console.log(this.listCanBoTri);
    this.inputChange()
  }
  sort() {
    this.item.listDaBoTri = this.item.listDaBoTri.sort((a: any, b: any) => {
      if(a.TenMay===b.TenMay){
        return a.SoCocTu-b.SoCocTu;
      }else{
        return a.TenMay.localeCompare(b.TenMay);
      }
    })
  }
  initSpeedOption() {
    this.item.listDaBoTri.forEach(may => {
      if (validVariable(may.IdCanDoiChuyen_CanBoTri)) {
        let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === may.IdCanDoiChuyen_CanBoTri)?.[0]?.IddmItem;
        may.listTocDo = mapArrayForDropDown(may.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
        if (!validVariable(may.IdPhanNhomMay_Item)) {
          may.IdPhanNhomMay_Item = may.listTocDo?.[0]?.value
        } else {
          may.DinhMucNangSuat = (may.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === may.IdPhanNhomMay_Item)?.[0]?.DinhMucNangSuat || 0)
        }
      } else {
        may.listTocDo = [];
      }
    });
  }
  addMore(item) {
    this.item.listDaBoTri.push(deepCopy(item));
    this.sort();
  }
  inputChange() {
    this.TinhSoCocSuDungTungMay();
    this.TinhSoCocSuDungTheoMatHang();
    this.TinhTongMatHang();
  }
  TinhTongMatHang() {
    for (let ca in this.TongMatHang) {
      let tempTong = {
        SoMayCon: 0,
        SoCocOng: 0,
        OngTrenCon: 0
      }
      for (let prop in tempTong) {
        tempTong[`${prop}`] = this.listCanBoTri[`${ca}`].reduce((Tong, mathang) => Tong + mathang[`${prop}`], 0);
      }
      this.TongMatHang[`${ca}`] = tempTong;
    }
  }
  TinhSoCocSuDungTheoMatHang() {
    for (let ca in this.listCanBoTri) {
      this.listCanBoTri[ca].forEach(mathang => {
        let mays = this.item.listDaBoTri.filter(may => may.IdCanDoiChuyen_CanBoTri === mathang.Id && may.IddmCaSanXuat === this.mapCa_Id[ca]);
        if (mays.length !== 0) {
          mathang.SoCocOng = mays.reduce((Total, may) => Total + may.SoCocSuDung, 0);
          if (mathang.SoCocOng !== 0 && mathang.SoMayCon !== 0) {
            mathang.OngTrenCon = mathang.SoCocOng / mathang.SoMayCon;
          }
          else {
            mathang.OngTrenCon = 0;
          }
        } else {
          mathang.SoCocOng = 0;
          mathang.OngTrenCon = 0;
        }
      });
    }
  }
  TinhSoCocSuDungTungMay() {
    this.item.listDaBoTri.forEach(may => {
      // if(validVariable(may.SoCocDen)&& validVariable(may.SoCocTu) && may.SoCocDen>may.SoCocTu){
      //   may.SoCocSuDung = (may.SoCocDen-may.SoCocTu)+1;
      // }
      if (validVariable(may.SoCocDen) && validVariable(may.SoCocTu)) {
        may.SoCocSuDung = Math.abs(may.SoCocDen - may.SoCocTu) + 1;
      }
      else {
        may.SoCocSuDung = 0;
      }
      if (validVariable(may.DinhMucNangSuat)) {
        may.SanLuongCa = may.DinhMucNangSuat * may.SoCocSuDung / 60;
      }
    })
  }
  chonTocDo(item, event) {
    item.DinhMucNangSuat = (item.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === event.value)?.[0]?.DinhMucNangSuat || 0);
    this.inputChange()
  }
  chonMatHang(item, event) {
    console.log(event);
    if (event.value) {
      item.Ten = this.listHangHoa.find(mathang => mathang.value === event.value)?.label;
      // if(validVariable(item.SoCocDen)&& validVariable(item.SoCocTu)){
      // }
      // else{
      //   item.SoCocDen = item.SoCocTu;
      // }
      let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === item.IdCanDoiChuyen_CanBoTri)?.[0].IddmItem;
      item.listTocDo = mapArrayForDropDown(item.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
      item.IdPhanNhomMay_Item = item.listTocDo?.[0]?.value || null;
      item.DinhMucNangSuat = (item.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === item.listTocDo?.[0]?.value)?.[0]?.DinhMucNangSuat || 0);
      if (!validVariable(item.SoCocDen)) {
        item.SoCocDen = item.SoCoc;
      }
      if (!validVariable(item.SoCocTu)) {
        item.SoCocTu = 1;
      }
    } else {
      item.Ten = null;
      item.listTocDo = [];
      item.IdPhanNhomMay_Item = null;
      item.SanLuongCa = 0;
      item.SoCocTu = null;
      item.SoCocDen = null;
    }
    this.inputChange();
  }
  GhiLai() {
    this.sort();
    this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      } else {
        this.toastr.error('Cập nhật không thành công!');
      }
    })
  }
  ChonCaApDung(ca) {
    console.log(ca);
    let modalRef = this._modal.open(ChoncaapdungmodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.ca = ca;
    modalRef.componentInstance.listCa = deepCopy(this.arrCa);
    modalRef.result.then((res: Array<string>) => {
      if (res.length !== 0) {
        this.ApDungCa(ca, res);
      }
    }).catch(er => console.log(er))
  }
  ApDungCa(ca: string, listCaApDung: Array<string>): void {
    let tenCaDaChon = listCaApDung.map((caapdung: string) => {
      return this.arrCa.filter(ca => ca.prop === caapdung)[0]?.Name || ''
    }).join(', ');
    console.log(tenCaDaChon);
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = `Tất cả những máy đã bố trí trong <strong>${tenCaDaChon}</strong> sẽ bị xóa để đồng bộ! \n Bạn chắc chắn muốn áp dụng?`
    modalRef.result.then(res => {
      let mayTheoCa = deepCopy(this.item.listDaBoTri.filter(may => may.IddmCaSanXuat === this.mapCa_Id[ca]));
      let newDaBoTri = deepCopy([...mayTheoCa])
      for (let caInMap in this.mapCa_Id) {
        if (caInMap !== ca) {
          let index = listCaApDung.findIndex(ele => ele === caInMap);
          if (index !== -1) {
            let mayCaDaChon = mayTheoCa.map(may => {
              return {
                ...may,
                IddmCaSanXuat: this.mapCa_Id[caInMap]
              }
            })
            newDaBoTri = [...newDaBoTri, ...mayCaDaChon]
          } else {
            let mayCaKhongChon = deepCopy(this.item.listDaBoTri.filter(may => may.IddmCaSanXuat === this.mapCa_Id[caInMap]));
            newDaBoTri = [...newDaBoTri, ...mayCaKhongChon]
          }
        }
      }
      this.item.listDaBoTri = deepCopy(newDaBoTri);
      this.inputChange();
    }).catch(er => console.log(er))
  }
  ApDungDenNgay() {
    if (validVariable(this.filter.DenNgay) && validVariable(this.filter.TuNgay) && this.filter.TuNgay <= this.filter.DenNgay) {
      this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.toastr.success(res.message);
            let data = {
              ...this.addonData,
              TuNgayUnix: DateToUnix(this.filter.TuNgay),
              DenNgayUnix: DateToUnix(this.filter.DenNgay),
            }
            this.services.CanDoiChuyen().SetCanDoiChuyen_ApDungNgay(data).subscribe((res: any) => {
              console.log(res);
              if (res?.State === 1) {
                this.toastr.success('Cập nhật thành công!')
              } else {
                this.toastr.error('Cập nhật không thành công!');
              }
            })
          } else {
            this.toastr.error(res.message);
          }
        } else {
          this.toastr.error('Cập nhật không thành công!');
        }
      })
    }
    else {
      this.toastr.error('Vui lòng nhập kiểm tra lại khoảng thời gian áp dụng!');
    }
  }
  ThemMatHangDao() {
    this.services.CanDoiChuyen().GetlistdmMatHangDao(this.addonData.IddmPhanXuong).subscribe((res:Array<any>) => {
      console.log(res);
      let modalRef = this._modal.open(MathangdaomodalComponent, {
        backdrop: 'static',
        size: 'lg'
      });
      modalRef.componentInstance.items = deepCopy(res.map(ele=>{return{...ele,SoLuong:ele.TonSoLuong}}));
      modalRef.result.then((res: Array<any>) => {
        let data = res.map(ele => {
          return {
            IddmItem: ele.IddmItem,
            IdLoHang: ele.IdLoHang,
            IdDuAn: this._store.getCurrent(),
            CongDoan: this.addonData.CongDoan,
            IddmPhanXuong: this.addonData.IddmPhanXuong,
            NgayUnix: this.addonData.NgayUnix,
            SoLuong: ele.SoLuong,
          }
        });
        this.services.CanDoiChuyen().ThemMatHangDao(data).subscribe((result: any) => {
          if (result?.State === 1) {
            this.toastr.success(result.message);
            this.activeModal.close({ respawn: true });
          } else {
            this.toastr.error(result.message);
          }
        })
      }).catch(er => console.log(er))
    });
  }
  boMatHangDao(item) {
    let exist = this.item.listDaBoTri.some(ele => ele.IdCanDoiChuyen_CanBoTri === item.Id);
    if (exist) {
      let listMay = this.item.listDaBoTri.filter(ele=>ele.IdCanDoiChuyen_CanBoTri ===item.Id);
      let message = `Mặt hàng này đã được bố trí vào ${listMay?.length>1?'các':''} máy ${listMay.map(ele=>ele.TenMay).join(', ')}!`
      this.toastr.warning(message)
    } else {
      this.services.CanDoiChuyen().XoaMatHangDao(item.Id).subscribe((res: any) => {
        if (res?.State === 1) {
          this.toastr.success(res.message);
          this.activeModal.close({ respawn: true });
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
}
