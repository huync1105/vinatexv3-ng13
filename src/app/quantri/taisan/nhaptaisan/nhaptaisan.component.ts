import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, mapArrayForDropDown,UnixToDate,} from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-nhaptaisan',
  templateUrl: './nhaptaisan.component.html',
  styleUrls: ['./nhaptaisan.component.css']
})
export class NhaptaisanComponent implements OnInit {
  @ViewChild("paginator") paginator: any;

  eAction: any = "QUYTRINHNHAPTAISAN";
  loaiTab: any = 0;
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  trangThai: any = 1;
  listLoaiTaiSan: any = [];
  listPhanXuong = [];
  TenBoPhanSuDung='';

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .NhapTaiSan()
          .Get(res.id)
          .subscribe((res1: any) => {
            this.update(res1);
          });
      }
    });
    this.resetFilter();
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
  }
  changeParam(id) {
    this.router.navigate([`/quantri/taisan/nhaptaisan/${id}`], {
      replaceUrl: true,
    });
  }
  GetListdmPhanXuong() {
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }
  resetFilter() {
    this.Keyword = '';
    this.filter = {};
    this.Loaddata(true);
  }
  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.currentPage,
      tabTrangThai: this.trangThai,
      Keyword: this.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      Loai: 0
    };
    this._serviceTaiSan.NhapTaiSan().GetList(data).subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data.Items;
      this.paging = res.Data;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.TenBoPhanSuDung = this.listPhanXuong.find(ele=>ele.value == obj.IdBoPhanSuDung)?.label||null;
          obj.listTaiSan.forEach(element => {
            element.TenBoPhanSuDung = this.listPhanXuong.find(ele=>ele.value == element.IdBoPhanSuDung)?.label||null;
            obj_copy.children.push({ data: element });
          });
          delete obj.listTaiSan;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.title = "Nhập tài sản";
    modalRef.componentInstance.item = {
      Id: "",
      IdTaiSan: "",
      IdTrangThai: "",
      TenTrangThai: "",
      isKetThuc: false,
      TaiSan: {
        Id: "",
        isXoa: false,
        listFileDinhKem: [],
        Created: new Date(),
        Modified: new Date(),
        listTaiSan: [],
        listLichBaoDuong: [],
        listThongSoKyThuat: [],
        listThongSoAnToan: [],
      },
    }
    modalRef.result
      .then((res: any) => {
        this.Loaddata(false);
      })
      .catch((er) => {
      });
  }
  update(item) {
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.title = "Cập nhập tài sản";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .finally(()=>{
        this.Loaddata();
        this.changeParam(0);
      });
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

}
