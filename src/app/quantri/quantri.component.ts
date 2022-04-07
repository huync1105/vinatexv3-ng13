import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MenuItem } from "primeng/api";
import { AuthenticationService } from "../services/auth.service";
import { ModaldoimatkhauComponent } from "./modal/modaldoimatkhau/modaldoimatkhau.component";
import { filter } from "rxjs/operators";
import { SanXuatService } from "../services/callApiSanXuat";
import { StoreService } from "../services/store.service";
import { mapArrayForDropDown, validVariable } from "../services/globalfunction";
import { SignalRService } from "../services/signalR.service";
import { mapQuyTrinhRoute } from "../services/mapquytrinhroute";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-quantri",
  templateUrl: "./quantri.component.html",
  styleUrls: ["./quantri.component.css"],
})
export class QuantriComponent implements OnInit {
  userBtn: any;
  userInfo: any;
  userSub: any;
  newNoti: any = 0;
  listNotis: any = [];
  // userName: any = 'Vinatex';
  display: boolean = false;
  OSName: string = "HỆ THỐNG Quản lý Nhà – Đất";
  menu: MenuItem[];
  menuQLTS: MenuItem[];
  menuQLNS: MenuItem[];
  dataphanquyen: any = {};
  listNhaMay: Array<any> = [];
  IdNhaMay: string = "";
  showDropDown: boolean = false;
  canSendMessage: any;
  mapQuyTrinhRoute: any = mapQuyTrinhRoute;
  showHopDongModule: any = false;
  showTaiSanModule: any = false;
  @ViewChild("listNoti") listNoti;
  constructor(
    private _auth: AuthenticationService,
    private _modal: NgbModal,
    private _router: Router,
    private _services: SanXuatService,
    private store: StoreService,
    private _signalRService: SignalRService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
    this.getOSName(this._router.url);
    this.subscribeToEvents();
    this.canSendMessage = _signalRService.connectionExists;
  }
  close() {
    this.display = false;
  }
  getOSName(url) {
    // if (url.includes("sanxuat")) {
    this.showDropDown = true;
    this.OSName = "Hệ thống quản trị ngành sợi";
    this.getListNhaMay();
    // } else {
    //   this.showDropDown = false;
    //   this.OSName = "HỆ THỐNG Quản lý Nhà – Đất";
    // }
  }
  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
        if (!validVariable(this.store.getCurrent())) {
          this.IdNhaMay = res[0].Id;
        } else {
          this.IdNhaMay = this.store.getCurrent()
        }
      });
  }
  setGlobalNhaMay(event) {
    this.store.setNhaMay(event.value);
  }
  open(event) {
    this.listNoti.toggle(event);
  }
  readedAllNoti() {
    this._services
      .Notifications()
      .MarkAllRead()
      .subscribe((res) => {
        console.log(res);
        this.refreshNotis();
      });
  }
  readOne(item) {
    console.log(item);
    this._services
      .Notifications()
      .XemNotification({ Item: item })
      .subscribe((res) => {
        this.refreshNotis();
      });
    // let read = this.listNotis.find(ele => ele.Id === item.Id);
    // if (read) {
    //     read.isRead = true
    // }
    // this.newNoti = this.listNotis.filter(ele => ele.isRead !== true).length;
    let routerURL = this.mapQuyTrinhRoute[item.LoaiThongBao];

    if (routerURL) {
      // this._router.navigate([`${routerURL}0`]);
      // setTimeout(()=>{
      this._router.navigate([`${routerURL}${item.IdQuyTrinh || 0}`]);
      // },1000)
    } else {
      this._toastr.warning("Không tìm thấy điều hướng của thông báo!");
    }
  }
  refreshNotis() {
    this.GetCount();
    this.GetListNotis();
  }

  GetCount() {
    this._services
      .Notifications()
      .GetNotiCounAndNew()
      .subscribe((res: any) => {
        this.newNoti = res.Count;
        res.ListNew.forEach((noti) => {
          this._toastr.info(noti.NoiDung, noti.TieuDe);
        });
      });
  }
  GetListNotis() {
    this._services
      .Notifications()
      .GetListNotification()
      .subscribe((res: any) => {
        this.listNotis = res.ListItem;
      });
  }
  GetMoreNotis() {
    this._services
      .Notifications()
      .GetMoreNotification(this.listNotis[this.listNotis.length - 1].Id)
      .subscribe((res: any) => {
        this.listNotis = [...this.listNotis, ...res.ListItem];
      });
  }

  ngOnInit(): void {
    this.showHopDongModule = (window.location.origin.includes('localhost') || window.location.origin.includes('2269'));
    this.showTaiSanModule = (window.location.origin.includes('localhost') || window.location.origin.includes('2269'));
    // this.showTaiSanModule = true;
    this.refreshNotis();
    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.getOSName(res.url);
      });
    this._services.GetAllQuyen().subscribe((res: any) => {
      this.dataphanquyen = res;
      this.CaiMeNu();
    });
    this.userBtn = [
      // {
      //     label: 'Thông tin tài khoản', command: () => {
      //     }
      // },
      {
        label: "Đổi mật khẩu",
        command: () => {
          let modalRef = this._modal.open(ModaldoimatkhauComponent, {
            backdrop: "static",
          });
        },
      },

      { separator: true },
      {
        label: "Đăng xuất",
        routerLink: ["/login"],
        command: () => {
          this.store.setNhaMay('');
          this._auth.logout();
        },
      },
    ];
  }

  CaiMeNu() {
    this.menuQLNS = [
      {
        label: "Quản trị sản xuất",
        routerLink: "/quantri/quantrisanxuat",
        icon: "fas fa-warehouse",
        visible: !this.checkmenu("P_QUANTRISANXUAT"),
        items: [
          {
            label: "Tổng hợp",
            routerLink: "/quantri/quantrisanxuat/tonghop",
            separator: this.checkmenu("DASHBOARD_TONGHOP"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
          {
            label: "Nhu cầu SD nguyên liệu",
            routerLink: "/quantri/quantrisanxuat/nguyenlieu",
            separator: this.checkmenu("DASHBOARD_NHUCAUNGUYENLIEU"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
          {
            label: "Nhu cầu xuất hàng",
            routerLink: "/quantri/quantrisanxuat/nhucauxuathang",
            separator: this.checkmenu("DASHBOARD_NHUCAUXUATHANG"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
          {
            label: "Sản lượng",
            routerLink: "/quantri/quantrisanxuat/sanluong",
            separator: this.checkmenu("DASHBOARD_SANLUONG"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
          {
            label: "Thông lượng",
            routerLink: "/quantri/quantrisanxuat/thongluong",
            separator: this.checkmenu("DASHBOARD_THONGLUONG"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
          {
            label: "Thống kê tiền điện",
            routerLink: "/quantri/quantrisanxuat/tiendien",
            separator: this.checkmenu("DASHBOARD_TONGHOP"),
            icon: "fas fa-circle",
            command: () => {
              this.close();
            },
          },
        ],
      },
      {
        label: "Giao kế hoạch",
        routerLink: "/quantri/giaokehoachsanxuat",
        icon: "fas fa-circle",
        visible: !this.checkmenu("P_GIAOKEHOACH"),
        items: [
          {
            label: "Giao kế hoạch sản xuất",
            routerLink: "/quantri/kehoachsanxuat/giaokehoachsanxuat/0",
            separator: this.checkmenu("GIAOKEHOACHSANXUAT"),
            command: () => {
              this.close();
            },
          },
          // {
          //     label: 'Giao kế hoạch sản xuất hoàn thành',
          //     routerLink: '/quantri/kehoachsanxuat/giaokehoachsanxuathoanthanh/0',
          //     separator: this.checkmenu("GIAOKEHOACHSANXUAT"),
          //     command: () => {
          //         this.close()
          //     }
          // },
          {
            label: "Kế hoạch nhập bông",
            routerLink:
              "/quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieu/0",
            separator: this.checkmenu("KEHOACHNHAPNGUYENLIEU"),
            command: () => this.close(),
          },
          {
            label: "Kế hoạch nhập bông invoice",
            routerLink:
              "/quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieuinvoice/0",
            separator: this.checkmenu("KEHOACHNHAPNGUYENLIEUINVOICE"),
            command: () => this.close(),
          },
          {
            label: "Kế hoạch xuất sợi",
            routerLink:
              "/quantri/quanlysanxuatkhothanhpham/khothanhpham/kehoachxuathang/0",
            separator: this.checkmenu("KEHOACHXUATHANG"),
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Điều hành sản xuất",
        routerLink: "/quantri/kehoachsanxuat",
        icon: "fas fa-circle",
        visible: !this.checkmenu("P_DIEUHANHSANXUAT"),
        items: [
          {
            label: "Triển khai kế hoạch sản xuất",
            routerLink: "/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/0",
            separator: this.checkmenu("TRIENKHAIKEHOACHSANXUAT"),
            command: () => {
              this.close();
            },
          },
          {
            label: "Cân đối chuyền",
            routerLink: "/quantri/kehoachsanxuat/candoichuyen",
            separator: this.checkmenu("CANDOICHUYEN"),
            command: () => {
              this.close();
            },
          },
          {
            label: "Yêu cầu xuất bông",
            routerLink: "/quantri/kehoachsanxuat/sanxuat/0",
            separator: this.checkmenu("PHUONGANSANXUAT"),
            command: () => this.close(),
          },
          {
            label: "Lô hàng",
            routerLink: "/quantri/kehoachsanxuat/lohang",
            separator: this.checkmenu("LOHANG"),
            command: () => this.close(),
          },
          {
            label: "KgCone",
            routerLink: "/quantri/phanquyensanxuat/dmkgcone",
            separator: this.checkmenu("LOHANG"),
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Phương án công nghệ",
        routerLink: "/quantri/trienkhaisanxuat",
        icon: "fas fa-circle",
        visible: !this.checkmenu("P_PHUONGANCONGNGHE"),
        items: [
          {
            label: "Phương án pha bông",
            routerLink: "/quantri/trienkhaisanxuat/phabong/0",
            separator: this.checkmenu("PHUONGANPHABONG"),
            command: () => this.close(),
          },
          {
            label: "Phương án tìm bông",
            routerLink: "/quantri/trienkhaisanxuat/timbong/0",
            separator: this.checkmenu("PHUONGANTIMBONG"),
            command: () => this.close(),
          },

          {
            label: "Xếp bàn bông",
            routerLink: "/quantri/trienkhaisanxuat/xepbanbong/0",
            separator: this.checkmenu("PHUONGANXEPBANBONG"),
            command: () => this.close(),
          },
          {
            label: "Phiếu điều chỉnh",
            routerLink: "/quantri/trienkhaisanxuat/phieudieuchinh/0",
            separator: this.checkmenu("DIEUCHINHDOIKIENBONG"),
            command: () => this.close(),
          },
          {
            label: "Thông số chất lượng",
            routerLink: "/quantri/quanlykhosanxuat/khobong/thongsochatluong/0",
            separator: this.checkmenu("PHIEUNHAPLOBONG_CHATLUONG"),
            command: () => this.close(),
          },
          {
            label: "Lô bông",
            routerLink: "/quantri/phanquyensanxuat/lobong",
            separator: this.checkmenu("LOBONG"),
            command: () => this.close(),
          },
          {
            label: "Kiểm tra bán chế phẩm",
            routerLink: "/quantri/quanlykhosanxuat/khobong/kiemtrabanchepham/0",
            separator: this.checkmenu("KIEMTRABANCHEPHAM"),
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Thống kê sản xuất",
        icon: "pi pi-chart-bar",
        routerLink: "/quantri/theodoithongkebaocaosanxuat",
        expanded: false,
        visible: !this.checkmenu("P_THONGKESANXUAT"),
        items: [
          {
            label: "Thống kê sản lượng",
            routerLink:
              "/quantri/theodoithongkebaocaosanxuat/thongkesanluong/0",
            separator: this.checkmenu("THONGKESANLUONG"),
            command: () => this.close(),
          },
          {
            label: "Thống kê sản lượng ca",
            routerLink:
              "/quantri/theodoithongkebaocaosanxuat/thongkesanluongca/0",
            separator: this.checkmenu("THONGKESANLUONG"),
            command: () => this.close(),
          },
          {
            label: "Thống kê điện",
            routerLink: "/quantri/theodoithongkebaocaosanxuat/thongkedien/0",
            separator: this.checkmenu("THONGKEDIEN"),
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Quản lý kho hồi ẩm",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlysanxuatkhohoiam/khohoiam",
        expanded: false,
        visible: !this.checkmenu("P_KHOHOIAM"),
        items: [
          {
            label: "Nhập kho",
            routerLink: "/quantri/quanlysanxuatkhohoiam/khohoiam/nhapkho/0",
            separator: this.checkmenu("NHAPHOIAM"),
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink: "/quantri/quanlysanxuatkhohoiam/khohoiam/xuatkho/0",
            separator: this.checkmenu("NHAPTHANHPHAM"),
            command: () => this.close(),
          },
          {
            label: "Chất lượng sợi",
            routerLink:
              "/quantri/quanlysanxuatkhohoiam/khohoiam/chatluongsoi/0",
            separator: this.checkmenu("KIEMTRACHATLUONGSOI"),
            command: () => this.close(),
          },
          {
            label: "Hạ cấp",
            routerLink: "/quantri/quanlysanxuatkhohoiam/khohoiam/hacap/0",
            separator: this.checkmenu("PHIEUHACAP"),
            command: () => this.close(),
          },
          {
            label: 'Kiểm kê kho',
            routerLink: '/quantri/quanlysanxuatkhohoiam/quanlysanxuatkhohoiam/kiemkekho/0',
            separator: this.checkmenu("KIEMKEKHOHOIAM"),
            command: () => this.close()
          },
          // {
          //     label: 'Thẻ kho',
          //     routerLink: '/quantri/quanlykhosanxuat/tonkho/khohoiam/0',
          //     command: () => this.close()
          // },
        ],
      },
      {
        label: "Quản lý kho thành phẩm",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlysanxuatkhothanhpham/khothanhpham",
        expanded: false,
        visible: !this.checkmenu("P_KHOTHANHPHAM"),
        items: [
          {
            label: "Nhập kho",
            routerLink:
              "/quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/0",
            separator: this.checkmenu("NHAPTHANHPHAM"),
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink:
              "/quantri/quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/0",
            separator: this.checkmenu("XUATTHANHPHAM"),
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink: "/quantri/quanlykhosanxuat/khothanhpham/kiemkekho/0",
            separator: this.checkmenu("KIEMKEKHOTHANHPHAM"),
            command: () => this.close(),
          },
          {
            label: "Thẻ kho",
            routerLink: "/quantri/quanlykhosanxuat/tonkho/khothanhpham/0",
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Quản lý kho bông",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlykhosanxuat/khobong",
        expanded: false,
        visible: !this.checkmenu("P_KHOBONG"),
        items: [
          {
            label: "Nhập kho",
            routerLink: "/quantri/quanlykhosanxuat/khobong/nhapkho/0",
            separator: this.checkmenu("PHIEUNHAPLOBONG"),
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink: "/quantri/quanlykhosanxuat/khobong/xuatkho/0",
            separator: this.checkmenu("PHIEUXUATBONG"),
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink: "/quantri/quanlykhosanxuat/khobong/kiemkekhobong/0",
            separator: this.checkmenu("KIEMKEKHOBONG"),
            command: () => this.close(),
          },
          {
            label: "Thẻ kho",
            routerLink: "/quantri/quanlykhosanxuat/tonkhobongxo/khobong/0",
            command: () => this.close(),
          },
          {
            label: "Cho vay",
            routerLink: "/quantri/quanlykhosanxuat/xuatbongchovay/khobong/0",
            separator: this.checkmenu("PHIEUXUATBONGCHOVAY"),
            command: () => this.close(),
          },
          // {
          //     label: 'Điều chuyển',
          //     routerLink: '/quantri/quanlykhosanxuat/khobong/dieuchuyen/0',
          //     command: () => this.close()
          // },

          // {
          //     label: 'Cân đối tồn',
          //     routerLink: '/quantri/quanlykhosanxuat/khobong/candoiton/0',
          //     command: () => this.close()
          // },
        ],
      },
      {
        label: "Quản lý kho xơ",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlykhosanxuat/khoxo",
        expanded: false,
        visible: !this.checkmenu("P_KHOXO"),

        items: [
          {
            label: "Nhập kho",
            routerLink: "/quantri/quanlykhosanxuat/khoxo/nhapkho/0",
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink: "/quantri/quanlykhosanxuat/khoxo/xuatkho/0",
            separator: this.checkmenu("PHIEUXUATXO"),
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink: "/quantri/quanlykhosanxuat/khoxo/kiemkekhoxo/0",
            separator: this.checkmenu("KIEMKEKHOXO"),
            command: () => this.close(),
          },
          {
            label: "Thẻ kho",
            routerLink: "/quantri/quanlykhosanxuat/tonkhobongxo/khoxo/0",
            command: () => this.close(),
          },
          // {
          //     label: 'Điều chuyển',
          //     routerLink: '/quantri/quanlykhosanxuat/khoxo/dieuchuyen/0',
          //     command: () => this.close()
          // },
        ],
      },
      {
        label: "Quản lý kho bông hồi",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlykhosanxuatbongkhac/khobonghoi",
        expanded: false,
        visible: !this.checkmenu("P_KHOBONGHOI"),

        items: [
          {
            label: "Nhập kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khobonghoi/nhapkho/0",
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khobonghoi/xuatkho/0",
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink:
              "/quantri/quanlykhosanxuat/khobonghoi/kiemkekhobonghoi/0",
            separator: this.checkmenu("KIEMKEKHOBONGHOI"),
            command: () => this.close(),
          },
          {
            label: "Thẻ kho",
            routerLink: "/quantri/quanlykhosanxuat/tonkhobonghoi/khobonghoi/0",
            command: () => this.close(),
          },
          // {
          //     label: 'Điều chuyển',
          //     routerLink: '/quantri/quanlykhosanxuatbongkhac/khobonghoi/dieuchuyen/0',
          //     command: () => this.close()
          // },
        ],
      },
      {
        label: "Quản lý kho bông phế",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlykhosanxuatbongkhac/khobongphe",
        expanded: false,
        visible: !this.checkmenu("P_KHOBONGPHE"),
        items: [
          {
            label: "Nhập kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khobongphe/nhapkho/0",
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khobongphe/xuatkho/0",
            separator: this.checkmenu("PHIEUXUATBONGPHE"),
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink:
              "/quantri/quanlykhosanxuat/khobongphe/kiemkekhobongphe/0",
            separator: this.checkmenu("KIEMKEKHOBONGPHE"),
            command: () => this.close(),
          },
          {
            label: "Thẻ kho",
            routerLink: "/quantri/quanlykhosanxuat/tonkhobongphe/khobongphe/0",
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Quản lý kho vật tư phụ",
        icon: "fas fa-circle",
        routerLink: "/quantri/quanlykhosanxuatbongkhac/khovattuphu",
        expanded: false,
        visible: this.showHopDongModule,
        items: [
          {
            label: "Nhập kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khovattuphu/nhapkho/0",
            command: () => this.close(),
          },
          {
            label: "Xuất kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khovattuphu/xuatkho/0",
            separator: this.checkmenu("PHIEUXUATBONGPHE"),
            command: () => this.close(),
          },
          {
            label: "Kiểm kê kho",
            routerLink:
              "/quantri/quanlykhosanxuatbongkhac/khovattuphu/kiemkekho/0",
            separator: this.checkmenu("KIEMKEKHOBONGPHE"),
            command: () => this.close(),
          },
        ],
      },
      {
        label: "Thông tin hợp đồng",
        icon: "fas fa-circle",
        routerLink: "/quantri/hopdongsanxuat",
        visible: this.showHopDongModule,
        items: [
          {
            label: "Danh sách HĐ bông/xơ",
            routerLink: "/quantri/hopdongsanxuat/danhsachhopdongbongxo/0",
            command: () => this.close(),
          },
          {
            label: "Danh sách HĐ sợi",
            routerLink: "/quantri/hopdongsanxuat/danhsachhopdongsoi/0",
            command: () => this.close(),
          },
          {
            label: "Danh sách HĐ vật tư phụ",
            routerLink: "/quantri/hopdongsanxuat/danhsachhopdongvattuphu/0",
            command: () => this.close(),
          },
          {
            label: "Lập hợp đồng bông xơ",
            routerLink:
              "/quantri/hopdongsanxuat/laphopdongbongxo/0",

            command: () => this.close(),
          },
          {
            label: "Lập hợp đồng sợi",
            routerLink:

              "/quantri/hopdongsanxuat/laphopdongsoi/0",

            command: () => this.close(),
          },
          {
            label: "Lập hợp đồng vật tư phụ",
            routerLink:

              "/quantri/hopdongsanxuat/laphopdongvattuphu/0",

            command: () => this.close(),
          },
        ],
      },


      {
        label: "Thực hiện hợp đồng",
        icon: "fas fa-circle",
        routerLink: "/quantri/thuchienhopdong",
        visible: this.showHopDongModule,
        items: [
          {
            label: "Giao kế hoạch sản xuất",
            routerLink: "/quantri/hopdongsanxuat/giaokehoachsanxuat/0",
            command: () => {
              this.close();
            },
          },
          {
            label: "Kế hoạch nhập bông",
            routerLink: "/quantri/hopdongsanxuat/kehoachnhapbong/0",

            command: () => this.close(),
          },
          {
            label: "Phiếu nhập bông",
            routerLink: "/quantri/hopdongsanxuat/nhapkho/0",

            command: () => this.close(),
          },
          {
            label: "Phiếu xuất lô bông/xơ",
            routerLink: "/quantri/hopdongsanxuat/phieuxuatlobongxo/0",
            command: () => {
              this.close();
            },
          },
          {
            label: "Phiếu nhập vật tư phụ",
            routerLink: "/quantri/hopdongsanxuat/nhapvattuphu/0",
            command: () => this.close(),
          },
          {
            label: "Phiếu xuất sợi",
            routerLink:
              "/quantri/hopdongsanxuat/xuatkhothanhpham/0",

            command: () => this.close(),
          },

          {
            label: "Thanh toán bông",
            routerLink: "/quantri/hopdongsanxuat/quytrinhthanhtoanbong/0",

            command: () => this.close(),
          },
          {
            label: "Thanh toán sợi",
            routerLink: "/quantri/hopdongsanxuat/quytrinhthanhtoansoi/0",

            command: () => this.close(),
          },
          {
            label: "Thanh toán vật tư phụ",
            routerLink: "/quantri/hopdongsanxuat/quytrinhthanhtoanvattuphu/0",

            command: () => this.close(),
          },
          {
            label: "Phạt hợp đồng",
            routerLink: "/quantri/hopdongsanxuat/phathopdong/0",

            command: () => this.close(),
          },
          // {
          //   label: "Gia hạn hợp đồng",
          //   routerLink: "/quantri/hopdongsanxuat/giahanhopdong/0",

          //   command: () => this.close(),
          // },
          // {
          //   label: "Giao nhận hàng hoá",
          //   routerLink: "/quantri/hopdongsanxuat/giaonhanhanghoa/0",

          //   command: () => this.close(),
          // },
          {
            label: "Quyết toán hợp đồng",
            routerLink: "/quantri/hopdongsanxuat/quyettoanhopdong/0",

            command: () => this.close(),
          },
          {
            label: "Đánh giá khách hàng",
            routerLink: "/quantri/hopdongsanxuat/danhgiakhachhang/0",

            command: () => this.close(),
          },
        ],
      },
      /////////////      Danh Mục Hợp Đồng
      {
        label: "Danh mục hợp đồng",
        icon: "fas fa-circle",
        routerLink: "/quantri/danhmuchopdong",
        visible: this.showHopDongModule,
        items: [
          {
            label: "Hình thức thanh toán",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/danhmuchinhthucthanhtoan",
            command: () => this.close(),
          },
          {
            label: "Loại tiền tệ",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmucloaitiente",

            command: () => this.close(),
          },
          {
            label: "Thủ tục thanh toán",

            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmucthutucthanhtoan",
            command: () => this.close(),
          },
          {
            label: "Tình trạng bảo lãnh",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmuctrangthaibaolanh",
            command: () => this.close(),
          },
          {
            label: "Tiêu chí chất lượng",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/dmtieuchichatluong",
            command: () => this.close(),
          },
          {
            label: "Tiêu chí đánh giá",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/dmtieuchidanhgia",
            command: () => this.close(),
          },
        ],
      },

      /////////////      Quản lý tài sản
      {
        label: "Quản lý tài sản",
        icon: "fas fa-circle",
        routerLink: "/quantri/taisan",
        visible: this.showTaiSanModule,
        items: [
          {
            label: "Quản lý thông tin tài sản",
            items: [
              {
                label: "Danh sách tài sản",
                routerLink: "/quantri/taisan/danhsachtaisan",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Nhập tài sản",
                routerLink: "/quantri/taisan/nhaptaisan/0",
                command: () => {
                  this.close();
                },
              },
            ]
          },
          {
            label: "Quản lý bảo trì, bảo dưỡng",
            items: [
              {
                label: "Lịch xích năm",
                routerLink: "/quantri/taisan/lichxichnam",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Lịch xích tháng",
                routerLink: "/quantri/taisan/lichxichthang",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Lập kế hoạch lịch xích năm",
                routerLink: "/quantri/taisan/quytrinhlapkehoachnam/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Lập kế hoạch lịch xích tháng",
                routerLink: "/quantri/taisan/quytrinhlapkehoachthang/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Quy trình bảo dưỡng",
                routerLink: "/quantri/taisan/quytrinhbaoduong/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Đề nghị xử lý sự cố",
                routerLink: "/quantri/taisan/denghixulisuco/0",
                command: () => {
                  this.close();
                },
              },

            ]
          },
          {
            label: "Nhật ký sử dụng",
            items: [
              {
                label: "Bàn giao tài sản",
                routerLink: "/quantri/taisan/bangiaotaisan/0",
                command: () => {
                  this.close();
                },
              },
              // {
              //   label: "Điều chuyển tài sản",
              //   routerLink: "/quantri/taisan/dieuchuyentaisan/0",
              //   command: () => {
              //     this.close();
              //   },
              // },
              {
                label: "Thu hồi tài sản",
                routerLink: "/quantri/taisan/thuhoitaisan/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Thanh lý tài sản",
                routerLink: "/quantri/taisan/thanhlytaisan/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Tính Khấu hao tài sản",
                routerLink: "/quantri/taisan/khauhaotaisan/0",
                command: () => {
                  this.close();
                },
              },
            ]
          },
          {
            label: "Quản lý vật tư dự trù",
            items: [
              {
                label: "Danh sách nhập vật tư",
                routerLink: "/quantri/taisan/danhsachvattu",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Thời hạn cung cấp",
                routerLink: "/quantri/taisan/thoihancungcapvattu/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Quy trình nhập vật tư",
                routerLink: "/quantri/taisan/quytrinhnhapvattu/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Đề nghị thay vật tư",
                routerLink: "/quantri/taisan/quytrinhdenghithayvattu/0",
                command: () => {
                  this.close();
                },
              },
            ]
          },
          {
            label: "Quản lý nhà cung ứng",
            items: [
              {
                label: "Nhóm nhà cung ứng",
                routerLink: "/quantri/taisan/nhomnhacungung",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Danh mục nhà cung ứng",
                routerLink: "/quantri/taisan/danhmucnhacungung",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Đánh giá nhà cung ứng",
                routerLink: "/quantri/taisan/danhgianhacungung/0",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Tiêu chí đánh giá",
                routerLink: "/quantri/taisan/tieuchidanhgia/0",
                command: () => {
                  this.close();
                },
              },
            ]
          },
          {
            label: "Danh mục ",
            items: [
              {
                label: "Loại tài sản",
                routerLink: "/quantri/taisan/danhmuc/danhmucloaitaisan",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Mức độ ưu tiên",
                routerLink: "/quantri/taisan/danhmuc/mucdouutien",
                command: () => {
                  this.close();
                },
              },
              {
                label: "Loại sự cố",
                routerLink: "/quantri/taisan/danhmuc/loaisuco",
                command: () => {
                  this.close();
                },
              },
              // {
              //   label: "Nhà cung cấp",
              //   routerLink: "/quantri/taisan/danhmuc/nhacungcap",
              //   command: () => {
              //     this.close();
              //   },
              // },
              {
                label: "Loại bảo dưỡng ",
                routerLink: "/quantri/taisan/danhmuc/danhmucloaibaoduong",
                command: () => {
                  this.close();
                },
              },
            ]
          },
          // {
          //   label: "Nhập tài sản",
          //   routerLink: "/quantri/taisan/nhaptaisan",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Bàn giao tài sản",
          //   routerLink: "/quantri/taisan/bangiaotaisan",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Sự cố/Sửa chữa",
          //   routerLink: "/quantri/taisan/sucosuachua",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // // {
          // //   label: "Danh sách tài sản",
          // //   routerLink: "/quantri/taisan/danhsachtaisan",
          // //   command: () => {
          // //     this.close();
          // //   },
          // // },
          // {
          //   label: "Vật tư dự trữ",
          //   routerLink: "/quantri/taisan/danhsachvattudutru",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Vật tư giá trị cao",
          //   routerLink: "/quantri/taisan/danhsachvattugiatricao",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Thu hồi tài sản",
          //   routerLink: "/quantri/taisan/thuhoitaisan/0",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Thanh lý tài sản",
          //   routerLink: "/quantri/taisan/thanhlytaisan/0",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Hiệu xuất tài sản",
          //   routerLink: "/quantri/taisan/nhaplieuxuattaisan",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Danh sách nhập vật tư",
          //   routerLink: "/quantri/taisan/danhsachvattu",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Nhập vật tư trự trù",
          //   routerLink: "/quantri/taisan/quytrinhnhapvattu",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Đề nghị thay vật tư",
          //   routerLink: "/quantri/taisan/quytrinhdenghithayvattu/0",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Lịch xích năm",
          //   routerLink: "/quantri/taisan/lichxichnam",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Lịch xích tháng",
          //   routerLink: "/quantri/taisan/lichxichthang",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Lập kế hoạch lịch xích năm",
          //   routerLink: "/quantri/taisan/lapkehoachlichxichnam",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Lập kế hoạch lịch xích tháng",
          //   routerLink: "/quantri/taisan/lapkehoachlichxichthang",
          //   command: () => {
          //     this.close();
          //   },
          // },
          // {
          //   label: "Đề nghị xử lý sự cố",
          //   routerLink: "/quantri/taisan/denghixulisuco/0",
          //   command: () => {
          //     this.close();
          //   },
          // },

        ],
      },

      /////////////      Danh Mục quản lý tài sản
      // {
      //   label: "Danh mục quản lý tài sản",
      //   icon: "fas fa-circle",
      //   routerLink: "/quantri/danhmuctaisan",
      //   visible: this.showTaiSanModule,
      //   items: [
      //     {
      //       label: "Đơn vị năng suất",
      //       routerLink: "/quantri/taisan/danhmuc/donvinangsuat",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Loại tài sản",
      //       routerLink: "/quantri/taisan/danhmuc/danhmucloaitaisan",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Đơn vị tính",
      //       routerLink: "/quantri/taisan/danhmuc/danhmucdonvitinh",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Mức độ ưu tiên",
      //       routerLink: "/quantri/taisan/danhmuc/mucdouutien",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Loại khấu hao",
      //       routerLink: "/quantri/taisan/danhmuc/loaikhauhao",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     // {
      //     //   label: "Tình trạng tài sản",
      //     //   routerLink: "/quantri/taisan/danhmuc/tinhtrangtaisan",            
      //     //   command: () => {
      //     //     this.close();
      //     //   },
      //     // },
      //     {
      //       label: "Loại bảo dưỡng ",
      //       routerLink: "/quantri/taisan/danhmuc/danhmucloaibaoduong",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Loại sự cố",
      //       routerLink: "/quantri/taisan/danhmuc/loaisuco",
      //       command: () => {
      //         this.close();
      //       },
      //     },
      //     {
      //       label: "Nhà Sản Xuất",
      //       routerLink: "/quantri/taisan/danhmuc/hangsannxuat",
      //       command: () => {
      //         this.close();
      //       },
      //     },

      //   ],
      // },

      /////  menu kế hoạch sau tách..................................      
      {
        label: "Menu kế hoạch kinh doanh",
        icon: "fas fa-circle",
        routerLink: "/quantri/hopdongsanxuat",
        visible: this.showHopDongModule,
        items: [
          {
            label: "Kế hoạch kinh doanh năm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/kehoachkinhdoanhnam/0",
            command: () => this.close(),
          },
          {
            label: "Kế hoạch kinh doanh tháng",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/kehoachkinhdoanhthang/0",
            command: () => this.close(),
          },
          {
            label: "Kế hoạch sản xuất năm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/kehoachsanxuatnam/0",
            command: () => this.close(),
          },
          // {
          //   label: "Kế hoạch sản xuất tháng",
          //   routerLink: "/quantri/hopdongsanxuat/danhmuc/kehoachsanxuatthang/0",
          //   command: () => this.close(),
          // },
          {
            label: "Đơn giá sản phẩm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/dongiasanpham/0",
            command: () => this.close(),
          },
          {
            label: "Tỷ giá ngoại tệ",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/tygiangoaite/0",
            command: () => this.close(),
          },
          {
            label: "Doanh thu theo kế hoạch",
            routerLink: "/quantri/hopdongsanxuat/doanhthu/0",
            command: () => this.close(),
          },
          {
            label: "Chi phí bông năm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/chiphibongnam",
            command: () => this.close(),
          },
          {
            label: "Chi phí xơ năm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/chiphixonam",
            command: () => this.close(),
          },
          {
            label: "Chi phí điện năm",
            routerLink: "/quantri/hopdongsanxuat/danhmuc/chiphidiennam",
            command: () => this.close(),
          },
          // {
          //   label: "Định mức mặt hàng theo năm",
          //   routerLink: "/quantri/danhmuc/dinhmucmathangtheonam",
          //   command: () => this.close(),
          // },
          {
            label: "Vật tư phụ",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmucvattuphu",

            command: () => this.close(),
          },
          {
            label: "Cơ cấu nhân sự",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmuccocaunhansu",

            command: () => this.close(),
          },
          {
            label: "Tài sản",
            routerLink:
              "/quantri/hopdongsanxuat/danhmuc/danhmuctaisan",

            command: () => this.close(),
          },
          // {
          //   label: "Tính lương",
          //   routerLink:
          //     "/quantri/hopdongsanxuat/danhmuc/danhmuctinhluong",

          //   command: () => this.close(),
          // },
          {
            label: "Chi phí bán hàng",
            routerLink:

              "/quantri/hopdongsanxuat/danhmuc/danhmucphibanhang",

            command: () => this.close(),
          },
          // {
          //   label: "Định mức mặt hàng",
          //   routerLink:
          //     "/quantri/hopdongsanxuat/danhmuc/danhmucdinhmucmathang",

          //   command: () => this.close(),
          // },
          {
            label: "Năng lực sản xuất",
            routerLink:

              "/quantri/hopdongsanxuat/danhmuc/dinhmucsanxuat",

            command: () => this.close(),
          },
          {
            label: "Danh sách tính lương",
            routerLink:

              "/quantri/hopdongsanxuat/danhmuc/danhsachtinhluong",

            command: () => this.close(),
          },
          {
            label: "Mức lương cơ cấu nhân sự",
            routerLink:

              "/quantri/hopdongsanxuat/danhmuc/mucluongcocaunhansu",

            command: () => this.close(),
          },
          {
            label: "Chi phí bán hàng theo năm",
            routerLink:

              "/quantri/hopdongsanxuat/danhmuc/chiphibanhangtheonam",

            command: () => this.close(),
          },
        ],
      },

      {
        label: "Báo cáo tổng hợp",
        icon: "fas fa-circle",
        routerLink: "/quantri/baocaotonghop",
        visible: this.showHopDongModule,
        items: [
          {
            label: "Báo cáo bông chải tổng hợp",
            routerLink: "/quantri/baocaotonghop/bongchaitonghop",
            command: () => this.close(),
          },
          {
            label: "Báo cáo ghép thô tổng hợp",
            routerLink: "/quantri/baocaotonghop/ghepthotonghop",
            command: () => this.close(),
          },
          {
            label: "Báo cáo sợi con tổng hợp",
            routerLink: "/quantri/baocaotonghop/soicontonghop",
            command: () => this.close(),
          },
          {
            label: "Báo cáo ống tổng hợp",
            routerLink: "/quantri/baocaotonghop/ongtonghop",
            command: () => this.close(),
          },
          
        ]
      },

      {
        label: "Danh mục dùng chung",
        routerLink: "/quantri/danhmuc",
        icon: "pi pi-bars",
        expanded: false,
        visible: !this.checkmenu("P_DANHMUC"),
        items: [
          {
            label: "Loại sợi",
            routerLink: "/quantri/danhmucsanxuat/dmloaisoi",
            command: () => this.close(),
          },
          {
            label: "Mặt hàng",
            routerLink: "/quantri/danhmucsanxuat/dmmathang",
            command: () => this.close(),
          },
          {
            label: "Định mức chất lượng sợi",
            routerLink: "/quantri/danhmucsanxuat/dmdinhmucchatluongsoi",
            command: () => this.close(),
          },
          {
            label: "Định mức tiêu hao",
            routerLink: "/quantri/danhmucsanxuat/dmdinhmuctieuhao",
            command: () => this.close(),
          },
          {
            label: "Tiêu chí chất lượng sợi",
            routerLink: "/quantri/danhmucsanxuat/dmtieuchichatluongsoi",
            command: () => this.close(),
          },
          {
            label: "Quy cách đóng gói",
            routerLink: "/quantri/danhmucsanxuat/dmquycachdonggoi",
            command: () => this.close(),
          },
          {
            label: "Loại bông",
            routerLink: "/quantri/danhmucsanxuat/dmloaibong",
            command: () => this.close(),
          },

          {
            label: "Loại bông phế",
            routerLink: "/quantri/danhmucsanxuat/dmloaibongphe",
            command: () => this.close(),
          }, {
            label: "Tỷ lệ tiêu chuẩn bông phế",
            routerLink: "/quantri/danhmucsanxuat/tyletieuchuanbongphe",
            command: () => this.close(),
          },
          {
            label: "Cấp bông",
            routerLink: "/quantri/danhmucsanxuat/dmcapbong",
            command: () => this.close(),
          },
          {
            label: "Đặc tính bông",
            routerLink: "/quantri/danhmucsanxuat/dmdactinhbong",
            command: () => this.close(),
          },
          {
            label: "Phân xưởng",
            routerLink: "/quantri/danhmucsanxuat/dmphanxuong",
            command: () => this.close(),
          },
          {
            label: "Nhóm kho",
            routerLink: "/quantri/danhmucsanxuat/dmnhomkho",
            command: () => this.close(),
          },
          {
            label: "Kho sản xuất",
            routerLink: "/quantri/danhmucsanxuat/dmkho",
            command: () => this.close(),
          },
          {
            label: "Vị trí",
            routerLink: "/quantri/danhmucsanxuat/dmvitri",
            command: () => this.close(),
          },
          {
            label: "Ca sản xuất",
            routerLink: "/quantri/danhmucsanxuat/dmcasanxuat",
            command: () => this.close(),
          },
          {
            label: "Phân nhóm máy",
            routerLink: "/quantri/danhmucsanxuat/dmphannhommay",
            command: () => this.close(),
          },
          {
            label: "Danh sách máy",
            routerLink: "/quantri/danhmucsanxuat/dmdsmay",
            command: () => this.close(),
          },
          {
            label: "Loại điện áp",
            routerLink: "/quantri/danhmucsanxuat/loaidienkv",
            command: () => this.close(),
          },
          {
            label: "Loại điện",
            routerLink: "/quantri/danhmucsanxuat/loaidien",
            command: () => this.close(),
          },
          {
            label: "Máy biến áp",
            routerLink: "/quantri/danhmucsanxuat/dmmaybienap",
            command: () => this.close(),
          },
          {
            label: "Nhóm công tơ",
            routerLink: "/quantri/danhmucsanxuat/dmnhomcongto",
            command: () => this.close(),
          },
          {
            label: "Công tơ",
            routerLink: "/quantri/danhmucsanxuat/dmcongto",
            command: () => this.close(),
          },
          {
            label: "Khung giờ",
            routerLink: "/quantri/danhmucsanxuat/dmkhunggio",
            command: () => this.close(),
          },
          {
            label: "Bán chế phẩm",
            routerLink: "/quantri/danhmucsanxuat/dmbanchepham",
            command: () => this.close(),
          },
          {
            label: "Phân quyền theo phân xưởng",
            routerLink: "/quantri/phanquyensanxuat/phanquyentheophanxuong",
            command: () => this.close(),
          },
          {
            label: "Khách hàng",
            routerLink: "/quantri/phanquyensanxuat/dmkhachhang",
            command: () => this.close(),
          },
          {
            label: "Chi số triển khai",
            routerLink: "/quantri/phanquyensanxuat/dmchisotrienkhai",
            command: () => this.close(),
          },


        ],
      },
      {
        label: "Sửa HDSD",
        icon: "pi pi-cog",
        visible: !this.checkmenu("TAOHUONGDANSUDUNG"),
        separator: this.checkmenu("TAOHUONGDANSUDUNG"),
        routerLink: "/quantri/quanlykhosanxuat/hdsd",
      },
      {
        label: "Tải HDSD",
        icon: "pi pi-download",
        // visible: !this.checkmenu("XEMHUONGDANSUDUNG"),
        // separator: this.checkmenu("XEMHUONGDANSUDUNG"),
        command: () => {
          this.downloadHDSD();
        },
      },
    ];
    this.menu = this.menuQLNS;
  }

  checkmenu(maaction) {
    // if (this.dataphanquyen == null) {
    //   return true;
    // } else if (this.dataphanquyen[maaction] == undefined) {
    //   return true;
    // } else if (this.dataphanquyen[maaction].length == 0) {
    //   return true;
    // } else {
    //   for (var i = 0; i < this.dataphanquyen[maaction].length; i++) {
    //     if (this.dataphanquyen[maaction][i].MaRight === "XEM") {
    //       if (this.dataphanquyen[maaction][i].GioiHan > 0) {
    //         return false;
    //       } else return true;
    //     }
    //   }
    // }
    return false;
  }

  private subscribeToEvents(): void {
    // if connection exists it can call of method.
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });
    this._signalRService.messageReceived.subscribe((message: any) => {
      this.refreshNotis();
    });
  }
  downloadHDSD() {
    this._services
      .HDSD()
      .Get()
      .subscribe((res: any) => {
        this._services.download(res.Link);
      });
  }
}
