

import { number } from "@amcharts/amcharts4/core";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
  DateToUnix,
  UnixToDate,
} from "src/app/services/globalfunction";
import { ModallaphopdongsoiComponent } from "./modallaphopdongsoi/modallaphopdongsoi.component";

@Component({
  selector: 'app-laphopdongsoi',
  templateUrl: './laphopdongsoi.component.html',
  styleUrls: ['./laphopdongsoi.component.css']
})
export class LaphopdongsoiComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  listVatTu: any = {};
  newTableItem: any = {};
  filter: any = {};
  eAction: any = "QUYTRINHHOPDONG";
  tuNgay: number = 0;
  title:string
  denNgay: number = 0;
  trangThai: any = 1;
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };
  hopDong: any = {};

  
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
    private _serviceDungChung: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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
      [`quantri/hopdongsanxuat/laphopdongsoi/${id}`], { replaceUrl: true });
  }
  add() {
   
    let modalRef = this._modal.open(ModallaphopdongsoiComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    
    modalRef.componentInstance.item = {
      listDieuKhoanThanhToan: [],
      listBaoLanh: [],
      listTaiLieu: [],
      lstFileUploadCu: [],
    };
    modalRef.componentInstance.item.hopDong = {
      isLayTheoGiaTriHangHoa: true,
      id: "",
      loai: 11
    };
    modalRef.componentInstance.item.listHangHoa = []
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
  addPhuLuc() {
   
    let modalRef = this._modal.open(ModallaphopdongsoiComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    
    modalRef.componentInstance.item = {
      listDieuKhoanThanhToan: [],
      listBaoLanh: [],
      listTaiLieu: [],
      lstFileUploadCu: [],
    };
    modalRef.componentInstance.item.hopDong = {id: "",
    isLayTheoGiaTriHangHoa: true,
    isPhuLuc: true,
    loai: 11
  };
    modalRef.componentInstance.item.listHangHoa = [{}
    ]
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
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
        let modalRef = this._modal.open(ModallaphopdongsoiComponent, {
          size: "fullscreen",
          backdrop: "static",
        });
        modalRef.componentInstance.opt = "edit";
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
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?, isXuatExcel?) {
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
      loai: 11,
    };
    if(isXuatExcel === true){
      this._service.QuyTrinhHopDong().XuatExcel(data).subscribe((res: any) => {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message);
        } else {
          this._toastr.error(res.message);
        }
      });
    }
    else{
      this._service.QuyTrinhHopDong().GetListSoi(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.paging.TotalPage = res.data?.totalPages;
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
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
}
