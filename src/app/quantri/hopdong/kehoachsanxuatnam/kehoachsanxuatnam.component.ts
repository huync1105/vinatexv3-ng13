import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { KehoachsanxuatnammodalComponent } from './modal/kehoachsanxuatnammodal/kehoachsanxuatnammodal.component';

@Component({
  selector: 'app-kehoachsanxuatnam',
  templateUrl: './kehoachsanxuatnam.component.html',
  styleUrls: ['./kehoachsanxuatnam.component.css']
})
export class KehoachsanxuatnamComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  listNhaMay: Array<any> = [];
  idDuAn: string = "";
  userBtn: any;
  userInfo: any;
  userSub: any;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "QUYTRINHKEHOACHSANXUATNAM";

  constructor(private _modal: NgbModal, private _danhMucHopDong: DanhMucHopDongService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private _auth: AuthenticationService) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._danhMucHopDong
          .KeHoachSanXuatNam()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.GetList();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    this.router.navigate([`quantri/hopdongsanxuat/danhmuc/kehoachsanxuatnam/${id}`], {
      replaceUrl: true,
    });
  }
  resetFilter() {
    this.keyWord = '';
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.Page = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      sFilter: this.keyWord,
      TabTrangThai: this.trangThai

    };
    this._danhMucHopDong.KeHoachSanXuatNam().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {
    let modalRef = this._modal.open(KehoachsanxuatnammodalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard:true
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới kế hoạch sản xuất';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', SoQuyTrinh: ""
    };
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  update(item) {
    let modalRef = this._modal.open(KehoachsanxuatnammodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật kế hoạch sản xuất';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
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
    this.paging.Page = event.page + 1;
    this.GetList()
  }
}
