import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhmucdinhmucmathangComponent } from '../modal/modaldanhmucdinhmucmathang/modaldanhmucdinhmucmathang.component';
@Component({
  selector: 'app-danhmucdinhmucmathang',
  templateUrl: './danhmucdinhmucmathang.component.html',
  styleUrls: ['./danhmucdinhmucmathang.component.css']
})
export class DanhmucdinhmucmathangComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  // item: any={};
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Tên',
      field: 'ten',
      width: '350px',
      align:'center'
    },
    {
      header: 'Mã',
      field: 'ma',
      width: '300px',
      align:'center'
    },
    {
      header: 'Đơn vị',
      field: 'donViTinh',
      width: '300px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'ghiChu',
      width: '200px',
      align:'center'
    }
  ];
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
      ma:"", 
      ten:""    
    };
    this. _danhMucHopDong.DanhMucDinhMucMatHang().GetList(data).subscribe((res:any)=>{
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucdinhmucmathangComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm định mức mặt hàng';
    modalRef.result.then(res=>{
      this.GetListdmDinhMucMatHang()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucdinhmucmathangComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật định mức mặt hàng';
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
  //           this.GetListdmDinhMucMatHang();
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
  //           this.GetListdmDinhMucMatHang();
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
