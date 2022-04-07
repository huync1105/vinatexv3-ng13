import { Component, OnInit, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { LohangComponent } from '../lohang/lohang.component';

@Component({
  selector: 'app-thongkesanluongmodal',
  templateUrl: './thongkesanluongmodal.component.html',
  styleUrls: ['./thongkesanluongmodal.component.css']
})
export class ThongkesanluongmodalComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumbers: any;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listCongDoan: any = [];
  listCaSanXuat: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  listCaThucTe: any = [];
  TongKhoiLuong: any = 0;
  userInfo: any ;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  typing:Subject<string>=new Subject<string>();
  $typing:Subscription
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, 
    private _auth: AuthenticationService,
    public _modal: NgbModal, ) {

  }

  ngOnInit(): void {
    this.getListCongDoan();
    if (this.item.isTruVaoSanLuong === undefined)
      this.item.isTruVaoSanLuong = false;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetPhanXuongTheoUser();
      this.GetTyLeThongKeSanLuongBongPhe();
    }
    else {
    this.userInfo = this._auth.currentUserValue;
      this.KiemTraButtonModal();
      this.getItemTheoCongDoan();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
    this.getListCaSanXuat();
    this.getListLoHang();
    this.getListCaThucTe();
    this.$typing = this.typing.asObservable().pipe(debounceTime(200)).subscribe(_=>{this.TinhTyLeThongKeSanLuongBongPhe()});
  }
  Typing(event){
    // console.log(event.value);
    this.TinhTongKhoiLuongBong()
    // this.typing.next(event.value);
  }

  GetTyLeThongKeSanLuongBongPhe() {
    this.services.ThongKeSanLuong().GetTyLeThongKeSanLuongBongPhe().subscribe((res: any) => {
      // this.item.SoQuyTrinh = res.SoQuyTrinh;
      this.item.listTyLeBongPhe = res;
    })
  }
  TinhTyLeThongKeSanLuongBongPhe() {
    console.log(this.item)
    this.services.ThongKeSanLuong().TinhTyLeThongKeSanLuongBongPhe(this.item.listTyLeBongPhe).subscribe((res: any) => {
      this.item.listTyLeBongPhe = res;
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if(this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }
  ChuyenDuyet() {
    // switch (this.item.CongDoan) {
    //   case 'CHAICOTTON':
    //     this.TinhTyLeCottonBongPhe();
    //   case 'CHAIPE':
    //     this.TinhTyLePEBongPhe();
    //   case 'CHAIKY':
    //     this.TinhTyLeBongChaiKy();
    //   case 'THO':
    //     this.TinhTyLeBongCuiHoi();
    //   case 'CON':
    //     this.TinhTyLeBongThoMang();
    //   case 'ONG':
    //     this.TinhTyLeSoiCat();
    // }
    let isCheck: any = false;
    this.item.listItem.forEach(element => {
      if ((element.IdLoHang === null || element.IdLoHang === undefined) && element.CongDoan === "ONG" && element.SoQuaSoi !== null && element.SoQuaSoi !== undefined) {
        isCheck = true;
      }
    });
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn hết lô hàng cho công đoạn Ống");
    }
    else {
      this.services.ThongKeSanLuong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.ThongKeSanLuong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
    // switch (this.item.CongDoan) {
    //   case 'CHAICOTTON':
    //     this.TinhTyLeCottonBongPhe();
    //   case 'CHAIPE':
    //     this.TinhTyLePEBongPhe();
    //   case 'CHAIKY':
    //     this.TinhTyLeBongChaiKy();
    //   case 'THO':
    //     this.TinhTyLeBongCuiHoi();
    //   case 'CON':
    //     this.TinhTyLeBongThoMang();
    //   case 'ONG':
    //     this.TinhTyLeSoiCat();
    // }
    let isCheck: any = false;
    if (this.item.listItem !== null && this.item.listItem !== undefined) {
      this.item.listItem.forEach(element => {
        if ((element.IdLoHang === null || element.IdLoHang === undefined) && element.CongDoan === "ONG" && element.KhoiLuong !== null && element.KhoiLuong !== undefined) {
          isCheck = true;
        }
      });
    }
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn hết lô hàng cho công đoạn Ống");
    }
    else if (this.item.IddmCaSanXuatThucTe === undefined || this.item.IddmCaSanXuatThucTe === null) {
      this.toastr.error("Bạn chưa chọn ca thống kê");
    }
    else {
      // this.item.listItem.forEach(element => {
      //   element.IdLoHang = this.item.IdLoHang
      // });
      this.services.ThongKeSanLuong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.listItem = [];
            this.getItemTheoCongDoan()
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  DinhMuc() {
      this.services.ThongKeSanLuong().DinhMuc(this.item.Id).subscribe((res: any) => {
        if (res) {
          this.item = res;
          this.listItem = [];
          this.getItemTheoCongDoan()
        }
      })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.ThongKeSanLuong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
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
  getListCongDoan() {
    this.services.GetlistCongDoanBoDayBongDayPE().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');

    })
  }
  getListCaThucTe() {
    this.services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaThucTe = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetPhanXuongTheoUser() {
    this.services.GetListPhanXuongTheoUser().subscribe((res: any) => {
      if (res != null && res.length > 0)
        this.item.IddmPhanXuong = res[0].Id;
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getMatHangThongKeSanLuong() {
    if (this.item.IddmCaSanXuat != undefined
      && this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.opt !== 'edit') {
        this.item.listItem = []
      }
      else {
        if (this.item.listItem != undefined && this.item.listItem != null) {
          this.item.listItem = this.item.listItem.filter((e: any) => e.Id !== null)
          for (let i = 0; i < this.item.listItem.length; i++) {
            this.item.listItem[i].isXoa = true;
          }
        }
      }

      this.services.ThongKeSanLuong().GetMatHang(this.item.IddmPhanXuong, this.item.IddmCaSanXuat, this.item.NgayUnix).subscribe((res: any) => {
        res.forEach(element => {
          element.Id = null;
        });
        if (this.item.listItem !== undefined && this.item.listItem !== null) {
          this.item.listItem = this.item.listItem.concat(res);
        }
        else
          this.item.listItem = res;
        this.getItemTheoCongDoan();
      })
    }
  }
  editChiTiet(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }

  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }
  TinhGiaTri(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * item.SoCoc;
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  TinhCongThucMoi(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0) {
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * item.SoCoc;;
      if (item.isM == true)
        item.ChuDongHo = item.ChieuDai / (item.Nm * 1000);
    }
    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeBongThoMang();
  }
  TinhKhoiLuongChaiCotton(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.HeSoChung || 1);
    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeCottonBongPhe();
  }
  TinhKhoiLuongGhepSoBoChaiCotton(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.SoDauRa || 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  TinhKhoiLuongTho(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * ((item.SoCoc || 0) - (item.CocChet || 0));
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  TinhKhoiLuongChaiKy(item){
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  TinhKhoiLuongCuonCui(item){
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  TinhKhoiLuongChaiPE(item) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.SoDauRa || 0) * (item.HeSoChung || 1);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }
  onClose() {
    this.activeModal.close();
  }
  getListLoHang() {
    var data = {
      CurrentPage: 0,
      IddmPhanXuong: this.item.IddmPhanXuong,
    }
    this.services.LoHang().GetList(data).subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  addLoHang() {
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    this.services.GetListdmItem(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(LohangComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.result.then((data) => {
        this.getListLoHang();
      });
    }, (reason) => {
      // không
    });
  }
  getItemTheoCongDoan() {
    if (this.item.CongDoan != undefined && this.item.listItem != undefined && this.item.listItem != null) {
      this.listItem = []
      this.item.listItem.forEach(element => {
        if (element.CongDoan === this.item.CongDoan) {
          this.listItem.push(element);
        }
      })
      this.TinhTongKhoiLuongBong();
    }
    console.log(this.listItem)
  }
  TinhSoQuaSoi(item, event) {
    if (item.KhoiLuong !== undefined && item.KhoiLuong !== null) {
      if (event === 0 && item.KgCone !== 0 && item.KhoiLuong !== null)
        item.SoQuaSoi = item.KhoiLuong / item.KgCone;
      else if (event !== 0 && event.value !== 0 && event.value !== null)
        item.SoQuaSoi = item.KhoiLuong / event.value;
    }
  }
  TinhKhoiLuongHoiAm(item) {
    item.KhoiLuongHoiAm = item.SoQuaSoi * item.KgCone
  }
  ApDung(item) {
    let cloneId = item.IdLoHang;
    this.listItem.forEach(abc => {
      abc.IdLoHang = cloneId;
    });
  }
  ThayDoiPhanXuong() {
    this.getListLoHang();
    this.getMatHangThongKeSanLuong();
  }
  //cotton
  TinhTyLeCottonBongPhe() {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.CottonBongPhe || 0) - (this.item.CottonBongMun || 0) - 
                  (this.item.KhoiLuongCuiHoiChaiCotton || 0) - (this.item.KhoiLuongXoNgoaiLai || 0) - (this.item.CottonBongQuetNha || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.TyLeCottonBongPhe = (this.item.CottonBongPhe || 0) / (this.TongKhoiLuong + (this.item.CottonBongPhe || 0)) * 100;
      this.item.TyLeCottonBongMun = (this.item.CottonBongMun || 0) / (this.TongKhoiLuong + (this.item.CottonBongMun || 0)) * 100;
      this.item.TyLeCuiHoiChaiCotton = (this.item.KhoiLuongCuiHoiChaiCotton || 0) / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiChaiCotton || 0)) * 100;
      this.item.TyLeXoNgoaiLai = (this.item.KhoiLuongXoNgoaiLai || 0) / (this.TongKhoiLuong + (this.item.KhoiLuongXoNgoaiLai || 0)) * 100;
      this.item.TyLeCottonBongQuetNha = (this.item.CottonBongQuetNha || 0) / (this.TongKhoiLuong + (this.item.CottonBongQuetNha || 0)) * 100;
    }
  }
  //PE
  TinhTyLePEBongPhe() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.PEBongPhe || 0) - (this.item.PEBongMun || 0) - (this.item.PECuiHoi || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.TyLePEBongPhe = this.item.PEBongPhe / (this.TongKhoiLuong + (this.item.PEBongPhe || 0)) * 100;
      this.item.TyLePEBongMun = this.item.PEBongMun / (this.TongKhoiLuong + (this.item.PEBongMun || 0)) * 100;
      this.item.TyLePECuiHoi = this.item.PECuiHoi / (this.TongKhoiLuong + (this.item.PECuiHoi || 0)) * 100;
    }
  }
  //chai ki
  TinhTyLeBongChaiKy() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ChaiKy || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeBongChaiKy = this.item.ChaiKy / (this.TongKhoiLuong + (this.item.ChaiKy || 0)) * 100;
  }
  //thô
  TinhTyLeBongCuiHoi() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.CuiHoi || 0) - (this.item.ThoMangTho || 0) - (this.item.ThoBongQuetNha || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.TyLeBongCuiHoi = this.item.CuiHoi / (this.TongKhoiLuong + (this.item.CuiHoi || 0)) * 100;
      this.item.TyLeThoMangTho = this.item.ThoMangTho / (this.TongKhoiLuong + (this.item.ThoMangTho || 0)) * 100;
      this.item.TyLeThoBongQuetNha = this.item.ThoBongQuetNha / (this.TongKhoiLuong + (this.item.ThoBongQuetNha || 0)) * 100;
    }
  }
  //con
  TinhTyLeBongThoMang() {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ThoMang || 0) - (this.item.BongHutMoi || 0) - (this.item.ConBongQuetNha || 0);
    // this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ThoMang || 0) - (this.item.BongHutMoi || 0);
    if (this.TongKhoiLuong > 0) {
      this.item.TyLeThoMang = (this.item.ThoMang ?? 0) / (this.TongKhoiLuong + (this.item.ThoMang || 0)) * 100;
      this.item.TyLeBongHutMoi = (this.item.BongHutMoi ?? 0) / (this.TongKhoiLuong) * 100;
      this.item.TyLeConBongQuetNha = (this.item.ConBongQuetNha ?? 0) / (this.TongKhoiLuong + (this.item.ConBongQuetNha || 0)) * 100;
    }
  }
  //ong
  TinhTyLeSoiCat() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.SoiCat || 0) - (this.item.OngBongQuetNha || 0);

    if (this.TongKhoiLuong > 0){
      this.item.TyLeSoiCat = this.item.SoiCat / (this.TongKhoiLuong + (this.item.SoiCat || 0)) * 100;
      this.item.TyLeOngBongQuetNha = this.item.OngBongQuetNha / (this.TongKhoiLuong + (this.item.OngBongQuetNha || 0)) * 100;
    }
      
  }
  // ghep dau ra
  TinhTyLeCuiHoiGhepDauRa() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.KhoiLuongCuiHoiGhepDauRa || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepDauRa = this.item.KhoiLuongCuiHoiGhepDauRa / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiGhepDauRa || 0)) * 100;
  }
  // ghep trộn a
  TinhTyLeCuiHoiGhepTronA() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.KhoiLuongCuiHoiGhepTronA || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepTronA = this.item.KhoiLuongCuiHoiGhepTronA / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiGhepTronA || 0)) * 100;
  }
  // ghep tron B
  TinhTyLeCuiHoiGhepTronB() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.KhoiLuongCuiHoiGhepTronB || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepTronB = this.item.KhoiLuongCuiHoiGhepTronB / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiGhepTronB || 0)) * 100;
  }
  // ghep so bo pe
  TinhTyLeCuiHoiGhepSoBoPE() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.KhoiLuongCuiHoiGhepSoBoPE || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoPE = this.item.KhoiLuongCuiHoiGhepSoBoPE / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiGhepSoBoPE || 0)) * 100;
  }
  // ghep so bo cotton
  TinhTyLeCuiHoiGhepSoBoCotton() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoCotton = this.item.TongKhoiLuongCuiHoi / (this.TongKhoiLuong + (this.item.TongKhoiLuongCuiHoi || 0)) * 100;
  }
  enter(i) {
    if (i + 1 < this.inputNumbers.toArray().length) {
      this.inputNumbers.toArray()[i + 1].el.nativeElement.children[0].children[0].focus();
    } else {
      this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
    }
  }
  enterCon(i) {
    console.log(i)
    console.log(this.inputNumbers.toArray().map(ele => ele.tabindex))
    if (this.item.CongDoan === 'CON') {
      if (i + 4 <= (this.listItem.length * 5 - 1)) {
        this.inputNumbers.toArray()[i + 4].el.nativeElement.children[0].children[0].focus();
      } else {
        this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
      }
    }else{
      let nextFocus = this.inputNumbers.toArray().find(ele=>ele.tabindex ===i+5);
      if(validVariable(nextFocus)){
        nextFocus.el.nativeElement.children[0].children[0].focus();
      }else{
        this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
      }
    }
  }
  TinhTongKhoiLuongBong() {
    // switch (this.item.CongDoan) {
    //   case 'CHAICOTTON':
    //     this.TinhTyLeCottonBongPhe();
    //     break;
    //   case 'CHAIPE':
    //     this.TinhTyLePEBongPhe();
    //     break;
    //   case 'CHAIKY':
    //     this.TinhTyLeBongChaiKy();
    //     break;
    //   case 'THO':
    //     this.TinhTyLeBongCuiHoi();
    //     break;
    //   case 'ONG':
    //     this.TinhTyLeSoiCat();
    //     break;
    //   case 'CON':
    //     this.TinhTyLeBongThoMang();
    //     break;
    //   case 'GHEPDAURA':
    //     this.TinhTyLeCuiHoiGhepDauRa();
    //     break;
    //   case 'GHEPSOBOCOTTON':
    //     this.TinhTyLeCuiHoiGhepSoBoCotton();
    //     break;
    //   case 'GHEPTRONA':
    //     this.TinhTyLeCuiHoiGhepTronA();
    //     break;
    //   case 'GHEPTRONB':
    //     this.TinhTyLeCuiHoiGhepTronB();
    //     break;
    //   case 'GHEPSOBOPE':
    //     this.TinhTyLeCuiHoiGhepSoBoPE();
    //     break;
    //   default:
        let TongKhoiLuong = 0;
        TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
        let TongBongPhe = this.item.listTyLeBongPhe.find(ele=>ele.MaCongDoan === this.item.CongDoan)?.listKhoiLuongBongPhe.reduce((a,b)=>a+(b.KhoiLuong||0),0);
        console.log(TongBongPhe);
        console.log(TongKhoiLuong);
        if(this.item.isTruVaoSanLuong){
          this.TongKhoiLuong = TongKhoiLuong - TongBongPhe;
        }else{
          this.TongKhoiLuong = TongKhoiLuong;
        }
        console.log(this.TongKhoiLuong);
        let found = this.item.listTyLeBongPhe.find(ele=>ele.MaCongDoan===this.item.CongDoan);
        found.TongKhoiLuongCongDoan = this.TongKhoiLuong;
        found.isTruVaoSanLuong = this.item.isTruVaoSanLuong;
        this.typing.next('');
    //     break;
    // }
  }

  resetKhoiLuongCuiHoi() {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.isTruVaoSanLuong === true)
    this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);

    let TongKhoiLuong = this.TongKhoiLuong + (this.item.TongKhoiLuongCuiHoi || 0);

    if (TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoCotton = this.item.TongKhoiLuongCuiHoi / (TongKhoiLuong) * 100;
  }

  KhoiLuongBongTheoCuiHoi(item) {
    this.TongKhoiLuong = 0;
    var KhoiLuong = 0;
    this.item.TongKhoiLuongCuiHoi = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuongCuiHoi || 0), 0);

    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0 && item.DonViNangSuat === 0)
      KhoiLuong = item.ChieuDai / (item.Ne * 1.693 * 1000) * (item.SoDauRa || 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TongKhoiLuong = this.listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);

    if (this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.TongKhoiLuongCuiHoi || 0);
  }

  KhoiLuongBongCongDoanCon(item) {
    this.item.BongHutMoi = this.listItem.reduce((Total, ele) => Total + (ele.HutMoi || 0), 0);
    if (item.isM == true && item.Nm > 0) {
      item.ChuDongHo = item.ChieuDai / (item.Nm * 1000);
      item.KhoiLuong = (item.ChuDongHo || 0) * ((item.SoCoc || 0) - (item.CocChet || 0)) - (item.HutMoi || 0);
    }
    else {
      item.KhoiLuong = (item.ChuDongHo || 0) * ((item.SoCoc || 0) - (item.CocChet || 0)) / 1000 - (item.HutMoi || 0);
    }
    this.TinhTongKhoiLuongBong();
  }
  // ThayDoiTongKhoiLuong(){
  //   this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
  //   if(this.item.isTruVaoSanLuong === true){
  //     this.TongKhoiLuong = this.TongKhoiLuong -  (this.item.TongKhoiLuongCuiHoi || 0);
  //   }
  // }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] = res;
      this.TinhTongKhoiLuongBong();
    })
  }
  checkAll(e) {
    if (e.checked) {
      this.listItem.forEach(item => {
        item.isM = true;
      });
    } else {
      this.listItem.forEach(item => {
        item.isM = false;
      });
    }
  }
  ngOnDestroy(){
    this.$typing.unsubscribe()
  }
}
