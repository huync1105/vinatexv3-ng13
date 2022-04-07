import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';


import { number } from "@amcharts/amcharts4/core";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";


@Component({
  selector: 'app-giaonhanhanghoamodal',
  templateUrl: './giaonhanhanghoamodal.component.html',
  styleUrls: ['./giaonhanhanghoamodal.component.css']
})
export class GiaonhanhanghoamodalComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  filter: any = {};
  tuNgay: number = 0;
  denNgay: number = 0;
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  //    this.paging.TotalItem = res.data.totalCount;
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };

  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
    private _serviceSanXuat: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   
  }

}
