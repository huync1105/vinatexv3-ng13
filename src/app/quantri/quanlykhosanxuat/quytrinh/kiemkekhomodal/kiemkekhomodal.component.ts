import { truncateWithEllipsis } from "@amcharts/amcharts4/.internal/core/utils/Utils";
import { Component, OnInit, resolveForwardRef, ViewChild } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
    deepCopy,
    mapArrayForDropDown,
    validVariable,
} from "src/app/services/globalfunction";
import { ImportnhapkhothanhphamComponent } from "../nhapkhothanhphammodal/modals/importnhapkhothanhpham/importnhapkhothanhpham.component";

@Component({
    selector: "app-kiemkekhomodal",
    templateUrl: "./kiemkekhomodal.component.html",
    styleUrls: ["./kiemkekhomodal.component.css"],
})
export class KiemkekhomodalComponent implements OnInit {
    @ViewChild("paginator") paginator: any;
    opt: any = "";
    Id: any = "";
    item: any = {};
    checkbutton: any = {
        Ghi: true,
        KhongDuyet: false,
        ChuyenTiep: false,
        Xoa: false,
    };
    listdmKho: any = [];
    listdmKhoFull: any = [];
    listdmViTri: any = [];
    listLoBong: any = [];
    listLoHang: any = [];
    listQuyCachDongGoi: any = [];
    listNewMatHang: any = [];
    listNewMatHang_ref: any = [];
    isKhoThanhPham: any = false;
    paging: any = {
        CurrentPage: 1,
        TotalPage: 5,
        TotalItem: 10
    };
    listItem: any = [];
    // item_new: any = {};
    title: any = "";
    newItem: any = {};
    constructor(
        public activeModal: NgbActiveModal,
        private services: SanXuatService,
        public toastr: ToastrService,
        public _modal: NgbModal
    ) { }

    ngOnInit(): void {
        var data: any = {};
        data.CurrentPage = 0;
        // if (this.title === "khobong") {
        //     data.Loai = 2;
        //     this.item_new.Loai = 2;
        // } else if (this.title === "khoxo") {
        //     data.Loai = 5;
        //     this.item_new.Loai = 5;
        // } else if (this.title === "khothanhpham") {
        data.Loai = 11;
        this.item.Loai = 11;

        this.services
            .LoHang()
            .GetList(data)
            .subscribe((res: any) => {
                this.listLoHang = mapArrayForDropDown(res, "Ten", "Id");
            });
        this.services.GetListdmKho(data).subscribe((res: any) => {
                this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
                this.listdmKhoFull = res;
            });
        if (this.opt !== "edit") {
            this.GetNextSoQuyTrinh();
            this.item.listItem = [];
            this.listItem = this.item.listItem;

        } else {
            this.GetQuyTrinh();
        }
        // this.item_new = this.item;

        var data: any = {};
        data.CurrentPage = 0;
        // if (this.title === "khobong") {
        //     data.Loai = 2;
        //     this.item_new.Loai = 2;
        // } else if (this.title === "khoxo") {
        //     data.Loai = 5;
        //     this.item_new.Loai = 5;
        // } else if (this.title === "khothanhpham") {
        data.Loai = 11;
        this.item.Loai = 11;
        // }
        
        this.services.GetListdmViTriOpt().subscribe((res: any) => {
            this.listdmViTri = mapArrayForDropDown(res, "Ten", "Id");
        });
        
        this.services
            .dmQuyCachDongGoi()
            .GetList()
            .subscribe((res: any) => {
                this.listQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
            });
        this.services
            .PhieuKiemKeKho()
            .GetlistdmMatHangThanhPhamKiemKe()
            .subscribe((res: any) => {
                this.listNewMatHang = mapArrayForDropDown(res.map(ele=>{return{...ele,Ten:`${ele.Ma} - ${ele.Ten}`}}), "Ten", "Id");
                this.listNewMatHang_ref = res;
            });
    }
    getdmKhoFunc() {
        this.item.listItem = [];
        this.getListLoHangTheodmkho();
    }
    getListLoHangTheodmkho() {
        let dmkhoFull = this.listdmKhoFull.find(ele => ele.Id === this.item.IddmKho);
        if (dmkhoFull != undefined) {
            var data: any = {};
            data.CurrentPage = 0;
            data.IddmPhanXuong = dmkhoFull.IddmPhanXuong;
            this.services.LoHang().GetList(data).subscribe((res: any) => {
                this.listLoHang = mapArrayForDropDown(res, "Ten", "Id");
            });
        }
    }
    GetQuyTrinh() {
        this.services
            .PhieuKiemKeKho()
            .Get(this.Id)
            .subscribe((res1: any) => {
                this.item = res1;
                this.paging.CurrentPage = 1;
                this.paging.TotalPage = 5;
                this.paging.TotalItem = res1.listItem.length;
                this.item.listItem = res1.listItem;
                this.listItem = this.item.listItem.slice(0, 10);
                this.KiemTraButtonModal();
                this.getListLoHangTheodmkho();
            });
    }
    KiemTraButtonModal() {
        this.services
            .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
            .subscribe((res) => {
                this.checkbutton = res;
            });
    }

