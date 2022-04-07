import { array } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modaltaolichbaoduong',
  templateUrl: './modaltaolichbaoduong.component.html',
  styleUrls: ['./modaltaolichbaoduong.component.css']
})
export class ModaltaolichbaoduongComponent implements OnInit {
  item: any = {};
  dmloaibaoduong: any = [];
  itemDonVi: any = {};
  opt: string = '';
  title: string = '';
  newTableItem: any = {};
  IdTaiSan: string = "";
  TaiSanChaCon: string = "";

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    // this.IdTaiSan = this.TaiSanChaCon === 'cha' ? this.item.Id : this.item.IdTaiSan;
    if (this.opt === "add") {
      this.title = "Tạo mới lịch bảo dưỡng";
    }
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      Keyword: "",
      Ma: "",
      Ten: ""
    };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetList(data).subscribe((res: any) => {
      this.dmloaibaoduong = res.Data.Items;
      this._serviceTaiSan.GetOptions().ListBaoDuongTaiSan(this.item.Id, this.itemDonVi.Id).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.item.listLichBaoDuong = res.Data;
          this.resetNewitem();
        }
      })
    })
  }

  resetNewitem() {
    for (let i = 0; i < this.dmloaibaoduong.length; i++) {
      this.newTableItem.Id = "";
      this.newTableItem.IdTaiSan = this.item.Id;
      this.newTableItem.IddmDonViTinh = this.itemDonVi.Id;
      this.newTableItem.TenDonViTinh = this.itemDonVi.Ten;
      this.newTableItem.MaDonViTinh = this.itemDonVi.Ma;
      this.newTableItem.SoLuong = 0;
      this.newTableItem.SoLuongCanhBao = 0;
      this.newTableItem.listChiTiet = [];
      this.dmloaibaoduong.forEach(element => {
        this.newTableItem.listChiTiet.push({
          Id: "",
          IdTaiSan: this.item.Id,
          IddmDonViTinh: this.itemDonVi.Id,
          TenDonViTinh: this.itemDonVi.Ten,
          MaDonViTinh: this.itemDonVi.Ma,
          SoLuong: 0,
          IdLichBaoDuongTaiSan: "",
          IddmLoaiBaoDuong: element.Id,
          TenLoaiBaoDuong: element.Ten,
          MaLoaiBaoDuong: element.Ma,
          isBaoDuong: false,
        });
      });
    }
  }

  GhiLai() {
    this.activeModal.close(this.item.listLichBaoDuong);
  }

  add() {
    this.item.listLichBaoDuong.push(deepCopy(this.newTableItem));
    this.resetNewitem();
  }

  checked(e, item) {
    item.isBaoDuong = e.checked;
  }

  XoaTaiSanCon(item, index) {
    this.item.listTaiSan.splice(index, 1);
  }

}
