import { Component, OnInit } from '@angular/core';
import { DropDownData } from '../data-model';

@Component({
  selector: 'app-ghep-tho-tong-hop',
  templateUrl: './ghep-tho-tong-hop.component.html',
  styleUrls: ['./ghep-tho-tong-hop.component.css']
})
export class GhepThoTongHopComponent implements OnInit {

  cols: any[];
  items: any[];
  currentTime: any = {};
  listNgay: DropDownData[] = [];
  listThang: DropDownData[] = [];
  listNam: DropDownData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      // { header: 'Ngày', field: 'Ngay', textAlign: 'p-text-center', width: '' },
      { header: 'Sản lượng chải kĩ', field: 'KLF', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Sản lượng F3', field: 'KLBuiTinh', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Bông rơi chải kĩ', field: 'SLCotton', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Bông hồi', field: 'BongRoiChaiTho', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Tỷ lệ bông hồi', field: 'SLPe', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Thô hỏng', field: 'XoNgoaiLai', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Tỷ lệ thô hỏng', field: 'QuetNha', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
    ]

    this.GetCurrentTime();
    this.GetTimeForDropDown();
  }

  GetCurrentTime() {
    let date = new Date();
    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day: string | number = date.getDate();
    if (day<10) {
      day = '0' + day
    }
    this.currentTime = {
      day: day,
      month: month,
      year: year
    }
  }
  
  GetTimeForDropDown() {
    let ngay = 0;
    let thang = 0;
    let nam = 0;
    for (let i = 0; i <= 30; i++) {
      ngay++;
      this.listNgay.push({
        label: ngay<10?`0${ngay}`:ngay.toString(),
        value: ngay
      });
    }
    for (let i = 0; i <= 11; i++) {
      thang++;
      this.listThang.push({
        label: thang<10?`0${thang}`:thang.toString(),
        value: thang
      });
    }
    for (let i = this.currentTime.year - 10; i <= this.currentTime.year + 10; i++) {
      nam = i;
      this.listNam.push({
        label: nam.toString(),
        value: nam
      });
    }
  }

}
