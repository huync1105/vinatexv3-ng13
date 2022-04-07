import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BangiaotaisanComponent } from './bangiaotaisan/bangiaotaisan.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DanhmucmucdouutienComponent } from './danhmuc/danhmucmucdouutien/danhmucmucdouutien.component';
import { DanhmucnhacungcapComponent } from './danhmuc/danhmucnhacungcap/danhmucnhacungcap.component';

import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { HangsanxuatComponent } from './danhmuc/hangsanxuat/hangsanxuat.component';
import { LoaikhauhaoComponent } from './danhmuc/loaikhauhao/loaikhauhao.component';
import { LoaisucoComponent } from './danhmuc/loaisuco/loaisuco.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';
import { DanhsachvattuComponent } from './danhsachvattu/danhsachvattu.component';
import { DenghixulisucoComponent } from './denghixulisuco/denghixulisuco.component';
import { KhauHaoTaiSanQuyTrinhComponent } from './khau-hao-tai-san-quy-trinh/khau-hao-tai-san-quy-trinh.component';
import { LapkehoachlichxichnamComponent } from './lapkehoachlichxichnam/lapkehoachlichxichnam.component';
import { LapkehoachthangComponent } from './lapkehoachthang/lapkehoachthang.component';
import { LichxichnamComponent } from './lichxichnam/lichxichnam.component';
import { LichxichthangComponent } from './lichxichthang/lichxichthang.component';
import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan/nhaplieuxuattaisan.component';
import { NhaptaisanComponent } from './nhaptaisan/nhaptaisan.component';
import { QuytrinhbaoduongComponent } from './quytrinhbaoduong/quytrinhbaoduong.component';
import { NhomNhaCungUngDanhMucComponent } from './nhom-nha-cung-ung-danh-muc/nhom-nha-cung-ung-danh-muc.component';
import { NhaCungUngDanhMucComponent } from './nha-cung-ung-danh-muc/nha-cung-ung-danh-muc.component';
import { DanhGiaNhaCungUngComponent } from './danh-gia-nha-cung-ung/danh-gia-nha-cung-ung.component';
import { QuytrinhdenghithayvattuComponent } from './quytrinhdenghithayvattu/quytrinhdenghithayvattu.component';
import { QuytrinhlapkehoachlichxichnamComponent } from './quytrinhlapkehoachlichxichnam/quytrinhlapkehoachlichxichnam.component';
import { QuytrinhlapkehoachlichxichthangComponent } from './quytrinhlapkehoachlichxichthang/quytrinhlapkehoachlichxichthang.component';
import { QuytrinhnhapvattuComponent } from './quytrinhnhapvattu/quytrinhnhapvattu.component';
import { SucosuachuaComponent } from './sucosuachua/sucosuachua.component';
import { Sucosuachua2Component } from './sucosuachua2/sucosuachua2.component';
import { TaisanComponent } from './taisan.component';
import { ThanhlytaisanComponent } from './thanhlytaisan/thanhlytaisan.component';
import { PhieuthuhoitaisanComponent } from './thuhoitaisan/phieuthuhoitaisan/phieuthuhoitaisan.component';
import { VattudutruComponent } from './vattudutru/vattudutru.component';
import { VattugiatricaoComponent } from './vattugiatricao/vattugiatricao.component';
import { TieuChiDanhGiaNhaComponent } from './tieu-chi-danh-gia-nha/tieu-chi-danh-gia-nha.component';
import { DieuChuyenTaiSanComponent } from './dieu-chuyen-tai-san/dieu-chuyen-tai-san.component';

import { ThoihancungcapvattuComponent } from './thoihancungcapvattu/thoihancungcapvattu.component';

const routes: Routes = [
  {path:'',component:TaisanComponent},
  {path:'nhaptaisan/:id',component:NhaptaisanComponent},
  {path:'bangiaotaisan/:id',component:BangiaotaisanComponent},  
  {path:'sucosuachua',component:SucosuachuaComponent},  
  {path:'danhsachtaisan',component:DanhsachtaisanComponent},
  {path:'danhsachvattudutru',component:VattudutruComponent},
  {path:'danhsachvattugiatricao',component:VattugiatricaoComponent},
  {path:'danhmuc/danhmucloaibaoduong',component:DanhmucloaibaoduongComponent},
  {path:'danhmuc/danhmucdonvitinh',component:DanhmucdonvitinhComponent},
  {path:'danhmuc/danhmucloaitaisan',component:DanhmucloaitaisanComponent},
  {path:'danhmuc/donvinangsuat',component:DonvinangsuatComponent},
  {path:'danhmuc/hangsannxuat',component:HangsanxuatComponent},
  {path:'danhmuc/tinhtrangtaisan',component:TinhtrangtaisanComponent},
  {path:'danhmuc/loaikhauhao',component:LoaikhauhaoComponent},
  {path:'thuhoitaisan/:id',component:PhieuthuhoitaisanComponent},
  {path:'thanhlytaisan/:id',component:ThanhlytaisanComponent},
  {path:'nhaplieuxuattaisan',component:NhaplieuxuattaisanComponent},
  {path:'danhmuc/loaisuco',component:LoaisucoComponent},
  {path:'danhmuc/nhacungcap',component:DanhmucnhacungcapComponent},
  {path:'sucosuachua2',component:Sucosuachua2Component},

  {path:'danhmuc/mucdouutien',component:DanhmucmucdouutienComponent},
  {path:'quytrinhnhapvattu/:id',component:QuytrinhnhapvattuComponent},
  {path:'danhsachvattu',component:DanhsachvattuComponent},
  {path:'quytrinhdenghithayvattu/:id',component:QuytrinhdenghithayvattuComponent},

  {path:'quytrinhlapkehoachnam/:id',component:QuytrinhlapkehoachlichxichnamComponent},
  {path:'lapkehoachlichxichnam',component:LapkehoachlichxichnamComponent},
  {path:'quytrinhlapkehoachthang/:id',component:QuytrinhlapkehoachlichxichthangComponent},
  {path:'lapkehoachlichxichthang',component:LapkehoachthangComponent},
  {path:'lichxichnam',component:LichxichnamComponent},
  {path:'lichxichthang',component:LichxichthangComponent},
  {path:'denghixulisuco/:id',component:DenghixulisucoComponent},
  {path:'quytrinhbaoduong/:id',component:QuytrinhbaoduongComponent},
  {path:'khauhaotaisan/:id',component:KhauHaoTaiSanQuyTrinhComponent},
  {path:'nhomnhacungung',component:NhomNhaCungUngDanhMucComponent},
  {path:'danhmucnhacungung',component:NhaCungUngDanhMucComponent},
  {path:'danhgianhacungung/:id',component:DanhGiaNhaCungUngComponent},
  {path:'tieuchidanhgia/:id',component:TieuChiDanhGiaNhaComponent},
  {path:'dieuchuyentaisan/:id',component:DieuChuyenTaiSanComponent},
  {path:'thoihancungcapvattu/:id',component:ThoihancungcapvattuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaisanRoutingModule { }
