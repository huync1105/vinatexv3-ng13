import { GiaokehoachsanxuatComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuat.component';
import { LaphopdongsoiComponent } from './screen/laphopdongsoi/laphopdongsoi.component';
import { LaphopdongbongxoComponent } from './screen/laphopdongbongxo/laphopdongbongxo.component';
import { PhathopdongComponent } from './screen/thuchienhopdong/phathopdong/phathopdong.component';
import { QuyettoanhopdongComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdong.component';
import { GiahanhopdongComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdong.component';
import { GiaonhanhanghoaComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoa.component';
import { DanhsachhopdongbongxoComponent } from './screen/danhsachhopdongbongxo/danhsachhopdongbongxo.component';
import { DmLoaiHopDongComponent } from './danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhmuchinhthucthanhtoanComponent } from './danhmuc/danhmuchinhthucthanhtoan/danhmuchinhthucthanhtoan.component';
import { DanhmucloaihopdongComponent } from './danhmuc/danhmucloaihopdong/danhmucloaihopdong.component';
import { DanhmucloaitienteComponent } from './danhmuc/danhmucloaitiente/danhmucloaitiente.component';
import { DanhmucthutucthanhtoanComponent } from './danhmuc/danhmucthutucthanhtoan/danhmucthutucthanhtoan.component';
import { DanhmuctrangthaibaolanhComponent } from './danhmuc/danhmuctrangthaibaolanh/danhmuctrangthaibaolanh.component';


import { HopdongComponent } from './hopdong.component';
import { TheodoihopdongnhapkhauComponent } from './baocao/theodoihopdongnhapkhau/theodoihopdongnhapkhau.component';
import { DanhmucvattuphuComponent } from './danhmuc/danhmucvattuphu/danhmucvattuphu.component';
import { DanhmuccocaunhansuComponent } from './danhmuc/danhmuccocaunhansu/danhmuccocaunhansu.component';
import { DanhmuctinhluongComponent } from './danhmuc/danhmuctinhluong/danhmuctinhluong.component';
import { DanhmuctaisanComponent } from './danhmuc/danhmuctaisan/danhmuctaisan.component';
import { DanhmucphibanhangComponent } from './danhmuc/danhmucphibanhang/danhmucphibanhang.component';
import { DanhmucdinhmucmathangComponent } from './danhmuc/danhmucdinhmucmathang/danhmucdinhmucmathang.component';
import { KehoachnhapbongComponent } from './screen/thuchienhopdong/kehoachnhapbong/kehoachnhapbong.component';
import { NhapkhoComponent } from './screen/thuchienhopdong/nhapkho/nhapkho.component';
import { XuatkhothanhphamhopdongComponent } from './screen/thuchienhopdong/xuatkhothanhphamhopdong/xuatkhothanhphamhopdong.component';
import { KehoachkinhdoanhdanhsachComponent } from './kehoachkinhdoanh/kehoachkinhdoanhdanhsach/kehoachkinhdoanhdanhsach.component';

import { DmtieuchichatluonghopdongComponent } from './danhmuc/dmtieuchichatluonghopdong/dmtieuchichatluonghopdong.component';
import { QuytrinhthanhtoanbongComponent } from './screen/thanhtoanbong/quytrinhthanhtoanbong/quytrinhthanhtoanbong.component';
import { DanhsachtinhluongComponent } from './danhsach/danhsachtinhluong/danhsachtinhluong.component';
import { MucluongcocaunhansuComponent } from './danhsach/mucluongcocaunhansu/mucluongcocaunhansu/mucluongcocaunhansu.component';
import { ChiphibanhangtheonamComponent } from './danhsach/chiphibanhang/chiphibanhangtheonam/chiphibanhangtheonam.component';
import { ThanhtoanhopdongsoiComponent } from './screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoi.component';
import { HopdongvattuphuComponent } from './screen/hopdongvattuphu/hopdongvattuphu.component';
import { HopdongxuatlobongxoComponent } from './screen/thuchienhopdong/hopdongxuatlobongxo/hopdongxuatlobongxo.component';
import { DinhmucsanxuatComponent } from './DinhMucSanXuat/dinhmucsanxuat/dinhmucsanxuat.component';
import { ThanhtoanvattuphuComponent } from './screen/thuchienhopdong/thanhtoanvattuphu/thanhtoanvattuphu.component';
import { NhapvattuphuComponent } from './screen/thuchienhopdong/nhapvattuphu/nhapvattuphu.component';
import { DanhsachhopdongsoiComponent } from './screen/danhsachhopdongsoi/danhsachhopdongsoi.component';
import { DanhsachhopdongvattuphuComponent } from './screen/danhsachhopdongvattuphu/danhsachhopdongvattuphu.component';
import { QuytrinhdanhgiakhachhangComponent } from './screen/thuchienhopdong/quytrinhdanhgiakhachhang/quytrinhdanhgiakhachhang.component';
import { DanhmuctieuchidanhgiaComponent } from './danhmuc/danhmuctieuchidanhgia/danhmuctieuchidanhgia.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { KehoachsanxuatnamComponent } from './kehoachsanxuatnam/kehoachsanxuatnam.component';
import { KehoachsanxuatthangComponent } from './kehoachsanxuatthang/kehoachsanxuatthang.component';
import { DoanhthuComponent } from './screen/doanhthu/doanhthu.component';
import { DanhmucdongiasanphamComponent } from './danhmuc/danhmucdongiasanpham/danhmucdongiasanpham.component';
import { DanhmuctygiangoaiteComponent } from './danhmuc/danhmuctygiangoaite/danhmuctygiangoaite.component';
import { ChiphibongComponent } from './danhsach/chiphibong/chiphibong.component';
import { ChiphixoComponent } from './danhsach/chiphixo/chiphixo.component';
import { ChiphidienComponent } from './danhsach/chiphidien/chiphidien.component';


const routes: Routes = [
  {path:'',component:HopdongComponent},
  {path:'danhmuc/danhmuchinhthucthanhtoan',component:DanhmuchinhthucthanhtoanComponent},
  {path:'danhmuc/danhmucloaihopdong',component:DanhmucloaihopdongComponent},
  {path:'danhmuc/danhmucloaitiente',component:DanhmucloaitienteComponent},
  {path:'danhmuc/danhmuctrangthaibaolanh',component:DanhmuctrangthaibaolanhComponent},
  {path:'danhmuc/danhmucthutucthanhtoan',component:DanhmucthutucthanhtoanComponent},
  {path:'danhmuc/danhmucvattuphu',component: DanhmucvattuphuComponent},
  {path:'danhmuc/danhmuccocaunhansu',component: DanhmuccocaunhansuComponent},
  {path:'danhmuc/danhmuctinhluong',component: DanhmuctinhluongComponent},
  {path:'danhmuc/danhmuctaisan',component: DanhmuctaisanComponent},
  {path:'danhmuc/danhmucphibanhang',component: DanhmucphibanhangComponent},
  {path:'danhmuc/danhmucdinhmucmathang',component: DanhmucdinhmucmathangComponent},

  {path:'danhmuc/kehoachkinhdoanhnam/:id',component: KehoachkinhdoanhdanhsachComponent},
  {path:'danhmuc/kehoachkinhdoanhthang/:id',component: KehoachkinhdoanhthangComponent},
  {path:'danhmuc/kehoachsanxuatnam/:id',component: KehoachsanxuatnamComponent},
  {path:'danhmuc/kehoachsanxuatthang/:id',component: KehoachsanxuatthangComponent},

  {path:'danhmuc/danhsachtinhluong',component: DanhsachtinhluongComponent},
  {path:'danhmuc/mucluongcocaunhansu',component: MucluongcocaunhansuComponent},
  {path:'danhmuc/chiphibanhangtheonam',component: ChiphibanhangtheonamComponent},
  {path:'danhmuc/dinhmucsanxuat',component: DinhmucsanxuatComponent},
  {path:'danhmuc/dmtieuchidanhgia',component:DanhmuctieuchidanhgiaComponent},
  {path:'danhmuc/dmtieuchichatluong',component: DmtieuchichatluonghopdongComponent},
  {path:'danhmuc/dongiasanpham/:id',component: DanhmucdongiasanphamComponent},
  {path:'danhmuc/tygiangoaite/:id',component: DanhmuctygiangoaiteComponent},
  {path:'danhmuc/chiphibongnam',component: ChiphibongComponent},
  {path:'danhmuc/chiphixonam',component: ChiphixoComponent},
  {path:'danhmuc/chiphidiennam',component: ChiphidienComponent},




  {path:'theodoihopdongnhapkhau',component:TheodoihopdongnhapkhauComponent},

  { path: 'dmloaihopdong', component: DmLoaiHopDongComponent },
  { path: 'danhsachhopdongbongxo/:id', component: DanhsachhopdongbongxoComponent },
  { path: 'kehoachnhapbong/:id', component: KehoachnhapbongComponent },
  { path: 'nhapkho/:id', component: NhapkhoComponent },  
  { path: 'xuatkhothanhpham/:id', component: XuatkhothanhphamhopdongComponent },
  { path: 'giaonhanhanghoa/:id', component: GiaonhanhanghoaComponent },
  { path: 'phathopdong/:id', component: PhathopdongComponent },
  { path: 'giaokehoachsanxuat/:id', component: GiaokehoachsanxuatComponent },
  { path: 'giahanhopdong/:id', component: GiahanhopdongComponent },
  { path: 'quyettoanhopdong/:id', component: QuyettoanhopdongComponent },
  { path: 'laphopdongbongxo/:id', component: LaphopdongbongxoComponent },
  { path: 'laphopdongsoi/:id', component: LaphopdongsoiComponent },
  { path: 'quytrinhthanhtoanbong/:id', component: QuytrinhthanhtoanbongComponent },
  { path: 'quytrinhthanhtoansoi/:id', component: ThanhtoanhopdongsoiComponent },
  { path: 'laphopdongvattuphu/:id', component: HopdongvattuphuComponent },
  { path: 'phieuxuatlobongxo/:id', component: HopdongxuatlobongxoComponent },
  { path: 'nhapvattuphu/:id', component: NhapvattuphuComponent },
  { path: 'quytrinhthanhtoanvattuphu/:id', component: ThanhtoanvattuphuComponent },
  { path: 'danhsachhopdongsoi/:id', component: DanhsachhopdongsoiComponent },
  { path: 'danhsachhopdongvattuphu/:id', component: DanhsachhopdongvattuphuComponent },
  { path: 'danhgiakhachhang/:id', component: QuytrinhdanhgiakhachhangComponent },
  { path: 'doanhthu/:id', component: DoanhthuComponent },

  //
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }
