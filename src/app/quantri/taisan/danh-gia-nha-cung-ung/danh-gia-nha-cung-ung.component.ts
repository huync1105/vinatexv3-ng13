import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DateToUnix, UnixToDate } from "src/app/services/globalfunction"; 
import { DanhGiaNhaCungUngModalComponent } from './danh-gia-nha-cung-ung-modal/danh-gia-nha-cung-ung-modal.component';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-danh-gia-nha-cung-ung',
  templateUrl: './danh-gia-nha-cung-ung.component.html',
  styleUrls: ['./danh-gia-nha-cung-ung.component.css']
})
export class DanhGiaNhaCungUngComponent implements OnInit {

  filter: any = {};
  eAction: any = "QUYTRINHDANHGIANHACUNGUNG";
  trangThai: any = 1;
  loaiTab: any = 0;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  paging: any = {};
  items: any = {};

  constructor(
    public modal: NgbModal,
    public toastr: ToastrService,
    private sanXuatService: SanXuatService,
    private taiSanService: TaisanService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ResetFilter();
    this.KiemTraTabTrangThai();
    this.activatedRoute.params.subscribe((res: any) => {

      if (res.id !== "0") {
        this.taiSanService
        .DanhGiaNhaCungUng()
        .Get(res.id)
        .subscribe((res: any) => {
            this.Update(res);
          });
      }
    });
  }

  changeParam(id) {
    this.router.navigate([`quantri/taisan/danhgianhacungung/${id}`], {
      replaceUrl: true,
    });
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.LoadData(true);
  }

  KiemTraTabTrangThai() {
    this.sanXuatService.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.LoadData();
    })
  }

  ResetFilter() {
    this.filter = {};
    this.LoadData(true);
  }

  LoadData(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
      // this.filter.keyword = '';
    }
    let data  = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
      IdBoPhanSuDung: "",
      TabTrangThai: this.trangThai,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0,
    }
    this.taiSanService.DanhGiaNhaCungUng().GetList(data).subscribe((res: any) =>{
      this.items = res.Data.Items;
      this.paging.totalCount = res.Data.TotalCount;
    })
  } 

  Add() {
    let modalRef = this.modal.open(DanhGiaNhaCungUngModalComponent, {
      size: 'fullscreen',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) =>{
      })
      .catch((err) =>{})
      .finally(()=>{
        this.LoadData(true);
        this.changeParam(0);
      })
  }

  Update(item) {
    let modalRef = this.modal.open(DanhGiaNhaCungUngModalComponent, {
      size: 'fullscreen',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'update';
    // modalRef.componentInstance.quyTrinh.Id = id;
    modalRef.componentInstance.quyTrinh = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then((res: any) =>{
      })
      .catch(er=>{})
      .finally(()=>{
        this.LoadData(true);
        this.changeParam(0);
      })
  }

}
