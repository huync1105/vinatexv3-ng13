import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DmkhunggiomodalComponent } from './dmkhunggiomodal/dmkhunggiomodal.component';

@Component({
  selector: 'app-dmkhunggio',
  templateUrl: './dmkhunggio.component.html',
  styleUrls: ['./dmkhunggio.component.css']
})
export class DmkhunggioComponent implements OnInit {
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
      center: 'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center: 'center'
    }
  ];
  selectedItems: any = [];
  constructor(private _modal: NgbModal, private _toastr: ToastrService, private ServicesSanXuat: SanXuatService) { }

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
    this.ServicesSanXuat.ThongKeDien().GetDanhSachKhungGio(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(DmkhunggiomodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = 'Thêm mới danh mục nhóm công tơ';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this.ServicesSanXuat.ThongKeDien().GetItemKhungGio(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(DmkhunggiomodalComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.title = 'Cập nhật danh mục khung giờ';
      modalRef.componentInstance.item = res;
      modalRef.result.then(res => {
        this._toastr.success(res);
        this.GetList()
      }).catch(er => console.log(er))
    })
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.ServicesSanXuat.ThongKeDien().DeleteKhungGio(item).subscribe((res: any) => {
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
}
