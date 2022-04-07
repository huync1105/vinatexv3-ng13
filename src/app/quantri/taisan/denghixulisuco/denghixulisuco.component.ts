import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModaldenghixulisucoComponent } from '../modaldenghixulisuco/modaldenghixulisuco.component';

@Component({
  selector: 'app-denghixulisuco',
  templateUrl: './denghixulisuco.component.html',
  styleUrls: ['./denghixulisuco.component.css']
})
export class DenghixulisucoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "BAOCAOSUCOSUACHUA";
  listPhanXuong: any = [];

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.GetListdmPhanXuong();
    this.GetList();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .QuyTrinhXuLySuCo()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/denghixulisuco/${id}`], {
      replaceUrl: true,
    });
  }
  resetFilter() {
    this.Keyword = '';
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      TabTrangThai: this.trangThai, Loai: 0, IdDuAn: 0, IdUser: '', IdBoPhanSuDung: this.filter.IdBoPhanSuDung,

    };
    this._serviceTaiSan.QuyTrinhXuLySuCo().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add() {
    let modalRef = this._modal.open(ModaldenghixulisucoComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Đề nghị xử lý sự cố';
    modalRef.componentInstance.listPhanXuong = this.listPhanXuong;
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', TenTrangThai: "", SoQuyTrinh: '',
      isKetThuc: false, listTaiSan: [], IdDuAn: 0,
      listVatTu: [], listChiPhiKhac: [], listNhanCong: [],
    };
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      })
  }
  update(item) {
    let modalRef = this._modal.open(ModaldenghixulisucoComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật nghị xử lý sự cố';
    modalRef.componentInstance.listPhanXuong = this.listPhanXuong;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then(data => {
      })
      .catch(er => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }

  //xử lí tab 
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }
}
