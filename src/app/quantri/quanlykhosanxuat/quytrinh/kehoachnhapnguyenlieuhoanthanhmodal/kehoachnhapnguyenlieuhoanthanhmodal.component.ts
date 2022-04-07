import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kehoachnhapnguyenlieuhoanthanhmodal',
  templateUrl: './kehoachnhapnguyenlieuhoanthanhmodal.component.html',
  styleUrls: ['./kehoachnhapnguyenlieuhoanthanhmodal.component.css']
})
export class KehoachnhapnguyenlieuhoanthanhmodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "Id": "",
    "idKeHoachNhapNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  checkedAll: boolean = false;
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.GetListdmLoaiBong();
    this.GetListdmCapBong();
    
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);
          obj.ThoiGianCapCang = UnixToDate(obj.ThoiGianCapCangUnix);
          obj.listDacTinh = mapArrayForDropDown(obj.listDacTinh, 'DacTinh', 'Id');
        });
      }

    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListKho();
  }
 
  GetListdmLoaiBong() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: '',
      Loai: 2
    }
    this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
      let data: any = mapArrayForDropDown(res, "Ten", 'Id');
      this.listLoaiBong = this.listLoaiBong.concat(data);
    })
    let data1 = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: '',
      Loai: 5
    }
    this._services.GetListdmLoaiBong(data1).subscribe((res: any) => {
      let data: any = mapArrayForDropDown(res, "Ten", 'Id');
      this.listLoaiBong = this.listLoaiBong.concat(data);
    })
  }
  GetListdmCapBong() {
    this._services.GetListOptdmCapBong().subscribe((res: any) => {
      this.listCapBong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  GhiLai() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn các mặt hàng này đã hoàn thành?"
    modalRef.result.then(res => {
      this._services.NhapKeHoachNguyenLieu().HoanThanh(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
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
        obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }
  
  Onclose() {
    this.activeModal.close();
  }
 
  getDacTinhBong(item) {
    if (item.IddmCapBong !== undefined && item.IddmLoaiBong !== undefined) {
      this._services.dmDacTinhBong().GetDacTinh(item.IddmLoaiBong, item.IddmCapBong).subscribe((res: any) => {
        item.listDacTinh = mapArrayForDropDown(res, 'DacTinh', 'Id');
      })
    }
  }
  checkAll(e) {
    if (e.checked) {
      this.item.listItem.forEach(item => {
        item.isDaHoanThanh = true;
      });
    } else {
      this.item.listItem.forEach(item => {
        item.isDaHoanThanh = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.item.listItem.every(ele => ele.checked)
  }
}
