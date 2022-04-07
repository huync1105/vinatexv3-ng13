import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, DateToUnix, validVariable, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { Dongvanpx1Component } from '../layoutmodals/dongvanpx1/dongvanpx1.component';
import { Dongvanpx2Component } from '../layoutmodals/dongvanpx2/dongvanpx2.component';
import { HoaxaComponent } from '../layoutmodals/hoaxa/hoaxa.component';
import { Phuhung1Component } from '../layoutmodals/phuhung1/phuhung1.component';
import { Phuhung2Component } from '../layoutmodals/phuhung2/phuhung2.component';


@Component({
  selector: 'app-xepbanbong',
  templateUrl: './xepbanbong.component.html',
  styleUrls: ['./xepbanbong.component.css']
})
export class XepbanbongComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Kế hoạch giao(Tấn)',
    //   field: '',
    //   width: 'unset'
    // },
    // {
    //   header: 'Kế hoạch thực hiện',
    //   field: 'NoiDung',
    //   width: 'unset'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  defineComponent: any = {
    '53': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Dongvanpx1Component,
      '1cf3f340_0f55_4f34_938p_e629318e25et': Dongvanpx2Component
    },
    '55': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': HoaxaComponent,
    },
    '56':{
      '1cf3f340_0f55_4f34_938p_e629318e25et': HoaxaComponent
    },
    '57':{
      '1cf3f340_0f55_4f34_938p_e329318e25et': Phuhung1Component,
      '1cf3f340_0f55_4f34_938p_e629318e25et': Phuhung2Component
    }
  }
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listdmPhanXuong: any = [];
  constructor(public _modal: NgbModal,public store:StoreService, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router, private _store: StoreService) {super(store) }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this._service.XepBanBong().Get(res.id).subscribe((res: any) => {
          this.update(res);
        })
      }
    })
    this._service.GetListdmPhanXuong({}).subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listdmPhanXuong[0].value;
      this.KiemTraTabTrangThai();
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/trienkhaisanxuat/xepbanbong/${id}`], { replaceUrl: true })
  }
  update(item) {
    let component = this.defineComponent[`${this._store.getCurrent()}`][item.IddmPhanXuong.split('-').join('_')];
    item.PhuongAnPhaBong = undefined;
    if (!validVariable(item.ViTriNgoaiQuan)) {
      item.ViTriNgoaiQuan = ''
    }
    let modalRef = this._modal.open(component, {
      size: 'fullscreen-100',
      backdrop: 'static',
      keyboard: false
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = deepCopy(item);
    modalRef.componentInstance.SoViTriNgoaiQuan = item.SoViTriNgoaiQuan;
    modalRef.componentInstance.ViTriNgoaiQuan = item.ViTriNgoaiQuan;
    // modalRef.componentInstance.ghostItem = deepCopy(item);
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
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
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IddmPhanXuong: this.filter.IddmPhanXuong || "",
    }
    this._service.XepBanBong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai('PHUONGANXEPBANBONG').subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
