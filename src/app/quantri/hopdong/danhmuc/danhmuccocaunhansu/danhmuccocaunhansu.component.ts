import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhmuccocaunhansuComponent } from '../modal/modaldanhmuccocaunhansu/modaldanhmuccocaunhansu.component';

@Component({
  selector: 'app-danhmuccocaunhansu',
  templateUrl: './danhmuccocaunhansu.component.html',
  styleUrls: ['./danhmuccocaunhansu.component.css']
})
export class DanhmuccocaunhansuComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  // item: any={};
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [ 
    {
      header: 'Mã',
      field: 'Ma',
      width: '300px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '350px',
      align:'center'
    },
    {
      header: 'Lao động gián tiếp',
      field: 'isLaoDongGianTiep',
      width: '300px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmCoCauNhanSu();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmCoCauNhanSu(true);
  }
  GetListdmCoCauNhanSu(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:25, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      ma:"", 
      ten:""    
    };
    this. _danhMucHopDong.DanhMucCoCauNhanSu().GetList(data).subscribe((res:any)=>{
      this.items = res.Data.Items;
      this.paging.TotalItem = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmuccocaunhansuComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới cơ cấu nhân sự';
    modalRef.result.then(res=>{
      this.GetListdmCoCauNhanSu()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmuccocaunhansuComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật cơ cấu nhân sự';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmCoCauNhanSu()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      // const item=this.selectedItems[0];    
      this._danhMucHopDong.DanhMucCoCauNhanSu().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdmCoCauNhanSu();
          } else {
            this._toastr.error(res.Message);
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
  //     this._danhMucHopDong.DanhMucLoaiHopDong().DeleteList(listId).subscribe((res: any) => {
  //       if (res) {
  //         if (res.statusCode === 200) {
  //           this._toastr.success(res.message);
  //           this.GetListdmLoaiHopDong();
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
    this.GetListdmCoCauNhanSu()
  }
  
  }
