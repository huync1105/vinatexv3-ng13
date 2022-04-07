import { formatNumber } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit, OnDestroy {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  filterBong: any = {};
  filter: any = {
    IddmLoaiBong: "",
    IddmKho: '',
    LoaiThoiGian: 0
  };
  filterSanLuong: any = {};
  filterNhuCau: any = {
    IddmLoaiBong: "",
    IddmKho: '',
    LoaiThoiGian: 0
  };
  colsNum: any = 3;
  Tong: any = null;
  monthlyConfig: any = {};
  dataSet1: any = {};
  dataSet2: any = {};
  listOpts: any = [];
  listKho: any = [];
  listKhoCanDoiTon: any = [];
  listLoaiBongCanDoiTon: any = [];
  listMatHang: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  dataPie: any = {};
  GiaTrungBinhCoCauBong: any = [];
  listXuatNhap: any = [];
  showXuatNhap: boolean = false;
  selectedXuatNhap: any = {};
  mapXuatNhap = {
    Xuat: 'Xuất',
    Nhap: 'Nhập'
  }
  pieLegend: any = [];
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Khối lượng ( Tấn)'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'en-EN', '0.0-0');
          }
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'en-EN')} tấn`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80) * 2 / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
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
      }],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'en-EN')}`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? null : ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  optionPie: any = {
    plugins: {
      labels: {
        fontSize: 0,
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
        precision: 2
      }
    },
    legend: {
      display: false,
      position: 'left'
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(data);
          return `${formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'en-EN')}kg - ${formatNumber(data.datasets[tooltipItem.datasetIndex].GiaTrungBinh[tooltipItem.index], 'en-EN', '0.0-2')} USD`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? null : (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  listItem: any = [];
  suber: any;
  constructor(private _services: SanXuatService, private _toastr: ToastrService, private store: StoreService) {
    this.suber = this.store.getNhaMay().subscribe(res => {
      let date = new Date();
      this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.filterNhuCau._tuNgayCanDoiTon = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filterNhuCau._denNgayCanDoiTon = date;
      this.listItem = [

      ]
      this.getAllOptions();
    })
    this.colsNum = this.store.isMobile ? 0 : 3;
  }

  ngOnInit(): void {
    console.log(this.optionPie.maintainAspectRatio);
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.filterNhuCau._tuNgayCanDoiTon = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterNhuCau._denNgayCanDoiTon = date;
    this.listItem = [

    ]
    this.getAllOptions();
    // this.ChangeOptBieuDo();
    // this.ChangeOptCanDoiTon();
  }

  ChangeOptBieuDo() {
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgay = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgay = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgay = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgay = null;
    }
    if (this.filter.DenNgay < this.filter.TuNgay) {
      this._toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filter._denNgay = this.filter._tuNgay;
        this.ChangeOptBieuDo()
      }, 200)
    } else {
      if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && this.filter.TuNgay <= this.filter.DenNgay) {
        this._services.DashBoard().NhuCauSuDungBong(this.filter).subscribe((res: any) => {
          this.dataSet1 = {
            labels: res.listThoiGian,
            datasets: [
              {
                type: 'line',
                label: 'Kế hoạch',
                borderColor: '#0000E5',
                borderDash: [10, 5],
                fill: false,
                data: res.listKeHoach.map(ele => ele.KhoiLuong),
                steppedLine: 'before'
              },
              {
                type: 'line',
                label: 'Nhu cầu',
                borderColor: '#FF0000',
                fill: false,
                data: res.listNhuCau.map(ele => ele.KhoiLuong),
              },
            ]
          }
        })
        this._services.DashBoard().CoCauTonBong(this.filter).subscribe((res: any) => {
          this.pieLegend = [];
          let i = 0;
          const BG_COLOR = [
            "#009900",
            "#36A2EB",
            "#FFCE56",
            "#FF671F",
            '#ab8169',
            '#6a942f',
            '#46018f',
            '#d70ca1'
          ]
          this.GiaTrungBinhCoCauBong = res.map(ele => ele.DonGia);
          let TongTrongLuong = res.reduce((Tong, b) => {
            return Tong+= (b.TrongLuong||0)
          },0)
          res.forEach((ele) => {
            if (ele.TrongLuong !== null) {
              this.pieLegend.push({
                Ten: ele.Ten,
                Color: BG_COLOR[i],
                TyLe: ele.TrongLuong / TongTrongLuong * 100
              })
              i++
            }
          })
          console.log(this.pieLegend);
          this.dataPie = {
            labels: res.map(ele => ele.Ten),
            datasets: [
              {
                data: res.map(ele => ele.TrongLuong),
                GiaTrungBinh: res.map(ele => ele.DonGia),
                backgroundColor: BG_COLOR
              }
            ]
          };
        })
      }
    }
  }

  ChangeOptCanDoiTon() {
    let TuNgay = 0;
    let DenNgay = 0;
    if (validVariable(this.filterNhuCau._tuNgayCanDoiTon)) {
      TuNgay = DateToUnix(this.filterNhuCau._tuNgayCanDoiTon);
    } else {
      TuNgay = null;
    }
    if (validVariable(this.filterNhuCau._denNgayCanDoiTon)) {
      DenNgay = DateToUnix(this.filterNhuCau._denNgayCanDoiTon);
    } else {
      DenNgay = null;
    }
    if (DenNgay < TuNgay) {
      this._toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filterNhuCau._denNgayCanDoiTon = this.filterNhuCau._tuNgayCanDoiTon;
        this.ChangeOptCanDoiTon()
      }, 200)
    } else {
      if (validVariable(TuNgay) && validVariable(DenNgay) && TuNgay <= DenNgay) {
        let data = deepCopy(this.filterNhuCau);
        data.TuNgay = TuNgay;
        data.DenNgay = DenNgay;
        this._services.DashBoard().CanDoiTon(data).subscribe((res: Array<any>) => {
          this.Tong = res.splice(0, 1)[0];
          this.listItem = res;
        })
      }
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
    setTimeout(() => {
      this._services.GetOptions().GetdmKhoTheoDuAn_NhuCauSuDungBong_DashBoard().subscribe((res: any) => {
        console.log(res);
        res.unshift({ Id: '', Ten: 'Tất cả kho' });
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
        this.getMatHangNhuCau(this.filter.IddmKho);
      });
    }, 1000)
    setTimeout(() => {
      this._services.GetOptions().GetdmKhoTheoDuAn_CoCauTonBong_DashBoard().subscribe((res: any) => {
        console.log(res);
        res.unshift({ Id: '', Ten: 'Tất cả kho' });
        this.listKhoCanDoiTon = mapArrayForDropDown(res, 'Ten', 'Id');
        this.getMatHangCanDoiTon(this.filterNhuCau.IddmKho);
      });
    }, 1000)
  }
  getMatHangNhuCau(IddmKho) {
    this._services.GetOptions().GetListdmLoaiBong_NhuCauSuDungBong_DashBoard(IddmKho).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả bông' });
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmLoaiBong = '';
      this.ChangeOptBieuDo()
    })
  }
  getMatHangCanDoiTon(IddmKho) {
    this._services.GetOptions().GetListdmLoaiBong_CoCauTonBong_DashBoard(IddmKho).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả nguyên liệu' });
      this.listLoaiBongCanDoiTon = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filterNhuCau.IddmLoaiBong = '';
      this.ChangeOptCanDoiTon()
    })
  }
  XuatBaoCaoCanDoiTon() {
    let TuNgay = 0;
    let DenNgay = 0;
    if (validVariable(this.filterNhuCau._tuNgayCanDoiTon)) {
      TuNgay = DateToUnix(this.filterNhuCau._tuNgayCanDoiTon);
    } else {
      TuNgay = null;
    }
    if (validVariable(this.filterNhuCau._denNgayCanDoiTon)) {
      DenNgay = DateToUnix(this.filterNhuCau._denNgayCanDoiTon);
    } else {
      DenNgay = null;
    }
    let data = deepCopy(this.filterNhuCau);
    data.TuNgay = TuNgay;
    data.DenNgay = DenNgay;
    this._services.BaoCao().ExportBaoCaoCanDoiSuDungBong(data).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State) && !validVariable(res.TenFile)) {
          this._toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  callDataXuatNhap(opt, item) {
    console.log(opt, item)
    if (validVariable(this.filterNhuCau._tuNgayCanDoiTon)) {
      this.filterNhuCau.TuNgay = DateToUnix(this.filterNhuCau._tuNgayCanDoiTon);
    } else {
      this.filterNhuCau.TuNgay = null;
    }
    if (validVariable(this.filterNhuCau._denNgayCanDoiTon)) {
      this.filterNhuCau.DenNgay = DateToUnix(this.filterNhuCau._denNgayCanDoiTon);
    } else {
      this.filterNhuCau.DenNgay = null;
    }

    if (validVariable(this.filterNhuCau.TuNgay) && validVariable(this.filterNhuCau.DenNgay) && this.filterNhuCau.TuNgay <= this.filterNhuCau.DenNgay) {
      let data = {
        IddmLoaiBong: item.IddmLoaiBong,
        TuNgay: this.filterNhuCau.TuNgay,
        DenNgay: this.filterNhuCau.DenNgay,
        IdLoBong: item.IdLoBong,
        IddmKho: this.filterNhuCau.IddmKho,
      }
      this._services.DashBoard()[`GetDashBoard_Phieu${opt}KhoBong`](data).subscribe(res => {
        console.log(res);
        this.listXuatNhap = res;
        this.showXuatNhap = true;
        this.selectedXuatNhap = {
          Ten: `${this.mapXuatNhap[opt]} - ${item.TendmLoaiBong} - ${item.TenLoBong}`,
          opt: opt,
          field: `SoPhieu${opt}`,
          TenOpt: this.mapXuatNhap[opt],
        }
      })
    }
  }
  navigateXuatNhap(item) {
    let prefix = '';
    let route = {
      '1': '/quantri/quanlysanxuatkhohoiam/khohoiam/nhapkho/',
      '5': '/quantri/quanlykhosanxuatbongkhac/khobongphe/nhapkho/',
      '6': '/quantri/quanlykhosanxuat/khobong/kiemkekhobong/',
      '7': '/quantri/quanlykhosanxuat/khobong/thongsochatluong/',
      '8': '/quantri/quanlykhosanxuat/khobong/nhapkho/',
      '12': '/quantri/quanlykhosanxuatbongkhac/khobongphe/xuatkho/',
      '13': '/quantri/quanlykhosanxuat/khoxo/xuatkho/',
      '14': '/quantri/quanlykhosanxuat/khobong/xuatkho/',
      '15': '/quantri/quanlykhosanxuat/khoxo/kiemkekhoxo/',

      '20': '/quantri/quanlykhosanxuat/khoxo/nhapkho/',
      '21': '/quantri/quanlykhosanxuatbongkhac/khobonghoi/nhapkho/',
      '22': '/quantri/quanlykhosanxuatbongkhac/khobonghoi/xuatkho/',
      '23': '/quantri/quanlykhosanxuat/khobonghoi/kiemkekhobonghoi/',
      '24': '/quantri/quanlykhosanxuat/khobongphe/kiemkekhobongphe/',
    }
    // if (this.selectedXuatNhap.opt === 'Xuat') {
    //   window.open(`#${this.mapXuatNhapRoute[this.selectedXuatNhap.opt]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`] || 0}`, "_blank");
    // }else{
    window.open(`#${route[`${item.LoaiPhieu}`]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`] || 0}`, "_blank");
    // }

    // this._router.navigate([`${this.mapXuatNhapRoute[this.selectedXuatNhap.opt]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`]||0}`])
  }
  navigateKiemKe(item) {
    let route = {
      '1': '/quantri/quanlysanxuatkhohoiam/khohoiam/nhapkho/',
      '5': '/quantri/quanlykhosanxuatbongkhac/khobongphe/nhapkho/',
      '6': '/quantri/quanlykhosanxuat/khobong/kiemkekhobong/',
      '7': '/quantri/quanlykhosanxuat/khobong/thongsochatluong/',
      '8': '/quantri/quanlykhosanxuat/khobong/nhapkho/',
      '12': '/quantri/quanlykhosanxuatbongkhac/khobongphe/xuatkho/',
      '13': '/quantri/quanlykhosanxuat/khoxo/xuatkho/',
      '14': '/quantri/quanlykhosanxuat/khobong/xuatkho/',
      '15': '/quantri/quanlykhosanxuat/khoxo/kiemkekhoxo/',

      '20': '/quantri/quanlykhosanxuat/khoxo/nhapkho/',
      '21': '/quantri/quanlykhosanxuatbongkhac/khobonghoi/nhapkho/',
      '22': '/quantri/quanlykhosanxuatbongkhac/khobonghoi/xuatkho/',
      '23': '/quantri/quanlykhosanxuat/khobonghoi/kiemkekhobonghoi/',
      '24': '/quantri/quanlykhosanxuat/khobongphe/kiemkekhobongphe/',
    }
    window.open(`#${route[`${item.LoaiPhieu}`]}${item.IdPhieuKiemKe || 0}`, "_blank");
    // this._router.navigate([`${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKeKho||0}`])
  }
  ngOnDestroy() {
    this.suber.unsubscribe();
  }
}
