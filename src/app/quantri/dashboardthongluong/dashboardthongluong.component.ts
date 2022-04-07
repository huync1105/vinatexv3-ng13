import { AfterViewInit, Component, NgZone, OnInit, PLATFORM_ID, Inject,OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
// import * as am4core from '@amcharts/amcharts4/core';
import { create } from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
import {SlicedChart,FunnelSeries,Legend} from '@amcharts/amcharts4/charts'
import { formatNumber, isPlatformBrowser } from '@angular/common';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboardthongluong',
  templateUrl: './dashboardthongluong.component.html',
  styleUrls: ['./dashboardthongluong.component.css']
})
export class DashboardthongluongComponent implements OnInit, AfterViewInit,OnDestroy {
  filter: any = {
    IddmItem: '',
    opt: 'TyLe'
  };
  infos: any = {
    NgayMax: {
    },
    NgayMin: {
    },
    SanPhamMax: {
    },
    SanPhamMin: {
    }
  }
  listPhanXuong: any = [];
  listNhaMay: any = [];
  listMatHang: any = [];
  listOpt: any = [
    { value: 'TyLe', label: 'Hiệu suất sử dụng' },
    { value: 'KhoiLuong', label: 'Sản lượng' },
  ];
  mapValue_Prop: any = {
    'TyLe': 'TyLe',
    'KhoiLuong': 'KhoiLuongCongDoan'
  }
  chart: SlicedChart;
  suber:any;
  constructor(private _services: SanXuatService, private _toastr: ToastrService, @Inject(PLATFORM_ID) private platformId, private zone: NgZone, private store: StoreService) {
    this.filter.IdDuAn = this.store.getCurrent();
    this.suber = this.store.getNhaMay().subscribe(res=>{
      this.filter.IdDuAn = res;
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getAllOptions();
  }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit(): void {
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
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listMatHang.unshift({ value: '', label: 'Tất cả' })
      // console.log(res);
    });
    this.getPhanXuongTheoNhaMay();
    // this._services.GetOptions().GetNhaMay().subscribe(async (res: any) => {
    //   this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    //   this.filter.IdDuAn = await res[0].Id;
    //   this.getPhanXuongTheoNhaMay(res[0].Id)
    // });
  }
  getPhanXuongTheoNhaMay(IdNhaMay?) {
    this._services.GetOptions().GetPhanXuong(IdNhaMay ? IdNhaMay : this.filter.IdDuAn).subscribe(async (res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id')
      this.filter.IddmPhanXuong = await res[0].Id;
      this.GetBieuDo();
    })
  }
  GetBieuDo() {
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
      this._services.BaoCao().BaoCaoThongLuongSanXuat(this.filter).subscribe((res: any) => {
        let chart = create("ThongLuongChart", SlicedChart);
        chart.data = res.map(ele => {
          return {
            name: ele.TenCongDoan,
            // value: ele.TyLe ,
            value: ele[this.mapValue_Prop[this.filter.opt]],
            formated: formatNumber(ele.KhoiLuongCongDoan, 'en-EN', '0.0-2'),
            TyLe: formatNumber(ele.TyLe, 'en-EN', '0.0-2')
          }
        })
        let Series = chart.series.push(new FunnelSeries());
        Series.orientation = "horizontal";
        Series.dataFields.value = "value";
        Series.dataFields.category = "name";
        // Series.labels.template.disabled = true;
        Series.labels.template.text = "[bold white]{category}: [bold white]{formated} kg[/] [bold white]{TyLe}%";
        // Series.labels.template.text = "{category}";
        // Series.labels.template.verticalCenter="middle";
        // Series.labels.template.horizontalCenter="middle";
        Series.labels.template.fontSize = 14;
        Series.labels.template.rotation = 45;
        Series.slices.template.tooltipText = "[bold white]{category}: [bold white]{formated} kg[/] [bold white]{TyLe}%";
        // Series.alignLabels = true;
        // chart.legend = new am4charts.Legend();
        // chart.legend = new Legend();
        // chart.legend.position = "top";
        // chart.legend.valueLabels.template.text="[bold]{formated} kg[/] [bold red]{TyLe}%";
        this.chart = chart;
      })
      this._services.BaoCao().BaoCaoThongLuongSanXuatMinMax(this.filter).subscribe((res: any) => {
        for (let prop in res) {
          if (validVariable(res[prop])) {
            this.infos[prop] = res[prop]
          } else {
            this.infos[prop] = {};
          }
        }
      })
    } else {
      this._toastr.warning('Vui lòng chọn đến ngày lớn hơn từ ngày để ra được dữ liệu chuẩn!');
    }
  }
  ngOnDestroy(){
    this.suber.unsubscribe();
  }
}
