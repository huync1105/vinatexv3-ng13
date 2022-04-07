
import { vn } from 'src/app/services/const';
import { number } from "@amcharts/amcharts4/core";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";
import { QuyettoanhopdongmodalComponent } from './quyettoanhopdongmodal/quyettoanhopdongmodal.component';

@Component({
  selector: 'app-quyettoanhopdong',
  templateUrl: './quyettoanhopdong.component.html',
  styleUrls: ['./quyettoanhopdong.component.css']
})
export class QuyettoanhopdongComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  filter: any = {};
  lang: any = vn;
  eAction: any = "QUYETTOANHOPDONG";
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  tuNgay: number = 0;
  denNgay: number = 0;
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  //    this.paging.TotalItem = res.data.totalCount;
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };

  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
    private _serviceDungChung: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this.update(res.id);
      }
    });
    this.KiemTraTabTrangThai();
  }


  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll();
    }
    this.router.navigate(
      [`quantri/hopdongsanxuat/quyettoanhopdong/${id}`],
      { replaceUrl: true }
    );
  }
  add() {
    let modalRef = this._modal.open(QuyettoanhopdongmodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {
      id: "",
      listHoSoDinhKem: [],
      listFileDinhKem: []

    };
    modalRef.result
      .then((res: any) => {
        console.log(res);
        this._toastr.success("Cập nhật thành công");
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
      .catch((er) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      });
  }

  update(id) {
    this._service.QuyetToanHopDong().Get(id).subscribe((res1: any) => {
        let modalRef = this._modal.open(QuyettoanhopdongmodalComponent, {
          size: "fullscreen",
          backdrop: "static",
        });
        
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
        modalRef.result
          .then((res: any) => {
            this.GetListQuyTrinh();
            this.changeParam(0);
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
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
      // this.paginator.changePage(0);
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: this.trangThai,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
    };
    this._service
      .QuyetToanHopDong()
      .GetList(data)
      .subscribe((res: any) => {
        this.items = res.data.items;
        this.paging.TotalItem = res.data.totalCount;
      });
  }
  GetNextSoQuyTrinh() {
    this._service
      .QuyetToanHopDong()
      .GetNextSoQuyTrinh()
      .subscribe((res: any) => {
        console.log('GetNextSoQuyTrinh',res);
        this.items = res.data;
      });
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
}
