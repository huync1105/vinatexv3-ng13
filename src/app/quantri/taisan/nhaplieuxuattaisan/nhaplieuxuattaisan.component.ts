import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalnhaplieuxuattaisanComponent } from '../modal/modalnhaplieuxuattaisan/modalnhaplieuxuattaisan.component';

@Component({
  selector: 'app-nhaplieuxuattaisan',
  templateUrl: './nhaplieuxuattaisan.component.html',
  styleUrls: ['./nhaplieuxuattaisan.component.css']
})
export class NhaplieuxuattaisanComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  listTaiSanRef: any = [];
  filter: any = {};
  listPhanXuong: any = [];
  listTaiSan: any = [];
  IddmPhanXuong: string;
  IdDuAn: number;
  paging: any = {CurrentPage: 1, TotalPages: 1, TotalCount: 1};
  themmoi: boolean;
  bien_Luu_ThongTin_Tai_San: any = {};
  SoSeri: any = '';
  selectedItems: any = [];
  constructor(public _modal: NgbModal, public store: StoreService,
    public _toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _service: SanXuatService, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getListPhanXuong();
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  GetListTaiSanDeChon() {
    this._serviceTaiSan.HieuXuatTaiSan().GetListTaiSan(this.filter.IddmPhanXuong).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data, "Ten", 'Id');
      this.listTaiSanRef = res.Data;
      console.log(this.listTaiSanRef)
    })
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: '',
      IdTaiSan: this.filter.IddmTaiSan,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),

    }
    this._serviceTaiSan.HieuXuatTaiSan().GetList(data).subscribe((res: any) => {
      console.log(res.Data)
      this.items = res.Data.Items;
      console.log(this.items)
      this.check_ThemMoi()
      this.bien_Luu_ThongTin_Tai_San = this.listTaiSanRef.find(ele => ele.Id === this.filter.IddmTaiSan);
      console.log(this.bien_Luu_ThongTin_Tai_San)
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.items.forEach(obj => {
        obj.SoSeri = this.listTaiSanRef.find(ele => ele.Id == this.filter.IddmTaiSan).SoSeri;
      });

    })
  }

  getListPhanXuong() {
    this._service.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  add() {
    let modalRef = this._modal.open(ModalnhaplieuxuattaisanComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = { IddmPhanXuong: this.filter.IddmPhanXuong, IdTaiSan: this.filter.IddmTaiSan, TenDonViTinh: this.bien_Luu_ThongTin_Tai_San.Ten, MaDonViTinh: this.bien_Luu_ThongTin_Tai_San.Ma, IddmDonViTinh: this.bien_Luu_ThongTin_Tai_San.TendmDonViTinh };
    modalRef.componentInstance.title = 'Thêm mới hiệu suất tài sản';
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetList();
    })
      .catch(er => { console.log(er) })
  }
  edit(item) {
    let modalRef = this._modal.open(ModalnhaplieuxuattaisanComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Cập nhật hiệu suất tài sản';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetList();
    }).catch(er => { console.log(er) })

  }

  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._serviceTaiSan.HieuXuatTaiSan().Delete([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er => console.log(er))
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
  check_ThemMoi() {
    if (validVariable(this.filter.IddmTaiSan)) {
      this.themmoi = true;
    } else {
      this.themmoi = false;
    }
  }
}

