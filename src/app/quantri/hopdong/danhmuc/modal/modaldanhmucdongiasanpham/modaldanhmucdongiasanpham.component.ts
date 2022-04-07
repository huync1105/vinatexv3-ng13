import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-modaldanhmucdongiasanpham',
  templateUrl: './modaldanhmucdongiasanpham.component.html',
  styleUrls: ['./modaldanhmucdongiasanpham.component.css']
})

export class ModaldanhmucdongiasanphamComponent implements OnInit {

  public data: any = [];
  public title: any = '';
  public type = '';
  public listNam = [];
  public Nam;
  public listDonViTien = [];
  public listDonViTienRef = [];
  public itemGoiYGia={};
  public showGoiYGia:boolean = false;
  public HeaderGoiYGia:string = '';
  public GiaGoiY:number=0;
  public cloneItemGia:any={};
  public listHeader: any=['Chi phí bông','Chi phí xơ','Chi phí VLP','Chi phí điện','Chi phí nhân công','Chi phí bằng tiền','Chi phí khác'];
  public listProp: any=['ChiPhiBong','ChiPhiXo','ChiPhiVLP','ChiPhiDien','ChiPhiNhanCong','ChiPhiTien','ChiPhiKhac'];
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService,public _hopdongServices:HopDongService) { }

  ngOnInit(): void {
    // for(let i = new Date().getFullYear()-5;i<=new Date().getFullYear()+5;i++){
    //   this.listNam.push({value:i,label:i});
    // }
    this.GetListDanhMucTienTe()
    this.GetListHopDongSoi()
    if (validVariable(this.Nam)) {
      this.GetData();
    }
  }
  addThemGia(item) {
    item.lstChiTietGia.push({ Id: '', Nam: item.Nam,IdSanPham:item.IdSanPham, })
  }
  GetListHopDongSoi(){
    this._hopdongServices.GetOptions().GetAllHopDong().subscribe((res:any)=>{
      console.log(res);
    })
  }
  getMadmTienTe(item){
    item.MadmTienTe = this.listDonViTienRef.find(ele=>ele.id===item.IddmTienTe)?.ma;
  }
  GetListDanhMucTienTe() {
    this._danhMucHopDong.DanhMucLoaiTienTe().GetListAll().subscribe((res: any) => {
      console.log(res);
      this.listDonViTien = mapArrayForDropDown(res,'ma','id');
      this.listDonViTienRef = res;
    })
  }
  GetData() {
    this._danhMucHopDong.DanhMucDonGia().Get(this.Nam).subscribe((res: any) => {
      console.log(res);
      this.data = res.Data;
    })
  }
  SetData() {
    return this.data;
  }
  GoiYGia(item,index){
    this.cloneItemGia = {
      IdSanPham:item.IdSanPham,
      indexGia:index
    }
    this._danhMucHopDong.DanhMucDonGia().GoiYGia({Nam:item.Nam,IdSanPham:item.IdSanPham}).subscribe((res:any)=>{
      console.log(res.Data);
      this.itemGoiYGia = res.Data;
      this.GiaGoiY = this.listProp.reduce((total,ele)=>total+this.itemGoiYGia[ele],0)
      this.showGoiYGia = true;
      this.HeaderGoiYGia = 'Gợi ý giá '+item.TenSanPham;
    })
  }
  ApDungGiaGoiY(){
    let sanpham = this.data.find(ele=>ele.IdSanPham === this.cloneItemGia.IdSanPham);
    let gia = sanpham?.lstChiTietGia[this.cloneItemGia.indexGia];
    gia && (gia.Gia = this.GiaGoiY);
    console.log(this.cloneItemGia,sanpham,gia)
    this.showGoiYGia = false;
  }
  QuayLai(){
    this.cloneItemGia = {};
    this.showGoiYGia = false;
    this.itemGoiYGia = {};
    this.GiaGoiY = 0;
    this.HeaderGoiYGia = ''  }
  GhiLai() {
    this._danhMucHopDong.DanhMucDonGia().Set(this.SetData()).subscribe((res: any) => {
      if (res.StatusCode!== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
}
