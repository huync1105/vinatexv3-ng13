import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalchiphibongComponent } from '../modal/modalchiphibong/modalchiphibong.component';

@Component({
  selector: 'app-chiphibong',
  templateUrl: './chiphibong.component.html',
  styleUrls: ['./chiphibong.component.css']
})
export class ChiphibongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  Nam:number ;
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
    this.GetListMucLuong();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListMucLuong(true);
  }
  GetListMucLuong(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = res;
        // this.idDuAn = res[0].Id;ss
        let data = {
          PageSize:20, 
          CurrentPage:this.paging.CurrentPage,
          sFilter:this.keyWord,  
          
        };
        this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Bong').GetList().subscribe((res:any)=>{
          console.log(res);
          this.items = res.Data;
          this.items.filter(obj=>{            
            obj.TenDuAn = this.listNhaMay.find(ele=>ele.Id==obj.IdDuAn).TenDuAn;            
          });
          
          // this.paging.TotalItem = res.Data.TotalCount;
        })
      });   
  }
  
  add(){
    let modalRef = this._modal.open(ModalchiphibongComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Th??m m???i chi ph?? b??ng';
    modalRef.result.then(res=>{
      this.GetListMucLuong();
    }).catch(er=>console.log(er))
  }

edit(item){
  this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Bong').Get(this.Nam).subscribe((res: any) => {
    // res1.listItem = res1.lstChiTiet;
    let modalRef = this._modal.open(ModalchiphibongComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'C???p nh???t chi ph?? b??ng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListMucLuong();
    }).catch(er=>console.log(er))
  })
}
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='B???n c?? ch???c ch???n mu???n x??a d??? li???u v???a ch???n?';
    modalRef.result.then(res=>{    
     
      this._danhMucHopDong.MucLuongCoCauNhanSu().Delete(item).subscribe((res: any) => {
       console.log(res);
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListMucLuong();
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
  //   modalRef.componentInstance.message='B???n c?? ch???c ch???n mu???n x??a d??? li???u v???a ch???n?';
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
    this.GetListMucLuong()
  }
  
}
