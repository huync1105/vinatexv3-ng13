import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmcongtomodal',
  templateUrl: './dmcongtomodal.component.html',
  styleUrls: ['./dmcongtomodal.component.css']
})
export class DmcongtomodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  listnhomcongto: any = [];
  listmaybienap: any = [];
  khongclicknhieu: any = false;
  listKhungGio: any = [];
  listKhungGioRef: any = [];
  listLoaiDien: any=[];
  nhomKhungGioSelected: any = [];

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    let data: any = {};
    this.sanXuatService.ThongKeDien().GetDanhSachKhungGio(data).subscribe((res: any) => {
      res.forEach(khungGio => {
        this.listKhungGio.push({ value: khungGio.MaNhomKhungGio, label: khungGio.Ten })
      });
      if (validVariable(this.item.lstIdKhungGioApDung)&& this.item.lstIdKhungGioApDung.length!==0) {
        this.nhomKhungGioSelected = [res.find(khungGio=>khungGio.Id === this.item.lstIdKhungGioApDung[0])?.MaNhomKhungGio]
      }
      this.listKhungGioRef = res;
    })
    // this.item.SoDauKy = this.item.SoDauKy != undefined ? this.item.SoDauKy : 0;
    if (this.opt == 'edit') {

    }

  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!');
    }
  }

  Save() {
    this.item.lstIdKhungGioApDung=[];
    this.listKhungGioRef.forEach(khungGio => {
      if(this.nhomKhungGioSelected.includes(khungGio.MaNhomKhungGio)){
        this.item.lstIdKhungGioApDung.push(khungGio.Id)
      }
    });
    this.sanXuatService.dmCongToDien().Set(this.item).subscribe((res: any) => {
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
}
