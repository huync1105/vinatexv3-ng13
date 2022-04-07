// import { DmLoaiHopDongComponent } from './hopdong/danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { QuantriRoutingModule } from './quantri-routing.module';
import { QuantriComponent } from './quantri.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'ng2-file-upload';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'primeng/colorpicker';

// import { FileUploadModule } from 'primeng/fileupload';
// import localeVi from '@angular/common/locales/vi';
// registerLocaleData(localeVi);

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModaldanhmucchungComponent } from './danhmuc/modal/modaldanhmucchung/modaldanhmucchung.component';
import { ModaldmloaidienComponent } from './danhmuc/modal/modaldmloaidien/modaldmloaidien.component';
import { ModalthongbaoComponent } from './modal/modalthongbao/modalthongbao.component';
import { Dat09Service } from '../services/callApi';
import { SignalRService } from '../services/signalR.service';
import { SanXuatService } from '../services/callApiSanXuat';
import { UploadmodalComponent } from './modal/uploadmodal/uploadmodal.component';
import { ModaldoimatkhauComponent } from './modal/modaldoimatkhau/modaldoimatkhau.component';
import { ModalimportexcelComponent } from './modal/modalimportexcel/modalimportexcel.component';
import { DmkhoComponent } from './danhmuc/dmkho/dmkho.component';
import { ModaldmkhoComponent } from './danhmuc/modal/modaldmkho/modaldmkho.component';
import { KiemkekhoComponent } from './quanlykhosanxuat/quytrinh/kiemkekho/kiemkekho.component';
import { KiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/kiemkekhomodal/kiemkekhomodal.component';
import { NhapkhoComponent } from './quanlykhosanxuat/quytrinh/nhapkho/nhapkho.component';
import { NhapkhomodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhomodal/nhapkhomodal.component';
import { PhabongComponent } from './quanlykhosanxuat/phuongan/phabong/phabong.component';
import { ThongsochatluongComponent } from './quanlykhosanxuat/quytrinh/thongsochatluong/thongsochatluong.component';
import { ThongsochatluongmodalComponent } from './quanlykhosanxuat/quytrinh/thongsochatluongmodal/thongsochatluongmodal.component';
import { ThongkesanluongComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluong.component';
import { ThongkesanluongmodalComponent } from './quanlykhosanxuat/thongke/thongkesanluongmodal/thongkesanluongmodal.component';
import { SanluongtonghopComponent } from './quanlykhosanxuat/baocao/sanluongtonghop/sanluongtonghop.component';
import { SanluongchitietComponent } from './quanlykhosanxuat/baocao/sanluongchitiet/sanluongchitiet.component';
import { LoaibongComponent } from './danhmuc/danhmucsanxuat/loaibong/loaibong.component';
import { CapbongComponent } from './danhmuc/danhmucsanxuat/capbong/capbong.component';
import { CasanxuatComponent } from './danhmuc/danhmucsanxuat/casanxuat/casanxuat.component';
import { DanhsachmayComponent } from './danhmuc/danhmucsanxuat/danhsachmay/danhsachmay.component';
import { DanhsachmaymodalComponent } from './danhmuc/danhmucsanxuat/modals/danhsachmaymodal/danhsachmaymodal.component';
import { PhabongmodalComponent } from './quanlykhosanxuat/phuongan/phabongmodal/phabongmodal.component';
import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat/dieuhanhsanxuat.component';
import { KehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuat/kehoachsanxuat.component';
import { KehoachsanxuatmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuatmodal/kehoachsanxuatmodal.component';
import { XuatkhoComponent } from './quanlykhosanxuat/quytrinh/xuatkho/xuatkho.component';
import { XuatkhomodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhomodal/xuatkhomodal.component';
import { DieuchuyenComponent } from './quanlykhosanxuat/quytrinh/dieuchuyen/dieuchuyen.component';
import { DieuchuyenmodalComponent } from './quanlykhosanxuat/quytrinh/dieuchuyenmodal/dieuchuyenmodal.component';
import { HacapComponent } from './quanlykhosanxuat/quytrinh/hacap/hacap.component';
import { HacapmodalComponent } from './quanlykhosanxuat/quytrinh/hacapmodal/hacapmodal.component';
import { ChonhanghoamodalComponent } from './quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { TrienkhaikehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { TrienkhaikehoachsanxuatmodalComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuatmodal/trienkhaikehoachsanxuatmodal.component';
import { TimbongComponent } from './quanlykhosanxuat/phuongan/timbong/timbong.component';
import { TimbongmodalComponent } from './quanlykhosanxuat/phuongan/timbongmodal/timbongmodal.component';
import { BotrimaymodalComponent } from './quanlykhosanxuat/modals/botrimaymodal/botrimaymodal.component';
import { MathangComponent } from './danhmuc/danhmucsanxuat/mathang/mathang.component';
import { MathangmodelComponent } from './danhmuc/danhmucsanxuat/modals/mathangmodel/mathangmodel.component';
import { PhanxuongComponent } from './danhmuc/danhmucsanxuat/phanxuong/phanxuong.component';
import { PhanxuongmodalComponent } from './danhmuc/danhmucsanxuat/modals/phanxuongmodal/phanxuongmodal.component';
import { LoaisoiComponent } from './danhmuc/danhmucsanxuat/loaisoi/loaisoi.component';
import { ChonmaytheocongdoanComponent } from './quanlykhosanxuat/modals/chonmaytheocongdoan/chonmaytheocongdoan.component';
import { ImportdanhmucmodelComponent } from './danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { TrangthaimaysanxuatComponent } from './quanlykhosanxuat/quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';
import { NhomkhoComponent } from './danhmuc/danhmucsanxuat/nhomkho/nhomkho.component';
import { XuatkhomathangmodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhomathangmodal/xuatkhomathangmodal.component';
import { KhoComponent } from './danhmuc/danhmucsanxuat/kho/kho.component';
// import 'chartjs-plugin-labels';
import { KehoachnhapnguyenlieuComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieu/kehoachnhapnguyenlieu.component';
import { KehoachnhapnguyenlieumodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieumodal/kehoachnhapnguyenlieumodal.component';
import { KehoachxuathangComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathang/kehoachxuathang.component';
import { KehoachxuathangmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachxuathangmodal/kehoachxuathangmodal.component';
import { VoiLibModule } from 'voi-lib';
import { NhapkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhpham/nhapkhothanhpham.component';
import { NhapkhothanhphammodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhphammodal/nhapkhothanhphammodal.component';
import { NhapkhohoiamComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiam/nhapkhohoiam.component';
import { NhapkhohoiammodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiammodal/nhapkhohoiammodal.component';
import { ChatluongsoiComponent } from './quanlykhosanxuat/quytrinh/chatluongsoi/chatluongsoi.component';
import { ChatluongsoimodalComponent } from './quanlykhosanxuat/quytrinh/chatluongsoimodal/chatluongsoimodal.component';
import { DmmaybienapComponent } from './danhmuc/thongkedientheoca/dmmaybienap/dmmaybienap.component';
import { DmmaybienapmodalComponent } from './danhmuc/thongkedientheoca/dmmaybienapmodal/dmmaybienapmodal.component';
import { LoaidienkvComponent } from './danhmuc/thongkedientheoca/loaidienkv/loaidienkv.component';
import { DmnhomcongtoComponent } from './danhmuc/thongkedientheoca/dmnhomcongto/dmnhomcongto.component';
import { DmcongtoComponent } from './danhmuc/thongkedientheoca/dmcongto/dmcongto.component';
import { DmcongtomodalComponent } from './danhmuc/thongkedientheoca/dmcongtomodal/dmcongtomodal.component';
import { ChonkienbongmodalComponent } from './quanlykhosanxuat/phuongan/chonkienbongmodal/chonkienbongmodal.component';
import { DmthongkedienComponent } from './danhmuc/thongkedientheoca/dmthongkedien/dmthongkedien.component';
import { DmthongkedienmodalComponent } from './danhmuc/thongkedientheoca/dmthongkedienmodal/dmthongkedienmodal.component';
import { DinhmuctieuhaoComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuhao/dinhmuctieuhao.component';
import { DinhmuctieuhaomodalComponent } from './danhmuc/danhmucsanxuat/modals/dinhmuctieuhaomodal/dinhmuctieuhaomodal.component';
import { VitriComponent } from './danhmuc/danhmucsanxuat/vitri/vitri.component';
import { VitrimodalComponent } from './danhmuc/modal/vitrimodal/vitrimodal.component';
import { CandoitonComponent } from './quanlykhosanxuat/quytrinh/candoiton/candoiton.component';
import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop/dieuhanhsanxuattonghop.component';
import { DmtieuchichatluongsoiComponent } from './danhmuc/dmtieuchichatluongsoi/dmtieuchichatluongsoi.component';
import { DmtieuchichatluongsoimodalComponent } from './danhmuc/dmtieuchichatluongsoimodal/dmtieuchichatluongsoimodal.component';
import { SanxuatComponent } from './quanlykhosanxuat/phuongan/sanxuat/sanxuat.component';
import { SanxuatmodalComponent } from './quanlykhosanxuat/phuongan/sanxuatmodal/sanxuatmodal.component';
import { DmphannhommayComponent } from './danhmuc/dmphannhommay/dmphannhommay.component';
import { DmphannhommaymodalComponent } from './danhmuc/dmphannhommaymodal/dmphannhommaymodal.component';
import { DmphannhommayChonmathangmodalComponent } from './danhmuc/dmphannhommay-chonmathangmodal/dmphannhommay-chonmathangmodal.component';
import { PhieudieuchinhComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinh/phieudieuchinh.component';
import { PhieudieuchinhmodalComponent } from './quanlykhosanxuat/quytrinh/phieudieuchinhmodal/phieudieuchinhmodal.component';
import { QuycachdonggoiComponent } from './danhmuc/quycachdonggoi/quycachdonggoi.component';
import { SanluongComponent } from './sanluong/sanluong.component';
import { ChonquycachdonggoimodalComponent } from './quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';
import { XepbanbongComponent } from './quanlykhosanxuat/phuongan/xepbanbong/xepbanbong.component';
import { Dongvanpx1Component } from './quanlykhosanxuat/phuongan/layoutmodals/dongvanpx1/dongvanpx1.component';
import { Dongvanpx2Component } from './quanlykhosanxuat/phuongan/layoutmodals/dongvanpx2/dongvanpx2.component';
import { KienlocongdieuchinhmodalComponent } from './quanlykhosanxuat/quytrinh/kienlocongdieuchinhmodal/kienlocongdieuchinhmodal.component';
import { XuatkhoxoComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxo/xuatkhoxo.component';
import { XuatkhoxomodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxomodal/xuatkhoxomodal.component';
import { XuatkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoi/xuatkhobonghoi.component';
import { XuatkhobonghoimodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhobonghoimodal/xuatkhobonghoimodal.component';
import { XuatkhobongpheComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphe/xuatkhobongphe.component';
import { XuatkhobongphemodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhobongphemodal/xuatkhobongphemodal.component';
import { DinhmuctieuchichatluongsoiComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoi/dinhmuctieuchichatluongsoi.component';
import { DinhmuctieuchichatluongsoimodalComponent } from './danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';
import { NhapkhokhacComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhac/nhapkhokhac.component';
import { NhapkhokhacmodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhokhacmodal/nhapkhokhacmodal.component';
import { XuatkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhpham/xuatkhothanhpham.component';
import { XuatkhothanhphammodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhothanhphammodal/xuatkhothanhphammodal.component';
import { PhanquyentheophanxuongComponent } from './phanquyen/phanquyentheophanxuong/phanquyentheophanxuong.component';
import { PhanquyentheophanxuongmodalComponent } from './phanquyen/phanquyentheophanxuongmodal/phanquyentheophanxuongmodal.component';
import { NhucauxuathangComponent } from './nhucauxuathang/nhucauxuathang.component';
import { LohangComponent } from './quanlykhosanxuat/thongke/lohang/lohang.component';
import { LohangmodalComponent } from './quanlykhosanxuat/thongke/lohangmodal/lohangmodal.component';
import { DashboardthongluongComponent } from './dashboardthongluong/dashboardthongluong.component';
import { GiaokehoachsanxuathoanthanhComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanh/giaokehoachsanxuathoanthanh.component';
import { GiaokehoachsanxuathoanthanhmodalComponent } from './quanlykhosanxuat/quytrinh/giaokehoachsanxuathoanthanhmodal/giaokehoachsanxuathoanthanhmodal.component';
import { ChonsodongphannhommayComponent } from './danhmuc/danhmucsanxuat/modals/chonsodongphannhommay/chonsodongphannhommay.component';
import { KiemkebcpComponent } from './quanlykhosanxuat/quytrinh/kiemkebcp/kiemkebcp.component';
import { KiemkebcpmodalComponent } from './quanlykhosanxuat/quytrinh/kiemkebcpmodal/kiemkebcpmodal.component';
import { CandoichuyenComponent } from './quanlykhosanxuat/candoichuyen/candoichuyen.component';
import { BotrimayOngComponent } from './quanlykhosanxuat/candoichuyen/modals/botrimay-ong/botrimay-ong.component';
import { BotrimayChungComponent } from './quanlykhosanxuat/candoichuyen/modals/botrimay-chung/botrimay-chung.component';
import { DactinhbongComponent } from './danhmuc/danhmucsanxuat/dactinhbong/dactinhbong.component';
import { DactinhbongmodalComponent } from './danhmuc/danhmucsanxuat/dactinhbongmodal/dactinhbongmodal.component';
import { KehoachnhapnguyenlieuitemmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuitemmodal/kehoachnhapnguyenlieuitemmodal.component';
import { KehoachnhapnguyenlieuinvoiceComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoice/kehoachnhapnguyenlieuinvoice.component';
import { KehoachnhapnguyenlieuinvoicemodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuinvoicemodal/kehoachnhapnguyenlieuinvoicemodal.component';
import { ChonkienbonghoimodalComponent } from './quanlykhosanxuat/phuongan/chonkienbonghoimodal/chonkienbonghoimodal.component';
import { BanchephamComponent } from './danhmuc/danhmucsanxuat/banchepham/banchepham.component';
import { BanchephammodalComponent } from './danhmuc/danhmucsanxuat/banchephammodal/banchephammodal.component';
import { MathangdaomodalComponent } from './quanlykhosanxuat/candoichuyen/modals/mathangdaomodal/mathangdaomodal.component';
import { ChoncaapdungmodalComponent } from './quanlykhosanxuat/candoichuyen/modals/choncaapdungmodal/choncaapdungmodal.component';
import { NhapkhobongpheComponent } from './quanlykhosanxuat/nhapkhobongphe/nhapkhobongphe.component';
import { NhapkhobongphemodalComponent } from './quanlykhosanxuat/nhapkhobongphemodal/nhapkhobongphemodal.component';
import { DmkhachhangComponent } from './danhmuc/dmkhachhang/dmkhachhang.component';
import { DmkhachhangmodalComponent } from './danhmuc/dmkhachhangmodal/dmkhachhangmodal.component';

import { NgxMaskModule } from 'ngx-mask';
import { HoaxaComponent } from './quanlykhosanxuat/phuongan/layoutmodals/hoaxa/hoaxa.component';
import { LobongComponent } from './danhmuc/lobong/lobong.component';
import { LobongmodalComponent } from './danhmuc/lobongmodal/lobongmodal.component';
import { NhapkhoxoComponent } from './quanlykhosanxuat/quytrinh/nhapkhoxo/nhapkhoxo.component';
import { ImportnhapkhothanhphamComponent } from './quanlykhosanxuat/quytrinh/nhapkhothanhphammodal/modals/importnhapkhothanhpham/importnhapkhothanhpham.component';
import { ChatluongsoimathangmodalComponent } from './quanlykhosanxuat/quytrinh/chatluongsoimathangmodal/chatluongsoimathangmodal.component';
import { NhapkhohoiammathangmodalComponent } from './quanlykhosanxuat/quytrinh/nhapkhohoiammathangmodal/nhapkhohoiammathangmodal.component';
import { XuatkhoxomathangmodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhoxomathangmodal/xuatkhoxomathangmodal.component';
import { KhobongkiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobongkiemkekho/khobongkiemkekho.component';
import { KhobongkiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/khobongkiemkekhomodal/khobongkiemkekhomodal.component';
import { KhoxokiemkeComponent } from './quanlykhosanxuat/quytrinh/khoxokiemke/khoxokiemke.component';
import { KhoxokiemkemodalComponent } from './quanlykhosanxuat/quytrinh/khoxokiemkemodal/khoxokiemkemodal.component';
import { KhobonghoikiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobonghoikiemkekho/khobonghoikiemkekho.component';
import { KhobonghoikiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/khobonghoikiemkekhomodal/khobonghoikiemkekhomodal.component';
import { KhobongphekiemkekhoComponent } from './quanlykhosanxuat/quytrinh/khobongphekiemkekho/khobongphekiemkekho.component';
import { KhobongphekiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/khobongphekiemkekhomodal/khobongphekiemkekhomodal.component';
import { BongphemathangmodalComponent } from './quanlykhosanxuat/quytrinh/bongphemathangmodal/bongphemathangmodal.component';
import { LoaderInterceptor } from '../services/loader.interceptor';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { XuatthanhphammathangmodalComponent } from './quanlykhosanxuat/quytrinh/xuatthanhphammathangmodal/xuatthanhphammathangmodal.component';
import { TonkhoComponent } from './quanlykhosanxuat/quytrinh/tonkho/tonkho.component';
import { TonkhodanhsachchitietComponent } from './quanlykhosanxuat/quytrinh/tonkhodanhsachchitiet/tonkhodanhsachchitiet.component';
import { NhaphoiammathangmodalComponent } from './quanlykhosanxuat/quytrinh/nhaphoiammathangmodal/nhaphoiammathangmodal.component';
import { LobongcopymodalComponent } from './danhmuc/lobongcopymodal/lobongcopymodal.component';
import { TonkhobongxoComponent } from './quanlykhosanxuat/quytrinh/tonkhobongxo/tonkhobongxo.component';
import { TonkhobongxomodalComponent } from './quanlykhosanxuat/quytrinh/tonkhobongxomodal/tonkhobongxomodal.component';
import { TonkhobonghoiComponent } from './quanlykhosanxuat/quytrinh/tonkhobonghoi/tonkhobonghoi.component';
import { TonkhobonghoimodalComponent } from './quanlykhosanxuat/quytrinh/tonkhobonghoimodal/tonkhobonghoimodal.component';
import { TonkhobongpheComponent } from './quanlykhosanxuat/quytrinh/tonkhobongphe/tonkhobongphe.component';
import { TonkhobongphemodalComponent } from './quanlykhosanxuat/quytrinh/tonkhobongphemodal/tonkhobongphemodal.component';
import { KhoxokiemkemathangmodalComponent } from './quanlykhosanxuat/quytrinh/khoxokiemkemathangmodal/khoxokiemkemathangmodal.component';
import { LoxomodalComponent } from './danhmuc/loxomodal/loxomodal.component';
import { UploadhdsdsanxuatComponent } from './quanlykhosanxuat/uploadhdsdsanxuat/uploadhdsdsanxuat.component';
import { DoikienbongmodalComponent } from './quanlykhosanxuat/quytrinh/doikienbongmodal/doikienbongmodal.component';
import { DmchisotrienkhaiComponent } from './danhmuc/danhmucsanxuat/dmchisotrienkhai/dmchisotrienkhai.component';
import { DmchisotrienkhaimodalComponent } from './danhmuc/danhmucsanxuat/dmchisotrienkhaimodal/dmchisotrienkhaimodal.component';
import { CalcmodalComponent } from './modal/calcmodal/calcmodal.component';
import { ThemlotuonglaimodalComponent } from './quanlykhosanxuat/phuongan/layoutmodals/themlotuonglaimodal/themlotuonglaimodal.component';
import { XuatexceltimbongmodalComponent } from './quanlykhosanxuat/phuongan/xuatexceltimbongmodal/xuatexceltimbongmodal.component';
import { TimbongtheobanmodalComponent } from './quanlykhosanxuat/phuongan/timbongtheobanmodal/timbongtheobanmodal.component';
import { HoiamkiemkekhoComponent } from './quanlykhosanxuat/quytrinh/hoiamkiemkekho/hoiamkiemkekho.component';
import { HoiamkiemkekhomodalComponent } from './quanlykhosanxuat/quytrinh/hoiamkiemkekhomodal/hoiamkiemkekhomodal.component';
import { TonkhohoiamComponent } from './quanlykhosanxuat/quytrinh/tonkhohoiam/tonkhohoiam.component';
import { TonkhohoiammodalComponent } from './quanlykhosanxuat/quytrinh/tonkhohoiammodal/tonkhohoiammodal.component';
import { XuatkhohoiamComponent } from './quanlykhosanxuat/quytrinh/xuatkhohoiam/xuatkhohoiam.component';
import { XuatkhohoiammodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhohoiammodal/xuatkhohoiammodal.component';
import { KehoachnhapnguyenlieuhoanthanhmodalComponent } from './quanlykhosanxuat/quytrinh/kehoachnhapnguyenlieuhoanthanhmodal/kehoachnhapnguyenlieuhoanthanhmodal.component';
import { TrienkhaikehoachsanxuathoanthanhmodalComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuathoanthanhmodal/trienkhaikehoachsanxuathoanthanhmodal.component';
import { VitrikienmodalComponent } from './quanlykhosanxuat/quytrinh/xuatkhomodal/vitrikienmodal/vitrikienmodal.component';
import { SharedModule } from './../shared/shared.module';
import { NhapkhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/nhapkhovattuphu/nhapkhovattuphu.component';
import { NhapkhovattuphumodalComponent } from './quanlykhosanxuat/quytrinh/vattuphu/nhapkhovattuphumodal/nhapkhovattuphumodal.component';
import { XuatkhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/xuatkhovattuphu/xuatkhovattuphu.component';
import { XuatkhovattuphumodalComponent } from './quanlykhosanxuat/quytrinh/vattuphu/xuatkhovattuphumodal/xuatkhovattuphumodal.component';
import { KiemkekhovattuphuComponent } from './quanlykhosanxuat/quytrinh/vattuphu/kiemkekhovattuphu/kiemkekhovattuphu.component';
import { KiemkekhovattuphumodalComponent } from './quanlykhosanxuat/quytrinh/vattuphu/kiemkekhovattuphumodal/kiemkekhovattuphumodal.component';
import { DinhmucmathangtheonamComponent } from './danhmuc/dinhmucmathangtheonam/dinhmucmathangtheonam.component';
import { ModaldinhmucmathangtheonamComponent } from './danhmuc/modal/modaldinhmucmathangtheonam/modaldinhmucmathangtheonam.component';
import { XuatbongchovayComponent } from './quanlykhosanxuat/quytrinh/xuatbongchovay/xuatbongchovay.component';
import { XuatbongchovaymodalComponent } from './quanlykhosanxuat/quytrinh/xuatbongchovay/xuatbongchovaymodal/xuatbongchovaymodal.component';
import { ChonkienchovaymodalComponent } from './quanlykhosanxuat/quytrinh/xuatbongchovay/chonkienchovaymodal/chonkienchovaymodal.component';
import { DmkgconeComponent } from './danhmuc/danhmucsanxuat/dmkgcone/dmkgcone.component';
import { DmkgconemodalComponent } from './danhmuc/danhmucsanxuat/dmkgcone/dmkgconemodal/dmkgconemodal.component';
import { Phuhung1Component } from './quanlykhosanxuat/phuongan/layoutmodals/phuhung1/phuhung1.component';
import { Phuhung2Component } from './quanlykhosanxuat/phuongan/layoutmodals/phuhung2/phuhung2.component';
import { ThongkesanluongcaComponent } from './quanlykhosanxuat/thongke/thongkesanluongca/thongkesanluongca.component';
import { DmphannhommaybanchephammodalComponent } from './danhmuc/dmphannhommay/dmphannhommaybanchephammodal/dmphannhommaybanchephammodal.component';
import { KiemtrabanchephamComponent } from './quanlykhosanxuat/thongke/kiemtrabanchepham/kiemtrabanchepham.component';
import { KiemtrabanchephammodalComponent } from './quanlykhosanxuat/thongke/kiemtrabanchepham/kiemtrabanchephammodal/kiemtrabanchephammodal.component';
import { ChonmathangkiemtrabanchephammodalComponent } from './quanlykhosanxuat/thongke/kiemtrabanchepham/chonmathangkiemtrabanchephammodal/chonmathangkiemtrabanchephammodal.component';
import { DmkhunggioComponent } from './danhmuc/thongkedientheoca/dmkhunggio/dmkhunggio.component';
import { DmkhunggiomodalComponent } from './danhmuc/thongkedientheoca/dmkhunggio/dmkhunggiomodal/dmkhunggiomodal.component';
import { BaocaothongketiendienComponent } from './danhmuc/thongkedientheoca/baocaothongketiendien/baocaothongketiendien.component';
import { BaocaothongketiendienmodalComponent } from './danhmuc/thongkedientheoca/baocaothongketiendien/baocaothongketiendienmodal/baocaothongketiendienmodal.component';
import { ThongkesanluongcamodalComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluongcamodal/thongkesanluongcamodal.component';
import { DmloaidienComponent } from './danhmuc/thongkedientheoca/dmloaidien/dmloaidien.component';
import { LoaiBongPheDanhMucComponent } from './danhmuc/danhmucsanxuat/loai-bong-phe-danh-muc/loai-bong-phe-danh-muc.component';
import { LoaiBongPheDmModalComponent } from './danhmuc/danhmucsanxuat/loai-bong-phe-danh-muc/loai-bong-phe-dm-modal/loai-bong-phe-dm-modal.component';
import { TyLeTieuChuanBongPheComponent } from './danhmuc/danhmucsanxuat/ty-le-tieu-chuan-bong-phe/ty-le-tieu-chuan-bong-phe.component';


@NgModule({
    declarations: [
        QuantriComponent,
        ModaldanhmucchungComponent,
        ModalthongbaoComponent,
        UploadmodalComponent,
        ModaldoimatkhauComponent,
        ModalimportexcelComponent,
        DmkhoComponent,
        ModaldmkhoComponent,
        KiemkekhoComponent,
        KiemkekhomodalComponent,
        NhapkhoComponent,
        NhapkhomodalComponent,
        PhabongComponent,
        ThongsochatluongComponent,
        ThongsochatluongmodalComponent,
        ThongkesanluongComponent,
        ThongkesanluongmodalComponent,
        SanluongtonghopComponent,
        SanluongchitietComponent,
        LoaibongComponent,
        CapbongComponent,
        CasanxuatComponent,
        DanhsachmayComponent,
        DanhsachmaymodalComponent,
        PhabongmodalComponent,
        DieuhanhsanxuatComponent,
        KehoachsanxuatComponent,
        KehoachsanxuatmodalComponent,
        XuatkhoComponent,
        XuatkhomodalComponent,
        DieuchuyenComponent,
        DieuchuyenmodalComponent,
        HacapComponent,
        HacapmodalComponent,
        ChonhanghoamodalComponent,
        TrienkhaikehoachsanxuatComponent,
        TrienkhaikehoachsanxuatmodalComponent,
        TimbongComponent,
        TimbongmodalComponent,
        BotrimaymodalComponent,
        MathangComponent,
        MathangmodelComponent,
        PhanxuongComponent,
        PhanxuongmodalComponent,
        LoaisoiComponent,
        ChonmaytheocongdoanComponent,
        ImportdanhmucmodelComponent,
        TrangthaimaysanxuatComponent,
        NhomkhoComponent,
        XuatkhomathangmodalComponent,
        KhoComponent,
        KehoachnhapnguyenlieuComponent,
        KehoachnhapnguyenlieumodalComponent,
        KehoachxuathangComponent,
        KehoachxuathangmodalComponent,
        NhapkhothanhphamComponent,
        NhapkhothanhphammodalComponent,
        NhapkhohoiamComponent,
        NhapkhohoiammodalComponent,
        ChatluongsoiComponent,
        ChatluongsoimodalComponent,
        DmmaybienapComponent,
        DmmaybienapmodalComponent,
        LoaidienkvComponent,
        DmnhomcongtoComponent,
        DmcongtoComponent,
        DmcongtomodalComponent,
        ChonkienbongmodalComponent,
        DmthongkedienComponent,
        DmthongkedienmodalComponent,
        DinhmuctieuhaoComponent,
        DinhmuctieuhaomodalComponent,
        VitriComponent,
        VitrimodalComponent,
        CandoitonComponent,
        DieuhanhsanxuattonghopComponent,
        DmtieuchichatluongsoiComponent,
        DmtieuchichatluongsoimodalComponent,
        SanxuatComponent,
        SanxuatmodalComponent,
        DmphannhommayComponent,
        DmphannhommaymodalComponent,
        DmphannhommayChonmathangmodalComponent,
        PhieudieuchinhComponent,
        PhieudieuchinhmodalComponent,
        QuycachdonggoiComponent,
        SanluongComponent,
        ChonquycachdonggoimodalComponent,
        XepbanbongComponent,
        Dongvanpx1Component,
        Dongvanpx2Component,
        KienlocongdieuchinhmodalComponent,
        XuatkhoxoComponent,
        XuatkhoxomodalComponent,
        XuatkhobonghoiComponent,
        XuatkhobonghoimodalComponent,
        XuatkhobongpheComponent,
        XuatkhobongphemodalComponent,
        DinhmuctieuchichatluongsoiComponent,
        DinhmuctieuchichatluongsoimodalComponent,
        NhapkhokhacComponent,
        NhapkhokhacmodalComponent,
        XuatkhothanhphamComponent,
        XuatkhothanhphammodalComponent,
        PhanquyentheophanxuongComponent,
        PhanquyentheophanxuongmodalComponent,
        NhucauxuathangComponent,
        LohangComponent,
        LohangmodalComponent,
        DashboardthongluongComponent,
        GiaokehoachsanxuathoanthanhComponent,
        GiaokehoachsanxuathoanthanhmodalComponent,
        ChonsodongphannhommayComponent,
        KiemkebcpComponent,
        KiemkebcpmodalComponent,
        CandoichuyenComponent,
        BotrimayOngComponent,
        BotrimayChungComponent,
        DactinhbongComponent,
        DactinhbongmodalComponent,
        KehoachnhapnguyenlieuitemmodalComponent,
        KehoachnhapnguyenlieuinvoiceComponent,
        KehoachnhapnguyenlieuinvoicemodalComponent,
        ChonkienbonghoimodalComponent,
        BanchephamComponent,
        BanchephammodalComponent,
        MathangdaomodalComponent,
        ChoncaapdungmodalComponent,
        NhapkhobongpheComponent,
        NhapkhobongphemodalComponent,
        DmkhachhangComponent,
        DmkhachhangmodalComponent,
        HoaxaComponent,
        LobongComponent,
        LobongmodalComponent,
        NhapkhoxoComponent,
        ImportnhapkhothanhphamComponent,
        ChatluongsoimathangmodalComponent,
        NhapkhohoiammathangmodalComponent,
        XuatkhoxomathangmodalComponent,
        KhobongkiemkekhoComponent,
        KhobongkiemkekhomodalComponent,
        KhoxokiemkeComponent,
        KhoxokiemkemodalComponent,
        KhobonghoikiemkekhoComponent,
        KhobonghoikiemkekhomodalComponent,
        KhobongphekiemkekhoComponent,
        KhobongphekiemkekhomodalComponent,
        BongphemathangmodalComponent,
        LoaderComponent,
        XuatthanhphammathangmodalComponent,
        TonkhoComponent,
        TonkhodanhsachchitietComponent,
        NhaphoiammathangmodalComponent,
        LobongcopymodalComponent,
        TonkhobongxoComponent,
        TonkhobongxomodalComponent,
        TonkhobonghoiComponent,
        TonkhobongpheComponent,
        TonkhobonghoimodalComponent,
        TonkhobongphemodalComponent,
        KhoxokiemkemathangmodalComponent,
        LoxomodalComponent,
        UploadhdsdsanxuatComponent,
        DoikienbongmodalComponent,
        DmchisotrienkhaiComponent,
        DmchisotrienkhaimodalComponent,
        CalcmodalComponent,
        ThemlotuonglaimodalComponent,
        XuatexceltimbongmodalComponent,
        TimbongtheobanmodalComponent,
        HoiamkiemkekhoComponent,
        HoiamkiemkekhomodalComponent,
        TonkhohoiamComponent,
        TonkhohoiammodalComponent,
        XuatkhohoiamComponent,
        XuatkhohoiammodalComponent,
        KehoachnhapnguyenlieuhoanthanhmodalComponent,
        TrienkhaikehoachsanxuathoanthanhmodalComponent,
        VitrikienmodalComponent,
        NhapkhovattuphuComponent,
        XuatkhovattuphuComponent,
        KiemkekhovattuphuComponent,
        KiemkekhovattuphumodalComponent,
        NhapkhovattuphumodalComponent,
        XuatkhovattuphumodalComponent,
        DinhmucmathangtheonamComponent,
        ModaldinhmucmathangtheonamComponent,
        XuatbongchovayComponent,
        XuatbongchovaymodalComponent,
        ChonkienchovaymodalComponent,
        DmkgconeComponent,
        DmkgconemodalComponent,
        Phuhung1Component,
        Phuhung2Component,
        ThongkesanluongcamodalComponent,
        ThongkesanluongcaComponent,
        DmphannhommaybanchephammodalComponent,
        KiemtrabanchephamComponent,
        KiemtrabanchephammodalComponent,
        ChonmathangkiemtrabanchephammodalComponent,
        DmkhunggioComponent,
        DmkhunggiomodalComponent,
        BaocaothongketiendienComponent,
        BaocaothongketiendienmodalComponent,
        DmloaidienComponent,
        ModaldmloaidienComponent,
        LoaiBongPheDanhMucComponent,
        LoaiBongPheDmModalComponent,
        TyLeTieuChuanBongPheComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        QuantriRoutingModule,
        SharedModule,
        MenubarModule,
        InputTextModule,
        ButtonModule,
        SplitButtonModule,
        SidebarModule,
        PanelMenuModule,
        ChartModule,
        TableModule,
        OverlayPanelModule,
        TreeModule,
        ToolbarModule,
        PaginatorModule,
        TabViewModule,
        PanelModule,
        DynamicDialogModule,
        DialogModule,
        CalendarModule,
        InputNumberModule,
        FileUploadModule,
        FormsModule,
        GalleriaModule,
        NgbModule,
        CheckboxModule,
        RadioButtonModule,
        MenuModule,
        InputMaskModule,
        PasswordModule,
        InputSwitchModule,
        TooltipModule,
        MultiSelectModule,
        VoiLibModule,
        InputTextareaModule,
        ProgressBarModule,
        NgbProgressbarModule,
        ColorPickerModule,
        NgxMaskModule.forRoot(),
    ],
    providers: [
        SanXuatService,
        Dat09Service,
        SignalRService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // { provide: LOCALE_ID, useValue: 'vi-VN' },
        LoaderService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuantriModule { }
