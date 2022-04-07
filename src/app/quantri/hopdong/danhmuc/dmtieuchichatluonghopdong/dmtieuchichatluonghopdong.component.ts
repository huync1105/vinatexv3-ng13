import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { DmtieuchichatluonghopdongmodalComponent } from '../dmtieuchichatluonghopdongmodal/dmtieuchichatluonghopdongmodal.component';

@Component({
  selector: 'app-dmtieuchichatluonghopdong',
  templateUrl: './dmtieuchichatluonghopdong.component.html',
  styleUrls: ['./dmtieuchichatluonghopdong.component.css']
})
export class DmtieuchichatluonghopdongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  cols: any = [
    {
      header: 'Mã',
      field: 'ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Đặc tính',
      field: 'dacTinh',
      width: '300px',
      center:'left'
    },
    {
      header: 'Đơn vị',
      field: 'donVi',
      width: '300px',
      center:'left'
    },
    {
      header: 'Tiêu chuẩn',
      field: 'tieuChuan',
      width: '300px',
      center:'left'
    },
    {
      header: 'Ghi chú',
      field: 'ghiChu',
      width: 'unset',
      center:'center'
    }
  ];
  selectedItems:any=[];
  dataSearch: any = {};
  constructor(private _modal:NgbModal,private _services:DanhMucHopDongService,private _toastr:ToastrService) { }

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
    this._services.DanhMucTieuChuanChatLuong().GetList(this.dataSearch).subscribe((res:any)=>{
      this.items = res.data.items;
      this.paging.TotalPage = res.data.totalPages;
      this.paging.TotalItem = res.data.totalCount;
      this.paging.CurrentPage = res.data.page;
    })
  }
  add(){
    let modalRef = this._modal.open(DmtieuchichatluonghopdongmodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title='Thêm mới tiêu chí chất lượng';
    modalRef.result.then(res=>{
      this.GetListdm(true)
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(DmtieuchichatluonghopdongmodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title='Chỉnh sửa tiêu chí chất lượng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this.GetListdm(true)
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DanhMucTieuChuanChatLuong().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this._toastr.success(res.message);
            this.GetListdm(true);
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
  // importExcel(){
  //   let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
  //     backdrop:'static',
  //   })
  //   modalRef.componentInstance.importFunc = 'SCM_dmCapBong';
  //   modalRef.result.then(res=>{
  //     this.GetListdm();
  //     this._toastr.success(res.mess);
  //   })
  //   .catch(er=>console.log(er))
  // }
  // exportExcel(){
  //   this.dataSearch.TableName = 'SCM_dmCapBong';
  //   this.dataSearch.CurrentPage = 0;
  //   this._services.Exportdm(this.dataSearch).subscribe((res: any) => {
  //     this._services.download(res.TenFile);
  //   })
  // }
}
