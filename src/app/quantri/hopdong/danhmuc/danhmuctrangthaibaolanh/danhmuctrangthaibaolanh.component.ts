import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { ModaldanhmuctrangthaibaolanhComponent } from '../modal/modaldanhmuctrangthaibaolanh/modaldanhmuctrangthaibaolanh.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-danhmuctrangthaibaolanh',
  templateUrl: './danhmuctrangthaibaolanh.component.html',
  styleUrls: ['./danhmuctrangthaibaolanh.component.css']
})
export class DanhmuctrangthaibaolanhComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã tình trạng bảo lãnh',
      field: 'ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên tình trạng bảo lãnh',
      field: 'ten',
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
    this.GetListdmTrangThaiBaoLanh();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmTrangThaiBaoLanh(true)
  }
  GetListdmTrangThaiBaoLanh(reset?){
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
    this._danhMucHopDong.DanhMucTrangThaiBaoLanh().GetList(data).subscribe((res:any)=>{
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmuctrangthaibaolanhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'trangthaibaolanh';
    modalRef.componentInstance.title = 'Thêm mới tình trạng bảo lãnh';
    modalRef.result.then(res=>{
      this.GetListdmTrangThaiBaoLanh()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmuctrangthaibaolanhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật tình trạng bảo hành';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'trangthaibaohanh';
    modalRef.result.then(res=>{
      this.GetListdmTrangThaiBaoLanh()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.DanhMucTrangThaiBaoLanh().Delete([item.id]).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this._toastr.success(res.message);
            this.GetListdmTrangThaiBaoLanh();
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
      const item=this.selectedItems[0];
      this._danhMucHopDong.DanhMucTrangThaiBaoLanh().Delete([item.id]).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this._toastr.success(res.message);
            this.GetListdmTrangThaiBaoLanh();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  // deleteAll(){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   const listId=this.selectedItems.map(({id}) => id);
  //   modalRef.result.then(res=>{
  //     this._danhMucHopDong.DanhMucTrangThaiBaoLanh().DeleteList(listId).subscribe((res: any) => {
  //       if (res) {
  //         if (res.statusCode === 200) {
  //           this._toastr.success(res.message);
  //           this.GetListdmTrangThaiBaoLanh();
  //           this.selectedItems = [];
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmTrangThaiBaoLanh()
  }
}
