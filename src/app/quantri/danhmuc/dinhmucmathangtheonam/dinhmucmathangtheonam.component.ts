import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldinhmucmathangtheonamComponent } from '../modal/modaldinhmucmathangtheonam/modaldinhmucmathangtheonam.component';
@Component({
  selector: 'app-dinhmucmathangtheonam',
  templateUrl: './dinhmucmathangtheonam.component.html',
  styleUrls: ['./dinhmucmathangtheonam.component.css']
})
export class DinhmucmathangtheonamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  // item: any={};
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmDinhMucMatHang();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmDinhMucMatHang(true);
  }
  GetListdmDinhMucMatHang(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      
    };
    this. _danhMucHopDong. DinhMucMatHangTheoNam().GetList(data).subscribe((res:any)=>{
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldinhmucmathangtheonamComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'dinhmucmathanghangnam';
    modalRef.componentInstance.title = 'Định mức mặt hàng theo năm';
    // modalRef.result.then(res=>{
    //   this.GetListdmDinhMucMatHang()
    // }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldinhmucmathangtheonamComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmDinhMucMatHang()
    }).catch(er=>console.log(er))
  }
  // delete(item){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res=>{
  //     const item=this.selectedItems[0];    
  //     this._danhMucHopDong.DanhMucLoaiHopDong().Delete([item.id]).subscribe((res: any) => {
  //       if (res) {
  //         if (res.statusCode === 200) {
  //           this._toastr.success(res.message);
  //           this.GetListdmTinhLuong();
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  // deleteAll(){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   const listId=this.selectedItems.map(({id}) => id);
  //   modalRef.result.then(res=>{  
  //     this._danhMucHopDong.DanhMucLoaiHopDong().DeleteList(listId).subscribe((res: any) => {
  //       if (res) {
  //         if (res.statusCode === 200) {
  //           this._toastr.success(res.message);
  //           this.GetListdmTinhLuong();
  //           this.selectedItems = [];
  //         } else {
  //          this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmDinhMucMatHang()
  }
  
  }