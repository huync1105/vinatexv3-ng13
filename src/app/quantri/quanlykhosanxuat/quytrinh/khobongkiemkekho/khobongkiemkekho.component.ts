import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { KhobongkiemkekhomodalComponent } from '../khobongkiemkekhomodal/khobongkiemkekhomodal.component';
import { StoreBase } from 'src/app/services/storebase.class';
import { StoreService } from 'src/app/services/store.service';
@Component({
    selector: 'app-khobongkiemkekho',
    templateUrl: './khobongkiemkekho.component.html',
    styleUrls: ['./khobongkiemkekho.component.css']
})
export class KhobongkiemkekhoComponent extends StoreBase implements OnInit, OnDestroy {
    @ViewChild("paginator") paginator: any;
    items: any = [{ id: 5, SoQuyTrinh: "PKK_0000_0000" }];
    filter: any = {};
    listLoBong: any = [];
    trangThai: any = 1;
    paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
    cols: any = [
        {
            header: "Tên kho",
            field: "TendmKho",
            width: "200px",
        },
        {
            header: "Tên lô bông",
            field: "TenLoBong",
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
    eAction = 'KIEMKEKHOBONG';
    constructor(
        public _modal: NgbModal,
        public _toastr: ToastrService,
        private _service: SanXuatService,
        private activatedRoute: ActivatedRoute,
        private router: Router, public store: StoreService
    ) { super(store) }

    ngOnInit(): void {
        console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe((res: any) => {
            this.title = 'khobong';
            if (res.id !== "0") {
                this.update(res.id);
            }
        });
        this.KiemTraTabTrangThai();
        var data: any = {};
        data.CurrentPage = 0;
        data.Loai = 2;
        this._service.GetListLoBong(data).subscribe((res: any) => {
            this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
        });
    }
    changeParam(id) {
        if (this._modal.hasOpenModals()) {
            this._modal.dismissAll();
        }
        this.router.navigate(
            [`quantri/quanlykhosanxuat/khobong/kiemkekhobong/${id}`],
            { replaceUrl: true }
        );
    }
    add() {
        this.changeParam(0);
        let modalRef = this._modal.open(KhobongkiemkekhomodalComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "add";
        modalRef.componentInstance.title = this.title;
        modalRef.componentInstance.item = {};
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
        let modalRef = this._modal.open(KhobongkiemkekhomodalComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
        modalRef.componentInstance.title = this.title;
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
            Loai: 2,
            IdLoBong: this.filter.IdLoBong,
        };
        this._service
            .PhieuKiemKeKhoBong()
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
        this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
            this.checkQuyen = res;
            this.GetListQuyTrinh();
        })
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    exportExcel() {
        let data = {
            IdLoBong: this.filter.IdLoBong,
            TuNgayUnix: DateToUnix(this.filter.TuNgay),
            DenNgayUnix: DateToUnix(this.filter.DenNgay),
        }
        this._service.PhieuKiemKeKhoBong().ExportBangKe(data).subscribe((res: any) => {
            this._service.download(res.TenFile);
        })
    }
}
