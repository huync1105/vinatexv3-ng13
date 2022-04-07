import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhsachhopdongsoimodalComponent } from './danhsachhopdongsoimodal/danhsachhopdongsoimodal.component';

@Component({
  selector: 'app-danhsachhopdongsoi',
  templateUrl: './danhsachhopdongsoi.component.html',
  styleUrls: ['./danhsachhopdongsoi.component.css']
})
export class DanhsachhopdongsoiComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  listVatTu: any = {};
  newTableItem: any = {};
  filter: any = {};
  tuNgay: number = 0;
  title:string
  denNgay: number = 0;
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };
  hopDong: any = {};

  
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];
  loaiTab : any = 0;
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this.update(res.id);
      }
    });
    this.GetListQuyTrinh();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll();
    }
    this.router.navigate(
      [`quantri/hopdongsanxuat/danhsachhopdongsoi/${id}`],
      { replaceUrl: true }
    );
  }
  update(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
        let modalRef = this._modal.open(DanhsachhopdongsoimodalComponent, {
          size: "fullscreen",
          backdrop: "static",
        });
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.Id = id;
        modalRef.componentInstance.item = JSON.parse(
          JSON.stringify(res1.data)
        );
        modalRef.result
          .then((res: any) => {
            this.GetListQuyTrinh();
            this.changeParam(0);
            this.listVatTu[0]
          })
          .catch((er) => {
            console.log(er);
            this.GetListQuyTrinh();
            
            this.changeParam(0);
          });
      });
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: 2,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
      Loai:11
    };
    if(this.loaiTab == 0){
      this._service.QuyTrinhHopDong().GetList(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 1){
      this._service.QuyTrinhHopDong().GetListHopDongSapHetHanBanGiao(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 2){
      this._service.QuyTrinhHopDong().GetListHopDongSapHetHanBaoLanh(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 3){
      this._service.QuyTrinhHopDong().GetListHopDongSapDenHanTT(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 4){
      this._service.QuyTrinhHopDong().GetListHopDongQuaHanBanGiao(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 5){
      this._service.QuyTrinhHopDong().GetListHopDongQuaHanBaoLanh(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 6){
      this._service.QuyTrinhHopDong().GetListHopDongQuaHanTT(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
}
