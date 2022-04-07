import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-tinhdoanhthumodal',
  templateUrl: './tinhdoanhthumodal.component.html',
  styleUrls: ['./tinhdoanhthumodal.component.css']
})
export class TinhdoanhthumodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  headerChiTietModal: string = '';
  showChiTietThang: boolean = false;
  itemChiTietThang: any = { lstDoanhThuSanPhamThang: [] };
  newDoanhThuChiTiet: any = {};
  itemKeHoach: any = {};
  checkbutton: any = {};
  listGia: any = [];
  listGiaRef: any = [];
  Nam: number;
  addonThongTinDoanhThu: any = {};
  mapSanPham_Gia: any = {};
  cloneIdThang_SanPham: any;
  listThang:any=[];
  thangApDung:Array<number>=[];
  TongDoanhThuNam:number=0;
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { }

  ngOnInit(): void {
    this.GetDonGiaSanPham();
    this.tinhDoanhThuNamSanPham();
    this.tinhTongDoanhThuNam()
  }
  GetDonGiaSanPham() {
    this.mapSanPham_Gia = {};
    this._danhMucHopDong.DanhMucDonGia().Get(this.item.Nam).subscribe((res: any) => {
      this.item.lstSanPham.forEach(sanpham => {
        this.mapSanPham_Gia[sanpham.IdSanPham.replaceAll('-', '_')] = res.Data.find(ele => ele.IdSanPham === sanpham.IdSanPham);
      });
      for (let key in this.mapSanPham_Gia) {
        this.mapSanPham_Gia[key].lstChiTietGia.forEach(gia => {
          gia.HienThi = `${formatNumber(gia.Gia, 'en-EN', '0.0-3')} ${gia.MadmTienTe}`;
        });
        this.mapSanPham_Gia[key].listGia = mapArrayForDropDown(this.mapSanPham_Gia[key].lstChiTietGia, 'HienThi', 'Id');
      }
    })
  }
  ChiTietSanPhamThang(thang, sanpham) {
    this.cloneIdThang_SanPham = { Thang: thang.Thang, IdSanPham: sanpham.IdSanPham };
    this.listThang = [];
    for(let i = 1;i<=12;i++){
      if(i!==thang.Thang){
        this.listThang.push({value:i,label:`Tháng ${i}`})
      }
    }
    let data = {
      Thang: thang.Thang,
      Nam: this.Nam,
      IdSanPham: sanpham.IdSanPham,
      IdKeHoachKinhDoanh: sanpham.IdKeHoachKinhDoanh,
    }
    this.addonThongTinDoanhThu = {
      Thang: thang.Thang,
      Nam: this.Nam,
      IdSanPham: sanpham.IdSanPham,
      IdKeHoachKinhDoanh: sanpham.IdKeHoachKinhDoanh,
      IdKeHoachKinhDoanhGoc: sanpham.IdKeHoachKinhDoanhGoc
    }
    let key = sanpham.IdSanPham.replaceAll('-', '_');
    this.listGia = this.mapSanPham_Gia[key].listGia;
    this.listGiaRef = this.mapSanPham_Gia[key].lstChiTietGia;
    this._danhMucHopDong.TinhToanDoanhThu().GetThang(data).subscribe((res: any) => {
      res.TongSanLuongTheoKeHoach = thang.TongSanLuongTheoKeHoach;
      res.Thang = thang.Thang;
      res.TenSanPham = sanpham.TenSanPham;
      this.showChiTietThang = true;
      this.itemChiTietThang = res;
      this.itemChiTietThang.lstThangApDung=[];
      this.headerChiTietModal = `Chi tiết tháng ${thang.Thang} - ${sanpham.TenSanPham}`;
    })
  }
  changeGia(event, rootItem) {
    let ref = this.listGiaRef.find(gia => gia.Id === event.value);
    rootItem.Gia = ref.Gia;
    rootItem.MadmTienTe = ref.MadmTienTe;
    rootItem.IddmTienTe = ref.IddmTienTe;
    rootItem.TyGia = ref.TyGia;
    this.tinhDoanhThu(rootItem);
  }
  tinhDoanhThu(rootItem) {
    let arrTest = ['SanLuong', 'Gia', 'TyGia'];
    let valid = arrTest.every(prop => validVariable(rootItem[prop]));
    if (valid) {
      rootItem.DoanhThu = arrTest.reduce((multiply, ele) => multiply *= rootItem[ele], 1)
    }
    this.TinhTong()
  }
  tinhDoanhThuNamSanPham(){
    this.item.lstSanPham.forEach(sanpham => {
      sanpham.TongDoanhThuNamSanPham =0;
      sanpham.TongDoanhThuNamSanPham = sanpham.lstDoanhThuSanPhamThang.reduce((total,ele)=>{
        return total +=ele.TongDoanhThu;
      },0)
      console.log(sanpham.TongDoanhThuNamSanPham)
    });
  }
  tinhTongDoanhThuNam(){
    this.TongDoanhThuNam = this.item.lstSanPham.reduce((total,ele)=>total+=ele.TongDoanhThuNamSanPham,0);
  }
  TinhTong() {
    this.itemChiTietThang.TongSanLuong = 0;
    this.itemChiTietThang.TongDoanhThu = 0;
    this.itemChiTietThang.lstDoanhThuSanPhamThang.forEach(doanhthu => {
      this.itemChiTietThang.TongSanLuong += doanhthu.SanLuong;
      this.itemChiTietThang.TongDoanhThu += doanhthu.DoanhThu;
    });
    console.log(this.itemChiTietThang);
  }
  ThemDoanhThuChiTiet() {
    let arrTest = ['SanLuong', 'Gia', 'TyGia'];
    let valid = arrTest.every(prop => validVariable(this.newDoanhThuChiTiet[prop]));
    if (!valid) {
      this.toastr.warning('Vui lòng nhập đầy đủ các trường dữ liệu');
    } else {
      let data = { ...this.newDoanhThuChiTiet, Id: '', ...this.addonThongTinDoanhThu }
      this.itemChiTietThang.lstDoanhThuSanPhamThang.push(deepCopy(data));
      this.newDoanhThuChiTiet = {}
    }
    this.TinhTong()
  }
  XoaDoanhThuChiTiet(index) {
    let remove = this.itemChiTietThang.lstDoanhThuSanPhamThang.splice(index, 1);
    this.TinhTong()
  }
  cleanForm() {
    this.newDoanhThuChiTiet = {};
    this.thangApDung = [];
  }
  rebindTongSanLuong_TongDoanhThu(){
   let sanpham =  this.item.lstSanPham.find(ele=>ele.IdSanPham ===this.cloneIdThang_SanPham.IdSanPham);
   let thang = sanpham.lstDoanhThuSanPhamThang.find(ele=>ele.Thang===this.cloneIdThang_SanPham.Thang);
   thang.TongDoanhThu = this.itemChiTietThang.TongDoanhThu;
   thang.TongSanLuong = this.itemChiTietThang.TongSanLuong;
   this.thangApDung.forEach(thangAD=>{
     let thangapdung = sanpham.lstDoanhThuSanPhamThang.find(ele=>ele.Thang===thangAD);
     thangapdung.TongDoanhThu = this.itemChiTietThang.TongDoanhThu;
     thangapdung.TongSanLuong = this.itemChiTietThang.TongSanLuong;
   })
  }
  GhiLai() {
    this._danhMucHopDong.TinhToanDoanhThu().Set(this.itemChiTietThang).subscribe((res:any)=>{
      if(res.StatusCode!==200){
        this.toastr.error(res.Message);
      }else{
        this.rebindTongSanLuong_TongDoanhThu()
        this.toastr.success(res.Message);
      }
    },(er=>{
      this.toastr.error('Có lỗi trong quá trình xử lý!\n Vui lòng liên hệ nhà phát triển!')
    }));
  }
  QuayLai() {
    this.showChiTietThang = false;
  }
  ApDung(){
    console.log(this.thangApDung)
    this.itemChiTietThang.lstThangApDung = this.thangApDung;
    this._danhMucHopDong.TinhToanDoanhThu().Set(this.itemChiTietThang).subscribe((res:any)=>{
      if(res.StatusCode!==200){
        this.toastr.error(res.Message);
      }else{
        this.rebindTongSanLuong_TongDoanhThu()
        this.toastr.success(res.Message);
      }
    },(er=>{
      this.toastr.error('Có lỗi trong quá trình xử lý!\n Vui lòng liên hệ nhà phát triển!')
    }));
  }
}
