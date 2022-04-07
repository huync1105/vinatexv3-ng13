import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { NhapkhokhacmodalComponent } from '../nhapkhokhacmodal/nhapkhokhacmodal.component';

@Component({
  selector: 'app-nhapkhokhac',
  templateUrl: './nhapkhokhac.component.html',
  styleUrls: ['./nhapkhokhac.component.css']
})
export class NhapkhokhacComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPBONGHOI";
  listKho:any=[];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  title: any = "";
  type: any = "";
  nametype: any = "";
  constructor(public _modal: NgbModal, public _toastr: ToastrService,
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {
      super(store)
  }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      this.title = res.kho;
      console.log(res.id)
      if (res.id !== '0') {
        this.update(res.id);
      }
      this.getListKho();
      // else
      //
      this.type = 'bonghoi';
      this.nametype = 'bông hồi';

    })
      this.KiemTraTabTrangThai();
  }

  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuatbongkhac/khobonghoi/nhapkho/${id}`], { replaceUrl: true })
  }

  getListKho() {
    this._service.GetListdmKho({Loai:6}).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      this.GetListQuyTrinh();
    })
  }
  addPhieu() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhokhacmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';

    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.nametype = this.nametype;

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
    this._service.QuyTrinhPhieuNhapLoBong().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapkhokhacmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.componentInstance.type = this.type;
      modalRef.componentInstance.nametype = this.nametype;
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => {
          console.log(er)
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
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      IddmKho:validVariable(this.filter.IddmKho)?this.filter.IddmKho:'',
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      Loai: 6,
    }
    if (this.title === 'khobonghoi') {
      data.Loai = 6;
    }
    else if (this.title === 'khobongphe') {
      data.Loai = 7;
    }

    this._service.QuyTrinhPhieuNhapLoBong().GetList(data).subscribe((res: any) => {
      this.items = res.items.map(ele=>{
        return {
          ...ele,
          KhoNhap: this.listKho.find(alo=>alo.value === ele.IddmKho)?.label
        }
      });
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
