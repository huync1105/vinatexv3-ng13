import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModaldanhmucphibanhangComponent } from '../modal/modaldanhmucphibanhang/modaldanhmucphibanhang.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ConstantPool } from '@angular/compiler';


@Component({
  selector: 'app-danhmucphibanhang',
  templateUrl: './danhmucphibanhang.component.html',
  styleUrls: ['./danhmucphibanhang.component.css']
})
export class DanhmucphibanhangComponent implements OnInit {

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
      width: '300px',
      align:'center'
    },
    {
      header: 'Loại nội địa - xuất khẩu',
      field: 'TenNoi',
      width: '300px',
      align:'center'
    },
    {
      header: 'Đơn vị',
      field: 'DonViTinh',
      width: '200px',
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
  listLoai: any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService,
    private _services: SanXuatService,) { }

  ngOnInit(): void {
    
    this.GetListNoiDiaXuatKhau();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmChiPhiBanHang(true);
  }
  GetListdmChiPhiBanHang(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:25, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      ma:"", 
      ten:""    
    };
    this. _danhMucHopDong. DanhMucChiPhiBanHang().GetList(data).subscribe((res:any)=>{
      res.Data.Items.forEach(obj=>{  
        console.log(obj)          
        obj.TenNoi = this.listLoai.find(ele=>ele.value===obj.LoaiXuatKhauNoiDia)?.label||null;            
      });
      this.items = res.Data.Items;
      this.paging.TotalItem = res.Data.TotalCount;
      console.log(this.listLoai);          
    })
  }
  GetListNoiDiaXuatKhau() {
    this._services.GetOptions().GetDanhMucNoiDiaXuatKhau().subscribe((res: any) => {
      this.listLoai = mapArrayForDropDown(res.Data.Items, 'Ten', 'Id');
      this.GetListdmChiPhiBanHang();
    })
  }
  
  add(){
    let modalRef = this._modal.open(ModaldanhmucphibanhangComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới chi phí bán hàng';
    modalRef.result.then(res=>{
      this.GetListdmChiPhiBanHang()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucphibanhangComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật chi phí bán hàng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmChiPhiBanHang()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{ 
      this._danhMucHopDong.DanhMucChiPhiBanHang().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdmChiPhiBanHang();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
 
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmChiPhiBanHang()
  }
  
  }