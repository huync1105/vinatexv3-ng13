import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { validVariable } from 'src/app/services/globalfunction';
import { ModaltaolichbaoduongComponent } from '../../modal/modaltaolichbaoduong/modaltaolichbaoduong.component';

@Component({
  selector: 'app-thongtitaisancha',
  templateUrl: './thongtitaisancha.component.html',
  styleUrls: ['./thongtitaisancha.component.css']
})
export class ThongtitaisanchaComponent implements OnInit,OnDestroy {
  lang: any = vn;
  checkbutton: any = {};
  NameFile: any = "";
  listTinhTrangTaiSan_copy: any = [];

  @Input('item') item: any = {};
  @Input('TaiSanChaCon') TaiSanChaCon: string = "";
  @Input('itemDonVi') itemDonVi: any = {};
  @Input('listDonVi_copy') listDonVi_copy: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('listDonVi') listDonVi: any = [];
  @Input('listLoaiTaiSan') listLoaiTaiSan: any = [];
  @Input('listTinhTrangTaiSan') listTinhTrangTaiSan: any = [];
  @Input('listNhaSanXuat') listNhaSanXuat: any = [];
  @Input('opt') opt: any = "";


  constructor(
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    if (this.opt === 'edit') {
      this.item.listFileDinhKem.forEach(obj => {
        this.NameFile += `${obj.FileName}, `;
      });
    }
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      // this.item.listFileDinhKem = data;
      // this.item.listFileDinhKem.forEach(obj => {
      //   this.NameFile += `${obj.NameLocal}, `;
      // });
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  selcetDonVi(){
    this.itemDonVi = this.listDonVi_copy.find(obj => obj.Id === this.item.IddmDonViTinh);
  }

  TaoLichBaoDuong(item) {
    if (validVariable(this.item.IddmDonViTinh)) {
      let modalRef = this._modal.open(ModaltaolichbaoduongComponent, {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "add";
      modalRef.componentInstance.TaiSanChaCon = "cha";
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.listDonVi = this.listDonVi;
      modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
      modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
      modalRef.componentInstance.listNhaSanXuat = this.listNhaSanXuat;
      modalRef.componentInstance.listTinhTrangTaiSan_copy = this.listTinhTrangTaiSan_copy;
      modalRef.componentInstance.itemDonVi = this.itemDonVi;
      modalRef.result
        .then((res: any) => {
          this.item.listLichBaoDuong = res;
        })
        .catch((er) => {

        });
    }
    else {
      this.toastr.error("Yêu cầu chọn đơn vị");
    }
  }


  ChangeData() {
    this.itemChange.emit(this.item);
  }

  ngOnDestroy() {

  }
}
