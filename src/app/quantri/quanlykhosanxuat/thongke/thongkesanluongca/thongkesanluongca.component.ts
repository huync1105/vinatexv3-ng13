import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { ThongkesanluongcamodalComponent } from '../thongkesanluong/thongkesanluongcamodal/thongkesanluongcamodal.component';

@Component({
  selector: 'app-thongkesanluongca',
  templateUrl: './thongkesanluongca.component.html',
  styleUrls: ['./thongkesanluongca.component.css']
})
export class ThongkesanluongcaComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: '150px'
    },
    {
      header: 'Ngày',
      field: 'Ngay',
      width: '100px'
    },
    {
      header: 'Khối lượng(kg)',
      field: 'TongKhoiLuong',
      width: '100px'
    },
    {
      header: 'Phân xưởng',
      field: 'TendmPhanXuong',
      width: '150px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '150px'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '150px'
    },
  ];
  checkQuyen:any={ChuaXuLy:false,DaXyLy:false,ThemMoi:false};
  listPhanXuong: any = [];
  eAction = 'THONGKESANLUONG'
  constructor(public _modal:NgbModal,public store:StoreService,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,
    private router:Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0'){
        this.update(res.id);
      }
    
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh();
    this.getListPhanXuong();
  }
 
  getListPhanXuong() {
    this._service.GetListdmPhanXuong({}).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  changeParam(id){
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/theodoithongkebaocaosanxuat/thongkesanluongca/${id}`],{replaceUrl: true})
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
      IddmPhanXuong: this.filter.IddmPhanXuong,
    }
    this._service.ThongKeSanLuongNhieuCa().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(ThongkesanluongcamodalComponent , {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);
    })
    .catch(er => { console.log(er)
      this.GetListQuyTrinh();
      this.changeParam(0); })
  }
  update(Id){
    this._service.ThongKeSanLuongNhieuCa().Get(Id).subscribe((res1: any) => {
    let modalRef = this._modal.open(ThongkesanluongcamodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);
    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0); })
    })
  }
}
