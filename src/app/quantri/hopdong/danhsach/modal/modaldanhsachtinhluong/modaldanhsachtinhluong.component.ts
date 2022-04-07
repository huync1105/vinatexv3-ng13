import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhsachtinhluong',
  templateUrl: './modaldanhsachtinhluong.component.html',
  styleUrls: ['./modaldanhsachtinhluong.component.css']
})
export class ModaldanhsachtinhluongComponent implements OnInit {

  newitem: any = {};
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  listPhanXuong: any = [];
  listTinhLuong: any = [];
  IdDuAn: string = "";
  showDropDown: boolean = false;
  userBtn: any;
  userInfo: any;
  userSub: any;
  oldEditItem: any = [];
  item: any = {};
  type = '';
  opt = '';
  lstChiTiet: any = [];
  lstProps:any=['LuongViTri','BaoHiem','TienAnCa','LuongNgayLe','LuongThang13','NgayCongCoSo','SoLuong'];
  lstHeader:any=['Lương vị trí','Bảo hiểm','Tiền ăn ca','Lương ngày lễ','Lương tháng 13','Ngày công cơ sở','Số lượng']
  listCoCauNhanSu: any[]=[];
  TongChiPhiToanBo:any=0;
  title
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    if (this.opt == 'add') {

    }
    else {

    }
    this.getListNhaMay();
    this.GetListdmCoCauNhanSu();
    this.item.listItem.forEach(item => {
      this.TinhTongChiPhi(item);
    });
    this.TinhTongChiPhiToanBo();
    // this.GetListdmTinhLuong();
  }
  GetListdmCoCauNhanSu(){
    let data = {
      PageSize:100, 
      CurrentPage:1,
      sFilter:'',  
      ma:"", 
      ten:""    
    };
    this._danhMucHopDong.DanhMucCoCauNhanSu().GetList(data).subscribe((res:any)=>{
      this.listCoCauNhanSu = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
      
    })
  }
  GetListdmTinhLuong() {

    let data = {
      PageSize: 100,
      CurrentPage: 1,
      sFilter: '',
      ma: "",
      ten: ""
    };
    this._danhMucHopDong.DanhMucTinhLuong().GetList(data).subscribe((res: any) => {
      this.listTinhLuong = mapArrayForDropDown(res.Data.Items, "Ten", "Id");

    })
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
      });
  }

  add2() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  TinhTongChiPhi(item){
    item.TongChiPhiCaNam = (((item.LuongViTri|0) + (item.BaoHiem|0) + (item.TienAnCa|0)) * 12 + (item.LuongNgayLe|0) + (item.LuongThang13|0))*(item.SoLuong|0);
  }
  TinhTongChiPhiToanBo(){
    this.TongChiPhiToanBo = 0;
    this.item.listItem.forEach(item => {
      this.TongChiPhiToanBo+= item.TongChiPhiCaNam;
    });
  }
  edit(item) {
    item.edit = true;
  }

  save(item) {
    item.edit = false;
  }

  xoa(item) {

  }

  GhiLai() {
    if (this.opt == 'add') {
      this.item.lstChiTiet = deepCopy(this.item.listItem);
      delete this.item.listItem;
      console.log(this.item);
      this._danhMucHopDong.DanhSachTinhLuong().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
    else {
      this.item.lstChiTiet = deepCopy(this.item.listItem);
      this._danhMucHopDong.DanhSachTinhLuong().Update(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  
}