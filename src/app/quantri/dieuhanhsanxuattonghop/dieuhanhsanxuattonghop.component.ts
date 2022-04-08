import { formatDate, formatNumber } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dieuhanhsanxuattonghop',
  templateUrl: './dieuhanhsanxuattonghop.component.html',
  styleUrls: ['./dieuhanhsanxuattonghop.component.css']
})
export class DieuhanhsanxuattonghopComponent implements OnInit, AfterViewInit, OnDestroy {
  filter: any = {
    IdDuAn: 0,
    IddmPhanXuong: "1cf3f340-0f55-4f34-938p-e329318e25et",
    IddmCaSanXuatThucTe: "",
    nNam: 0,
    nThang: 0,
    nNgay: 0,
    LoaiThoiGian: 0
  };
  @ViewChild('bangScroll') bangScroll: ElementRef;
  listNhaMay: any = [];
  listMatHang: any = [];
  listSanLuongOng: any = [];
  listPhanXuong: any = [];
  listLoaiThoiGian: any = [
    { value: 0, label: 'Ngày' },
    { value: 1, label: 'Tuần' },
    { value: 2, label: 'Tháng' },
  ]
  listCa: any = [];
  listThang: any = [];
  listtieuchi: any = [];
  listNgay: any = [];
  thongKes: any = [];
  thongKes1: any = [];
  Nams: any = [];
  dataSet1: any = {};
  showSanLuong = false;
  showLuyKeChiTiet = false;
  showTruySuatNguonGoc = false;
  currentUser: any;
  IdDuAn: any;
  listTruySuatNguonGoc: any = [];
  listHienThiSanLuongOng: any = [];
  labelSanLuongOng: any = '';
  labelLuyKeChiTiet: any = '';
  TongSanLuongOng: any = [];
  tempSanLuongOng: any = [];
  timKiem: any = {};
  timKiemBieuDoDien: any = {};
  showBieuDoDien: boolean = false;

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
      position: 'bottom',
      display: false
    },
    // tooltips: {
    //   callbacks: {
    //     label: function (tooltipItem, data) {
    //       return `${formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'en-EN')} kg`
    //     }
    //   }
    // },
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
  optionBar: any = {
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
            console.log(label);
            return formatNumber(label, 'en-EN', '0.0-2');
          }
        }
      }],
    },
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'en-EN')} %`
        }
      }
    }
  }
  optionBarDien: any = {
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
        id: 'K',
        scaleLabel: {
          display: true,
          labelString: 'Kwh'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'en-EN', '0.0-0');
          }
        }
      },
      {
        id: 'KK',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'Kwh/kg'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'en-EN', '0.0-0');
          }
        }
      }],
    },
    maintainAspectRatio: true,
    aspectRatio: 3,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          if (data.datasets[tooltipItem.datasetIndex].yAxisID === 'K') {
            return `${formatNumber(tooltipItem.yLabel, 'en-EN')} KWh`
          } else {
            return `${formatNumber(tooltipItem.yLabel, 'en-EN')} KWh/kg`
          }
        }
      }
    }
  }
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
        // type: 'category',
        // labels: ['January', 'February', 'March', 'April', 'May', 'June']
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80) / 2) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  SelectItem: any = {};
  dataPie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  chatLuongSanPham: any = [];
  headerChatLuongSanPham: any = [];
  chatLuongSanPhamScrollHeight: any = 0;
  suber: any;
  listLuyKeChiTiet: any = [];
  mapIndex_Ma: any = [];
  TongPheLuyKeChiTiet: any;
  TongKhoiLuongLuyKeChiTiet: any;
  TongPheSanLuong: any;
  TongKhoiLuongSanLuong: any;
  listXuatBaoCao = [
    { label: 'Báo cáo chất lượng SP', command: () => { this.xuatBaoCaoTieuChi() } },
    { label: 'Báo cáo chất lượng BCP', command: () => { this.xuatBaoCaoBanChePham() } }
  ];
  TyLeBongPhe_Hoi: any = [];
  ThongTinLuyKeDien:any = {};

  constructor(private _services: SanXuatService, private _auth: AuthenticationService, private store: StoreService, public toastr: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
    this.suber = this.store.getNhaMay().subscribe(res => {
      this.IdDuAn = res;
      // for (let i = 0; i < 20; i++) {
      //   this.Nams.push({ value: (new Date()).getFullYear() - i, label: (new Date()).getFullYear() - i });
      // }
      // for (let i = 1; i <= 12; i++) {
      //   this.listThang.push({ value: i, label: `Tháng ${i}` });
      //   this.headerChatLuongSanPham.push({
      //     label: `T ${i}`,
      //     prop: `Thang${i}`
      //   })
      // }
      // for (let i = 1; i <= 31; i++) {
      //   this.listNgay.push({ value: i, label: `${i}` });
      // }
      this.filter.nNgay = (new Date()).getDate();
      this.filter.nThang = (new Date()).getMonth() + 1;
      this.filter.nNam = (new Date()).getFullYear();
      this.getAllOptions();
    })
    // this.IdDuAn = this.store.getCurrent();
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.Nams.push({ value: (new Date()).getFullYear() - i, label: (new Date()).getFullYear() - i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
      this.headerChatLuongSanPham.push({
        label: `T ${i}`,
        prop: `Thang${i}`
      })
    }
    for (let i = 1; i <= 31; i++) {
      this.listNgay.push({ value: i, label: `${i}` });
    }
    let date = new Date();
    this.filterBieuDo_TienDien.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterBieuDo_TienDien.DenNgay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.filterBieuDo_TyLe.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterBieuDo_TyLe.DenNgay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.filter.nNgay = (new Date()).getDate();
    this.filter.nThang = (new Date()).getMonth() + 1;
    this.filter.nNam = (new Date()).getFullYear();
    this.getAllOptions();
  }

  ngAfterViewInit(): void {
    this.chatLuongSanPhamScrollHeight = `${this.bangScroll.nativeElement.offsetHeight - 35}px`;
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
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
    })
    this._services.BaoCao().GetDanhSachChiTieuChatLuong_BieuDo().subscribe((res: any) => {
      this.listtieuchi = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmChiTieu = this.listtieuchi.filter(obj => obj.label === "IPI")[0].value;
      // 2a3dbea0-6c3f-4e10-9774-6201027f4bd0
    })
    // this._services.GetOptions().GetMatHang().subscribe((res: any) => {
    //   let fakeMatHang = [
    //     { label: 'Ne 20 CD', TC: 110, T1: 85, T2: 104, T3: 98, T4: 104, T5: 149, T6: 98, T7: 85, T8: 115, T9: 80, T10: 78, T11: 115, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 14101 },
    //     { label: 'Ne 30 CD', TC: 400, T1: 503, T2: 467, T3: 371, T4: 619, T5: 474, T6: 426, T7: 322, T8: null, T9: 411, T10: 398, T11: 453, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 12021 },
    //     { label: 'Ne 36 CD', TC: 800, T1: 794, T2: 756, T3: 771, T4: null, T5: 909, T6: 717, T7: null, T8: null, T9: null, T10: null, T11: null, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 13803 },
    //     { label: 'Ne 40 CD', TC: 980, T1: 956, T2: 946, T3: 1143, T4: 1208, T5: 1163, T6: 962, T7: 972, T8: 801, T9: 823, T10: null, T11: null, T12: null, ChiSo: 2.02, Loai: 'Xuất khẩu', SoQua: 15070 },
    //   ]
    //   this.listMatHang = [...fakeMatHang, ...mapArrayForDropDown(res, 'Ten', 'Id')];
    //   this.listMatHang.forEach(mathang => {
    //     mathang.checked = false;
    //   });
    // });
    // this._services.GetListdmKho(data).subscribe((res: any) => {
    //   this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    // });
    // this._services.GetListCongDoan().subscribe((res: any) => {
    //   this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
    // });
    // this._services.GetListdmMay(data).subscribe((res: any) => {
    //   this.listMay = mapArrayForDropDown(res, "Ma", 'Id')
    // });
    this._services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng ca sản xuất' });
      this.listCa = mapArrayForDropDown(res, "Ten", 'Id')
    });
    // this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
    //   res.unshift({ Id: '', Ten: 'Tổng hợp' });
    //   this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    // })
    this._services.GetOptions().GetNhaMay().subscribe(async (res: any) => {
      this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.filter.IdDuAn = await res[0].Id;
      this.TongHop();
      this.BieuDoCoCau();
      this.GetBaoCaoQuyTrinhKiemTraChatLuong();
    });
  }

  filterdata() {
    this.TongHop();
    this.BieuDoCoCau();
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();
    this.SelectItem = {};
  }

  filterdatatonghop() {
    this.TongHop();
    this.BieuDoCoCau();
  }
  _formatN(num) {
    return formatNumber(num, 'en-EN', '0.0-2')
  }
  TongHop() {
    this.filter.IdDuAn = this.IdDuAn;
    this._services.BaoCao().TongHop(this.filter).subscribe((res: any) => {
      this.thongKes = res;
      this.thongKes = [
        { Ten: 'Sản lượng ống', TieuHao: res.SanLuongOng, DonVi: 'quả', DonViManHinh: '(kg)', ManHinh: this._formatN(res.SanLuongOng_ManHinh), button: 'chitietsanluongong' },
        { Ten: 'Lũy kế', TieuHao: res.LuyKe, DonVi: 'quả', DonViManHinh: '(kg)', ManHinh: this._formatN(res.LuyKe_ManHinh), button: 'chitietluyke' },
        // Điện k có màn hình
        { Ten: 'Điện AC | khí nén', TieuHao: "KwH", DonVi: 'KW', ManHinh: `${this._formatN(res.DienAC_KW)} | ${this._formatN(res.DienKhiNen_KW)}` },
        { Ten: 'Tổng điện', TieuHao: "KwH", DonVi: 'KW', ManHinh: this._formatN(res.TongDien_KW), button: 'xuatexceltongdien', button2: 'bieudotongdien' },
        { Ten: 'Tỷ lệ điện AC | Khí nén (3)/(4)', TieuHao: '%', DonVi: '%', ManHinh: `${this._formatN(res.DienAC_PhanTram)} | ${this._formatN(res.DienKhiNen_PhanTram)}` },
        { Ten: 'Tiêu hao BQ | BQ theo ca', TieuHao: 'KwH', DonVi: 'KwH/kg', ManHinh: `${this._formatN(res.TieuHaoDienBinhQuan)} | ${this._formatN(res.TieuHaoDienBinhQuan_TrenCa)}` },
      ]
      this.thongKes1 = [
        { Ten: 'Ne BQ:', GiaTri: res.NeBQ },
        { Ten: 'Sản lượng quy Ne 30(kg):', GiaTri: res.SanLuongQuyNe30 },
        { Ten: 'Sản lượng quy Ne 30/ca:', GiaTri: res.SanLuongQuyNe30_TrenCa },
        (this.filter.IddmCaSanXuatThucTe !== '')&&{ Ten: 'Sản lượng quy Ne 30 theo ca:', GiaTri: res.SanLuongQuyNe30_TheoKip },
        { Ten: 'Lũy kế quy Ne 30(kg):', GiaTri: res.LuyKeQuyNe30 },
        { Ten: 'Tỷ lệ sợi cắt (%):', GiaTri: res.TyLeSoiCat },
        { Ten: 'Tỷ lệ sợi con / Ống:', GiaTri: res.TyLeSoiCon },
        // { Ten: 'Tỷ lệ bông rơi chải thô F1:', GiaTri: res.TyleBongRoiChaiTho },
        // { Ten: 'Tỷ lệ bông rơi chải kỹ F3:', GiaTri: res.TyleBongRoiChaiKy },
        // { Ten: 'Tỷ lệ bông mùn (Bụi tinh):', GiaTri: res.TyleBongMun },
        // { Ten: 'Tỷ lệ bông hút mối/tiêu chuẩn:', GiaTri: res.TyLeBongHutMoi },
        // { Ten: 'Tỷ lệ cúi hồi:', GiaTri: res.TyLeCuiHoi },
        // { Ten: 'Tỷ lệ thô màng:', GiaTri: res.TyLeThoMang },
        // { Ten: 'Tỷ lệ hồi/bàn xơ:', GiaTri: res.TyLeHoiTrenBanXo },
        // { Ten: 'Tỷ lệ cotton/hồi:', GiaTri: res.TyLeCottonTrenHoi }
      ]
      // this.TyLeBongPhe_Hoi = [
      //   { Ten: 'Tỷ lệ bông rơi chải thô F1:', GiaTri: res.TyleBongRoiChaiTho, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ bông rơi chải kỹ F3:', GiaTri: res.TyleBongRoiChaiKy, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ bông mùn (Bụi tinh):', GiaTri: res.TyleBongMun, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ bông hút mối/tiêu chuẩn:', GiaTri: res.TyLeBongHutMoi, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ cúi hồi:', GiaTri: res.TyLeCuiHoi, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ thô màng:', GiaTri: res.TyLeThoMang, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ hồi/bàn xơ:', GiaTri: res.TyLeHoiTrenBanXo, LuyKe: 0 },
      //   { Ten: 'Tỷ lệ cotton/hồi:', GiaTri: res.TyLeCottonTrenHoi, LuyKe: 0 }
      // ]
    });
    this._services.BaoCao().GetDashBoard_SanLuongOng(this.filter).subscribe((res: any) => {
      this.labelSanLuongOng = `Sản lượng ống ${this.filter.nNgay}/${this.filter.nThang}/${this.filter.nNam}`
      let distinct = [...new Set(res.lstItem.map(ele => ele.IddmItem))]
      let listSanLuongOngtemp = distinct.map(IdMatHang => {
        let listMay = res.lstItem.filter(ele => ele.IddmItem === IdMatHang).sort((a, b) => {
          return a.TendmMay.localeCompare(b.TendmMay);
        });
        return {
          IddmItem: IdMatHang,
          Ne: listMay[0]?.Ne,
          TenMatHang: listMay[0]?.Ten,
          listMay: listMay,
          KhoiLuong: listMay.reduce((total, ele) => {
            return total + (ele.KhoiLuong || 0)
          }, 0),
          KhoiLuongThucTe: listMay.reduce((total, ele) => {
            return total + (ele.KhoiLuongThucTe || 0)
          }, 0),
          SoQuaSoiThucTe: listMay[0].SoQuaSoiThucTe
        }
      })
      console.log(listSanLuongOngtemp)
      this.listSanLuongOng = res.lstItem;
      this.TongKhoiLuongSanLuong = res.lstItem.reduce((total, ele) => ele.KhoiLuong + total, 0)
      this.TongPheSanLuong = res.TruVaoSanLuongGianMay;
      this.listHienThiSanLuongOng = listSanLuongOngtemp;
    })
    this._services.BaoCao().GetDashBoard_TongHop_LuyKe_ChiTiet(this.filter).subscribe((res: any) => {
      this.listLuyKeChiTiet = res.lstItem;
      this.TongKhoiLuongLuyKeChiTiet = res.lstItem.reduce((total, ele) => ele.KhoiLuong + total, 0)
      this.TongPheLuyKeChiTiet = res.TruVaoSanLuongGianMay;
      if (this.listLuyKeChiTiet.length < 9) {
        for (let i = 0; i < 12; i++) {
          let item = {};
          this.listLuyKeChiTiet.push(item);
        }
      }
      this.labelLuyKeChiTiet = `Lũy kế chi tiết đến ngày ${this.filter.nNgay}/${this.filter.nThang}/${this.filter.nNam}`
      console.log("LuyKeChiTiet", res);
    })
  }

  BieuDoCoCau() {
    this.filter.IdDuAn = this.IdDuAn;
    let data: any = { IdDuAn: this.filter.IdDuAn, IddmPhanXuong: this.filter.IddmPhanXuong, nNam: this.filter.nNam, nThang: this.filter.nThang };
    this._services.BaoCao().BieuDoCoCau(data).subscribe((res: any) => {
      this.mapIndex_Ma = deepCopy(res.labels);
      res.labels = this.mapIndex_Ma.map(lb => {
        let arr = lb.split(' - ')
        if (arr.length === 1) {
          return arr[0]
        }
        if (arr.length > 1) {
          arr.shift()
          return arr.join(' - ')
        }
      });
      res.labels2 = this.mapIndex_Ma;
      // res.labels.forEach(lb => {
      //   console.log(lb.split(' - '))
      // });
      this.dataPie = res;
    });
  }

  GetBaoCaoQuyTrinhKiemTraChatLuong() {
    // this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39").subscribe((res: any) => {
    this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, '').subscribe((res: any) => {
      this.listMatHang = res;
      this.listMatHang.forEach(mathang => {
        mathang.checked = false;
      });
      if (this.SelectItem?.IddmItem !== undefined) {
        console.log('exist', this.SelectItem);
        let exist = this.listMatHang.find(ele => ele.IddmItem === this.SelectItem.IddmItem);
        exist.checked = true;
        this.SelectItem = exist;
      } else {
        console.log('not exist', this.SelectItem);
        this.listMatHang[0].checked = true;
        this.SelectItem = this.listMatHang[0];
      }
      this.GetBieuDoDuongKiemTraChatLuong_js();
      this.dataSet1 = [];
    });
  }

  resetFilter() {
    this.filter.KeyWord = '';
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();
  }

  GetBieuDoDuongKiemTraChatLuong() {
    this.GetBaoCaoQuyTrinhKiemTraChatLuong();

    this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, this.SelectItem.IddmItem, this.filter.LoaiThoiGian).subscribe((res: any) => {
      // this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39", "02bd1952-5092-496f-a566-2f0ac6ab4940").subscribe((res: any) => {
      // this.dataSet1 = res;
      console.log(res);
      let label = this.listtieuchi.filter(obj => obj.value == this.filter.IddmChiTieu)[0].label;

      this.dataSet1 = {
        labels: res.lstLabel.map(ele => ele),
        datasets: [
          {
            type: 'line',
            label: this.SelectItem.TenItem,
            borderColor: '#FF0000',
            // borderWidth: 2,
            fill: false,
            data: res.listThucTe,
            // steppedLine: 'before'
          },
          {
            type: 'line',
            label: label,
            borderColor: '#0000E5',
            // borderDash: [10, 5],
            // borderWidth: 2,
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    });
  }

  xemSanLuong() {
    this.showSanLuong = true;
  }
  xemLuyKeChiTiet() {
    this.showLuyKeChiTiet = true;
  }

  checkMatHang(e, item, index) {
    if (e.checked) {
      this.listMatHang.forEach(mathang => {
        mathang.checked = false
      });
      this.listMatHang[index].checked = true;
      this.SelectItem = this.listMatHang[index];
      this.GetBieuDoDuongKiemTraChatLuong_js();
    }
    else {
      this.SelectItem = {};
      this.dataSet1 = [];
    }
  }
  checkXuatMatHang(e, item, index) {
    if (item.xuatChecked) {
      item.xuatChecked = !item.xuatChecked;
    } else {
      item.xuatChecked = true;
    }
  }
  GetBieuDoDuongKiemTraChatLuong_js() {

    this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, this.SelectItem.IddmItem, this.filter.LoaiThoiGian).subscribe((res: any) => {
      // this._services.BaoCao().GetBieuDoDuongKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39", "02bd1952-5092-496f-a566-2f0ac6ab4940").subscribe((res: any) => {
      // this.dataSet1 = res;
      let label = this.listtieuchi.filter(obj => obj.value == this.filter.IddmChiTieu)[0].label;

      this.dataSet1 = {
        labels: res.lstLabel.map(ele => ele),
        datasets: [
          {
            type: 'line',
            label: this.SelectItem.TenItem,
            borderColor: '#FF0000',
            // borderWidth: 2,
            fill: false,
            data: res.listThucTe,
            // steppedLine: 'before'
          },
          {
            type: 'line',
            label: label,
            borderColor: '#0000E5',
            // borderDash: [10, 5],
            // borderWidth: 2,
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    });
  }
  xuatBaoCaoDien() {
    this._services.DashBoard().ExportBaoCaoThongKeDien(this.filter).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  xuatBaoCaoTieuChi() {
    let data = this.filter;
    data.listItem = this.listMatHang.filter(mathang => mathang.xuatChecked === true).map(ele => ele.IddmItem);
    this._services.DashBoard().ExportBaoCaoThongKeChatLuong(this.filter).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State)) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  xemTruySuatNguonGoc() {
    if (this.SelectItem.IddmItem != undefined) {
      if (validVariable(this.SelectItem?.IddmItem)) {
        let data = this.filter;
        data.IddmItem = this.SelectItem.IddmItem;
        this._services.DashBoard().GetDashBoard_TruyXuatNguonGocTongHop(data).subscribe((res: any) => {
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
  ngOnDestroy() {
    this.suber.unsubscribe();
  }
  getBaoCaoLuyKe() {
    this.filter.TuNgay = DateToUnix(this.timKiem.TuNgayDate),
      this.filter.DenNgay = DateToUnix(this.timKiem.DenNgayDate),
      this._services.BaoCao().GetDashBoard_TongHop_LuyKe_ChiTiet(this.filter).subscribe((res: any) => {
        this.listLuyKeChiTiet = res.lstItem;
        this.TongKhoiLuongLuyKeChiTiet = res.lstItem.reduce((total, ele) => ele.KhoiLuong + total, 0)
        this.TongPheLuyKeChiTiet = res.TruVaoSanLuongGianMay;
        if (this.listLuyKeChiTiet.length < 9) {
          for (let i = 0; i < 12; i++) {
            let item = {};
            this.listLuyKeChiTiet.push(item);
          }
        }
        this.labelLuyKeChiTiet = `Lũy kế chi tiết đến ngày ${this.filter.nNgay}/${this.filter.nThang}/${this.filter.nNam}`
        console.log("LuyKeChiTiet", res);
      })
  }
  xuatBaoCaoTienDien() {
    let data = {
      nThang: this.filter.nThang,
      nNam: this.filter.nNam,
      IddmPhanXuong: this.filter.IddmPhanXuong
    }
    this._services.BaoCao().ExportBaoCaoThongKeTienDien(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (validVariable(res.State)) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  filterBieuDo_TienDien: any = {
  }

  getBieuDoDien() {
    let filter = {
      TuNgay: DateToUnix(this.filterBieuDo_TienDien.TuNgay),
      DenNgay: DateToUnix(this.filterBieuDo_TienDien.DenNgay),
      IddmPhanXuong: this.filter.IddmPhanXuong
    }
    this._services.BaoCao().GetBieuDo_TienDien(filter).subscribe((response: any) => {
      let res = response.listItem;
      this.ThongTinLuyKeDien = response;
      let datasets = res[0].listItem.map((loaidien, indexloaidien) => {
        return {
          type: 'bar',
          label: loaidien.TenLoaiDien,
          backgroundColor: this.arrayMau[indexloaidien],
          yAxisID: 'K',
          data: res.map(ngay => Math.round(ngay.listItem[indexloaidien].TongSoDien || 0)),
          borderColor: 'white'
        }
      })
      datasets.push({
        type: 'line',
        label: 'Tiêu hao điện bình quân',
        borderColor: '#ff6530',
        yAxisID: 'KK',
        fill: false,
        data: res.map(ele => ele.TongSoDien_QuyNE)
      })
      this.dataBieuDoDien = {
        labels: res.map(ele => formatDate(ele.NgayNhap, 'dd/MM/yyyy', 'en-EN')),
        datasets: datasets
      }
    })
  }
  dataBieuDoDien = {}
  bieuDoDien() {
    this.getBieuDoDien();
    this.showBieuDoDien = true;
  }
  filterBieuDo_TyLe: any = {
  }
  showBieuDoTyLe: boolean;
  dataBieuDoTyLe: any;
  arrayMau = ['#3366ff', '#009900', '#cc0000', '#990066', '#ffcc00', '#006666']
  getBieuDoTyLe() {
    let filter = {
      TuNgay: DateToUnix(this.filterBieuDo_TyLe.TuNgay),
      DenNgay: DateToUnix(this.filterBieuDo_TyLe.DenNgay),
      IddmPhanXuong: this.filter.IddmPhanXuong
    }
    this._services.BaoCao().GetBieuDo_TyLeThongKeSanLuong(filter).subscribe((res: Array<any>) => {
      console.log(res);
      // console.log(res.map(ele => Math.round(ele.TongTienDienGY || 0)));
      // console.log(res.map(ele => Math.round(ele.TongTienDien || 0)));
      let datasets = res[0].listItem.map((ele, index) => {
        return {
          type: 'bar',
          label: ele.Ten,
          borderColor: 'white',
          backgroundColor: this.arrayMau[index],
          data: res.map(ngay => {
            console.log(ngay.listItem[index].TyLe)
            return ngay.listItem[index].TyLe || 0
          })
        }
      })

      console.log(datasets);
      this.dataBieuDoTyLe = {
        labels: res.map(ele => formatDate(ele.Ngay, 'dd/MM/yyyy', 'en-EN')),
        datasets: datasets
      }
    })
  }
  bieuDoTyLeThongKeSanLuong() {
    this.getBieuDoTyLe();
    this.GetThongTyLeBongPhe_Hoi();
    this.showBieuDoTyLe = true;
  }
  GetThongTyLeBongPhe_Hoi(){
    let data = this.filter;
    this._services.DashBoard().GetDashBoard_TongHop_TyLeBongPheBongHoi(data).subscribe((res:any)=>{
       this.TyLeBongPhe_Hoi = [
        { Ten: 'Tỷ lệ bông rơi chải thô F1:', GiaTri: res.TyleBongRoiChaiTho, LuyKe: res.TyleBongRoiChaiThoLuyKe },
        { Ten: 'Tỷ lệ bông rơi chải kỹ F3:', GiaTri: res.TyleBongRoiChaiKy, LuyKe: res.TyleBongRoiChaiKyLuyKe },
        { Ten: 'Tỷ lệ bông mùn (Bụi tinh):', GiaTri: res.TyleBongMun, LuyKe: res.TyleBongMunLuyKe },
        { Ten: 'Tỷ lệ bông hút mối/tiêu chuẩn:', GiaTri: res.TyLeBongHutMoi, LuyKe: res.TyLeBongHutMoiLuyKe },
        { Ten: 'Tỷ lệ cúi hồi:', GiaTri: res.TyLeCuiHoi, LuyKe: res.TyLeCuiHoiLuyKe },
        { Ten: 'Tỷ lệ thô màng:', GiaTri: res.TyLeThoMang, LuyKe: res.TyLeThoMangLuyKe },
        { Ten: 'Tỷ lệ hồi/bàn xơ:', GiaTri: res.TyLeHoiTrenBanXoLuyKe, LuyKe: null },
        { Ten: 'Tỷ lệ cotton/hồi:', GiaTri: res.TyLeCottonTrenHoiLuyKe, LuyKe: null },
        // { Ten: 'Tỷ lệ hồi/bàn xơ:', GiaTri: res.TyLeHoiTrenBanXo, LuyKe: res.TyLeHoiTrenBanXoLuyKe },
        // { Ten: 'Tỷ lệ cotton/hồi:', GiaTri: res.TyLeCottonTrenHoi, LuyKe: res.TyLeCottonTrenHoiLuyKe },
      ]
    })
  }
  xuatBaoCaoBanChePham() {
    let data = this.filter;
    this._services.DashBoard().ExportBaoCaoThongKeChatLuongBanChePham(this.filter).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State)) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
}