    ChuyenDuyet() {
        if (validVariable(this.newItem.IddmItem)) {
            this.item.listItem.push(deepCopy(this.newItem));
            this.newItem = {};
        }
        if (this.item.IdLoHang === null || this.item.IdLoHang === undefined) {
            this.toastr.error("Bạn chưa chọn lô hàng");
        }
        else if (this.checkQuyCach()) {
            this.toastr.error("Bạn chưa chọn quy cách đóng gói");
        }
        else {
            // this.item.listItem = deepCopy(this.listItem);
            this.services
                .PhieuKiemKeKho()
                .ChuyenTiep(this.item)
                .subscribe((res: any) => {
                    if (res) {
                        if (res.State === 1) {
                            this.activeModal.close();
                        } else {
                            this.toastr.error(res.message);
                        }
                    }
                });
        }

    }

    GetNextSoQuyTrinh() {
        this.services
            .PhieuKiemKeKho()
            .GetNextSo()
            .subscribe((res: any) => {
                this.item.SoQuyTrinh = res.SoQuyTrinh;
            });
    }

    GhiLai() {
        if (validVariable(this.newItem.IddmItem)) {
            // this.item.listItem.push(deepCopy(this.newItem));
            // this.newItem = {};
            this.add();
        }
        if (this.item.IdLoHang === null || this.item.IdLoHang === undefined) {
            this.toastr.error("Bạn chưa chọn lô hàng");
        }
        else if (this.checkQuyCach()) {
            this.toastr.error("Bạn chưa chọn quy cách đóng gói");
        }
        else {
            this.services
                .PhieuKiemKeKho()
                .Set(this.item)
                .subscribe((res: any) => {
                    if (res) {
                        if (res.State === 1) {
                            this.paginator.changePage(0);
                            this.toastr.success(res.message);
                            this.opt = "edit";
                            this.Id = res.objectReturn.Id;
                            this.GetQuyTrinh()
                            // this.item = res.objectReturn;
                            // this.listItem = res.objectReturn.listItem;
                            // this.paging.CurrentPage = 1;
                            // this.paging.TotalPage = 5;
                            // if (
                            //     res.objectReturn.listItem != undefined &&
                            //     res.objectReturn.listItem != null
                            // )
                            //     this.paging.TotalItem = res.objectReturn.listItem.length;
                            // this.item.listItem = res.objectReturn.listItem.slice(0, 10);
                            // this.KiemTraButtonModal();
                        } else {
                            this.toastr.error(res.message);
                        }
                    }
                });
        }

    }
    XoaQuyTrinh() {
        let modalRef = this._modal.open(ModalthongbaoComponent, {
            backdrop: "static",
        });
        modalRef.componentInstance.message =
            "Bạn có chắc chắn muốn xóa quy trình này chứ?";
        modalRef.result
            .then((res) => {
                this.services
                    .PhieuKiemKeKho()
                    .Delete(this.item)
                    .subscribe((res: any) => {
                        console.log(res);
                        if (res?.State === 1) {
                            this.toastr.success(res.message);
                            this.activeModal.close();
                        } else {
                            this.toastr.error(res.message);
                        }
                    });
            })
            .catch((er) => console.log(er));
    }

