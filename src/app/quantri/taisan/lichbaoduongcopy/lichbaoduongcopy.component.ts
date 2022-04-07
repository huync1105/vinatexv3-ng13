import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';
import { DateToUnix } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { datafake } from './datafake';

@Component({
  selector: 'app-lichbaoduongcopy',
  templateUrl: './lichbaoduongcopy.component.html',
  styleUrls: ['./lichbaoduongcopy.component.css']
})
export class LichbaoduongcopyComponent implements OnInit {

  @Input('item') item: any = { isChonNam: 0, };
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  listNam: any = [];
  listThang: any = [];
  items: any = [];
  itemLichBaoDuong: any = [];
  lang: any = vn;
  filter: any = {};
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  itemsThang: any = [];
  listThoiGianNangSuat: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
    }
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id, DateToUnix(this.item.Ngay)).subscribe((res: any) => {
      this.items = res.Data;
    })
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().Get(this.item.Id).subscribe((res: any) => {
      //  this.listThoiGianNangSuat = res?.Data[0]?.listThoiGianNangSuat;
      //   this.itemLichBaoDuong= res?.Data;
    
      this.itemLichBaoDuong = datafake.Data.map(ele => {
        return {
          ...ele,
          listThoiGianNangSuat : [
            {
              TGNS: 'TG/NS 1',
              ischon: false,
            },
            {
              TGNS: 'TG/NS 2',
              isChon: true,
            },

          ]
        }
      });

      ///
    })
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth()+1;
  }
  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?) {
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetThang(this.item.Id).subscribe((res: any) => {
      this.itemsThang = res.Data;
    })
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id, DateToUnix(this.item.Ngay)).subscribe((res: any) => {
      this.items = res.Data;
    })
  }
  isChon(item) {
    item.isChonNam = 0;
  }
  isChonNam(item) {
    item.isChonThang = 0;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id, DateToUnix(this.item.Ngay)).subscribe((res: any) => {
      this.items = res.Data;
    })
  }
  isChonThang(item) {
    item.isChonNam = 1;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetThang(this.item.Id).subscribe((res: any) => {
      this.itemsThang = res.Data;
    })
  }
}
