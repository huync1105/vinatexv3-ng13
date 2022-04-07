import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ModaldmnhacungcapComponent } from '../modaldmnhacungcap/modaldmnhacungcap.component';

@Component({
  selector: 'app-danhmucnhacungcap',
  templateUrl: './danhmucnhacungcap.component.html',
  styleUrls: ['./danhmucnhacungcap.component.css']
})
export class DanhmucnhacungcapComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword:any='';
  fileUpload: any;
  filter:any={};
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Địa chỉ',
      field: 'DiaChi',
      width: '300px',
      align:'center'
    },
    {
      header: 'Số điện thoại',
      field: 'SoDienThoai',
      width: '300px',
      align:'center'
    },
    {
      header: 'Mã số thuế',
      field: 'MaSoThue',
      width: '300px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'MoTa',
      width: '200px',
      align:'center'
    },
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucTaiSan:DanhmuctaisanService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter(){
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      Keyword:this.filter.Keyword,  
      Ma:"", 
      Ten:""    
    };
    this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).subscribe((res:any)=>{
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldmnhacungcapComponent,{
      backdrop:'static',
      size:'lg',
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới nhà cung cấp';
    modalRef.result.then(res=>{
      this.GetList()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldmnhacungcapComponent,{
      backdrop:'static',
      size:'lg',
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật nhà cung cấp';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetList()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{   
      this._danhMucTaiSan.DanhMucNhaCungCap().DeleteList([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
          } else {
            this._toastr.error(res.Message);
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
    const listId=this.selectedItems.map(({Id}) => Id);
    modalRef.result.then(res=>{  
      this._danhMucTaiSan.DanhMucNhaCungCap().DeleteList(listId).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
            this.selectedItems = [];
          } else {
           this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  importExcel(){
    let modalRef = this._modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        this._danhMucTaiSan.DanhMucNhaCungCap().Importdm(this.fileUpload[0]).subscribe(()=>{
          this.resetFilter();
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  }
  exportExcel(){
    let data = {
      PageSize:20, 
      CurrentPage:0,
      Keyword:this.Keyword, 
     
    };
    this._danhMucTaiSan.DanhMucNhaCungCap().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucNhaCungCap().download(res.TenFile);
    })
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }
}
