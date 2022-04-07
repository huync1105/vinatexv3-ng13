import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ModalloaisucoComponent } from '../../modal/modalloaisuco/modalloaisuco.component';
@Component({
  selector: 'app-loaisuco',
  templateUrl: './loaisuco.component.html',
  styleUrls: ['./loaisuco.component.css']
})
export class LoaisucoComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword:any='';
  fileUpload: any;
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
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align:'center'
    },
    // {
    //   header: 'Tình trạng',
    //   field: 'isHoatDong',
    //   width: '200px',
    //   align:'center'
    // }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucTaiSan:DanhmuctaisanService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter(){
    this.Keyword = '';
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
      Keyword:this.Keyword,  
      Ma:"", 
      Ten:""    
    };
    this._danhMucTaiSan.DanhMucLoaiSuCo().GetList(data).subscribe((res:any)=>{
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalloaisucoComponent,{
      backdrop:'static',
      size:'lg',
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới loại sự cố';
    modalRef.result.then(res=>{
      this.GetList()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalloaisucoComponent,{
      backdrop:'static',
      size:'lg',
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật loại sự cố';
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
      this._danhMucTaiSan.DanhMucLoaiSuCo().DeleteList([item.Id]).subscribe((res: any) => {
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
      this._danhMucTaiSan.DanhMucLoaiSuCo().DeleteList(listId).subscribe((res: any) => {
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
        this._danhMucTaiSan.DanhMucLoaiSuCo().Importdm(this.fileUpload[0]).subscribe(()=>{
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
    this._danhMucTaiSan.DanhMucLoaiSuCo().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucLoaiSuCo().download(res.Data);
    })
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }
  

}
