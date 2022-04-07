import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ChitietkehoachnhapbongComponent } from '../../modal/share/chitietkehoachnhapbong/chitietkehoachnhapbong.component';

@Component({
  selector: 'app-kehoachnhapbong',
  templateUrl: './kehoachnhapbong.component.html',
  styleUrls: ['./kehoachnhapbong.component.css']
})
export class KehoachnhapbongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "HOPDONGKEHOACHNHAPBONG";
  userInfo: any;

  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.userInfo = this._auth.currentUserValue;
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0' && res.id !== undefined) {
        this.update(res.id);
      }
    })

    this.KiemTraTabTrangThai();   
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/hopdongsanxuat/kehoachnhapbong/${id}`], { replaceUrl: true });
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(ChitietkehoachnhapbongComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
        this.changeParam(0);
    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0); })
  }
  update(id) {
    this._service.KeHoachNhapBong().Get(id).subscribe((res1: any) => {
    let modalRef = this._modal.open(ChitietkehoachnhapbongComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = res1.data;
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0); })
      .finally(()=>{
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
    })
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
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: this.trangThai,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
      idUser: this.userInfo.Id,
      Loai: 0
    }
    this._service.KeHoachNhapBong().GetList(data).subscribe((res: any) => {    
      this.items = res.data?.items;
      this.paging.TotalItem = res.data?.totalCount;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }

}
