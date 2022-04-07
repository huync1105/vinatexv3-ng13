import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldinhmucmathangtheonam',
  templateUrl: './modaldinhmucmathangtheonam.component.html',
  styleUrls: ['./modaldinhmucmathangtheonam.component.css']
})
export class ModaldinhmucmathangtheonamComponent implements OnInit {

  public newitem: any=[];
  listdmLoaiSoi:any = [];
listNhaMay: Array<any> = [];
listPhanXuong: any = [];

idDuAn: string = "";
showDropDown: boolean = false;
userBtn: any;
userInfo: any;
userSub: any;
oldEditItem:any=[];
  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal,private _services: SanXuatService, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListNhaMay();
    this.GetListdmLoaiSoi();
    this.getListPhanXuong();
  }
  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
        // this.idDuAn = res[0].Id;ss
     
      });
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
 
  GetListdmLoaiSoi(){
    this._services.GetListOptdmLoaiSoi().subscribe((res:any)=>{
      this.listdmLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add2() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }
  deleteBongHoi(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  SetData() {
    let data: any = {
      "id": this.item.id,
      "nam": this.item.nam,
      "idDuAn": this.item.idDuAn,
      "created": this.type == "dinhmucmathanghangnam" ? new Date() : this.item.created,
    };
    return data;
  }


  GhiLai() {
      this._danhMucHopDong.DinhMucMatHangTheoNam().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode !== 200) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        } 
      
      })
    }
  
}