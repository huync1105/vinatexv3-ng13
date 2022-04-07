import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhmuctaisanComponent } from '../modal/modaldanhmuctaisan/modaldanhmuctaisan.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danhmuctaisan',
  templateUrl: './danhmuctaisan.component.html',
  styleUrls: ['./danhmuctaisan.component.css']
})
export class DanhmuctaisanComponent implements OnInit {

    @ViewChild('paginator') paginator: any;
    items: any = [];
    // item: any={};
    keyWord:any='';
    paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
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
        width: '200px',
        align:'center'
      },
      {
        header: 'Nhà máy',
        field: 'TenNhaMay',
        width: '150px',
        align:'center'
      },
      {
        header: 'Đơn vị ',
        field: 'DonViTinh',
        width: '150px',
        align:'center'
      },
      {
        header: 'Năm sản xuất',
        field: 'NamSanXuat',
        width: '150px',
        align:'center'
      },
      {
        header: 'Năm mua',
        field: 'NamMua',
        width: '150px',
        align:'center'
      },
      // {
      //   header: 'Năm sử dụng',
      //   field: 'ThoiGianBatDauKhauHao',
      //   width: '150px',
      //   align:'center'
      // },
      
      // {
      //   header: 'Thời gian hết khấu hao ',
      //   field: 'ThoiGianHetKhauHao',
      //   width: '250px',
      //   align:'center'
      // },
      {
        header: 'Giá trị khấu hao mỗi tháng',
        field: 'GiaTriKhauHaoMoiThang',
        width: '250px',
        align:'center'
      },
      {
        header: 'Số năm khấu hao',
        field: 'SoNamKhauHao',
        width: '150px',
        align:'center'
      },
      // {
      //   header: 'Ghi chú',
      //   field: 'GhiChu',
      //   width: '200px',
      //   align:'center'
      // }
    ];
    selectedItems:any=[];

    listNhaMay: Array<any> = [];
    idDuAn: string = "";
    showDropDown: boolean = false;
    OSName: string = "HỆ THỐNG Quản lý Nhà – Đất";
    userBtn: any;
    userInfo: any;
    userSub: any;

    constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,
      private _toastr:ToastrService,
      private _services: SanXuatService,
      private store: StoreService,) { }
  
    ngOnInit(): void {
      this.GetListdmTaiSan();
    }
    resetFilter(){
      this.keyWord = '';
      this.GetListdmTaiSan(true);
    }
    GetListdmTaiSan(reset?){
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
      this. _danhMucHopDong.DanhMucTaiSan().GetList(data).subscribe((res:any)=>{
        this.items = res.Data.Items;
        this.paging.TotalItem = res.Data.TotalCount;
      })
    }
    add(){
      let modalRef = this._modal.open(ModaldanhmuctaisanComponent,{
        backdrop:'static',
        size: 'lg',
      });
      modalRef.componentInstance.opt='add';
      modalRef.componentInstance.type = 'themmoi';
      modalRef.componentInstance.title = 'Thêm mới tài sản';
      modalRef.result.then(res=>{
        this.GetListdmTaiSan()
        // this.getListNhaMay()
      }).catch(er=>console.log(er)) 
    }
    edit(item){
      let modalRef = this._modal.open(ModaldanhmuctaisanComponent,{
        backdrop:'static',size: 'lg',
      });
      modalRef.componentInstance.opt='edit';
      modalRef.componentInstance.type = 'capnhat';
      modalRef.componentInstance.title = 'Cập nhật tài sản';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
      modalRef.result.then(res=>{
        this.GetListdmTaiSan()
      }).catch(er=>console.log(er))
    }
    getListNhaMay() {
      this._services
        .GetOptions()
        .GetDanhSachDuAnByIdUser(this.userInfo.Id)
        .subscribe((res: any) => {
          this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
          this.idDuAn = res[0].Id;      
        });
    }
    delete(item){
      let modalRef = this._modal.open(ModalthongbaoComponent,{
        backdrop:'static'
      });
      modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
      modalRef.result.then(res=>{
        // const item=this.selectedItems[0];    
        this._danhMucHopDong.DanhMucTaiSan().Delete(item.Id).subscribe((res: any) => {
          if (res) {
            if (res.StatusCode === 200) {
              this._toastr.success(res.Message);
              this.GetListdmTaiSan();
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
    //           this.GetListdmTaiSan();
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
      this.GetListdmTaiSan()
    }
    
    }