    delete(index) {
        let item = this.item.listItem.splice((this.paging.CurrentPage-1)*10+index, 1)[0];
        if (item.Id === "" || item.Id === null || item.Id === undefined) {
        } else {
            this.toastr.warning("Thao tác này đồng nghĩa việc không kiểm kê, không đồng nghĩa việc xóa khỏi kho");
            item.isXoa = true;
            this.item.listItem.push(JSON.parse(JSON.stringify(item)));
        }
        this.listItem = this.item.listItem.filter(ele => ele.isXoa !== true).slice((this.paging.CurrentPage-1)*10,10);
        this.paging.TotalItem = Math.ceil(this.item.listItem.filter(ele => ele.isXoa !== true).length);
    }

    GetMatHangTheoKho() {
        if (this.item.IddmKho !== undefined && this.item.IddmKho !== null
            && this.item.IdLoHang !== undefined && this.item.IdLoHang !== null) {
                this.item.listItem = [];
            this.services.getLuuKhoKiemKeThanhPham(
                    this.item.IddmKho,
                    this.item.IdLoBong,
                    "",
                    this.item.IdLoHang
                ).subscribe((res1: any) => {
                    res1.forEach((mathang) => {
                        // mathang.SoLuong = mathang.TonSoLuong;
                        mathang.SoQuaSoi = mathang.TonSoLuong;
                        mathang.TongTrongLuong = mathang.TonTongTrongLuong;
                    });
                    this.item.listItem = res1;
                    this.listItem = this.item.listItem.slice(0, 10);
                    this.paging.CurrentPage = 1;
                    this.paging.TotalPage = 5;
                    this.paging.TotalItem = res1.length;
                });
        }
    }
    changePage(event) {
        this.paging.CurrentPage = event.page + 1;
        let start = 10 * event.page;
        let end = start + 10;
        if (start + 10 > this.item.listItem.length) {
            end = this.item.listItem.length;
        }
        this.listItem = this.item.listItem.slice(start, end);
    }
    setNewItemName(event) {
        let selected = this.listNewMatHang_ref.find(
            (ele) => ele.Id === event.value
        );
        this.newItem.Ten = `${selected?.Ma} - ${selected?.Ten}` ;
        this.newItem.Ma = selected?.Ma;
    }
    add() {
        if (validVariable(this.newItem.IddmItem)) {
            this.item.listItem.push(deepCopy(this.newItem));
            this.paging.TotalItem = this.item.listItem.filter(ele => ele.isXoa !== true).length;
            this.newItem = {};
            console.log(this.paging);
            if (this.listItem.length > this.paging.CurrentPage * 10) {
                console.log(Math.floor(this.listItem.length / 10));
                this.paginator.changePage(
                    Math.floor(this.listItem.length / 10)
                );
            } else {
                this.changePage({ page: this.paging.CurrentPage - 1 });
            }
        } else {
            this.toastr.error("Vui lòng chọn mặt hàng cần thêm!");
        }
    }
    ImportExcel() {
        let modalRef = this._modal.open(ImportnhapkhothanhphamComponent, {
            backdrop: 'static',
        })
        modalRef.result.then(res => {
            this.toastr.success('Cập nhật thành công!');
            this.item.listItem = res.items;
            this.paginator.changePage(0);
        })
            .catch(er => console.log(er))
    }
    TinhTongKhoiLuong(item) {
        if (item.SoQuaSoi > 0)
            item.TongTrongLuong = (item.SoQuaSoi ?? 0) * (item.TonTrongLuong ?? 0) + (item.TongTrongLuongChenhLech ?? 0);
    }
    checkQuyCach() {
        let isCheck: any = false;
        this.item.listItem.forEach(element => {
            if (element.IddmQuyCachDongGoi === null || element.IddmQuyCachDongGoi === undefined) {
                isCheck = true;
                return ;
            }
        });
        return isCheck;
    }
}
