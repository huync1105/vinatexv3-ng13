import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { BanchephammodalComponent } from '../banchephammodal/banchephammodal.component';

@Component({
  selector: 'app-banchepham',
  templateUrl: './banchepham.component.html',
  styleUrls: ['./banchepham.component.css']
})
export class BanchephamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  filter:any={
  };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '100px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
      align:'left'
    },
    {
      header: 'Đơn vị tính',
      field: 'DonViTinh',
      width: '200px',
      align:'center'
    },
    {
      header: 'Công đoạn',
      field: 'TenCongDoan',
      width: '200px',
      align:'center'
    },
  ];
  listdmLoaiSoi:any = [];
  listCongDoan : any = [];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,
    private _services:SanXuatService,
    private _toastr:ToastrService) 
    { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter(){
    this.filter = {
    };
    this.GetListdm()
  }
  GetListdm(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.filter.keyWord?this.filter.keyWord:'',
      IddmLoaiSoi:this.filter.IddmLoaiSoi?this.filter.IddmLoaiSoi:'',
      Ma:"", 
      Ten:"",
      Loai:"1",
      HoatDong:2,
    };
    this._services.dmKiemKeBanChePham().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(BanchephammodalComponent,{
      size:'lg',
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;

    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(BanchephammodalComponent,{
      size:'lg',
      backdrop:'static'
    });
    item.listCongDoan = ['ONG']
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    let itemDel : any = {};
    itemDel.Id = item.Id;
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{

      this._services.dmKiemKeBanChePham().Delete(itemDel).subscribe((res: any) => {
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
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdm();
  }
  
}
