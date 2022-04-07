import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhmuctieuchidanhgiamodalComponent } from './danhmuctieuchidanhgiamodal/danhmuctieuchidanhgiamodal.component';

@Component({
  selector: 'app-danhmuctieuchidanhgia',
  templateUrl: './danhmuctieuchidanhgia.component.html',
  styleUrls: ['./danhmuctieuchidanhgia.component.css']
})
export class DanhmuctieuchidanhgiaComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: TreeNode[];
  keyWord: any = '';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã tiêu chí đánh giá',
      field: 'ma',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Tên tiêu chí đánh giá',
      field: 'ten',
      width: '300px',
      align: 'center'
    },
    {
      header: 'Tên tiêu chí đánh giá cha',
      field: 'tendmTieuChiCha',
      width: '300px',
      align: 'center'
    },
    {
      header: 'Điểm',
      field: 'diemToiDa',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'ghiChu',
      align: 'center'
    }
  ];
  listTieuChiCha: any = [];
  constructor(private _modal: NgbModal, private _danhMucHopDong: HopDongService, private _toastr:ToastrService) { }

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
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.keyWord,
      ma: "",
      ten: ""
    };
    this._danhMucHopDong.dmTieuChiDanhGia().GetList(data).subscribe((res: any) => {
      this.items = [];
      this.listTieuChiCha = res.data.filter(e => e.iddmTieuChiCha === null || e.iddmTieuChiCha === '')
      this.listTieuChiCha.forEach(element => {
        let data: any = { "data": element, "children": [], "expanded": true };
        let children = res.data.filter(e => e.iddmTieuChiCha === element.id);
        element.isCon = false;
        children.forEach(elChi => {
          elChi.isCon = true;
          let dataChil: any = { "data": elChi, "children": [], "expanded": true };
          data.children.push(dataChil);
        });
        this.items.push(data);
      });
    })
  }
  add() {
    let modalRef = this._modal.open(DanhmuctieuchidanhgiamodalComponent, {
      backdrop: 'static', size: 'lg'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = 'Thêm mới danh mục tiêu chí đánh giá';
    modalRef.componentInstance.item = {"hoatDong": true};
    modalRef.result.then(res => {
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._danhMucHopDong.dmTieuChiDanhGia().Get(item.id).subscribe((res: any) => {

      let modalRef = this._modal.open(DanhmuctieuchidanhgiamodalComponent, {
        backdrop: 'static', size: 'lg'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.title = 'Cập nhật danh mục tiêu chí đánh giá';
      modalRef.componentInstance.item = res.data;
      modalRef.result.then(res => {
        this.GetListdm()
      }).catch(er => console.log(er))
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm()
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.dmTieuChiDanhGia().Delete(item.id).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
}
