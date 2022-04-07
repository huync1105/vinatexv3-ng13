import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dinhmucsanxuat',
  templateUrl: './dinhmucsanxuat.component.html',
  styleUrls: ['./dinhmucsanxuat.component.css']
})
export class DinhmucsanxuatComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Nhà máy',
      field: 'TenDuAn',
      width: '350px',
      align:'center'
    },
    {
      header: 'Phân xưởng',
      field: 'Ten',
      width: '300px',
      align:'center'
    },
    
  ];
  selectedItems:any=[];

  constructor(private _modal:NgbModal,private _services: SanXuatService,
    private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) {}

  ngOnInit(): void {
    this.GetListDinhMucSanXuat();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListDinhMucSanXuat()
  }
  GetListDinhMucSanXuat(reset?){
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
    this._danhMucHopDong.DinhMucSanXuat().GetList().subscribe((res:any)=>{
      this.items = res  
    })
  }

  edit(item) 
  {  
      item.edit=true;
  }

  save(item)
  {
    this._danhMucHopDong.DinhMucSanXuat().Update(item).subscribe((res:any)=>{
      item.edit=false;
    }) 
  }
 
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListDinhMucSanXuat()
  }
}