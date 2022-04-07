import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DmchisotrienkhaimodalComponent } from '../dmchisotrienkhaimodal/dmchisotrienkhaimodal.component';

@Component({
  selector: 'app-dmchisotrienkhai',
  templateUrl: './dmchisotrienkhai.component.html',
  styleUrls: ['./dmchisotrienkhai.component.css']
})
export class DmchisotrienkhaiComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Từ',
      field: 'Tu',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Đến',
      field: 'Den',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Mặt hàng',
      field: 'TendmItem',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Chi số',
      field: 'ChiSo',
      width: 'unset',
      align: 'center'
    },
  ];
  selectedItems: any = [];
  dataSearch: any = {};
  userInfo: any;
  listnhamay: any = [];
  listDonViNangSuat: any = [];
  listCongDoan: any = [];
  listPhanXuong: any = [];
  filter: any = {};
  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService, private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetListdm();
  }

  resetFilter() {
    this.keyWord = '';
    this.GetListdm()
  }
  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    this.dataSearch = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,
      CongDoan: this.filter.CongDoan,
      Ma: "",
      Ten: ""
    };
    this._services.dmChiSoTrienKhai().GetList(this.dataSearch).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      if (this.items.length > 0 && this.listDonViNangSuat.length > 0) {
        this.items.forEach(el => {
          el.TenDonViNangSuat = this.listDonViNangSuat.filter(obj => obj.value == el.DonViNangSuat)[0].label;
          el.TenCongDoan = this.listCongDoan.filter(obj => obj.value == el.CongDoan)[0].label;
        });
      }
    })
  }
 
  add() {
    let modalRef = this._modal.open(DmchisotrienkhaimodalComponent, {
      size: "lg",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: '',
      lstdmItem: []
    }
    modalRef.result.then(res => {
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
      let modalRef = this._modal.open(DmchisotrienkhaimodalComponent, {
        size: "lg",
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = item;
      modalRef.result.then(res => {
        // this._toastr.success(res);
        this.GetListdm()
      }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.dmChiSoTrienKhai().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  // deleteAll() {
  //   let modalRef = this._modal.open(ModalthongbaoComponent, {
  //     backdrop: 'static'
  //   });
  //   modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res => {
  //     this._services.DeletedmCapBong(this.selectedItems).subscribe((res: any) => {
  //       if (res) {
  //         if (res.State === 1) {
  //           this._toastr.success(res.message);
  //           this.GetListdm();
  //           this.selectedItems = [];
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er => console.log(er))
  // }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm();
  }
  importExcel() {
    // let modalRef = this._modal.open(ImportdanhmucmodelComponent, {
    //   backdrop: 'static',
    // })
    // modalRef.componentInstance.importFunc = 'SCM_dmCapBong';
    // modalRef.result.then(res => {
    //   this.GetListdm();
    //   this._toastr.success(res.mess);
    // })
    //   .catch(er => console.log(er))
  }
  exportExcel() {
    // this.dataSearch.TableName = 'SCM_dmCapBong';
    // this.dataSearch.CurrentPage = 0;
    // this._services.Exportdm(this.dataSearch).subscribe((res: any) => {
    //   this._services.download(res.TenFile);
    // })
  }

}
