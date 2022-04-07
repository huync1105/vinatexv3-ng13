import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalbaoduongComponent } from '../modal/modalbaoduong/modalbaoduong.component';
import { ModalthongtinchitiettaisanComponent } from '../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';

@Component({
  selector: 'app-lichxichthang',
  templateUrl: './lichxichthang.component.html',
  styleUrls: ['./lichxichthang.component.css']
})
export class LichxichthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  items: any = [];
  filter: any = {};
  TongSoTaiSan: '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'];
  constructor(public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,) { }

  ngOnInit(): void {
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };

    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.GetList();
  }
  GetList() {
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.ListLichXichThang().GetList(data).subscribe((res: any) => {
      this.items = res.Data;
      this.TongSoTaiSan = res.Data.TongSoTaiSan;
    })
  }
  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item.IdTaiSan;
    // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => {

      })
      .catch((er) => {

      });
  }
  ChiTietBaoDuong(item) {
    this._serviceTaiSan.ListLichXichNam().Get(item.IddmLoaiBaoDuong).subscribe((res1: any) => {
      let modalRef = this._modal.open(ModalbaoduongComponent, {
        size: "fullscreen",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "edit";
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1.Data));
      modalRef.result
        .then((res: any) => {

        })
        .catch((er) => {
        });
    })
  }
}