import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-lohangmodal',
  templateUrl: './lohangmodal.component.html',
  styleUrls: ['./lohangmodal.component.css']
})
export class LohangmodalComponent implements OnInit {

  opt: any = ''
  listGiaoKeHoachFull: any = [];
  listGiaoKeHoach: any = [];
  listTrienKhaiKeHoach: any = [];
  item: any = {};
  khongclicknhieu: any = false;
  lang: any = vn;
  listGiaoKeHoach_TrienKhaiFull: any = [];
  listGiaoKeHoach_TrienKhai: any = [];
  constructor(public activeModal: NgbActiveModal,
     private services: SanXuatService,
      public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    if(this.opt !== 'edit')
      this.item.HoatDong = true
    this.getListGiaoKeHoach();
    this.getListTrienKhaiKeHoach();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix );
    }
    console.log(this.item)
  }
  
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.LoHang().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  getListGiaoKeHoach(){
    this.services.GetOptions().GetListGiaoKeHoachSanXuatChuaLapKeHoach().subscribe((res:any)=>{
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
      this.listGiaoKeHoachFull = res;
    })
  }

  getListTrienKhaiKeHoach(){
    let data={
      CurrentPage: 0,
      isHoanThanh: false
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res:any)=>{
      this.listGiaoKeHoach_TrienKhaiFull = res;
      this.listGiaoKeHoach_TrienKhai = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  giaoKeHoach(event){
    var itemFind = this.listGiaoKeHoachFull.find(function (obj) {
          return obj.Id == event.value; 
    });
    this.item.IddmPhanXuong = itemFind.IddmPhanXuong;
    this.item.IdGiaoKeHoachSanXuat = itemFind.Id;
    let dataFilter: any = this.listGiaoKeHoach_TrienKhaiFull.filter(ele=>ele.IdGiaoKeHoachSanXuat===itemFind.Id);
    this.listGiaoKeHoach_TrienKhai = mapArrayForDropDown(dataFilter, 'SoQuyTrinh', 'Id');
  }
}
