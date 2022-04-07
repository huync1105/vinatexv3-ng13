import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhohoiammodal',
  templateUrl: './xuatkhohoiammodal.component.html',
  styleUrls: ['./xuatkhohoiammodal.component.css']
})
export class XuatkhohoiammodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  listLoaiBong: any = [];
  listKhoHoiAm: any = [];
  listKhoThanhPham: any = [];
  listdmQuyCachDongGoi: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay =UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;

    this.getListKho();
    this.getListdmQuyCachDongGoi();
  }
 

  getListKho() {
    this.data.Loai = 10;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoHoiAm = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.data.Loai = 11;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoThanhPham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  Onclose() {
    this.activeModal.close();
  }
  
}
