import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ModalchiphibanhangtheonamComponent } from '../../modal/modalchiphibanhangtheonam/modalchiphibanhangtheonam.component';

@Component({
  selector: 'app-chiphibanhangtheonam',
  templateUrl: './chiphibanhangtheonam.component.html',
  styleUrls: ['./chiphibanhangtheonam.component.css']
})
export class ChiphibanhangtheonamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  userBtn: any;
  userInfo: any;
  userSub: any;
  listNhaMay: Array<any> = [];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService,
    private _auth: AuthenticationService,private _services: SanXuatService,) {this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.GetListChiPhiBanHang();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListChiPhiBanHang(true);
  }
  GetListChiPhiBanHang(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = res;
        let data = {
          PageSize:20, 
          CurrentPage:this.paging.CurrentPage,
          sFilter:this.keyWord,  
          
        };
        this._danhMucHopDong.ChiPhiBanHangTheoNam().GetList(data).subscribe((res:any)=>{
          this.items = res.Data.Items;
          this.items.forEach(obj=>{            
            obj.TenDuAn = this.listNhaMay.find(ele=>ele.Id==obj.IdDuAn).TenDuAn;            
          });
          
          this.paging.TotalItem = res.Data.TotalCount;
        })
      });   
  }
  
  add(){
    let modalRef = this._modal.open(ModalchiphibanhangtheonamComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Thêm mới chi phí bán hàng theo năm';
    modalRef.result.then(res=>{
      this.GetListChiPhiBanHang();
    }).catch(er=>console.log(er))
  }

edit(item){
  this._danhMucHopDong.ChiPhiBanHangTheoNam().Get(item.Id).subscribe((res1:any)=>{
    res1.listItem = res1.lstChiTiet;
    let modalRef = this._modal.open(ModalchiphibanhangtheonamComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Cập nhật chi phí bán hàng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1)); 
    modalRef.result.then(res=>{
      this.GetListChiPhiBanHang();
    }).catch(er=>console.log(er))
  })
}
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{    
      this._danhMucHopDong.ChiPhiBanHangTheoNam().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 500) {
            this._toastr.success(res.Message);
            this.GetListChiPhiBanHang();
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
    this.GetListChiPhiBanHang()
  }
  
  }