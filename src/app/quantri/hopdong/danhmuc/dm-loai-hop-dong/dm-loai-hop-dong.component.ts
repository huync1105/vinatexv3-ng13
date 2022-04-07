import { ModalloaihopdongComponent } from './../modal/modalloaihopdong/modalloaihopdong.component';


import { ImportdanhmucmodelComponent } from './../../../danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
// import { ModalloaihopdongComponent } from './../../../danhmuc/modal/modaldanhmucchung/modaldanhmucchung.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dm-loai-hop-dong',
  templateUrl: './dm-loai-hop-dong.component.html',
  styleUrls: ['./dm-loai-hop-dong.component.css']
})
export class DmLoaiHopDongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  cols: any = [
    {
      header: 'Mã loại hợp đồng',
      field: 'Ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên loại hợp đồng',
      field: 'Ten',
      width: '300px',
      center:'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center:'center'
    }
  ];
  selectedItems:any=[];
  dataSearch: any = {};
  constructor(private _modal:NgbModal,private _services:SanXuatService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdm()
  }
  GetListdm(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    this.dataSearch = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmLoaiSoi(this.dataSearch).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalloaihopdongComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'loaisoi';
    modalRef.componentInstance.title = 'Thêm mới danh mục loại hợp đồng';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalloaihopdongComponent,{
      backdrop:'static',
     
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục loại hợp đồng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'loaisoi';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmLoaiSoi(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  deleteAll(){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmLoaiSoi(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdm();
  }
  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'SCM_dmLoaiSoi';
    modalRef.result.then(res=>{
      this.GetListdm();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
  exportExcel(){
    this.dataSearch.TableName = 'SCM_dmLoaiSoi';
    this.dataSearch.CurrentPage = 0;
    this._services.Exportdm(this.dataSearch).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}
