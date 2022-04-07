import { Component, OnInit } from '@angular/core';
import { mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { BongChai } from '../data-model';
import { DropDownData } from '../data-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bong-chai-tong-hop',
  templateUrl: './bong-chai-tong-hop.component.html',
  styleUrls: ['./bong-chai-tong-hop.component.css']
})
export class BongChaiTongHopComponent implements OnInit {

  cols: any[];
  items: BongChai[];
  sum: any = {};
  currentTime: any = {};
  listNgay: DropDownData[] = [];
  listThang: DropDownData[] = [];
  listNam: DropDownData[] = [];
  // frozenCols: any[];

  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.cols = [
      // { header: 'Ngày', field: 'Ngay', textAlign: 'p-text-center', width: '' },
      { header: 'Khối lượng F1.2', field: 'KLF', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Khối lượng bụi tinh', field: 'KLBuiTinh', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Sản lượng cotton', field: 'SLCotton', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Bông rơi chải thô', field: 'BongRoiChaiTho', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Sản lượng Pe', field: 'SLPe', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Xơ ngoại lai', field: 'XoNgoaiLai', backgroundColor: '#fff', textAlign: 'p-text-right', width: '' },
      { header: 'Quét nhà', field: 'QuetNha', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
      { header: 'Sợi rối', field: 'SoiRoi', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
      { header: 'Bông mương điêu không', field: 'BongMuongDieuKhong', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
      { header: 'Hút đầu mối (TC)', field: 'HutDauMoiTC', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
      { header: 'Bông trắng trục nhung', field: 'BongTrangTrucNhung', backgroundColor: '#ffedbd', textAlign: 'p-text-right', width: '' },
      { header: 'Xử lý thô CVCCm+CVCCd 60/40', field: 'XLTCmCVCCd', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
      { header: 'Cúi hồi CVCCm+CVCCd60/40', field: 'CHCmCVCCd', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
      { header: 'Hút mối sợi con CVCCm60/40', field: 'HMSCVCCm', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
      { header: 'Hút mối sợi con CVCCd 60/40', field: 'HMSCCVCCd', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
      { header: 'Hồi Xả tạp Pe', field: 'HoiXaTapPe', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
      { header: 'Thô xay', field: 'ThoXay', backgroundColor: '#d9e4ff', textAlign: 'p-text-right', width: '' },
    ]

    this.items = [
      {
        KLF: 100,
        KLBuiTinh: 200,
        SLCotton: 100,
        BongRoiChaiTho: 200,
        SLPe: 300,
        XoNgoaiLai: 400,
        QuetNha: 500,
        SoiRoi: 100,
        BongMuongDieuKhong: 600,
        HutDauMoiTC: 600,
        BongTrangTrucNhung: 100,
        XLTCmCVCCd: 100,
        CHCmCVCCd: 100,
        HMSCVCCm: 100,
        HMSCCVCCd: 100,
        HoiXaTapPe: 100,
        ThoXay: 100,
        Ngay: 1648874396,
      },
      {
        KLF: 100,
        KLBuiTinh: 200,
        SLCotton: 100,
        BongRoiChaiTho: 200,
        SLPe: 300,
        XoNgoaiLai: 400,
        QuetNha: 500,
        SoiRoi: 100,
        BongMuongDieuKhong: 600,
        HutDauMoiTC: 600,
        BongTrangTrucNhung: 100,
        XLTCmCVCCd: 100,
        CHCmCVCCd: 100,
        HMSCVCCm: 100,
        HMSCCVCCd: 100,
        HoiXaTapPe: 100,
        ThoXay: 100,
        Ngay: 1648960796,
      },
      {
        KLF: 100,
        KLBuiTinh: 200,
        SLCotton: 100,
        BongRoiChaiTho: 200,
        SLPe: 300,
        XoNgoaiLai: 400,
        QuetNha: 500,
        SoiRoi: 100,
        BongMuongDieuKhong: 600,
        HutDauMoiTC: 600,
        BongTrangTrucNhung: 100,
        XLTCmCVCCd: 100,
        CHCmCVCCd: 100,
        HMSCVCCm: 100,
        HMSCCVCCd: 100,
        HoiXaTapPe: 100,
        ThoXay: 100,
        Ngay: 1649047196,
      },
      {
        KLF: 100,
        KLBuiTinh: 200,
        SLCotton: 100,
        BongRoiChaiTho: 200,
        SLPe: 300,
        XoNgoaiLai: 400,
        QuetNha: 500,
        SoiRoi: 100,
        BongMuongDieuKhong: 600,
        HutDauMoiTC: 600,
        BongTrangTrucNhung: 100,
        XLTCmCVCCd: 100,
        CHCmCVCCd: 100,
        HMSCVCCm: 100,
        HMSCCVCCd: 100,
        HoiXaTapPe: 100,
        ThoXay: 100,
        Ngay: 1649133596,
      }
    ]
    
    this.items.forEach(item => {
      item.Ngay = this.datePipe.transform(item.Ngay*1000, 'dd/MM/yyyy');
    })

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
