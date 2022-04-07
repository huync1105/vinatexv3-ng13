import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { GiaokehoachsanxuatmodalComponent } from './giaokehoachsanxuatmodal/giaokehoachsanxuatmodal.component';


@Component({
  selector: 'app-giaokehoachsanxuat',
  templateUrl: './giaokehoachsanxuat.component.html',
  styleUrls: ['./giaokehoachsanxuat.component.css']
})

export class GiaokehoachsanxuatComponent extends StoreBase implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  eAction = 'HOPDONGGIAOKEHOACHSANXUAT';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tổng sản lượng(Tấn)',
      field: 'tongKhoiLuong',
      width: '80px'
    },
    {
      header: 'Tổng số ca',
      field: 'tongSoCa',
      width: '80px'
    },
    {
      header: 'Trạng thái',
      field: 'tenTrangThai',
      width: '80px'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService,private _HopDongService: HopDongService,) {super(store)
  }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id)
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    this.router.navigate([`quantri/hopdongsanxuat/giaokehoachsanxuat/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(GiaokehoachsanxuatmodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: '',
      listItem: []
    }
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0)
    })
      .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
  }
  update(Id) {
    this._HopDongService.GiaoKeHoachSanXuat().Get(Id).subscribe((item: any) => {
      this._service.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
        this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
        if (!validVariable(item.listItem)) {
          item.listItem = [];
        }
          item.listItem.filter(objlistItem => {
            objlistItem.listQuyCachDongGoi.filter(async objlistItem2 => {
              objlistItem2.objQuyCachDongGoi = await this.listQuyCachDongGoi.filter(obj => objlistItem2.iddmQuyCachDongGoi == obj.value)[0];
            });          
          });
          let modalRef = this._modal.open(GiaokehoachsanxuatmodalComponent, {
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
      })  
    },(err)=>{
      if(err.status ===500){
        this._toastr.error('Hệ thống không tìm thấy dữ liệu bạn cần!')
      }
      console.log(err);
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
  GetListQuyTrinh(reset?, isXuatExcel?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.CurrentPage,
      tabTrangThai: this.trangThai,
      keyWord: this.filter.KeyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
    }
    if(isXuatExcel === true){
      this._HopDongService.GiaoKeHoachSanXuat().XuatExcel(data).subscribe((res: any) => {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message);
        } else {
          this._toastr.error(res.message);
        }
      });
    }
    else{
    this._HopDongService.GiaoKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.items = res.data.items;
      this.paging.TotalItem = res.data?.totalCount;
      this.paging.TotalPage = res.data?.totalPages;
      this.items.forEach(element => {
        element.ngayBatDau = UnixToDate(element.ngayBatDauUnix);
        element.ngayKetThuc = UnixToDate(element.ngayKetThucUnix);
      });
    })
  }
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
}
