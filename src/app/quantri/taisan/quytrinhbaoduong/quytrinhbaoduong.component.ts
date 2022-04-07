import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalquytrinhbaoduongComponent } from '../modal/modalquytrinhbaoduong/modalquytrinhbaoduong.component';

@Component({
  selector: 'app-quytrinhbaoduong',
  templateUrl: './quytrinhbaoduong.component.html',
  styleUrls: ['./quytrinhbaoduong.component.css']
})
export class QuytrinhbaoduongComponent implements OnInit {
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
  eAction = "QUYTRINHBAODUONGTAISAN";
  listPhanXuong: any = [];
  listNam: any = [];

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) { }
  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .QuyTrinhBaoDuong()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.GetList();
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
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
      CurrentPage: this.paging.CurrentPage,
      PageSize: 20,
      Keyword: this.filter.Keyword,
      IdDuAn: 0,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      TabTrangThai:this.trangThai,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.TuNgay),
      IdUser: "",
      Loai: 0
    };
    this._serviceTaiSan.QuyTrinhBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.GetList();
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/quytrinhbaoduong/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(ModalquytrinhbaoduongComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = '';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', TenTrangThai: "", SoQuyTrinh: '',
      isKetThuc: false, listTaiSan: [], IdDuAn: 0,
      listVatTu: [], listChiPhiKhac: [], listNhanCong: [],
    };
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item) {
    console.log(item)
    let modalRef = this._modal.open(ModalquytrinhbaoduongComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật thu hồi tài sản'
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
