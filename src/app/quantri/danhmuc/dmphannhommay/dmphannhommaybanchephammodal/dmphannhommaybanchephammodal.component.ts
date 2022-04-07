import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DmphannhommayChonmathangmodalComponent } from '../../dmphannhommay-chonmathangmodal/dmphannhommay-chonmathangmodal.component';

@Component({
  selector: 'app-dmphannhommaybanchephammodal',
  templateUrl: './dmphannhommaybanchephammodal.component.html',
  styleUrls: ['./dmphannhommaybanchephammodal.component.css']
})
export class DmphannhommaybanchephammodalComponent implements OnInit {
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
    listdmTieuChiBanChePham: [],
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
  listdmTieuChiBanChePham : any = [];

  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (validVariable(this.item.CongDoan)) {
      this.childModalOpt = this.mapCongDoan[this.item.CongDoan];
    }
    if (this.opt == 'edit') {
      this.GetListdmTieuChiChatLuongBanChePham(this.item.CongDoan);
      this.getBanChePham();
    }
    this.GetListPhanXuong();
    this.GetListCongDoan();
  }
  GetListdmTieuChiChatLuongBanChePham(CongDoan){
    this.sanXuatService.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(CongDoan).subscribe((res: any) => {
      this.listdmTieuChiBanChePham = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listdmTieuChiBanChePham.forEach(dmTieuChi => {
          let data: any = {Id: "",
                          IddmTieuChiBanChePham: dmTieuChi.value }
          this.newTableItem.listdmTieuChiBanChePham.push(data);
      });
      
    })
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
      let listdatapush = [];
      res.forEach(element => {
        element.listdmTieuChiBanChePham = [];
        if (this.childModalOpt === 'MATHANG') {
          element.Iditem = this.listLoaiSoiHoacMatHang.filter(obj => element.IddmItem === obj.value)[0]?.value;
        }
        if (this.childModalOpt === 'SOI') {
          element.Iditem = this.listLoaiSoiHoacMatHang.filter(obj => element.IddmLoaiSoi === obj.value)[0]?.value;
        }
        element.isXoa = false;
        this.listdmTieuChiBanChePham.forEach(dmTieuChi => {
          let data: any = {Id: "",
                          IddmTieuChiBanChePham: dmTieuChi.value }
          element.listdmTieuChiBanChePham.push(data);
        });
        listdatapush.push(element);
      });
      this.item.lstdmItem = this.item.lstdmItem.concat(listdatapush);
      this.item.lstdmItem.filter(obj => obj.isDelete = obj.isXoa);
    }).catch(er => console.log(er))
  }

  changeCongDoan(e) {
    this.item.lstdmItem = [];
    this.newTableItem = {
      Id: "",
      IddmPhanNhomMay: "",
      listdmTieuChiBanChePham: [],
    }
    this.childModalOpt = this.mapCongDoan[e.value];
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
    this.GetListdmTieuChiChatLuongBanChePham(e.value);
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
  
  changeLoaiSoiHoacMatHang(e, item) {
    if (this.childModalOpt === 'MATHANG') {
      item.IddmItem = e.value;
    }
    if (this.childModalOpt === 'SOI') {
      item.IddmLoaiSoi = e.value;
    }
  }

  add() {
    if (this.item.lstdmItem == undefined || this.item.lstdmItem == null)
      this.item.lstdmItem = [];
    this.newTableItem.Id = "";
    this.newTableItem.IddmPhanNhomMay = this.item.Id || "";
    this.item.lstdmItem.push(this.newTableItem);
    this.newTableItem = {
      Id: "",
      IddmPhanNhomMay: "",
      listdmTieuChiBanChePham: [],
    }
    this.listdmTieuChiBanChePham.forEach(dmTieuChi => {
      let data: any = {Id: "",
                      IddmTieuChiBanChePham: dmTieuChi.value }
      this.newTableItem.listdmTieuChiBanChePham.push(data);
  });
  }

  delete(index) {
    let item = this.item.lstdmItem.splice(index, 1)[0];
    if (item.Id === '' && item.Id === null && item.Id === undefined) {
    } else {
      item.isXoa = true;
      item.isDelete = true;
      this.item.lstdmItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  getBanChePham() {
    this.sanXuatService.dmPhanNhomMaySanXuat().GetdmPhanNhomMayBanChePham(this.item.Id).subscribe((res: any) => {
      this.item = res;
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
          this.item.lstdmItem.forEach(element => {
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
          this.GetDMMatHang();
          this.item.lstdmItem.forEach(element => {
            if (this.childModalOpt === 'MATHANG') {
              element.Iditem = listLoaiSoiHoacMatHang2.filter(objlistLoaiSoiHoacMatHang => element.IddmItem === objlistLoaiSoiHoacMatHang.value)[0]?.value;
            }
          });
        })
      }
    })
  }
}
