import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DmphannhommayChonmathangmodalComponent } from '../dmphannhommay-chonmathangmodal/dmphannhommay-chonmathangmodal.component';

@Component({
  selector: 'app-dmphannhommaymodal',
  templateUrl: './dmphannhommaymodal.component.html',
  styleUrls: ['./dmphannhommaymodal.component.css']
})
export class DmphannhommaymodalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  childModalOpt: any = null;
  listPhanXuong: any = [];
  listCongDoan: any = [];
  listloaisoi: any = [];
  listDonViNangSuat: any = [];
  khongclicknhieu: any = false;
  newTableItem: any = {
    Id: "",
    IddmPhanNhomMay: "",
  };
  listLoaiSoiHoacMatHang: any = [];
  filter: any = {
    KeyWord: ''
  };
  mapCongDoan: any = {
    THO: 'SOI',
    GHEPDAURA: 'SOI',
    GHEPTRONB: 'SOI',
    GHEPTRONA: 'SOI',
    ONG: 'MATHANG',
    CON: 'MATHANG',
    CUONCUI: '',
    GHEPSOBO: '',
    GHEPSOBOPE: '',
    GHEPSOBOCOTTON: '',
    BONGCHAI: '',
    XOCHAI: '',
    CHAITHO: '',
    CHAIKY: ''
  }

  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) {

  }

  ngOnInit(): void {
    if (validVariable(this.item.CongDoan)) {
      this.childModalOpt = this.mapCongDoan[this.item.CongDoan];
    }
    if (this.opt == 'edit') {
      if (this.childModalOpt === 'SOI') {
        this.GetListLoaiSoi();
        let data1 = {
          PageSize: 20,
          CurrentPage: 0,
          sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
          CongDoan: '',
          Ma: "",
          Ten: "",
        };
        this.sanXuatService.GetListdmLoaiSoi(data1).subscribe((res: any) => {
          let listLoaiSoiHoacMatHang1 = this.mapHienThi(res);
          console.log(listLoaiSoiHoacMatHang1);

          this.item.lstdmItem.forEach(element => {
            // if (this.childModalOpt === 'MATHANG') {
            //   this.GetLoaiSoi();
            //   this.GetDMMatHang();
            //   element.Iditem = element.IddmItem;
            // }
            if (this.childModalOpt === 'SOI') {
              element.Iditem = listLoaiSoiHoacMatHang1.filter(objlistLoaiSoiHoacMatHang => element.IddmLoaiSoi === objlistLoaiSoiHoacMatHang.value)[0]?.value;
            }
          });
        })
      }
      if (this.childModalOpt === 'MATHANG') {
        let data2 = {
          PageSize: 20,
          CurrentPage: 0,
          sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
          CongDoan: '',
          Ma: "",
          Ten: "",
          Loai: "1",
          IddmLoaiSoi: this.filter.IddmLoaiSoi
        };
        this.sanXuatService.GetListdmItem(data2).subscribe((res: any) => {
          let listLoaiSoiHoacMatHang2 = this.mapHienThi(res);
          // this.GetLoaiSoi();
          this.GetDMMatHang();
          this.item.lstdmItem.forEach(element => {
            if (this.childModalOpt === 'MATHANG') {
              element.Iditem = listLoaiSoiHoacMatHang2.filter(objlistLoaiSoiHoacMatHang => element.IddmItem === objlistLoaiSoiHoacMatHang.value)[0]?.value;
            }
            // if (this.childModalOpt === 'SOI') {
            //   this.GetListLoaiSoi()
            //   element.Iditem = element.IddmLoaiSoi;
            // }
          });
        })
      }
    }
    console.table(this.item.lstdmItem)
    this.GetListPhanXuong();
    this.GetListCongDoan();
    this.tinhNangSuatLyThuyet();
  }
  mapHienThi(array: Array<any>) {
    return deepCopy(array.map(ele => {
      return {
        label: `${ele.Ten}-${ele.Ma}`,
        value: ele.Id
      }
    }))
  }
  GetListPhanXuong() {
    this.sanXuatService.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  GetListCongDoan() {
    this.sanXuatService.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if ((this.newTableItem.Ne !== undefined && this.newTableItem.Ne !== null) || (this.newTableItem.Nm !== undefined && this.newTableItem.Nm !== null))
      this.add();
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }

  Save() {
    this.sanXuatService.dmPhanNhomMaySanXuat().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

  TimKiem() {

  }

  resetFilter() {

  }

  DanhSachHang() {
    let modalRef = this._modal.open(DmphannhommayChonmathangmodalComponent, {
      size: "lg",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = this.childModalOpt;
    modalRef.componentInstance.title = 'Danh sách hàng';
    modalRef.componentInstance.selectedItems = this.item.lstdmItem || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id || "";
    modalRef.componentInstance.CongDoan = this.item.CongDoan;
    modalRef.result.then(res => {
      // this.toastr.success(res);
      // merge(res, this.item.lstdmItem, this.childModalOpt === 'MATHANG' ? 'IddmItem' : 'IddmLoaiSoi');    
      let listdatapush = [];
      res.forEach(element => {
        if (this.childModalOpt === 'MATHANG') {
          element.Iditem = this.listLoaiSoiHoacMatHang.filter(obj => element.IddmItem === obj.value)[0]?.value;
        }
        if (this.childModalOpt === 'SOI') {
          element.Iditem = this.listLoaiSoiHoacMatHang.filter(obj => element.IddmLoaiSoi === obj.value)[0]?.value;
        }
        element.isXoa = false;
        listdatapush.push(element);
      });
      this.item.lstdmItem = this.item.lstdmItem.concat(listdatapush);
      this.item.lstdmItem.filter(obj => obj.isDelete = obj.isXoa);
    }).catch(er => console.log(er))
  }

  changeNangSuat(e, item) {
    item.DinhMucNangSuat = (e.value * item.HieuSuat || 0) / 100;
  }

  changeHieuSuat(e, item) {
    item.DinhMucNangSuat = (e.value * item.NangSuat || 0) / 100;
  }

  changeTocDo(e, item) {
    // item.DinhMucNangSuat = (e.value * item.NangSuat || 0) / 100;
  }

  changeCongDoan(e) {
    console.log(e, 'change')
    this.item.lstdmItem = [];
    this.newTableItem = {
      Id: "",
      IddmPhanNhomMay: ""
    }
    this.childModalOpt = this.mapCongDoan[e.value];
    if (this.childModalOpt === '') {
      console.log(this.item.lstdmItem)
      // this.item.lstdmItem.push({})
    }
    if (e.value != "CON") {
      this.item.SoCoc = null;
    }
    if (this.childModalOpt === 'MATHANG') {
      this.GetLoaiSoi();
      this.GetDMMatHang();
    }
    if (this.childModalOpt === 'SOI') {
      this.GetListLoaiSoi()
    }
    this.tinhNangSuatLyThuyet();
    this.item_tinhNangSuatLyThuyet();
  }

  GetLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.sanXuatService.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListLoaiSoi() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
      CongDoan: '',
      Ma: "",
      Ten: "",
    };
    this.sanXuatService.GetListdmLoaiSoi(data).subscribe((res: any) => {
      console.table(this.mapHienThi(res));
      this.listLoaiSoiHoacMatHang = this.mapHienThi(res);
    })
  }

  GetDMMatHang() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
      CongDoan: '',
      Ma: "",
      Ten: "",
      Loai: "1",
      IddmLoaiSoi: this.filter.IddmLoaiSoi
    };
    this.sanXuatService.GetListdmItem(data).subscribe((res: any) => {
      this.listLoaiSoiHoacMatHang = this.mapHienThi(res);
    })
  }

  tinhNangSuatLyThuyet() {
    if (this.item.lstdmItem.length > 0) {
      if (this.item.CongDoan == "BONGCHAI" || this.item.CongDoan == "CHAITHO" || this.item.CongDoan == "XOCHAI" || this.item.CongDoan == "CUONCUI" || this.item.CongDoan == "DAYBONG" || this.item.CongDoan == "DAYPE" || this.item.CongDoan == "CHAICOTTON" || this.item.CongDoan == "CHAIPE") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(obj.Nm))) {
            obj.NangSuat = obj.TocDo * (this.item.TocDoQuay || 0) / obj.Nm / 1000 * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
      else if (this.item.CongDoan == "GHEPSOBO"|| this.item.CongDoan == "GHEPSOBOPE" || this.item.CongDoan == "GHEPSOBOCOTTON" || this.item.CongDoan == "GHEPTRONA" || this.item.CongDoan == "GHEPTRONB" || this.item.CongDoan == "GHEPDAURA") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(this.item.SoDauRa)) && (validVariable(obj.Nm))) {
            obj.NangSuat = obj.TocDo * this.item.SoDauRa * (this.item.TocDoQuay || 0) / obj.Nm / 1000 * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
      else if (this.item.CongDoan == "CHAIKY") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(this.item.SoDauRa)) && (validVariable(obj.Nm))) {
            obj.NangSuat = obj.TocDo * this.item.SoDauRa * (this.item.TocDoQuay || 0) / obj.Nm / 1000 / 2 * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
      else if (this.item.CongDoan == "THO") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(obj.DoSan)) && (validVariable(obj.Nm))) {
            obj.NangSuat = obj.TocDo * this.item.SoCoc * (this.item.TocDoQuay || 0) / obj.DoSan / obj.Nm / 1000 * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
      else if (this.item.CongDoan == "CON") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(obj.Nm)) && (validVariable(obj.DoSan))) {
            // obj.NangSuat = obj.TocDo * 1200 * 480 / obj.Nm / 1000 / obj.DoSan * 0.94;
            obj.NangSuat = obj.TocDo * this.item.SoCoc * (this.item.TocDoQuay || 0) / obj.Nm / 1000 / obj.DoSan * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
      else if (this.item.CongDoan == "ONG") {
        this.item.lstdmItem.forEach(obj => {
          if ((validVariable(obj.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(obj.Nm))) {
            obj.NangSuat = obj.TocDo * (this.item.TocDoQuay || 0) * this.item.SoCoc / 1000 / obj.Nm * (this.item.HeSo || 0);
            obj.DinhMucNangSuat = (obj.NangSuat * obj.HieuSuat || 0) / 100;
          }
        });
      }
    }
  }

  item_tinhNangSuatLyThuyet() {
    if (this.newTableItem.Id != undefined) {
      if (this.item.CongDoan == "BONGCHAI" || this.item.CongDoan == "CHAITHO" || this.item.CongDoan == "XOCHAI" || this.item.CongDoan == "CUONCUI" || this.item.CongDoan == "DAYBONG" || this.item.CongDoan == "DAYPE" || this.item.CongDoan == "CHAICOTTON" || this.item.CongDoan == "CHAIPE") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.newTableItem.Nm))) {
          this.newTableItem.NangSuat = this.newTableItem.TocDo * (this.item.TocDoQuay || 0) / this.newTableItem.Nm / 1000 * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
      else if (this.item.CongDoan == "GHEPSOBO"|| this.item.CongDoan == "GHEPSOBOPE" || this.item.CongDoan == "GHEPSOBOCOTTON" || this.item.CongDoan == "GHEPTRONA" || this.item.CongDoan == "GHEPTRONB" || this.item.CongDoan == "GHEPDAURA") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.item.SoDauRa)) && (validVariable(this.newTableItem.Nm))) {
          this.newTableItem.NangSuat = this.newTableItem.TocDo * this.item.SoDauRa * (this.item.TocDoQuay || 0) / this.newTableItem.Nm / 1000 * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
      else if (this.item.CongDoan == "CHAIKY") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.item.SoDauRa)) && (validVariable(this.newTableItem.Nm))) {
          this.newTableItem.NangSuat = this.newTableItem.TocDo * this.item.SoDauRa * (this.item.TocDoQuay || 0) / this.newTableItem.Nm / 1000 / 2 * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
      else if (this.item.CongDoan == "THO") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(this.newTableItem.DoSan)) && (validVariable(this.newTableItem.Nm))) {
          this.newTableItem.NangSuat = this.newTableItem.TocDo * this.item.SoCoc * (this.item.TocDoQuay || 0) / 1000 / this.newTableItem.DoSan / this.newTableItem.Nm * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
      else if (this.item.CongDoan == "CON") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(this.newTableItem.Nm)) && (validVariable(this.newTableItem.DoSan))) {
          // this.newTableItem.NangSuat = this.newTableItem.TocDo * 1200 * 480 / this.newTableItem.Nm / 1000 / this.newTableItem.DoSan * 0.94;
          this.newTableItem.NangSuat = this.newTableItem.TocDo * this.item.SoCoc * 480 / this.newTableItem.Nm / 1000 / this.newTableItem.DoSan * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
      else if (this.item.CongDoan == "ONG") {
        if ((validVariable(this.newTableItem.TocDo)) && (validVariable(this.item.SoCoc)) && (validVariable(this.newTableItem.Nm))) {
          this.newTableItem.NangSuat = this.newTableItem.TocDo * (this.item.TocDoQuay || 0) * this.item.SoCoc / 1000 / this.newTableItem.Nm * (this.item.HeSo || 0);
          this.newTableItem.DinhMucNangSuat = (this.newTableItem.NangSuat * this.newTableItem.HieuSuat || 0) / 100;
        }
      }
    }
  }

  changeLoaiSoiHoacMatHang(e, item) {
    if (this.childModalOpt === 'MATHANG') {
      item.IddmItem = e.value;
    }
    if (this.childModalOpt === 'SOI') {
      item.IddmLoaiSoi = e.value;
    }
  }

  add() {
    // if (this.childModalOpt !== '') {

    // }
    if (this.item.lstdmItem == undefined || this.item.lstdmItem == null)
      this.item.lstdmItem = [];
    this.newTableItem.Id = "";
    this.newTableItem.IddmPhanNhomMay = this.item.Id || "";
    this.item.lstdmItem.push(this.newTableItem);
    this.newTableItem = {
      Id: "",
      IddmPhanNhomMay: ""
    }
  }

  delete(index) {
    let item = this.item.lstdmItem.splice(index, 1)[0];
    // let item = this.items.splice(i, 1)[0];
    if (item.Id === '' && item.Id === null && item.Id === undefined) {
    } else {
      item.isXoa = true;
      item.isDelete = true;
      this.item.lstdmItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  changeDMApDung(item) {
    this.item.lstdmItem.forEach(element => {
      if (element.Iditem != undefined && element.Iditem.Id == item.Iditem.Id) {
        if (element.Id != item.Id) {
          if (item.Nm != element.Nm) {
            item.isApDung = true;
          }
          else {
            element.isApDung = false;
          }
        }
      }
    });
  }
}
