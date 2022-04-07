import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { ThongsochatluongmodalComponent } from '../thongsochatluongmodal/thongsochatluongmodal.component';

@Component({
  selector: 'app-thongsochatluong',
  templateUrl: './thongsochatluong.component.html',
  styleUrls: ['./thongsochatluong.component.css']
})
export class ThongsochatluongComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  eAction: any = "PHIEUNHAPLOBONG_CHATLUONG";
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Mã PO/Hợp đồng',
      field: 'SoHopDong',
      width: 'unset'
    },
    {
      header: 'Tên lô bông',
      field: 'TenLoBong',
      width: 'unset'
    },
    {
      header: 'Tên container',
      field: 'TenContainer',
      width: 'unset'
    },
    {
      header: 'Tổng số kiện',
      field: 'TongSoKien',
      width: 'unset'
    },
    {
      header: 'Trọng lượng bình quân(kg)',
      field: 'TrongLuong',
      width: 'unset',
      type: 'number'
    },
    {
      header: 'Tên trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },

  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listLoBong: any = [];
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, 
    private router: Router,public store:StoreService) {super(store)
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id);
      }
    })
    let data = {
      Loai: 1,
      CurrentPage : 0,
    }
    this._service.GetListLoBong(data).subscribe((res: any) => {
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
      this.KiemTraTabTrangThai();

  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/thongsochatluong/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(ThongsochatluongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);

    })
      .catch(er => {
        console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
  }
  update(Id) {
    let modalRef = this._modal.open(ThongsochatluongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
      .finally(() => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
    // })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
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
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IdLoBong: this.filter.IdLoBong,
    }
    this._service.PhieuNhapLoBong_ChatLuong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
     this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
        this.checkQuyen = res;
        this.GetListQuyTrinh();
      })
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
