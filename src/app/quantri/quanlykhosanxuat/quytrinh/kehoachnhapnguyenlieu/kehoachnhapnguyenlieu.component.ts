import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { KehoachnhapnguyenlieuhoanthanhmodalComponent } from '../kehoachnhapnguyenlieuhoanthanhmodal/kehoachnhapnguyenlieuhoanthanhmodal.component';
import { KehoachnhapnguyenlieumodalComponent } from '../kehoachnhapnguyenlieumodal/kehoachnhapnguyenlieumodal.component';

@Component({
  selector: 'app-kehoachnhapnguyenlieu',
  templateUrl: './kehoachnhapnguyenlieu.component.html',
  styleUrls: ['./kehoachnhapnguyenlieu.component.css']
})
export class KehoachnhapnguyenlieuComponent extends StoreBase implements OnInit,OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Nội dung',
    //   field: 'NoiDung',
    //   width: 'unset',
    //   align:'center' //'text-center': col.align==='center'
    // },
    // {
    //   header: 'Khối lượng nhập (Tấn)',
    //   field: 'TongKhoiLuongNhap',
    //   width: 'unset'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '100px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  eAction: any = "KEHOACHNHAPNGUYENLIEU";

  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {super(store) }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0' && res.id!==undefined){
        this.update(res.id);
      }
    })

    this.getListKho();
    this.KiemTraTabTrangThai();
    // this.GetListQuyTrinh()
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieu/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachnhapnguyenlieumodalComponent, {
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
  update(Id) {
    this.changeParam(Id);
    this._service.NhapKeHoachNguyenLieu().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(KehoachnhapnguyenlieumodalComponent, {
        size: 'fullscreen-100',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
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

  getListKho() {
    let data = {
      CurrentPage: 0
    }
    this._service.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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
    }
    this._service.NhapKeHoachNguyenLieu().GetList(data).subscribe((res: any) => {
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
  hoanthanh(Id) {
    this._service.NhapKeHoachNguyenLieu().Get(Id).subscribe((item: any) => {
        console.log(item)
        if (item.listItem != undefined && item.listItem != null) {
          let modalRef = this._modal.open(KehoachnhapnguyenlieuhoanthanhmodalComponent, {
            size: 'fullscreen-100',
            backdrop: 'static'
          })
          modalRef.componentInstance.opt = 'edit';
          modalRef.componentInstance.item = item;
          
          modalRef.result.then((res: any) => {
            console.log(res);
            this._toastr.success('Cập nhật thành công');
            this.GetListQuyTrinh();
            this.changeParam(0)
          })
            .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
        }
      }) 
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
