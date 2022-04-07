

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modalloaihopdong',
  templateUrl: './modalloaihopdong.component.html',
  styleUrls: ['./modalloaihopdong.component.css']
})
export class ModalloaihopdongComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  khongclicknhieu: any = false;
  listLoaiBong: any = [];
  listLoaiNhomKho: any = [];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.type === 'loaibong'){
      this.GetListLoaiBong();
    }
    if(this.type === 'dmnhomkho'){
      this.GetListLoaiNhomKho();
    }
  }
  GetListLoaiNhomKho() {
    this.sanXuatService.GetListLoaiNhomKho().subscribe((res: any) => {
      this.listLoaiNhomKho = mapArrayForDropDown(res, "Ten", 'Loai');
    })
  }
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      switch (this.type) {
        case 'capbong': this.capbong();
          break;
        case 'loaibong': this.loaibong();
          break;
        case 'casanxuat': this.casanxuat();
          break;
        case 'loaisoi': this.loaisoi();
          break;
        case 'dmkho': this.dmkho();
          break;
        case 'dmnhomkho': this.dmnhomkho();
          break;
        case 'loaidien': this.loaidien();
          break;
        case 'nhomcongto': this.nhomcongto();
          break;
        case 'quycachdonggoi': this.quycachdonggoi();
          break;
        default:
          break;
      }
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }
  
  quycachdonggoi() {
    this.sanXuatService.dmQuyCachDongGoi().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  nhomcongto() {
    this.sanXuatService.dmNhomCongToDien().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaidien() {
    this.sanXuatService.dmLoaiDienKV().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  capbong() {
    this.sanXuatService.SetdmCapBong(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaibong() {
    this.sanXuatService.SetdmLoaiBong(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  casanxuat() {
    this.sanXuatService.SetdmCaSanXuat(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  loaisoi() {
    this.sanXuatService.SetdmLoaiSoi(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  dmkho() {
    this.sanXuatService.SetdmKho(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  dmnhomkho() {
    this.sanXuatService.SetdmNhomKho(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }
  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.activeModal.close(res.message);
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }
  GetListLoaiBong() {
    this.sanXuatService.GetListLoaiBong().subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Loai');
    })
  }
}
