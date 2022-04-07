import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { LobongmodalComponent } from '../lobongmodal/lobongmodal.component';
import { LoxomodalComponent } from '../loxomodal/loxomodal.component';

@Component({
  selector: 'app-lobong',
  templateUrl: './lobong.component.html',
  styleUrls: ['./lobong.component.css']
})
export class LobongComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '150px'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px'
    },
    {
      header: 'Hợp đồng',
      field: 'SoHopDong',
      width: '150px'
    },
    {
      header: 'Mã Invoice',
      field: 'MaInvoice',
      width: '150px'
    },
    {
      header: 'Ngày',
      field: 'Ngay',
      width: '150px',
      type: 'date'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listdmLoaiBong: any = [];
  listisDaDuyet: any = [
    // {
    //   value: 2,
    //   label: 'Tất cả'
    // },
    {
      value: 0,
      label: 'Kế hoạch'
    },
    {
      value: 1,
      label: 'Đã về'
    }
  ];
  listLoaiBongXo: any = [
    {
      value: 2,
      label: 'Lô bông'
    },
    {
      value: 5,
      label: 'Lô xơ'
    }
  ];

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService,
    private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {super(store) }

  ngOnInit(): void {
    this.filter.isDaDuyet = this.listisDaDuyet[0].value;
    this.filter.Loai = this.listLoaiBongXo[0].value;
    this.GetListQuyTrinh();
    this.GetListdmLoaiBong();
  }
  update(item) {
    if(this.filter.Loai === 2){
      let modalRef = this._modal.open(LobongmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
      }).catch(er=>{})
    }
    else if(this.filter.Loai === 5){
      let modalRef = this._modal.open(LoxomodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
      }).catch(er=>{})
    }
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      isDaDuyet: this.filter.isDaDuyet,
      IddmLoaiBong: this.filter.IddmLoaiBong,
      Loai: this.filter.Loai
    }
    this._service.GetListLoBong(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  GetListdmLoaiBong() {
    let data = {
      CurrentPage: 0,
    }
    this._service.GetListdmLoaiBongOnly(data).subscribe((res: any) => {
      this.listdmLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
