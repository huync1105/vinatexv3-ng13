import { formatDate, formatNumber } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-sanluong',
  templateUrl: './sanluong.component.html',
  styleUrls: ['./sanluong.component.css'],
})
export class SanluongComponent implements OnInit, OnDestroy {
  @Input('TuNgay') TuNgay: any = null;
  @Input('DenNgay') DenNgay: any = null;
  @Input('CongDoan') CongDoan: any = null;
  filter: any = {
    IddmItem: '',
    IddmMay: '',
    IddmPhanXuong: '',
    CongDoan: 'ONG'
  };
  monthlyConfig_luykesanluong: any = {};
  monthlyConfig_sanluongtheomay: any = {};
  dataSet1: any = {};
  listOpts: any = [];
  listKho: any = [];
  listMatHang: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  listPhanXuong: any = [];
  currentDateString: string = '';
  option1: any = {
    plugins: {
      labels: {
        fontSize: 0
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 1.0
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'en-EN', '0.0-0');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'en-EN')} kg`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  option2: any = {
    plugins: {
      labels: {
        fontSize: 0
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 1.0
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'en-EN', '0.0-0');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(tooltipItem, data);
          if (tooltipItem.datasetIndex === 1) {
            return `${formatNumber(tooltipItem.yLabel, 'en-EN')} kg - ${formatNumber(Math.ceil(tooltipItem.yLabel / data.datasets[0].data[tooltipItem.index] * 10000) / 100, 'en-EN')}%`
          } else {
            return `${formatNumber(tooltipItem.yLabel, 'en-EN')} kg`
          }
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
      }
    },
    legend: {
      position: 'left'
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  suber: any;
  constructor(private _services: SanXuatService, private _toastr: ToastrService, private store: StoreService) {
    this.suber = this.store.getNhaMay().subscribe(res => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    if (validVariable(this.TuNgay) && validVariable(this.DenNgay)) {
      this.filter._tuNgay = this.TuNgay;
      this.filter._denNgay = this.DenNgay;
    } else {
      let date = new Date();
      this.currentDateString = formatDate(date, 'dd_MM_yyyy', 'en-EN');
      console.log(this.currentDateString)
      this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    if (validVariable(this.CongDoan)) {
      this.filter.CongDoan = this.CongDoan;
    }
    this.GetBieuDo('ONG');
    this.getAllOptions()
  }

  GetBieuDo(CongDoan?) {
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgayUnix = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgayUnix = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgayUnix = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgayUnix = null;
    }
    if (validVariable(this.filter.TuNgayUnix) && validVariable(this.filter.DenNgayUnix) && this.filter.TuNgayUnix <= this.filter.DenNgayUnix) {
      // if (!!!CongDoan) {
      this._services.DashBoard().BaoCaoSanLuongLuyKe_BieuDoDuong(this.filter).subscribe((res: any) => {
        let mapDate_Qbject = {};
        let DateString = '';
        res.forEach(obj => {
          mapDate_Qbject[`${obj.Label.replaceAll('/', '_')}`] = obj;
        });
        if (mapDate_Qbject[this.currentDateString]) {
          DateString = this.currentDateString;
        } else {
          DateString = formatDate(this.filter._denNgay, 'dd_MM_yyyy', 'en-EN');
        }
        console.log(mapDate_Qbject);
        console.log(res);
        this.monthlyConfig_sanluongtheomay = {
          labels: res.map(ele => ele.Label),
          datasets: [
            {
              type: 'line',
              label: `Kế hoạch (Lũy kế: ${formatNumber(mapDate_Qbject[DateString].KeHoach, 'en-EN')} kg )`,
              borderColor: '#009900',
              // borderWidth: 2,
              fill: false,
              data: res.map(ele => Math.round(ele.KeHoach))
            },
            {
              type: 'line',
              label: `Thực tế (Lũy kế: ${formatNumber(mapDate_Qbject[DateString].ThucTe, 'en-EN')} kg )`,
              borderColor: '#FF671F',
              // borderWidth: 2,
              fill: false,
              data: res.map(ele => Math.round(ele.ThucTe))
            },
            {
              type: 'bar',
              label: 'Sản lượng',
              backgroundColor: '#3c5cbb',
              data: res.map(ele => Math.round(ele.SanLuong)),
              borderColor: 'white',
              // borderWidth: 2
            },
          ]
        }
      })
      // }
      if (!!CongDoan) {
        this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
          // console.log(res);
          this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
          this.listMay.unshift({ label: 'Tất cả máy', value: '' })
          this.filter.IddmMay = this.listMay[0].value;
        })
      }
      if (validVariable(this.CongDoan)) {
        this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
          this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
          this.listMay.unshift({ label: 'Tất cả máy', value: '' })
        })
      }
      this._services.DashBoard().BaoCaoSanLuongLuyKe_BieuDoCot(this.filter).subscribe((res: any) => {
        this.monthlyConfig_luykesanluong = {
          labels: res.map(ele => ele.Label),
          datasets: [
            {
              type: 'bar',
              label: 'Sản lượng tiêu chuẩn',
              backgroundColor: '#009900',
              data: res.map(ele => Math.round(ele.KeHoach)),
              borderColor: 'white',
            },
            {
              type: 'bar',
              label: 'Sản lượng thực tế',
              backgroundColor: '#3c5cbb',
              data: res.map(ele => Math.round(ele.ThucTe)),
              borderColor: 'white',
            },
          ]
        }
      })
    } else {
      this._toastr.warning('Vui lòng chọn đến ngày lớn hơn từ ngày để ra được dữ liệu chuẩn!');
    }
  }

  resetFilter() {

  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._services.GetOptions().GetPhanXuong().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả phân xưởng' });
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.GetMatHang();
    })
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
      if (this.CongDoan !== null) {
        this.filter.CongDoan = this.CongDoan
      } else {
        this.filter.CongDoan = 'ONG';
      }
    });
  }
  GetMatHang(reset?: any) {
    this._services.DashBoard().GetListdmItemTheoPhanXuong_DashboardSanLuong(this.filter).subscribe((res1: any) => {
      console.log(res1);
      res1.unshift({ Id: '', Ten: 'Tất cả mặt hàng' });
      this.listMatHang = mapArrayForDropDown(res1, 'Ten', 'Id')
      if (reset) {
        this.filter.IddmItem = '';
        this.GetBieuDo(true);
      }
    })
  }
  ExportExcel() {
    this._services.DashBoard().ExportThongKeSanLuong(this.filter).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  ngOnDestroy() {
    this.suber.unsubscribe();
  }
}
