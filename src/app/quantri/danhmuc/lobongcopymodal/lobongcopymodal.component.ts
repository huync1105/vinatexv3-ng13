import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-lobongcopymodal',
  templateUrl: './lobongcopymodal.component.html',
  styleUrls: ['./lobongcopymodal.component.css']
})
export class LobongcopymodalComponent implements OnInit {
  opt: any = ''
  listdmLoaiBong: any = [];
  listLoBong: any = [];
  listLoBongFull : any = [];
  listdmCapBong: any = [];
  item: any = {};
  khongclicknhieu: any = false;
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal,
     private services: SanXuatService,
      public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListdmCapBong();
    this.GetListdmLoaiBong();
    this.GetListLoBong();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    console.log(this.item)
  }
  
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.SetLoBong(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.success(res.message)
            this.activeModal.close();
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

  GetListdmLoaiBong(){
    let data={
      CurrentPage: 0,
    }
    this.services.GetListdmLoaiBong(data).subscribe((res:any)=>{
      this.listdmLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListLoBong(){
    let data={
      CurrentPage: 0,
    }
    this.services.GetListLoBong(data).subscribe((res:any)=>{
      res.forEach(ele => {
        ele.TenHienThi = `${ele.Ten} ${validVariable(ele.MaInvoice)?`- ${ele.MaInvoice}`:''} ${validVariable(ele.SoHopDong)?`- ${ele.SoHopDong}`:''}`
      });
      res.sort((a,b)=>{
        return a.TenHienThi.localeCompare(b.TenHienThi)
      })
      this.listLoBong = mapArrayForDropDown(res, 'TenHienThi', 'Id');
      this.listLoBongFull = res;
    })
  }
  getListdmCapBong(){
    this.services.GetListOptdmCapBong().subscribe((res:any)=>{
      this.listdmCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  CopyLoBong(){
    this.activeModal.close(
      {data:this.item}
  );
  }
  luaChonLoBong(){
   let data =  this.listLoBongFull.find(obj => (obj.Id == this.item.IdLoBongCopy));
   let IdLoBongCopy = this.item.IdLoBongCopy;
   if(data !== undefined){
    this.item = data;
    this.item.IdLoBongCopy = IdLoBongCopy;
   }
  }
}
