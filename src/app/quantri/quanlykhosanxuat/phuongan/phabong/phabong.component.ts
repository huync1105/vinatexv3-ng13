import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix } from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";
import { StoreBase } from "src/app/services/storebase.class";
import { PhabongmodalComponent } from "../phabongmodal/phabongmodal.component";

@Component({
  selector: "app-phabong",
  templateUrl: "./phabong.component.html",
  styleUrls: ["./phabong.component.css"],
})
export class PhabongComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild("paginator") paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: "PKK_0000_0000" }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: "Trạng thái",
      field: "TenTrangThai",
      width: "unset",
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  eAction = "PHUONGANPHABONG";
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,public store:StoreService
  ) {super(store)}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._service
          .PhuongAnPhaBong()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh();
  }
  changeParam(id) {
    this.router.navigate([`quantri/trienkhaisanxuat/phabong/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(PhabongmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {
      Id: "",
    };
    modalRef.componentInstance.checkbutton = {
      Ghi: true,
      Xoa: true,
      KhongDuyet: true,
      ChuyenTiep: true,
    };
    modalRef.result
      .then((res: any) => {
        this._toastr.success("Cập nhật thành công");
      })
      .finally(()=>{
        this.GetListQuyTrinh();
        this.changeParam(0);
      });
  }
  update(item) {
    let modalRef = this._modal.open(PhabongmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .finally(()=>{
        this.GetListQuyTrinh();
        this.changeParam(0);
      });
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
    };
    this._service
      .PhuongAnPhaBong()
      .GetList(data)
      .subscribe((res: any) => {
        res.items.forEach((trienkhai) => {
          trienkhai.KhoiLuongBong = trienkhai.KhoiLuongBong / 1000;
        });
        this.items = res.items;
        this.paging = res.paging;
      });
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    });
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
