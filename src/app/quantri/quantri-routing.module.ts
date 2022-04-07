import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuantriComponent } from './quantri.component';

import { DmkhoComponent } from './danhmuc/dmkho/dmkho.component';
import { KiemkekhoComponent } from './quanlykhosanxuat/quytrinh/kiemkekho/kiemkekho.component';
import { NhapkhoComponent } from './quanlykhosanxuat/quytrinh/nhapkho/nhapkho.component';
import { PhabongComponent } from './quanlykhosanxuat/phuongan/phabong/phabong.component';
import { ThongsochatluongComponent } from './quanlykhosanxuat/quytrinh/thongsochatluong/thongsochatluong.component';
import { ThongkesanluongComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluong.component';
import { SanluongtonghopComponent } from './quanlykhosanxuat/baocao/sanluongtonghop/sanluongtonghop.component';
import { SanluongchitietComponent } from './quanlykhosanxuat/baocao/sanluongchitiet/sanluongchitiet.component';
import { LoaibongComponent } from './danhmuc/danhmucsanxuat/loaibong/loaibong.component';
import { CapbongComponent } from './danhmuc/danhmucsanxuat/capbong/capbong.component';
import { CasanxuatComponent } from './danhmuc/danhmucsanxuat/casanxuat/casanxuat.component';
import { DanhsachmayComponent } from './danhmuc/danhmucsanxuat/danhsachmay/danhsachmay.component';
import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat/dieuhanhsanxuat.component';
import { KehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuat/kehoachsanxuat.component';
import { XuatkhoComponent } from './quanlykhosanxuat/quytrinh/xuatkho/xuatkho.component';
import { HacapComponent } from './quanlykhosanxuat/quytrinh/hacap/hacap.component';
import { DieuchuyenComponent } from './quanlykhosanxuat/quytrinh/dieuchuyen/dieuchuyen.component';
import { TrienkhaikehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { TimbongComponent } from './quanlykhosanxuat/phuongan/timbong/timbong.component';
import { MathangComponent } from './danhmuc/danhmucsanxuat/mathang/mathang.component';
import { PhanxuongComponent } from './danhmuc/danhmucsanxuat/phanxuong/phanxuong.component';
import { LoaisoiComponent } from './danhmuc/danhmucsanxuat/loaisoi/loaisoi.component';
import { NhomkhoComponent } from './danhmuc/danhmucsanxuat/nhomkho/nhomkho.component';
// import { KhoComponent } from './danhmuc/danhmucsanxuat/kho/kho.component';
import { KehoachnhapnguyenlieuComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieu/kehoachnhapnguyenlieu.component';
import { KehoachxuathangComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathang/kehoachxuathang.component';
import { NhapkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhpham/nhapkhothanhpham.component';
import { DmmaybienapComponent } from './danhmuc/thongkedientheoca/dmmaybienap/dmmaybienap.component';
import { LoaidienkvComponent } from './danhmuc/thongkedientheoca/loaidienkv/loaidienkv.component';
import { NhapkhohoiamComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiam/nhapkhohoiam.component';
import { ChatluongsoiComponent } from './quanlykhosanxuat/quytrinh/chatluongsoi/chatluongsoi.component';
import { DmnhomcongtoComponent } from './danhmuc/thongkedientheoca/dmnhomcongto/dmnhomcongto.component';
import { DmcongtoComponent } from './danhmuc/thongkedientheoca/dmcongto/dmcongto.component';
import { DmthongkedienComponent } from './danhmuc/thongkedientheoca/dmthongkedien/dmthongkedien.component';
import { DinhmuctieuhaoComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuhao/dinhmuctieuhao.component';
import { VitriComponent } from './danhmuc/danhmucsanxuat/vitri/vitri.component';
import { CandoitonComponent } from './quanlykhosanxuat/quytrinh/candoiton/candoiton.component';
import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop/dieuhanhsanxuattonghop.component';
import { DmtieuchichatluongsoiComponent } from './danhmuc/dmtieuchichatluongsoi/dmtieuchichatluongsoi.component';
import { SanxuatComponent } from './quanlykhosanxuat/phuongan/sanxuat/sanxuat.component';
import { DmphannhommayComponent } from './danhmuc/dmphannhommay/dmphannhommay.component';
import { PhieudieuchinhComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinh/phieudieuchinh.component';
import { QuycachdonggoiComponent } from './danhmuc/quycachdonggoi/quycachdonggoi.component';
import { SanluongComponent } from './sanluong/sanluong.component';
import { XepbanbongComponent } from './quanlykhosanxuat/phuongan/xepbanbong/xepbanbong.component';
import { XuatkhoxoComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxo/xuatkhoxo.component';
import { XuatkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoi/xuatkhobonghoi.component';
import { XuatkhobongpheComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphe/xuatkhobongphe.component';
import { DinhmuctieuchichatluongsoiComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoi/dinhmuctieuchichatluongsoi.component';
import { NhapkhokhacComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhac/nhapkhokhac.component';
import { XuatkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhpham/xuatkhothanhpham.component';
import { PhanquyentheophanxuongComponent } from './phanquyen/phanquyentheophanxuong/phanquyentheophanxuong.component';
import { NhucauxuathangComponent } from './nhucauxuathang/nhucauxuathang.component';
import { DashboardthongluongComponent } from './dashboardthongluong/dashboardthongluong.component';
import { GiaokehoachsanxuathoanthanhComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanh/giaokehoachsanxuathoanthanh.component';
import { KiemkebcpComponent } from './quanlykhosanxuat/quytrinh/kiemkebcp/kiemkebcp.component';
import { CandoichuyenComponent } from './quanlykhosanxuat/candoichuyen/candoichuyen.component';
import { LohangComponent } from './quanlykhosanxuat/thongke/lohang/lohang.component';
import { DactinhbongComponent } from './danhmuc/danhmucsanxuat/dactinhbong/dactinhbong.component';
import { KehoachnhapnguyenlieuinvoiceComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoice/kehoachnhapnguyenlieuinvoice.component';
import { BanchephamComponent } from './danhmuc/danhmucsanxuat/banchepham/banchepham.component';
import { NhapkhobongpheComponent } from './quanlykhosanxuat/nhapkhobongphe/nhapkhobongphe.component';
import { DmkhachhangComponent } from './danhmuc/dmkhachhang/dmkhachhang.component';
import { LobongComponent } from './danhmuc/lobong/lobong.component';
import { NhapkhoxoComponent } from './quanlykhosanxuat/quytrinh/nhapkhoxo/nhapkhoxo.component';
import { KhobongkiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobongkiemkekho/khobongkiemkekho.component';
import { KhoxokiemkeComponent } from './quanlykhosanxuat/quytrinh/khoxokiemke/khoxokiemke.component';
import { KhobonghoikiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobonghoikiemkekho/khobonghoikiemkekho.component';
import { KhobongphekiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobongphekiemkekho/khobongphekiemkekho.component';
import { TonkhoComponent } from './quanlykhosanxuat/quytrinh/tonkho/tonkho.component';
import { TonkhodanhsachchitietComponent } from './quanlykhosanxuat/quytrinh/tonkhodanhsachchitiet/tonkhodanhsachchitiet.component';
import { TonkhobongxoComponent } from './quanlykhosanxuat/quytrinh/tonkhobongxo/tonkhobongxo.component';
import { TonkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/tonkhobonghoi/tonkhobonghoi.component';
import { TonkhobongpheComponent } from './quanlykhosanxuat/quytrinh/tonkhobongphe/tonkhobongphe.component';
import { UploadhdsdsanxuatComponent } from './quanlykhosanxuat/uploadhdsdsanxuat/uploadhdsdsanxuat.component';
import { DmchisotrienkhaiComponent } from './danhmuc/danhmucsanxuat/dmchisotrienkhai/dmchisotrienkhai.component';
import { HoiamkiemkekhoComponent } from './quanlykhosanxuat/quytrinh/hoiamkiemkekho/hoiamkiemkekho.component';
import { TonkhohoiamComponent } from './quanlykhosanxuat/quytrinh/tonkhohoiam/tonkhohoiam.component';
import { XuatkhohoiamComponent } from './quanlykhosanxuat/quytrinh/xuatkhohoiam/xuatkhohoiam.component';
// import { HopdongModule } from './hopdong/hopdong.module';
import { NhapkhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/nhapkhovattuphu/nhapkhovattuphu.component';
import { XuatkhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/xuatkhovattuphu/xuatkhovattuphu.component';
import { KiemkekhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/kiemkekhovattuphu/kiemkekhovattuphu.component';
import { DinhmucmathangtheonamComponent } from './danhmuc/dinhmucmathangtheonam/dinhmucmathangtheonam.component';
import { XuatbongchovayComponent } from './quanlykhosanxuat/quytrinh/xuatbongchovay/xuatbongchovay.component';
import { DmkgconeComponent } from './danhmuc/danhmucsanxuat/dmkgcone/dmkgcone.component';
import { ThongkesanluongcaComponent } from './quanlykhosanxuat/thongke/thongkesanluongca/thongkesanluongca.component';
import { KiemtrabanchephamComponent } from './quanlykhosanxuat/thongke/kiemtrabanchepham/kiemtrabanchepham.component';
import { DmkhunggioComponent } from './danhmuc/thongkedientheoca/dmkhunggio/dmkhunggio.component';
import { BaocaothongketiendienComponent } from './danhmuc/thongkedientheoca/baocaothongketiendien/baocaothongketiendien.component';
import { DmloaidienComponent } from './danhmuc/thongkedientheoca/dmloaidien/dmloaidien.component';
import { LoaiBongPheDanhMucComponent } from './danhmuc/danhmucsanxuat/loai-bong-phe-danh-muc/loai-bong-phe-danh-muc.component';
import { TyLeTieuChuanBongPheComponent } from './danhmuc/danhmucsanxuat/ty-le-tieu-chuan-bong-phe/ty-le-tieu-chuan-bong-phe.component';


const routes: Routes = [
  {
    path: '', component: QuantriComponent,
    children: [
      { path: '', redirectTo: 'quantrisanxuat/tonghop', pathMatch: 'full' },
      { path: 'quantrisanxuat/nguyenlieu', component: DieuhanhsanxuatComponent },
      { path: 'quantrisanxuat/nhucauxuathang', component: NhucauxuathangComponent },
      { path: 'quantrisanxuat/sanluong', component: SanluongComponent },
      { path: 'quantrisanxuat/tonghop', component: DieuhanhsanxuattonghopComponent },
      { path: 'quantrisanxuat/chatluong', component: DieuhanhsanxuatComponent },
      { path: 'quantrisanxuat/thongluong', component: DashboardthongluongComponent },
      { path: 'quantrisanxuat/tiendien', component: BaocaothongketiendienComponent },


      { path: 'baocaosanxuat/sanluongtonghop', component: SanluongtonghopComponent },
      { path: 'baocaosanxuat/sanluongchitiet', component: SanluongchitietComponent },
      { path: 'danhmucsanxuat/dmkho', component: DmkhoComponent },
      { path: 'danhmucsanxuat/dmloaibong', component: LoaibongComponent },
      { path: 'danhmucsanxuat/dmcapbong', component: CapbongComponent },
      { path: 'danhmucsanxuat/dmcasanxuat', component: CasanxuatComponent },
      { path: 'danhmucsanxuat/dmdsmay', component: DanhsachmayComponent },
      { path: 'danhmucsanxuat/dmmathang', component: MathangComponent },
      { path: 'danhmucsanxuat/dmphanxuong', component: PhanxuongComponent },
      { path: 'danhmucsanxuat/dmloaisoi', component: LoaisoiComponent },
      { path: 'danhmucsanxuat/dmnhomkho', component: NhomkhoComponent },
      { path: 'danhmucsanxuat/dmmaybienap', component: DmmaybienapComponent },
      { path: 'danhmucsanxuat/loaidienkv', component: LoaidienkvComponent },
      { path: 'danhmucsanxuat/dmnhomcongto', component: DmnhomcongtoComponent },
      { path: 'danhmucsanxuat/dmcongto', component: DmcongtoComponent },
      { path: 'danhmucsanxuat/dmtieuchichatluongsoi', component: DmtieuchichatluongsoiComponent },
      { path: 'danhmucsanxuat/dmphannhommay', component: DmphannhommayComponent },
      { path: 'danhmucsanxuat/dmquycachdonggoi', component: QuycachdonggoiComponent },
      { path: 'danhmucsanxuat/dmthongkedien/:id', component: DmthongkedienComponent },
      { path: 'danhmucsanxuat/dmdinhmucchatluongsoi', component: DinhmuctieuchichatluongsoiComponent },
      { path: 'danhmucsanxuat/dmdinhmuctieuhao', component: DinhmuctieuhaoComponent },
      { path: 'danhmucsanxuat/dmvitri', component: VitriComponent },
      { path: 'danhmucsanxuat/dmloaibongphe', component: LoaiBongPheDanhMucComponent },
      { path: 'danhmucsanxuat/tyletieuchuanbongphe', component: TyLeTieuChuanBongPheComponent },
      { path: 'theodoithongkebaocaosanxuat/thongkedien/:id', component: DmthongkedienComponent },
      { path: 'danhmucsanxuat/dmdactinhbong', component: DactinhbongComponent },
      { path: 'danhmucsanxuat/dmbanchepham', component: BanchephamComponent },
      { path: 'danhmucsanxuat/dmkhunggio', component: DmkhunggioComponent },
      { path: 'danhmucsanxuat/loaidien', component: DmloaidienComponent },

      { path: 'theodoithongkebaocaosanxuat/thongkesanluong/:id', component: ThongkesanluongComponent },
      { path: 'theodoithongkebaocaosanxuat/thongkesanluongca/:id', component: ThongkesanluongcaComponent },

      { path: 'trienkhaisanxuat/phabong/:id', component: PhabongComponent },
      { path: 'trienkhaisanxuat/timbong/:id', component: TimbongComponent },
      { path: 'kehoachsanxuat/sanxuat/:id', component: SanxuatComponent },
      //XepBanBong
      { path: 'trienkhaisanxuat/xepbanbong/:id', component: XepbanbongComponent },

      { path: 'trienkhaisanxuat/phieudieuchinh/:id', component: PhieudieuchinhComponent },

      { path: 'quanlykhosanxuat/khobong/nhapkho/:id', component: NhapkhoComponent },
      { path: 'quanlykhosanxuat/khoxo/nhapkho/:id', component: NhapkhoxoComponent },
      { path: 'quanlykhosanxuat/khobong/thongsochatluong/:id', component: ThongsochatluongComponent },
      { path: 'quanlykhosanxuat/khobong/xuatkho/:id', component: XuatkhoComponent },
      { path: 'quanlykhosanxuat/:kho/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlykhosanxuat/khobong/dieuchuyen/:id', component: DieuchuyenComponent },
      { path: 'quanlykhosanxuat/khobong/kehoachnhapnguyenlieu/:id', component: KehoachnhapnguyenlieuComponent },
      { path: 'quanlykhosanxuat/khobong/kehoachnhapnguyenlieuinvoice/:id', component: KehoachnhapnguyenlieuinvoiceComponent },
      { path: 'quanlykhosanxuat/khobong/candoiton/:id', component: CandoitonComponent },

      { path: 'quanlykhosanxuat/khoxo/xuatkho/:id', component: XuatkhoxoComponent },
      { path: 'quanlykhosanxuat/khoxo/dieuchuyen/:id', component: DieuchuyenComponent },
      { path: 'quanlykhosanxuat/khoxo/kehoachnhapnguyenlieu/:id', component: KehoachnhapnguyenlieuComponent },

      { path: 'quanlysanxuatkhohoiam/khohoiam/nhapkho/:id', component: NhapkhohoiamComponent },
      { path: 'quanlysanxuatkhohoiam/khohoiam/hacap/:id', component: HacapComponent },
      { path: 'quanlysanxuatkhohoiam/khohoiam/chatluongsoi/:id', component: ChatluongsoiComponent },
      { path: 'quanlysanxuatkhohoiam/quanlysanxuatkhohoiam/kiemkekho/:id', component: HoiamkiemkekhoComponent },
      { path: 'quanlykhosanxuat/tonkho/khohoiam/:id', component: TonkhohoiamComponent },
      { path: 'quanlysanxuatkhohoiam/khohoiam/xuatkho/:id', component: XuatkhohoiamComponent },


      { path: 'quanlykhosanxuatbongkhac/khobonghoi/nhapkho/:id', component: NhapkhokhacComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/xuatkho/:id', component: XuatkhobonghoiComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlykhosanxuatbongkhac/khobonghoi/dieuchuyen/:id', component: DieuchuyenComponent },

      { path: 'quanlykhosanxuatbongkhac/khobongphe/nhapkho/:id', component: NhapkhobongpheComponent },
      { path: 'quanlykhosanxuatbongkhac/khobongphe/xuatkho/:id', component: XuatkhobongpheComponent },
      { path: 'quanlykhosanxuatbongkhac/khobongphe/kiemkekho/:id', component: KiemkekhoComponent },

      { path: 'quanlysanxuatkhothanhpham/khothanhpham/nhapkho/:id', component: NhapkhothanhphamComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/kiemkekho/:id', component: KiemkekhoComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/kehoachxuathang/:id', component: KehoachxuathangComponent },
      { path: 'quanlysanxuatkhothanhpham/khothanhpham/xuatkhothanhpham/:id', component: XuatkhothanhphamComponent },

      { path: 'kehoachsanxuat/giaokehoachsanxuat/:id', component: KehoachsanxuatComponent },
      { path: 'kehoachsanxuat/giaokehoachsanxuathoanthanh/:id', component: GiaokehoachsanxuathoanthanhComponent },
      { path: 'kehoachsanxuat/trienkhaikehoachsanxuat/:id', component: TrienkhaikehoachsanxuatComponent },
      { path: 'kehoachsanxuat/candoichuyen', component: CandoichuyenComponent },

      { path: 'phanquyensanxuat/phanquyentheophanxuong', component: PhanquyentheophanxuongComponent },
      { path: 'quanlykhosanxuat/kiemkeBCP/:id', component: KiemkebcpComponent },
      { path: 'quanlykhosanxuat/tonkho/:kho/:id', component: TonkhoComponent },
      { path: 'quanlykhosanxuat/tonkhodanhsachchitiet/:id', component: TonkhodanhsachchitietComponent },

      { path: 'kehoachsanxuat/lohang', component: LohangComponent },
      { path: 'phanquyensanxuat/dmkhachhang', component: DmkhachhangComponent },
      { path: 'phanquyensanxuat/lobong', component: LobongComponent },
      { path: 'quanlykhosanxuat/khobong/kiemkekhobong/:id', component: KhobongkiemkekhoComponent },
      { path: 'quanlykhosanxuat/khoxo/kiemkekhoxo/:id', component: KhoxokiemkeComponent },
      { path: 'quanlykhosanxuat/khobonghoi/kiemkekhobonghoi/:id', component: KhobonghoikiemkekhoComponent },
      { path: 'quanlykhosanxuat/khobongphe/kiemkekhobongphe/:id', component: KhobongphekiemkekhoComponent },
      { path: 'quanlykhosanxuat/tonkhobongxo/:kho/:id', component: TonkhobongxoComponent },
      { path: 'quanlykhosanxuat/tonkhobonghoi/khobonghoi/:id', component: TonkhobonghoiComponent },
      { path: 'quanlykhosanxuat/tonkhobongphe/khobongphe/:id', component: TonkhobongpheComponent },
      { path: 'quanlykhosanxuat/hdsd', component: UploadhdsdsanxuatComponent },
      { path: 'phanquyensanxuat/dmchisotrienkhai', component: DmchisotrienkhaiComponent },
      { path: 'phanquyensanxuat/dmkgcone', component: DmkgconeComponent },
      { path: 'hopdongsanxuat', loadChildren:  ()=> import('./hopdong/hopdong.module').then(m=>m.HopdongModule) },
      { path: 'mkehoachsanxuat', loadChildren:  ()=> import('./mkehoachsanxuat/mkehoachsanxuat.module').then(m=>m.MkehoachsanxuatModule) },
      { path: 'taisan', loadChildren:  ()=> import('./taisan/taisan.module').then(m=>m.TaisanModule) },
      { path: 'baocaotonghop', loadChildren:  ()=> import('./bao-cao-tong-hop/bao-cao-tong-hop.module').then(m=>m.BaoCaoTongHopModule) },

      { path: 'quanlykhosanxuatbongkhac/khovattuphu/nhapkho/:id', component: NhapkhovattuphuComponent },
      { path: 'quanlykhosanxuatbongkhac/khovattuphu/xuatkho/:id', component: XuatkhovattuphuComponent },
      { path: 'quanlykhosanxuatbongkhac/khovattuphu/kiemkekho/:id', component: KiemkekhovattuphuComponent },
      { path: 'quanlykhosanxuat/xuatbongchovay/khobong/:id', component: XuatbongchovayComponent },
      { path: 'quanlykhosanxuat/khobong/kiemtrabanchepham/:id', component: KiemtrabanchephamComponent },

      //..................................
      { path: 'danhmuc/dinhmucmathangtheonam', component: DinhmucmathangtheonamComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuantriRoutingModule { }
