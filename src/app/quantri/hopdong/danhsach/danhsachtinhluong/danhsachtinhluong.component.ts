import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhsachtinhluongComponent } from '../modal/modaldanhsachtinhluong/modaldanhsachtinhluong.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danhsachtinhluong',
  templateUrl: './danhsachtinhluong.component.html',
  styleUrls: ['./danhsachtinhluong.component.css']
})
export class DanhsachtinhluongComponent implements OnInit {
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
    this.GetListdsTinhLuong();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdsTinhLuong(true);
  }
  GetListdsTinhLuong(reset?){
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
        this._danhMucHopDong.DanhSachTinhLuong().GetList(data).subscribe((res:any)=>{
          this.items = res.Data.Items;
          this.items.filter(obj=>{            
            obj.TenDuAn = this.listNhaMay.find(ele=>ele.Id==obj.IdDuAn).TenDuAn;            
          });       
          this.paging.TotalItem = res.Data.TotalCount;
        })
      });   
  }
  
  add(){
    let modalRef = this._modal.open(ModaldanhsachtinhluongComponent,{
      backdrop:'static',
      size:'fullscreen-100'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Danh sách tính lương hàng năm';
    modalRef.result.then(res=>{
      this.GetListdsTinhLuong();
    }).catch(er=>console.log(er))
  }

edit(item){
  this._danhMucHopDong.DanhSachTinhLuong().Get(item.Id).subscribe((res1:any)=>{
    res1.listItem = res1.lstChiTiet;
    let modalRef = this._modal.open(ModaldanhsachtinhluongComponent,{
      backdrop:'static',
      size:'fullscreen-100'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Cập nhật danh sách tính lương';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
    modalRef.result.then(res=>{
      this.GetListdsTinhLuong();
    }).catch(er=>console.log(er))
  })
}

  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{    
     
      this._danhMucHopDong.DanhSachTinhLuong().Delete(item).subscribe((res: any) => {
       console.log(res);
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdsTinhLuong();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }

  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdsTinhLuong()
  }
  
  }
