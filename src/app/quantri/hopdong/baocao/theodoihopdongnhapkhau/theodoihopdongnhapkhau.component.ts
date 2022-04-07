import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { DateToUnix } from 'src/app/services/globalfunction';
@Component({
  selector: 'app-theodoihopdongnhapkhau',
  templateUrl: './theodoihopdongnhapkhau.component.html',
  styleUrls: ['./theodoihopdongnhapkhau.component.css']
})
export class TheodoihopdongnhapkhauComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter:any={};
  listNhaCungCap:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  // cols: any = [
  //   {
  //     header: 'Số hợp đồng',
  //     field: 'SoHopDong',
  //     width: '150px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Ngày ký',
  //     field: 'NgayKy',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Đại lý',
  //     field: 'DaiLy',
  //     width: '300px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Nhà cung cấp',
  //     field: 'NhaCungCap',
  //     width: '300px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Loại bông',
  //     field: 'LoaiBong',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Chỉ tiêu chất lượng',
  //     field: 'ChiTieuChatLuong',
  //     width: '300px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Số lượng ký HĐ(Tấn)',
  //     field: 'SoLuongKiHD',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Thanh toán',
  //     field: 'ThanhToan',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Dự kiến giao hàng',
  //     field: 'DuKienGiaoHang',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Dự kiến về HP',
  //     field: 'DuKienVeHP',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Dự kiến về đơn vị',
  //     field: 'DuKienVeDonVi',
  //     width: '200px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Số lượng(Kg)',
  //     field: 'SoLuong',
  //     width: '150px',
  //     align:'center'
  //   },
  //   {
  //     header: 'Chất lượng thực tế về kho',
  //     field: 'ChatLuongThucTeVeKho',
  //     width: '300px',
  //     align:'center'
  //   },
  // ];
  checkQuyen:any={DaGiaoDich:true,DaKetThuc:true};
 
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:Dat09Service) { }

  ngOnInit(): void {
    
  }
 
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;


      
      
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    // this._service.GetListQuyTrinh(data).subscribe((res:any)=>{
    //   this.items = res.items;
    //   this.paging = res.paging;
    // })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    // this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
}

