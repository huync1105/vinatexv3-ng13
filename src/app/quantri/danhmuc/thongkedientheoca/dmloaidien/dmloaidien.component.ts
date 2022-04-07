import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ModaldmloaidienComponent } from '../../modal/modaldmloaidien/modaldmloaidien.component';

@Component({
  selector: 'app-dmloaidien',
  templateUrl: './dmloaidien.component.html',
  styleUrls: ['./dmloaidien.component.css']
})
export class DmloaidienComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
      align: 'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      align: 'center'
    }
  ];
  selectedItems: any = [];
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _toastr: ToastrService, private ServicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetList()
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,
    };
    this.ServicesSanXuat.dmLoaiDien().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(ModaldmloaidienComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'loaidien';
    modalRef.componentInstance.title = 'Thêm mới danh mục loại điện';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(ModaldmloaidienComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục loại điện';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'loaidien';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetList()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.ServicesSanXuat.dmLoaiDien().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetList();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.ServicesSanXuat.dmLoaiDien().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetList();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  importExcel() {
    // let modalRef = this._modal.open(ModalimportexcelComponent,{
    //   backdrop:'static',
    // })
    // modalRef.componentInstance.importFunc = 'BienDong';
    // modalRef.result.then(res=>{
    //   this.GetList();
    //   this._toastr.success(res.mess);
    // })
    // .catch(er=>console.log(er))
  }

  exportExcel() {
    // let data:any;
    // this._services.ExportDanhSachChiTieuChatLuongTheoSanPham({id:"àhsdkhfklsdjfhsdkjfh"}).subscribe((res: any) => {
    //   this._services.download(res.TenFile);
    // })
  }
}
