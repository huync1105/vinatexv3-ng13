import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { LohangComponent } from '../../lohang/lohang.component';

@Component({
  selector: 'app-thongkesanluongcamodal',
  templateUrl: './thongkesanluongcamodal.component.html',
  styleUrls: ['./thongkesanluongcamodal.component.css']
})
export class ThongkesanluongcamodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
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
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  listCaThucTe: any = [];
  TongKhoiLuong: any = 0;
  userInfo: any;
  listItemTable: any = (['clone', 'clone', 'clone', 'clone', 'clone', 'clone', 'clone', 'clone', 'clone', 'clone'])
  thongKeFull: any = [{ listIem: [] }];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService,
    private _auth: AuthenticationService,
    public _modal: NgbModal,) {

  }

  ngOnInit(): void {
    this.getListCongDoan();
    this.userInfo = this._auth.currentUserValue;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetPhanXuongTheoUser();
      this.item.width = '100px';
    }
    else {
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
    this.getListCaSanXuat();
    this.getListLoHang();
    this.getListCaThucTe();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if (this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }
  ChuyenDuyet() {
    let isCheck: any = false;
    this.item.listThongKeSanLuong.forEach(element => {
      if (element.IddmCaSanXuatThucTe == undefined || element.IddmCaSanXuatThucTe == null)
        isCheck = true;
    });
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn ca sản xuất thực tế!!");
    }
    else {
      this.services.ThongKeSanLuongNhieuCa().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.ThongKeSanLuongNhieuCa().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
    let isCheck: any = false;
    this.item.listThongKeSanLuong.forEach(element => {
      if (element.IddmCaSanXuatThucTe == undefined || element.IddmCaSanXuatThucTe == null)
        isCheck = true;
    });
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn ca sản xuất thực tế!!");
    }
    else {
      this.services.ThongKeSanLuongNhieuCa().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.Ngay = UnixToDate(this.item.NgayUnix);
            this.getItemTheoCongDoan()
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
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
      this.services.ThongKeSanLuongNhieuCa().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
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
      this.listCaSanXuat = res;
      if (this.item.listThongKeSanLuong == undefined || this.item.listThongKeSanLuong == null) {
        this.item.listThongKeSanLuong = [];
        this.listCaSanXuat.forEach(element => {
          let itemFind = {
            IddmCaSanXuat: element.Id,
            listItem: [],
            isTruVaoSanLuong: false,
            STT: element.STT
          }
          this.item.listThongKeSanLuong.push(itemFind)
        });
      }
      if (this.opt === 'edit') {
        this.getItemTheoCongDoan();
      }
      else {
        this.listCaSanXuat.forEach(element => {
          if (this.item.CongDoan === "ONG")
            element.SoCot = 3;
          else if (this.item.CongDoan === "CON")
            element.SoCot = 3;
          else if (this.item.CongDoan === "THO")
            element.SoCot = 3;
          else
            element.SoCot = 2;
        });
      }
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
    if (this.item.IddmPhanXuong != undefined
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

      this.services.ThongKeSanLuong().GetMatHangTheoNgay(this.item.IddmPhanXuong, this.item.NgayUnix).subscribe((res: any) => {
        res.forEach(element => {
          element.Id = null;
        });
        this.listCaSanXuat.forEach(element => {
          let res_new = deepCopy(res);
          if (this.item.listThongKeSanLuong == undefined || this.item.listThongKeSanLuong == null) {
            let itemFind = {
              IddmCaSanXuat: element.Id,
              listItem: res_new,
              STT: element.STT
            }
            this.item.listThongKeSanLuong = [];
            this.item.listThongKeSanLuong.push(itemFind)
          }
          else {
            let itemFind = this.item.listThongKeSanLuong.find(ele => ele.IddmCaSanXuat == element.Id)
            if (itemFind == undefined || itemFind == null) {
              itemFind = {
                IddmCaSanXuat: element.Id,
                listItem: res_new,
                STT: element.STT
              }
              this.item.listThongKeSanLuong.push(itemFind)
            }
            else {

              if (itemFind.listItem !== undefined && itemFind.listItem !== null) {
                itemFind.listItem = itemFind.listItem.concat(res_new);
              }
              else
                itemFind.listItem = res_new;
            }
          }
        });
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
  TinhGiaTri(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * item.SoCoc;
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
  }
  TinhCongThucMoi(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0) {
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * item.SoCoc;;
      if (item.isM == true)
        item.ChuDongHo = item.ChieuDai / (item.Nm * 1000);
    }
    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeBongThoMang(index);
  }
  TinhKhoiLuongChaiCotton(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.HeSoChung || 1);
    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeCottonBongPhe(index);
  }
  TinhKhoiLuongGhepSoBoChaiCotton(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.SoDauRa || 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
  }
  TinhKhoiLuongTho(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * ((item.SoCoc || 0) - (item.CocChet || 0));
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
  }
  TinhKhoiLuongChaiKy(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
  }
  TinhKhoiLuongCuonCui(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
  }
  TinhKhoiLuongChaiPE(item, index) {
    var KhoiLuong = 0;
    if (item.Nm !== undefined && item.Nm !== null && item.Nm !== 0)
      KhoiLuong = item.ChieuDai / (item.Nm * 1000) * (item.SoDauRa || 0) * (item.HeSoChung || 1);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong(index);
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
    if (this.item.CongDoan != undefined && this.item.listThongKeSanLuong != undefined && this.item.listThongKeSanLuong != null) {
      this.thongKeFull = [];
      let listItemCheck: any = [];
      if (this.item.CongDoan === "ONG")
        listItemCheck = this.item.listThongKeSanLuong[0].listItem.filter(ele => ele.CongDoan == this.item.CongDoan);
      this.item.listThongKeSanLuong.forEach(element => {
        if (this.item.CongDoan !== "ONG") {
          let thongKe = { listItem: element.listItem.filter(ele => ele.CongDoan == this.item.CongDoan), IddmCaSanXuat: element.IddmCaSanXuat }
          this.thongKeFull.push(thongKe);
        }
        else {
          let listItem = element.listItem.filter(ele => ele.CongDoan == this.item.CongDoan && ele.IddmCaSanXuat == element.IddmCaSanXuat);
          if (listItem[0]?.Id === undefined) {
            let listItem_new = [];
            listItem.forEach(eleCheck => {
              let itemCheck = listItemCheck.find(x => x.IddmItem == eleCheck.IddmItem && x.IddmLoaiSoi == eleCheck.IddmLoaiSoi && x.IddmCaSanXuat == eleCheck.IddmCaSanXuat);
              if (itemCheck !== undefined) {
                eleCheck.isCheckdmCaSanXuat = true;
                listItem_new.push(eleCheck);
              }
              else {
                let itemAdd = deepCopy(listItemCheck.find(x => x.IddmItem == eleCheck.IddmItem && x.IddmLoaiSoi == eleCheck.IddmLoaiSoi));
                itemAdd.isCheckdmCaSanXuat = false;
                listItem_new.push(itemAdd);
              }
            });
            let thongKe = { listItem: listItem_new, IddmCaSanXuat: element.IddmCaSanXuat }
            this.thongKeFull.push(thongKe);
          }
          else {
            let thongKe = { listItem: listItem, IddmCaSanXuat: element.IddmCaSanXuat }
            this.thongKeFull.push(thongKe);
          }
        }
      })
    }
    let i = 0;
    this.listCaSanXuat.forEach(element => {
      this.TinhTongKhoiLuongBong(i);
      i++;
      if (this.item.CongDoan === "ONG")
        element.SoCot = 3;
      else if (this.item.CongDoan === "CON")
        element.SoCot = 3;
      else if (this.item.CongDoan === "THO")
        element.SoCot = 3;
      else
        element.SoCot = 2;
    });
    if (this.item.CongDoan === "ONG") {
      this.item.width = '100px';
    }
    else if (this.item.CongDoan === "CON")
      this.item.width = '75px';
    else
      this.item.width = '100px';
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
  ApDung(item, index) {
    let cloneId = item.IdLoHang;
    this.thongKeFull[index].listItem.forEach(abc => {
      abc.IdLoHang = cloneId;
    });
  }
  ThayDoiPhanXuong() {
    this.getListLoHang();
    this.getMatHangThongKeSanLuong();
  }
  //cotton
  TinhTyLeCottonBongPhe(index = 0) {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].CottonBongPhe || 0) - (this.item.listThongKeSanLuong[index].CottonBongMun || 0) -
        (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiChaiCotton || 0) - (this.item.listThongKeSanLuong[index].KhoiLuongXoNgoaiLai || 0) - (this.item.listThongKeSanLuong[index].CottonBongQuetNha || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.listThongKeSanLuong[index].TyLeCottonBongPhe = (this.item.listThongKeSanLuong[index].CottonBongPhe || 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].CottonBongPhe || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeCottonBongMun = (this.item.listThongKeSanLuong[index].CottonBongMun || 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].CottonBongMun || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeCuiHoiChaiCotton = (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiChaiCotton || 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiChaiCotton || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeXoNgoaiLai = (this.item.listThongKeSanLuong[index].KhoiLuongXoNgoaiLai || 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongXoNgoaiLai || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeCottonBongQuetNha = (this.item.listThongKeSanLuong[index].CottonBongQuetNha || 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].CottonBongQuetNha || 0)) * 100;
    }
  }
  //PE
  TinhTyLePEBongPhe(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].PEBongPhe || 0) - (this.item.listThongKeSanLuong[index].PEBongMun || 0) - (this.item.listThongKeSanLuong[index].PECuiHoi || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.listThongKeSanLuong[index].TyLePEBongPhe = this.item.listThongKeSanLuong[index].PEBongPhe / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].PEBongPhe || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLePEBongMun = this.item.listThongKeSanLuong[index].PEBongMun / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].PEBongMun || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLePECuiHoi = this.item.listThongKeSanLuong[index].PECuiHoi / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].PECuiHoi || 0)) * 100;
    }
  }
  //chai ki
  TinhTyLeBongChaiKy(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].ChaiKy || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeBongChaiKy = this.item.listThongKeSanLuong[index].ChaiKy / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].ChaiKy || 0)) * 100;
  }
  //thô
  TinhTyLeBongCuiHoi(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].CuiHoi || 0) - (this.item.listThongKeSanLuong[index].ThoMangTho || 0) - (this.item.listThongKeSanLuong[index].ThoBongQuetNha || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.listThongKeSanLuong[index].TyLeBongCuiHoi = this.item.listThongKeSanLuong[index].CuiHoi / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].CuiHoi || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeThoMangTho = this.item.listThongKeSanLuong[index].ThoMangTho / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].ThoMangTho || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeThoBongQuetNha = this.item.listThongKeSanLuong[index].ThoBongQuetNha / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].ThoBongQuetNha || 0)) * 100;
    }
  }
  //con
  TinhTyLeBongThoMang(index = 0) {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].ThoMang || 0) - (this.item.listThongKeSanLuong[index].BongHutMoi || 0) - (this.item.listThongKeSanLuong[index].ConBongQuetNha || 0);
    // this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ThoMang || 0) - (this.item.BongHutMoi || 0);
    if (this.TongKhoiLuong > 0) {
      this.item.listThongKeSanLuong[index].TyLeThoMang = (this.item.listThongKeSanLuong[index].ThoMang ?? 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].ThoMang || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeBongHutMoi = (this.item.listThongKeSanLuong[index].BongHutMoi ?? 0) / (this.TongKhoiLuong) * 100;
      this.item.listThongKeSanLuong[index].TyLeConBongQuetNha = (this.item.listThongKeSanLuong[index].ConBongQuetNha ?? 0) / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].ConBongQuetNha || 0)) * 100;
    }
  }
  //ong
  TinhTyLeSoiCat(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].SoiCat || 0) - (this.item.listThongKeSanLuong[index].OngBongQuetNha || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.listThongKeSanLuong[index].TyLeSoiCat = this.item.listThongKeSanLuong[index].SoiCat / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].SoiCat || 0)) * 100;
      this.item.listThongKeSanLuong[index].TyLeOngBongQuetNha = this.item.listThongKeSanLuong[index].OngBongQuetNha / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].OngBongQuetNha || 0)) * 100;
    }

  }
  // ghep dau ra
  TinhTyLeCuiHoiGhepDauRa(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepDauRa || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeCuiHoiGhepDauRa = this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepDauRa / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepDauRa || 0)) * 100;
  }
  // ghep trộn a
  TinhTyLeCuiHoiGhepTronA(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronA || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeCuiHoiGhepTronA = this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronA / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronA || 0)) * 100;
  }
  // ghep tron B
  TinhTyLeCuiHoiGhepTronB(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronB || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeCuiHoiGhepTronB = this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronB / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepTronB || 0)) * 100;
  }
  // ghep so bo pe
  TinhTyLeCuiHoiGhepSoBoPE(index = 0) {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepSoBoPE || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeCuiHoiGhepSoBoPE = this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepSoBoPE / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].KhoiLuongCuiHoiGhepSoBoPE || 0)) * 100;
  }
  // ghep so bo cotton
  TinhTyLeCuiHoiGhepSoBoCotton(index) {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);

    if (this.TongKhoiLuong > 0)
      this.item.listThongKeSanLuong[index].TyLeCuiHoiGhepSoBoCotton = this.item.listThongKeSanLuong[index].TongKhoiLuongCuiHoi / (this.TongKhoiLuong + (this.item.listThongKeSanLuong[index].TongKhoiLuongCuiHoi || 0)) * 100;
  }
  enterCon(i, index?) {
    debugger
    console.log(this.inputNumbers.toArray())

    if (this.item.CongDoan === 'CON') {
      let nextFocus = this.inputNumbers.toArray().find(ele => ele.tabindex === i+15);
      if (validVariable(nextFocus)) {
        nextFocus.el.nativeElement.children[0].children[0].focus()
      } else {
        this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
      }
      // if (i + 4 <= (this.thongKeFull[index].listItem.length * 5 - 1)) {
      //   this.inputNumbers.toArray()[i + 4].el.nativeElement.children[0].children[0].focus();
      // } else {
      //   this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
      // }
    } else {
      let nextFocus = this.inputNumbers.toArray().find(ele => ele.tabindex === i+6);
      if (validVariable(nextFocus)) {
        nextFocus.el.nativeElement.children[0].children[0].focus()
      } else {
        this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
      }
    }
  }
  TinhTongKhoiLuongBong(index) {
    switch (this.item.CongDoan) {
      case 'CHAICOTTON':
        this.TinhTyLeCottonBongPhe(index);
        break;
      case 'CHAIPE':
        this.TinhTyLePEBongPhe(index);
        break;
      case 'CHAIKY':
        this.TinhTyLeBongChaiKy(index);
        break;
      case 'THO':
        this.TinhTyLeBongCuiHoi(index);
        break;
      case 'ONG':
        this.TinhTyLeSoiCat(index);
        break;
      case 'CON':
        this.TinhTyLeBongThoMang(index);
        break;
      case 'GHEPDAURA':
        this.TinhTyLeCuiHoiGhepDauRa(index);
        break;
      case 'GHEPSOBOCOTTON':
        this.TinhTyLeCuiHoiGhepSoBoCotton(index);
        break;
      case 'GHEPTRONA':
        this.TinhTyLeCuiHoiGhepTronA(index);
        break;
      case 'GHEPTRONB':
        this.TinhTyLeCuiHoiGhepTronB(index);
        break;
      case 'GHEPSOBOPE':
        this.TinhTyLeCuiHoiGhepSoBoPE(index);
        break;
      default:
        this.TongKhoiLuong = 0;
        if (this.thongKeFull[index] !== undefined && this.thongKeFull[index].listItem !== undefined)
          this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
        break;
    }
  }

  resetKhoiLuongCuiHoi(index) {
    this.TongKhoiLuong = 0;
    this.TongKhoiLuong = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);
    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);

    let TongKhoiLuong = this.TongKhoiLuong + (this.item.TongKhoiLuongCuiHoi || 0);

    if (TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoCotton = this.item.TongKhoiLuongCuiHoi / (TongKhoiLuong) * 100;
  }

  KhoiLuongBongTheoCuiHoi(item, index) {
    this.TongKhoiLuong = 0;
    var KhoiLuong = 0;
    this.item.TongKhoiLuongCuiHoi = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.KhoiLuongCuiHoi || 0), 0);

    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0 && item.DonViNangSuat === 0)
      KhoiLuong = item.ChieuDai / (item.Ne * 1.693 * 1000) * (item.SoDauRa || 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TongKhoiLuong = this.thongKeFull[index].reduce((Total, ele) => Total + (ele.KhoiLuong || 0), 0);

    if (this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.TongKhoiLuongCuiHoi || 0);
  }

  KhoiLuongBongCongDoanCon(item, index) {
    this.item.BongHutMoi = this.thongKeFull[index].listItem.reduce((Total, ele) => Total + (ele.HutMoi || 0), 0);
    if (item.isM == true && item.Nm > 0) {
      item.ChuDongHo = item.ChieuDai / (item.Nm * 1000);
      item.KhoiLuong = (item.ChuDongHo || 0) * ((item.SoCoc || 0) - (item.CocChet || 0)) - (item.HutMoi || 0);
    }
    else {
      item.KhoiLuong = (item.ChuDongHo || 0) * ((item.SoCoc || 0) - (item.CocChet || 0)) / 1000 - (item.HutMoi || 0);
    }
    this.TinhTongKhoiLuongBong(index);
  }
  // ThayDoiTongKhoiLuong(){
  //   this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
  //   if(this.item.listThongKeSanLuong[index].isTruVaoSanLuong === true){
  //     this.TongKhoiLuong = this.TongKhoiLuong -  (this.item.TongKhoiLuongCuiHoi || 0);
  //   }
  // }
  tinhToan(item, opt, index) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] = res;
      this.TinhTongKhoiLuongBong(index);
    })
  }
  checkAll(e, index) {
    if (e.checked) {
      this.thongKeFull[index].listItem.forEach(item => {
        item.isM = true;
      });
    } else {
      this.thongKeFull[index].listItem.forEach(item => {
        item.isM = false;
      });
    }
  }
}
