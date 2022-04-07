import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhmucvattuphuComponent } from '../modal/modaldanhmucvattuphu/modaldanhmucvattuphu.component';
@Component({
  selector: 'app-danhmucvattuphu',
  templateUrl: './danhmucvattuphu.component.html',
  styleUrls: ['./danhmucvattuphu.component.css']
})
export class DanhmucvattuphuComponent implements OnInit {

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
      width: '300px',
      align:'center'
    },
    {
      header: 'Đơn vị',
      field: 'DonViTinh',
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
    this.GetListdmVatTuPhu();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmVatTuPhu(true);
  }
  GetListdmVatTuPhu(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:25, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"",
      Ten:""    
    };
    this. _danhMucHopDong.DanhMucVatTuPhu().GetList(data).subscribe((res:any)=>{
      this.items = res.Data.Items;
      this.paging.TotalItem = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucvattuphuComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'vattuphu';
    modalRef.componentInstance.title = 'Thêm mới vật tư phụ';
    modalRef.result.then(res=>{
      this.GetListdmVatTuPhu()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucvattuphuComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật vật tư phụ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmVatTuPhu()
    }).catch(er=>console.log(er))
  }

  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      // const item=this.selectedItems[0];    
      this._danhMucHopDong.DanhMucVatTuPhu().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) { 
            this._toastr.success(res.Message);
            this.GetListdmVatTuPhu();
          
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
  //   const listId=this.selectedItems.map(({Id}) => Id);
  //   modalRef.result.then(res=>{  
  //     this._danhMucHopDong.DanhMucLoaiHopDong().DeleteList(listId).subscribe((res: any) => {
  //       if (res) {
  //         if (res.StatusCode === 200) {
  //           this._toastr.success(res.Message);
  //           this.GetListdmVatTuPhu();
  //           this.selectedItems = [];
  //         } else {
  //          this._toastr.error(res.Message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmVatTuPhu()
  }
  
  }
