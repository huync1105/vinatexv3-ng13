import { formatNumber } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TrienkhaikehoachsanxuatComponent } from '../quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { PintableDirective } from 'voi-lib';
@Component({
  selector: 'app-nhucauxuathang',
  templateUrl: './nhucauxuathang.component.html',
  styleUrls: ['./nhucauxuathang.component.css']
})
export class NhucauxuathangComponent implements OnInit, OnDestroy {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  filterBong: any = {};
  filter: any = {
    IddmItem: "",
    IddmKho: ''
  };
  filterAll: any = {
    IddmItem: "",
    IddmKho: '',
  };
  colsNum: any = 4;
  Tong: any = null;
  selectedXuatNhap: any = {};
  filterSanLuong: any = {};
  filterNhuCau: any = {};
  monthlyConfig: any = {};
  dataSet1: any = {};
  dataSet2: any = {};
  listOpts: any = [];
  listKho: any = [];
  listMatHang: any = [];
  listKhoAll: any = [];
  listMatHangAll: any = [];
  listTruySuatNguonGoc: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listXuatNhap: any = [];
  dataPie: any = {};
  IdDuAn: any;
  SelectItem: any = {};
  showXuatNhap: boolean = false;
  showTruySuatNguonGoc = false;
  $IdDuAn: Subscription = null;
  mapXuatNhap = {
    Xuat: 'Xuất',
    Nhap: 'Nhập'
  }
  mapXuatNhapRoute = {
    Xuat: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/',
    Nhap: '/quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/',
    KiemKe: '/quantri/quanlykhosanxuat/khothanhpham/kiemkekho/'
  }
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Khối lượng ( kg)'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label) {
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
          return `${formatNumber(tooltipItem.yLabel, 'en-EN', '0.0-2')} tấn`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: (((window.innerWidth - 80) * 2 / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
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
      }]
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
        precision: 2
      }
    },
    legend: {
      position: 'left',
      display:false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${this._data.labels2[tooltipItem.index]}: ${formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'en-EN', '0.0-2')} kg`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? null : (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  mapIndex_Ma: any = [];
  listItem: any = [];
  constructor(private _services: SanXuatService, private store: StoreService, public toastr: ToastrService, private _router: Router) {
    this.colsNum = this.store.isMobile ? 0 : 4;
    this.IdDuAn = this.store.getCurrent();
    this.$IdDuAn = this.store.getNhaMay().subscribe(res => {
      this.IdDuAn = res;
      let date = new Date();
      this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.filterAll._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filterAll._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.listItem = [];
      this.getAllOptions();
      // this.ChangeOpt();
      this.ChangeOptCanDoiTon();
    })
  }
  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.filterAll._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterAll._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.listItem = [];
    this.getAllOptions();
    // this.ChangeOpt();
    this.ChangeOptCanDoiTon();
  }

  ChangeOpt() {
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
      this.toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filter._denNgay = this.filter._tuNgay;
        this.ChangeOptCanDoiTon()
      }, 200)
    } else {
      if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && this.filter.TuNgay <= this.filter.DenNgay) {
        this.filter.IdDuAn = this.IdDuAn;
        this.filter.LoaiThoiGian = 0;
        this._services.BaoCao().GetDashBoard_NhuCauXuatHang(this.filter).subscribe((res: any) => {
          this.dataSet1 = res;
        })
        this._services.BaoCao().GetDashBoard_CoCauMatHang(this.filter).subscribe((res: any) => {
          this.mapIndex_Ma = deepCopy(res.labels);
          // res.labels= this.mapIndex_Ma.map(lb=>lb.split(' - ')[1]);
          res.labels = this.mapIndex_Ma.map(lb => {
            let arr = lb.split(' - ')
            if(arr.length===1){
              return arr[0]
            }
            if(arr.length>1){
              arr.shift()
              return arr.join(' - ')
            }
          });
          res.labels2 = this.mapIndex_Ma;
          this.dataPie = res;
        });
      }
    }0
  }

  getAllOptions() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Loai: 11,
      Ma: "",
      Ten: ""
    };
    setTimeout(
      () => {
        let data = {
          CurrentPage: 0,
          Loai: 11,
        }
        this._services.GetListdmKho(data).subscribe((res: any) => {
          res.unshift({ Id: '', Ten: 'Tất cả kho' });
          this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
          this.getMatHang();
        })
      }, 1000
    )
    setTimeout(
      () => {
        this._services.GetdmKhoThanhPhamHoiAm_DashBoard({ IdDuAn: this.store.getCurrent() }).subscribe((res: any) => {
          res.unshift({ Id: '', Ten: 'Tất cả kho' });
          this.listKhoAll = mapArrayForDropDown(res, "Ten", 'Id');
          this.getMatHangAll()
        })
      }, 1000
    )
  }
  getMatHang() {
    this._services.GetOptions().GetListdmItemTheoKhoThanhPhamHoiAm_DashboardNhuCauXuatHang(this.filter).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả mặt hàng' });
      this.listMatHang = mapArrayForDropDown(res, "Ten", 'Id');
      this.filter.IddmLoaiBong = '';
      this.ChangeOpt()
    })
  }
  getMatHangAll() {
    this._services.GetOptions().GetDashBoard_CanDoiTonXuatHang_TenMatHang(this.filterAll).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả mặt hàng' });
      this.listMatHangAll = mapArrayForDropDown(res, "Ten", 'Id');
      this.filterAll.IddmItem = '';
      setTimeout(() => {
        this.ChangeOptCanDoiTon()
      }, 500)
    })
  }
  ChangeOptCanDoiTon() {
    if (validVariable(this.filterAll._tuNgay)) {
      this.filterAll.TuNgay = DateToUnix(this.filterAll._tuNgay);
    } else {
      this.filterAll.TuNgay = null;
    }
    if (validVariable(this.filterAll._denNgay)) {
      this.filterAll.DenNgay = DateToUnix(this.filterAll._denNgay);
    } else {
      this.filterAll.DenNgay = null;
    }
    if (this.filterAll.DenNgay < this.filterAll.TuNgay) {
      this.toastr.error('Vui lòng chọn ngày kết thúc lớn hơn hoặc bằng ngày bắt đầu');
      setTimeout(() => {
        this.filterAll._denNgay = this.filterAll._tuNgay;
        this.ChangeOptCanDoiTon()
      }, 200)
    } else {
      if (validVariable(this.filterAll.TuNgay) && validVariable(this.filterAll.DenNgay) && this.filterAll.TuNgay <= this.filterAll.DenNgay) {
        this.filterAll.IdDuAn = this.store.getCurrent();
        this._services.BaoCao().GetDashBoard_CanDoiTonXuatHang(this.filterAll).subscribe((res: Array<any>) => {
          this.Tong = res.splice(0, 1)[0];
          console.log(this.Tong);
          this.listItem = res;
          console.log(this.voiPintable);
          this.voiPintable.active();
        })
      }
    }

  }
  checkMatHang(e, item, index) {
    if (e.checked) {
      this.listItem.forEach(mathang => {
        mathang.checked = false
      });
      this.listItem[index].checked = true;
      this.SelectItem = this.listItem[index];
    }
    else {
      this.SelectItem = {};
    }
  }

  xemTruySuatNguonGoc() {
    if (this.SelectItem.TendmItem != undefined && this.SelectItem != null) {
      console.log(this.SelectItem);
      if (validVariable(this.SelectItem?.IddmItem)) {
        this._services.GetDashBoard_TruyXuatNguonGoc(this.SelectItem.IddmItem, DateToUnix(this.filterAll._tuNgay), DateToUnix(this.filterAll._denNgay)).subscribe((res: any) => {
          this.showTruySuatNguonGoc = true;
          this.listTruySuatNguonGoc = res;
          this.listTruySuatNguonGoc.forEach(obj => {
            obj.herfgiaokehoachsanxuat = `#/quantri/kehoachsanxuat/giaokehoachsanxuat/${obj.IdGiaoKeHoachSanXuat}`;
            obj.herftrienkhaikehoachsanxuat = `#/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/${obj.IdGiaoKeHoachSanXuat_TrienKhai}`;
            obj.herfphabong = `#/quantri/trienkhaisanxuat/phabong/${obj.IdPhuongAnPhaBong}`;
          });
        })
      }
      else {
        this.toastr.error("Yêu cầu chọn mặt hàng");
      }
    }
    else {
      this.toastr.error("Yêu cầu chọn mặt hàng");
    }
  }
  callDataXuatNhap(opt, item) {
    console.log(opt, item)
    if (validVariable(this.filterAll._tuNgay)) {
      this.filterAll.TuNgay = DateToUnix(this.filterAll._tuNgay);
    } else {
      this.filterAll.TuNgay = null;
    }
    if (validVariable(this.filterAll._denNgay)) {
      this.filterAll.DenNgay = DateToUnix(this.filterAll._denNgay);
    } else {
      this.filterAll.DenNgay = null;
    }

    if (validVariable(this.filterAll.TuNgay) && validVariable(this.filterAll.DenNgay) && this.filterAll.TuNgay <= this.filterAll.DenNgay) {
      let data = {
        IddmItem: item.IddmItem,
        TuNgay: this.filterAll.TuNgay,
        DenNgay: this.filterAll.DenNgay,
        IdLoHang: item.IdLoHang,
        IddmKho: this.filterAll.IddmKho,
        IddmQuyCachDongGoi: item.IddmQuyCachDongGoi
      }
      this._services.DashBoard()[`GetDashBoard_Phieu${opt}Kho`](data).subscribe(res => {
        this.listXuatNhap = res;
        this.showXuatNhap = true;
        this.selectedXuatNhap = {
          Ten: `${this.mapXuatNhap[opt]} - ${item.TendmItem} - ${item.TenLoHang}`,
          opt: opt,
          field: `SoPhieu${opt}`,
          TenOpt: this.mapXuatNhap[opt],
        }
      })
    }

  }
  navigateXuatNhap(item) {
    let prefix = '';
    let route = [
      '',
      '/quantri/quanlysanxuatkhohoiam/khohoiam/nhapkho/',
      '/quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/',
      '/quantri/quanlykhosanxuat/khothanhpham/kiemkekho/',
      '/quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/',
    ]
    // if (this.selectedXuatNhap.opt === 'Xuat') {
    //   window.open(`#${this.mapXuatNhapRoute[this.selectedXuatNhap.opt]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`] || 0}`, "_blank");
    // }else{
    window.open(`#${route[item.LoaiPhieu]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`] || 0}`, "_blank");
    // }

    // this._router.navigate([`${this.mapXuatNhapRoute[this.selectedXuatNhap.opt]}${item[`IdPhieu${this.selectedXuatNhap.opt}Kho`]||0}`])
  }
  navigateKiemKe(item) {
    window.open(`#${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKe || 0}`, "_blank");
    // this._router.navigate([`${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKeKho||0}`])
  }
  ngOnDestroy(): void {
    this.$IdDuAn.unsubscribe();
  }
  XuatBaoCaoCanDoiTon() {
    this._services.BaoCao().ExportNhuCauXuatHang(this.filterAll).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State) && !validVariable(res.TenFile)) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
}
