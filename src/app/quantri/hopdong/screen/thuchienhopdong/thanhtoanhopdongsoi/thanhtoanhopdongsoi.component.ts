import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, formatdate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { ThanhtoanhopdongsoimodalComponent } from './thanhtoanhopdongsoimodal/thanhtoanhopdongsoimodal.component';

@Component({
  selector: 'app-thanhtoanhopdongsoi',
  templateUrl: './thanhtoanhopdongsoi.component.html',
  styleUrls: ['./thanhtoanhopdongsoi.component.css']
})
export class ThanhtoanhopdongsoiComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPLOBONG";
  listHopDong: any = [];
  IdDuAn: any = 0;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  title: any = "";
  type: any = "";
  nametype: any = "";
  suber: any;

  constructor(public _modal: NgbModal, public _toastr: ToastrService, 
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router, private store: StoreService,
    private _hopdong: HopDongService, ) {
     }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      this.title = res.kho;
      if(res.id!=='0'){
        this.update(res.id);
      }
    })
    this.IdDuAn = this.store.getCurrent();
    this._service.GetOptions().GetDanhSachHopDongByNhaThauSoi(this.IdDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenHopDong', 'id');
    })
    this.KiemTraTabTrangThai();
  }
  
  changeParam(id) {
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/hopdongsanxuat/quytrinhthanhtoansoi/${id}`], { replaceUrl: true })
  }
  
  addPhieu() {
    this.changeParam(0);
    let modalRef = this._modal.open(ThanhtoanhopdongsoimodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.IdDuAn = this.IdDuAn;
    modalRef.componentInstance.nametype = this.nametype;
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    this.changeParam(0);

    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0); })
  }
 
  update(Id) {
    this._hopdong.QuyTrinhThanhToan().Get(Id).subscribe((res1: any) => {

      let modalRef = this._modal.open(ThanhtoanhopdongsoimodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res1.data;
      modalRef.componentInstance.type = this.type;
      modalRef.componentInstance.nametype = this.nametype;
      modalRef.componentInstance.IdDuAn = this.IdDuAn;
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => { console.log(er) 
          this.GetListQuyTrinh();
          this.changeParam(0);})
        .finally(()=>{
          this.GetListQuyTrinh();
          this.changeParam(0);
        })
      })

  }
  changeTab(e) {
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      KeyWord: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay) ,
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IdHopDong: this.filter.IdHopDong,
      Loai: 11,
    }
    this._hopdong.QuyTrinhThanhToan().GetList(data).subscribe((res: any) => {
      this.items = res.data.items;
      if (this.items.length > 0) {
        this.items.forEach(element => {
          element._Ngay = element.NgayUnix > 0 ? formatdate(element.Ngay, false) : null;
        });
      }
      this.paging.CurrentPage = res.data.page;
      this.paging.TotalPage = res.data.totalPages;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen ={
        ThemMoi:true,
        ChuaXuLy:true,
        DaXyLy:true,

      }
      // this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  validateFilter() {
    if (!validVariable(this.filter.TuNgay) || !validVariable(this.filter.DenNgay) || DateToUnix(this.filter.DenNgay) < DateToUnix(this.filter.TuNgay)) {
      this._toastr.error('Vui lòng nhập khoảng thời gian hợp lệ!')
      return false
    }
    return true
  }
}
