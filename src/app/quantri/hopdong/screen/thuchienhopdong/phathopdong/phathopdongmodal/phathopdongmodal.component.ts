import { StoreService } from './../../../../../../services/store.service';
import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-phathopdongmodal",
  templateUrl: "./phathopdongmodal.component.html",
  styleUrls: ["./phathopdongmodal.component.css"],
})
export class PhathopdongmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton = {
    Ghi: false,
    Xoa: false,
    ChuyenTiep: false,
    KhongDuyet: false,
  };
  opt: any = "";
  listHopDong: any = [];
  item: any = {};
  data: any = {};

  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    public _toastr: ToastrService,
    public _modal: NgbModal,
    private _services: HopDongService,
    private _servicesDungChung: SanXuatService,
    private _store: StoreService
  ) {}

  ngOnInit(): void {
    this.GetFormOptions();
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
      this.item.ngayPhatHanh = UnixToDate(this.item.ngayPhatHanhUnix)
    }
    this.getListHopDong();
  }

  ValidData() {
    if (!validVariable(this.item.lyDoKhongDuyet)) {
      this._toastr.error("Vui lòng chọn lý do");
      return false;
    }
    return true;
  }


  GetFormOptions() {
    this._servicesDungChung.GetOptions().GetDanhSachHopDongByNhaThau(this.item.idDuAn, 0).subscribe((res: any) => {
        this.listHopDong = mapArrayForDropDown(res, "soTenHopDong", "id");
      });
  }

  KiemTraButtonModal() {
    this._servicesDungChung
      .KiemTraButton(this.item.id || "", this.item.idTrangThai || "")
      .subscribe((res: any) => {
        console.log(this.checkbutton = res);
        this.checkbutton = res;
      });
  }

  ChuyenTiep() {
    this._services
      .PhatHopDong()
      .ChuyenTiep(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
  }
  KhongDuyet() {
    this._services
      .PhatHopDong()
      .KhongDuyet(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    // if (this.item.Ngay === null || this.item.Ngay === undefined) {
    //   this._toastr.error("Bạn chưa chọn  ngày");
    // }
    // else {
    //   if (this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined) {
    //     this.add();
    //   }
    //   if (this.item.Ngay !== null && this.item.Ngay !== undefined)
    //     this.item.NgayUnix = DateToUnix(this.item.Ngay);
    //   this._services.QuyTrinhPhieuBongPhe().KhongDuyet(this.item).subscribe((res: any) => {
    //     if (res) {
    //       if (res.State === 1) {
    //         this._toastr.success(res.message)
    //         this.activeModal.close();
    //       } else {
    //         this._toastr.error(res.message);
    //       }
    //     }
    //   })
    // }
  }

  GetNextSoQuyTrinh() {
    this._services
    .PhatHopDong()
    .GetNextSoQuyTrinh()
    .subscribe((res: any) => {
      console.log(res);
      this.item.soQuyTrinh = res.data;
    });
  }

  GhiLai() {
    this.item.ngayPhatHanhUnix = DateToUnix(this.item.ngayPhatHanh);

    if (this.ValidData()) {
      this._services
        .PhatHopDong()
        .Set(this.item)
        .subscribe((res: any) => {
          if (res) {
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.message);
            } else {
              this._toastr.error(res.message);
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
        console.log(res);
        this._services
          .PhatHopDong()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res) {
              if (res?.statusCode === 200) {
                this.activeModal.close();
                this._toastr.success(res.message);
              } else {
                this._toastr.error(res.message);
              }
            }
          });
      })
      .catch((er) => console.log(er));
  }

 
  getListHopDong() {
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
  }

  add() {
    // if (this.item.listItem == undefined || this.item.listItem == null)
    //   this.item.listItem = [];
    // this.item.listItem.push(this.newTableItem);
    // this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === "" || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
