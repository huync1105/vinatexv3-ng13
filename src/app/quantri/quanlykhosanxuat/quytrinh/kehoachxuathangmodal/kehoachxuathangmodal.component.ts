import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { ChonquycachdonggoimodalComponent } from '../../modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-kehoachxuathangmodal',
  templateUrl: './kehoachxuathangmodal.component.html',
  styleUrls: ['./kehoachxuathangmodal.component.css']
})
export class KehoachxuathangmodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  canDieuChinh:boolean = false;
  newTableItem: any = {
    "Id": "",
    "idKeHoachXuatNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKhachHang: any = [];
  listloaisoi: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listQuyCachDongGoi: any = [];
  listdmPhanXuong: any = []
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService,private _auth:AuthenticationService) {
  }

  ngOnInit(): void {
    this.GetListdmLoaiSoi();
    this.GetQuyCachDongGoi();
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          if (obj.ThoiGianDuKienUnix !== null && obj.ThoiGianDuKienUnix !== undefined)
            obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);
        });
      }
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListKhachHang();
    this.getListdmPhanXuong();
  }
  getListdmPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res:any) => {
      this.checkbutton = res;
        if(!res.Ghi && this.item.CreatedBy===this._auth.currentUserValue.Id){
          this.canDieuChinh = true;
        }else{
          this.canDieuChinh =false;
        }
    })
  }
  GetQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
      if (validVariable(this.item.listItem) && this.item.listItem.length !== 0) {
        this.item.listItem.forEach(item => {
          if (validVariable(item.listItem) && item.listItem.length !== 0) {
            item.listItem.forEach(quycach => {
              quycach.label = res.find(ele => ele.Id === quycach.IddmQuyCachDongGoi).Ten;
            });
          }
        });
      }
    })
  }
  GetListdmLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  ChuyenTiep() {
    var isCheck: any = false;
    this.item.listItem.filter(obj => {
      if (obj.ThoiGianDuKien == undefined || obj.ThoiGianDuKien === null) {
        isCheck = true;
      }
    })
    if (isCheck) {
      this.toastr.error("Bạn chưa chọn thời gian dự kiến");
    }
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày");
    }
    else if (!isCheck) {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = DateToUnix(obj.ThoiGianDuKien);
        });
      }
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.KeHoachXuatHang().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày");
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = validVariable(obj.ThoiGianDuKien) ? DateToUnix(obj.ThoiGianDuKien) : 0;
        });
      }
      this.item.NgayUnix = validVariable(this.item.Ngay) ? DateToUnix(this.item.Ngay) : 0;

      this._services.KeHoachXuatHang().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.KeHoachXuatHang().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    var isCheck: any = false;
    this.item.listItem.filter(obj => {
      if (obj.ThoiGianDuKien == undefined || obj.ThoiGianDuKien === null) {
        isCheck = true;
      }
    })
    if (isCheck) {
      this.toastr.error("Bạn chưa chọn thời gian dự kiến");
    }
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày");
    }
    else if (!isCheck) {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = validVariable(obj.ThoiGianDuKien) ? DateToUnix(obj.ThoiGianDuKien) : 0;
        });
      }
      this.item.NgayUnix = validVariable(this.item.Ngay) ? DateToUnix(this.item.Ngay) : 0;

      this._services.KeHoachXuatHang().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.listItem.filter(obj => {
              obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
            });
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
      this._services.KeHoachXuatHang().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKhachHang() {
    this._services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    let cols: any = [
      {
        header: 'Tên',
        field: 'Ten',
        width: 'unset'
      },
    ];
    this._services.GetListdmItem(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.loai = 'dmMatHang';
      modalRef.componentInstance.cols = cols;
      modalRef.componentInstance.listMatHang = res1;
      modalRef.result.then((data) => {
        let listdatapush = [];
        data.data.forEach(element => {
          let datapush = {
            Ten: element.Ten,
            IddmItem: element.Id,
          };
          listdatapush.push(datapush);
        });
        this.item.listItem = this.item.listItem.concat(listdatapush);
      }, (reason) => {
        // không
      });
    })
  }
  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(ChonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listItem || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      // merge(res, this.item.listItem, 'IddmQuyCachDongGoi');
      res.listItem.forEach(item => {
        item.label = item.objQuyCachDongGoi.label;
      });
      item.listItem = res.listItem;
      // if (item.KhoiLuongKeHoach != undefined && item.KhoiLuongKeHoach != null && item.KhoiLuongKeHoach > 0
      //   && item.listItem != undefined && item.listItem.length > 0) {
      //   let tong = 0;
      //   item.listItem.filter(obj => {
      //     if(!obj.isXoa){
      //       tong += obj.KhoiLuong;
      //     }          
      //   });
      //   if (item.KhoiLuongKeHoach < tong) {
      //     this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      //   }
      // }
    }).catch(er => {
      console.log(er);
    })
  }

  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
      console.log(res)
      console.log(item[opt]);
    })
  }
  exportExcel(){
    if(validVariable(this.item.Id)){
      this._services.KeHoachXuatHang().ExportThongBaoXuatHang(this.item.Id).subscribe((res: any) => {
        this._services.download(res.TenFile);
      })
    }else{
      this.toastr.error('Vui lòng ghi lại sau đó xuất Excel!')
    }
  }
}
