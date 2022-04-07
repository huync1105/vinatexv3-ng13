import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, mapArrayForDropDown } from "src/app/services/globalfunction";
import { KiemkekhomodalComponent } from "../kiemkekhomodal/kiemkekhomodal.component";
import { StoreBase } from 'src/app/services/storebase.class';
import { StoreService } from "src/app/services/store.service";

@Component({
    selector: "app-kiemkekho",
    templateUrl: "./kiemkekho.component.html",
    styleUrls: ["./kiemkekho.component.css"],
})
export class KiemkekhoComponent extends StoreBase implements OnInit,OnDestroy {
    @ViewChild("paginator") paginator: any;
    items: any = [{ id: 5, SoQuyTrinh: "PKK_0000_0000" }];
    filter: any = {};
    listLoaiPhuongAn: any = [];
    trangThai: any = 1;
    paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
    cols: any = [
        {
            header: "Tên kho",
            field: "TendmKho",
            width: "200px",
        },
        {
            header: "Tên lô hàng",
            field: "TenLoHang",
            width: "200px",
        },
        {
            header: "Nội dung",
            field: "NoiDung",
            width: "200px",
        },
        {
            header: "Ghi chú",
            field: "GhiChu",
            width: "200px",
        },
        {
            header: "Trạng thái",
            field: "TenTrangThai",
            width: "150px",
        },
    ];
    checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
    title: any = "";
    listdmKho: any = [];
    listLoHang: any = []
    eAction = 'KIEMKEKHOTHANHPHAM';
    constructor(
        public _modal: NgbModal,
        public _toastr: ToastrService,
        private _service: SanXuatService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public store:StoreService
    ) {super(store) }

    ngOnInit(): void {
        this.getListdmKho();
        this.getListLoHang();

        console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe((res: any) => {
            this.title = 'khothanhpham';
            if (res.id !== "0") {
                this.update(res.id);
            }
        });
        this.GetListQuyTrinh();
        this.KiemTraTabTrangThai();
    }
    getListdmKho() {
        let data = {
          CurrentPage : 0,
          Loai : 11,
        }
        this._service.GetListdmKho(data).subscribe((res: any) => {
          this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
        })
      }
      getListLoHang() {
        let data = {
          CurrentPage : 0
        }
        this._service.LoHang().GetList(data).subscribe((res: any) => {
          this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
        })
      }
    changeParam(id) {
        if (this._modal.hasOpenModals()) {
            this._modal.dismissAll();
        }
        this.router.navigate(
            [`quantri/quanlykhosanxuat/khothanhpham/kiemkekho/${id}`],
            { replaceUrl: true }
        );
    }
    add() {
        this.changeParam(0);
        let modalRef = this._modal.open(KiemkekhomodalComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "add";
        modalRef.componentInstance.title = this.title;
        modalRef.componentInstance.item = {};
        modalRef.componentInstance.isKhoThanhPham = (this.title === 'khothanhpham');
        modalRef.result
            .then((res: any) => {
                this.GetListQuyTrinh();
                this.changeParam(0);
            })
            .catch((er) => {
                this.GetListQuyTrinh();
                this.changeParam(0);
                console.log(er);
            });
    }
    update(Id) {
        let modalRef = this._modal.open(KiemkekhomodalComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
        modalRef.componentInstance.title = this.title;
        modalRef.componentInstance.isKhoThanhPham = (this.title === 'khothanhpham');
        modalRef.result
            .then((res: any) => {
                console.log(res);
                this.GetListQuyTrinh();
                this.changeParam(0);
            })
            .catch((er) => {
                this.GetListQuyTrinh();
                this.changeParam(0);
                console.log(er);
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
        let data: any = {
            PageSize: 20,
            CurrentPage: this.paging.CurrentPage,
            TabTrangThai: this.trangThai,
            sFilter: this.filter.KeyWord,
            TuNgay: DateToUnix(this.filter.TuNgay),
            DenNgay: DateToUnix(this.filter.DenNgay),
            Ma: "",
            Ten: "",
            IddmKho: this.filter.IddmKho,
            IdLoHang: this.filter.IdLoHang
        };
        data.Loai = 11;
        this._service
            .PhieuKiemKeKho()
            .GetList(data)
            .subscribe((res: any) => {
                this.items = res.items;
                this.paging = res.paging;
            });
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
    ngOnDestroy(){
        super.ngOnDestroy();
      }
}
