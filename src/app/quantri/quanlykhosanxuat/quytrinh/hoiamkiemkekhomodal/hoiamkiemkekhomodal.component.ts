import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-hoiamkiemkekhomodal',
  templateUrl: './hoiamkiemkekhomodal.component.html',
  styleUrls: ['./hoiamkiemkekhomodal.component.css']
})
export class HoiamkiemkekhomodalComponent implements OnInit {

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
    listNewMatHang: any = [];
    listNewMatHang_ref: any = [];
    isKhoThanhPham: any = false;
    paging: any = {
        CurrentPage: 1,
        TotalPage: 5,
        TotalItem: 0
    };
    listItem: any = [];
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
        data.Loai = 10;
        this.item.Loai = 10;
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

        } 
        else {
            this.GetQuyTrinh();
        }

        this.services.GetListdmViTriOpt().subscribe((res: any) => {
            this.listdmViTri = mapArrayForDropDown(res, "Ten", "Id");
        });
        
        // this.services
        //     .PhieuKiemKeKho()
        //     .GetlistdmMatHangThanhPhamKiemKe()
        //     .subscribe((res: any) => {
        //         this.listNewMatHang = mapArrayForDropDown(res.map(ele=>{return{...ele,Ten:`${ele.Ma} - ${ele.Ten}`}}), "Ten", "Id");
        //         this.listNewMatHang_ref = res;
        //     });
    }
    getdmKhoFunc() {
        this.getListLoHangTheodmkho();
        this.GetMatHangTheoKho();
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
            .PhieuKiemKeHoiAm()
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
        else {
            this.services
                .PhieuKiemKeHoiAm()
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
            .PhieuKiemKeHoiAm()
            .GetNextSo()
            .subscribe((res: any) => {
                this.item.SoQuyTrinh = res.SoQuyTrinh;
            });
    }

    GhiLai() {
        if (validVariable(this.newItem.IddmItem)) {
            this.add();
        }
        if (this.item.IdLoHang === null || this.item.IdLoHang === undefined) {
            this.toastr.error("Bạn chưa chọn lô hàng");
        }
        else {
            this.services
                .PhieuKiemKeHoiAm()
                .Set(this.item)
                .subscribe((res: any) => {
                    if (res) {
                        if (res.State === 1) {
                            this.paginator.changePage(0);
                            this.toastr.success(res.message);
                            this.opt = "edit";
                            this.Id = res.objectReturn.Id;
                            this.GetQuyTrinh()
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
                    .PhieuKiemKeHoiAm()
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
        let item = this.item.listItem.splice(index, 1)[0];
        this.listItem.splice(index, 1);
        if (item.Id === "" || item.Id === null || item.Id === undefined) {
        } else {
            item.isXoa = true;
            this.item.listItem.push(JSON.parse(JSON.stringify(item)));
        }
    }

    GetMatHangTheoKho() {
      this.item.listItem = []
      this.listItem = []
        if (this.item.IddmKho !== undefined && this.item.IddmKho !== null
            && this.item.IdLoHang !== undefined && this.item.IdLoHang !== null) {
            this.services
                .getLuuKhoKiemKe(
                    this.item.IddmKho,
                    this.item.IdLoBong,
                    "",
                    this.item.IdLoHang
                )
                .subscribe((res1: any) => {
                    res1.forEach((mathang) => {
                        mathang.SoLuong = mathang.TonSoLuong;
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
            this.paging.TotalItem = this.item.listItem.length;
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
   
    TinhTongKhoiLuong(item) {
        if (item.SoQuaSoi > 0)
            item.TongTrongLuong = (item.SoQuaSoi ?? 0) * (item.TonTrongLuong ?? 0) + (item.TongTrongLuongChenhLech ?? 0);
    }
}
