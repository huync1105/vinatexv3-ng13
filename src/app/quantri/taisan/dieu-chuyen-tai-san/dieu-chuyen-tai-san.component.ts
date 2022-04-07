import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DieuChuyenTaiSanModalComponent } from './dieu-chuyen-tai-san-modal/dieu-chuyen-tai-san-modal.component';

@Component({
  selector: 'app-dieu-chuyen-tai-san',
  templateUrl: './dieu-chuyen-tai-san.component.html',
  styleUrls: ['./dieu-chuyen-tai-san.component.css']
})
export class DieuChuyenTaiSanComponent implements OnInit {

  filter: any = {};
  eAction: any = "QUYTRINHDIEUCHUYENTAISAN";
  loaiTab: any = 0;
  paging: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: any = [];
  trangThai: any = 1;
  idUser: string = '';
  listdmPhanXuong: any = [];
  IdDuAn: any;

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private _serviceAuth: AuthenticationService,
    private store: StoreService,
  ) {
    this.idUser = this._serviceAuth.currentUserValue.Id;
    this.IdDuAn = this.store.getCurrent();
  }

  ngOnInit(): void {
    this.resetFilter();
    this.getListdmPhanXuong();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .DieuChuyenTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.edit(res);
          });
      }
    });
  }

  changeParam(id) {
    this.router.navigate([`/quantri/taisan/dieuchuyentaisan/${id}`], {
      replaceUrl: true,
    })
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }

  getListdmPhanXuong() {
    this._serviceDungChung.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.currentPage,
      TabTrangThai: this.trangThai,
      KeyWord: this.filter.keyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdUser: this.idUser,
      IdBoPhanSuDung: this.filter.idBoPhan,
    };
    this._serviceTaiSan.DieuChuyenTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.totalCount = res.Data.TotalCount;
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  add() {
    let modalRef = this._modal.open(DieuChuyenTaiSanModalComponent, {
      size: "fullscreen",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.tabTrangThai = 0;
    modalRef.componentInstance.item.IdDuAn = this.IdDuAn;
    modalRef.componentInstance.item = {
      IdTrangThai: "",
      TenTrangThai: "",
      SoQuyTrinh: "",
      IdDuAn: this.store.getCurrent(),
      IdBoPhanSuDungChuyen: "",
      IdBoPhanSuDungDen: "",
      NoiDung: "",
      isKetThuc: true,
      NgayDieuChuyen: new Date(),
      NgayDieuChuyenUnix: 0,
      GhiChu: "",
      listTaiSan: [],
      listFileDinhKem: []
    }
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => { })
      .finally(() => {
        this.Loaddata(true);
        this.changeParam(0);
      });
  }

  edit(item) {
    let modalRef = this._modal.open(DieuChuyenTaiSanModalComponent, {
      size: "fullscreen",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.tabTrangThai = this.trangThai;
    modalRef.componentInstance.item.idDuAn = 
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {
      })
      .finally(()=>{
        this.Loaddata(true);
        this.changeParam(0);
      });
  }  

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }
}
