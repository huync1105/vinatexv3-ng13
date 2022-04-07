import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { ModalthongbaoComponent } from './../../../../../modal/modalthongbao/modalthongbao.component';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhMucHopDongService } from './../../../../../../services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giahanhopdongmodal',
  templateUrl: './giahanhopdongmodal.component.html',
  styleUrls: ['./giahanhopdongmodal.component.css']
})
export class GiahanhopdongmodalComponent implements OnInit {
  item : any = {}
  opt : any = {}
  checkbutton : any = {}
listHopDong: any = {}
  lang: any = vn;
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(      public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    public _modal: NgbModal,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false,
    };
    this.GetFormOptions();

    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      this.KiemTraButtonModal();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat
      .KiemTraButton(this.item.id || "", this.item.idTrangThai || "")
      .subscribe((res: any) => {
        console.log((this.checkbutton = res));
        this.checkbutton = res;
      });
  }
  GetFormOptions() {
    // this._service
    //   .QuyTrinhHopDong()
    //   .GetListAll()
    //   .subscribe((res: any) => {
    //     this.listHopDong = mapArrayForDropDown(res, "soHopDong", "id");
    //   });

  }
  GetNextSoQuyTrinh() {
    this._service
      .GiaHanHopDong()
      .GetNextSoQuyTrinh()
      .subscribe((res: any) => {
        console.log(res);
        this.item.soQuyTrinh = res.data;
      });
  }

  ValidData() {
    // if (!validVariable(this.item.noiDung)) {
    //   this._toastr.error("Vui lòng chọn nội dung");
    //   return false;
    // }
    if (!validVariable(this.item.idHopDong)) {
      this._toastr.error('Vui lòng chọn hợp đồng')
      return false
    }

    return true;
  }
  GhiLai() {
    this.item.ngayPhatHanhUnix = DateToUnix(this.item.ngayPhatHanh);
    this.item.ngayGiaHanUnix = DateToUnix( this.item.ngayGiaHan );
   
  if(this.ValidData()){
    this._service
    .GiaHanHopDong()
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
        this._service
          .GiaHanHopDong()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.message);
            } else {
              this._toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }

  ChuyenTiep() {
    this._service.GiaHanHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })

  }
  KhongDuyet() {
    this._service.GiaHanHopDong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })

  }
}
