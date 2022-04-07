import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-modalcapnhatbaoduongcopyy',
  templateUrl: './modalcapnhatbaoduongcopyy.component.html',
  styleUrls: ['./modalcapnhatbaoduongcopyy.component.css']
})
export class
  ModalcapnhatbaoduongcopyyComponent implements OnInit {
  item: any = {};
  items: any = [];
  title: "";
  listLoaiBaoDuong: any = [];
  listChiTiet: any = [];
  listLichBaoDuong: any = [];
  disabled: boolean = true;
  constructor(public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data;
      this.listLoaiBaoDuong = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }
  chonLoaiBaoDuong(e) {
    let filter;
    if (e.value !== '') {
      filter = this.items.find(ele => ele.Id === e.value);
      this.item.ThoiGianNangSuat = filter?.ThoiGianNangSuat;
      this.item.NoiDung = filter?.NoiDung;
    }

  }
  GhiLai() {
    if (validVariable(this.item.IddmLoaiBaoDuong))
      this.item.TendmLoaiBaoDuong = this.listLoaiBaoDuong.find(obj => obj.value == this.item.IddmLoaiBaoDuong).label;
    if (this.listLichBaoDuong === undefined) {
      this.listLichBaoDuong = [];
    }
    this.listLichBaoDuong.push(this.item);
    this.activeModal.close(this.listLichBaoDuong);



  }
}
