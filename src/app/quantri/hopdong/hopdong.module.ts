import { ModalloaihopdongComponent } from './danhmuc/modal/modalloaihopdong/modalloaihopdong.component';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HopdongRoutingModule } from './hopdong-routing.module';
import { HopdongComponent } from './hopdong.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { VoiLibModule } from 'voi-lib';
import { LoaderService } from 'src/app/services/loader.service';
import { SignalRService } from 'src/app/services/signalR.service';
import { SharedModule } from './../../shared/shared.module';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { LoaderInterceptor } from 'src/app/services/loader.interceptor';
import localeVi from '@angular/common/locales/vi';

//danh mục
import { DanhmuchinhthucthanhtoanComponent } from './danhmuc/danhmuchinhthucthanhtoan/danhmuchinhthucthanhtoan.component';
import { ModaldanhmuchinhthucthanhtoanComponent } from './danhmuc/modal/modaldanhmuchinhthucthanhtoan/modaldanhmuchinhthucthanhtoan.component';
import { DanhmucloaihopdongComponent } from './danhmuc/danhmucloaihopdong/danhmucloaihopdong.component';
import { ModaldanhmucloaihopdongComponent } from './danhmuc/modal/modaldanhmucloaihopdong/modaldanhmucloaihopdong.component';
import { DanhmucloaitienteComponent } from './danhmuc/danhmucloaitiente/danhmucloaitiente.component';
import { ModaldanhmucloaitienteComponent } from './danhmuc/modal/modaldanhmucloaitiente/modaldanhmucloaitiente.component';
import { DanhmucthutucthanhtoanComponent } from './danhmuc/danhmucthutucthanhtoan/danhmucthutucthanhtoan.component';
import { ModaldanhmucthutucthanhtoanComponent } from './danhmuc/modal/modaldanhmucthutucthanhtoan/modaldanhmucthutucthanhtoan.component';
import { DanhmuctrangthaibaolanhComponent } from './danhmuc/danhmuctrangthaibaolanh/danhmuctrangthaibaolanh.component';
import { ModaldanhmuctrangthaibaolanhComponent } from './danhmuc/modal/modaldanhmuctrangthaibaolanh/modaldanhmuctrangthaibaolanh.component';
import { DanhmucvattuphuComponent } from './danhmuc/danhmucvattuphu/danhmucvattuphu.component';
import { ModaldanhmucvattuphuComponent } from './danhmuc/modal/modaldanhmucvattuphu/modaldanhmucvattuphu.component';
import { DanhmuccocaunhansuComponent } from './danhmuc/danhmuccocaunhansu/danhmuccocaunhansu.component';
import { ModaldanhmuccocaunhansuComponent } from './danhmuc/modal/modaldanhmuccocaunhansu/modaldanhmuccocaunhansu.component';
import { DanhmuctinhluongComponent } from './danhmuc/danhmuctinhluong/danhmuctinhluong.component';
import { ModaldanhmuctinhluongComponent } from './danhmuc/modal/modaldanhmuctinhluong/modaldanhmuctinhluong.component';
import { DanhmuctaisanComponent } from './danhmuc/danhmuctaisan/danhmuctaisan.component';
import { ModaldanhmuctaisanComponent } from './danhmuc/modal/modaldanhmuctaisan/modaldanhmuctaisan.component';



import { DmLoaiHopDongComponent } from './danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { DanhsachhopdongbongxoComponent } from './screen/danhsachhopdongbongxo/danhsachhopdongbongxo.component';
// import { ChitiethopdongbongxomodalComponent } from './screen/danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
registerLocaleData(localeVi);
import { CardModule } from 'primeng/card';

// import { ChitietdanhsachhopdongbongxoComponent } from './screen/chitietdanhsachhopdongbongxo/chitietdanhsachhopdongbongxo.component';
import { ChitiethopdongbongxoComponent } from './screen/modal/share/chitiethopdongbongxo/chitiethopdongbongxo.component';
import { ChitietdanhsachhanghoaComponent } from './screen/modal/share/chitietdanhsachhanghoa/chitietdanhsachhanghoa.component';
import { ChitietdieukhoanthanhtoanComponent } from './screen/modal/share/chitietdieukhoanthanhtoan/chitietdieukhoanthanhtoan.component';
import { ChitietnhansuthuchienComponent } from './screen/modal/share/chitietnhansuthuchien/chitietnhansuthuchien.component';
import { ChitietbaolanhComponent } from './screen/modal/share/chitietbaolanh/chitietbaolanh.component';
import { ChitietthanhtoanComponent } from './screen/modal/share/chitietthanhtoan/chitietthanhtoan.component';
import { ChitietphathopdongComponent } from './screen/modal/share/chitietphathopdong/chitietphathopdong.component';
import { ChitiethopdongbongxomodalComponent } from './screen/danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { ChitietdieukhoanmodalComponent } from './screen/modal/share/chitietdieukhoanthanhtoan/chitietdieukhoanmodal/chitietdieukhoanmodal.component';
import { NhansuthuchienmodalComponent } from './screen/modal/share/chitietnhansuthuchien/nhansuthuchienmodal/nhansuthuchienmodal.component';
import { ChitietbaolanhmodalComponent } from './screen/modal/share/chitietbaolanh/chitietbaolanhmodal/chitietbaolanhmodal.component';
// import { GiaonhanhopdongComponent } from './screen/thuchienhopdong/giaonhanhopdong/giaonhanhopdong.component';
import { PhathopdongComponent } from './screen/thuchienhopdong/phathopdong/phathopdong.component';
import { QuyettoanhopdongComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdong.component';
import { GiaonhanhanghoaComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoa.component';
import { GiahanhopdongComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdong.component';
import { LaphopdongbongxoComponent } from './screen/laphopdongbongxo/laphopdongbongxo.component';
import { LaphopdongsoiComponent } from './screen/laphopdongsoi/laphopdongsoi.component';
import { ModallaphopdongbongxoComponent } from './screen/laphopdongbongxo/modallaphopdongbongxo/modallaphopdongbongxo.component';
import { ModallaphopdongsoiComponent } from './screen/laphopdongsoi/modallaphopdongsoi/modallaphopdongsoi.component';
import { GiahanhopdongmodalComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdongmodal/giahanhopdongmodal.component';
import { GiaonhanhanghoamodalComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoamodal/giaonhanhanghoamodal.component';
import { PhathopdongmodalComponent } from './screen/thuchienhopdong/phathopdong/phathopdongmodal/phathopdongmodal.component';
import { QuyettoanhopdongmodalComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdongmodal/quyettoanhopdongmodal.component';
import { GiaokehoachsanxuatComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuat.component';
import { GiaokehoachsanxuatmodalComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuatmodal/giaokehoachsanxuatmodal.component';

// import báo cáo theo dõi 

import { TheodoihopdongnhapkhauComponent } from './baocao/theodoihopdongnhapkhau/theodoihopdongnhapkhau.component';
import { ChonthutucthanhtoanmodalComponent } from './screen/modal/share/chitietdieukhoanthanhtoan/chitietdieukhoanmodal/chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { ChitiethanghoamodalComponent } from './screen/modal/share/chitietdanhsachhanghoa/chitiethanghoamodal/chitiethanghoamodal.component';
// import { ThoigiannhaphangmodalComponent } from './screen/modal/share/chitietdanhsachhanghoa/chitiethanghoamodal/thoigiannhaphangmodal/thoigiannhaphangmodal.component';
import { DanhmucphibanhangComponent } from './danhmuc/danhmucphibanhang/danhmucphibanhang.component';
import { ModaldanhmucphibanhangComponent } from './danhmuc/modal/modaldanhmucphibanhang/modaldanhmucphibanhang.component';
import { DanhmucdinhmucmathangComponent } from './danhmuc/danhmucdinhmucmathang/danhmucdinhmucmathang.component';
import { ModaldanhmucdinhmucmathangComponent } from './danhmuc/modal/modaldanhmucdinhmucmathang/modaldanhmucdinhmucmathang.component';
import { KehoachnhapbongComponent } from './screen/thuchienhopdong/kehoachnhapbong/kehoachnhapbong.component';
import { ChitietkehoachnhapbongComponent } from './screen/modal/share/chitietkehoachnhapbong/chitietkehoachnhapbong.component';
import { ChitiethanghoacuahopdongsoimodalComponent } from './screen/modal/share/chitietdanhsachhanghoa/chitiethanghoacuahopdongsoimodal/chitiethanghoacuahopdongsoimodal.component';
import { NhapkhoComponent } from './screen/thuchienhopdong/nhapkho/nhapkho.component';
import { ChitietnhapkhoComponent } from './screen/modal/chitietnhapkho/chitietnhapkho.component';
import { XuatkhothanhphamhopdongComponent } from './screen/thuchienhopdong/xuatkhothanhphamhopdong/xuatkhothanhphamhopdong.component';
import { ChitietxuatkhothanhphamhopdongComponent } from './screen/modal/chitietxuatkhothanhphamhopdong/chitietxuatkhothanhphamhopdong.component';
import { XuatthanhphammathangmodalComponent } from './screen/modal/xuatthanhphammathangmodal/xuatthanhphammathangmodal.component';
import { KehoachkinhdoanhdanhsachComponent } from './kehoachkinhdoanh/kehoachkinhdoanhdanhsach/kehoachkinhdoanhdanhsach.component';
import { ModalkehoachkinhdoanhchitiettaomoiComponent } from './kehoachkinhdoanh/modal/modalkehoachkinhdoanhchitiettaomoi/modalkehoachkinhdoanhchitiettaomoi.component';
import { ModalkehoachkinhdoanhtheodoiComponent } from './kehoachkinhdoanh/modal/modalkehoachkinhdoanhtheodoi/modalkehoachkinhdoanhtheodoi.component';
import { DmtieuchichatluonghopdongmodalComponent } from './danhmuc/dmtieuchichatluonghopdongmodal/dmtieuchichatluonghopdongmodal.component';
import { DmtieuchichatluonghopdongComponent } from './danhmuc/dmtieuchichatluonghopdong/dmtieuchichatluonghopdong.component';
import { QuytrinhthanhtoanbongComponent } from './screen/thanhtoanbong/quytrinhthanhtoanbong/quytrinhthanhtoanbong.component';

// import { DmtieuchichatluonghopdongComponent } from './danhmuc/dmtieuchichatluonghopdong/dmtieuchichatluonghopdong.component';
// import { DmtieuchichatluonghopdongmodalComponent } from './danhmuc/dmtieuchichatluonghopdongmodal/dmtieuchichatluonghopdongmodal.component';
// import { QuytrinhthanhtoanbongComponent } from './screen/thanhtoanbong/quytrinhthanhtoanbong/quytrinhthanhtoanbong.component';
import { QuytrinhthanhtoanbongmodalComponent } from './screen/thanhtoanbong/quytrinhthanhtoanbongmodal/quytrinhthanhtoanbongmodal.component';
import { ModaldongiakehoachthucteComponent } from './kehoachkinhdoanh/modal/modaldongiakehoachthucte/modaldongiakehoachthucte.component';
import { DanhsachtinhluongComponent } from './danhsach/danhsachtinhluong/danhsachtinhluong.component';
import { ModaldanhsachtinhluongComponent } from './danhsach/modal/modaldanhsachtinhluong/modaldanhsachtinhluong.component';
import { ThanhtoanhopdongsoiComponent } from './screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoi.component';
import { ThanhtoanhopdongsoimodalComponent } from './screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoimodal/thanhtoanhopdongsoimodal.component';
import { ChonmathangthanhtoanhopdongComponent } from './screen/thuchienhopdong/thanhtoanhopdongsoi/chonmathangthanhtoanhopdong/chonmathangthanhtoanhopdong.component';
import { KehoachsanxuatmodalComponent } from './screen/modal/kehoachsanxuatmodal/kehoachsanxuatmodal.component';

import { MucluongcocaunhansuComponent } from './danhsach/mucluongcocaunhansu/mucluongcocaunhansu/mucluongcocaunhansu.component';
import { ChiphibanhangtheonamComponent } from './danhsach/chiphibanhang/chiphibanhangtheonam/chiphibanhangtheonam.component';
import { ModalchiphibanhangtheonamComponent } from './danhsach/modal/modalchiphibanhangtheonam/modalchiphibanhangtheonam.component';
import { ModalmucluongcocaunhansuComponent } from './danhsach/modal/modalmucluongcocaunhansu/modalmucluongcocaunhansu.component';
import { HopdongvattuphuComponent } from './screen/hopdongvattuphu/hopdongvattuphu.component';
import { HopdongvattuphumodalComponent } from './screen/hopdongvattuphu/hopdongvattuphumodal/hopdongvattuphumodal.component';
import { LuachonvattuphucuahanghoamodalComponent } from './screen/modal/share/chitietdanhsachhanghoa/luachonvattuphucuahanghoamodal/luachonvattuphucuahanghoamodal.component';
import { HopdongxuatlobongxoComponent } from './screen/thuchienhopdong/hopdongxuatlobongxo/hopdongxuatlobongxo.component';
import { HopdongxuatlobongxomodalComponent } from './screen/thuchienhopdong/hopdongxuatlobongxo/hopdongxuatlobongxomodal/hopdongxuatlobongxomodal.component';
import { DinhmucsanxuatComponent } from './DinhMucSanXuat/dinhmucsanxuat/dinhmucsanxuat.component';
import { NhapvattuphuComponent } from './screen/thuchienhopdong/nhapvattuphu/nhapvattuphu.component';
import { ThanhtoanvattuphuComponent } from './screen/thuchienhopdong/thanhtoanvattuphu/thanhtoanvattuphu.component';
import { NhapvattuphumodalComponent } from './screen/thuchienhopdong/nhapvattuphu/nhapvattuphumodal/nhapvattuphumodal.component';
import { ThanhtoanvattuphumodalComponent } from './screen/thuchienhopdong/thanhtoanvattuphu/thanhtoanvattuphumodal/thanhtoanvattuphumodal.component';
import { DanhsachhopdongsoiComponent } from './screen/danhsachhopdongsoi/danhsachhopdongsoi.component';
import { DanhsachhopdongvattuphuComponent } from './screen/danhsachhopdongvattuphu/danhsachhopdongvattuphu.component';
import { ChondanhmucthutucthanhtoanmodalComponent } from './screen/thuchienhopdong/quyettoanhopdong/chondanhmucthutucthanhtoanmodal/chondanhmucthutucthanhtoanmodal.component';
import { HopdongchonhanghoagiaokehoachmodalComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/hopdongchonhanghoagiaokehoachmodal/hopdongchonhanghoagiaokehoachmodal.component';
import { HopdongchonquycachdonggoimodalComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/hopdongchonquycachdonggoimodal/hopdongchonquycachdonggoimodal.component';
import { QuytrinhdanhgiakhachhangComponent } from './screen/thuchienhopdong/quytrinhdanhgiakhachhang/quytrinhdanhgiakhachhang.component';
import { QuytrinhdanhgiakhachhangmodalComponent } from './screen/thuchienhopdong/quytrinhdanhgiakhachhang/quytrinhdanhgiakhachhangmodal/quytrinhdanhgiakhachhangmodal.component';
import { ChonkhachhangmodalComponent } from './screen/thuchienhopdong/quytrinhdanhgiakhachhang/chonkhachhangmodal/chonkhachhangmodal.component';
import { ChinhsuadanhgiakhachhangmodalComponent } from './screen/thuchienhopdong/quytrinhdanhgiakhachhang/chinhsuadanhgiakhachhangmodal/chinhsuadanhgiakhachhangmodal.component';
import { DanhmuctieuchidanhgiaComponent } from './danhmuc/danhmuctieuchidanhgia/danhmuctieuchidanhgia.component';
import { DanhmuctieuchidanhgiamodalComponent } from './danhmuc/danhmuctieuchidanhgia/danhmuctieuchidanhgiamodal/danhmuctieuchidanhgiamodal.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { ModalkehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/modal/modalkehoachkinhdoanhthang/modalkehoachkinhdoanhthang.component';
import { KehoachsanxuatnamComponent } from './kehoachsanxuatnam/kehoachsanxuatnam.component';
import { KehoachsanxuatthangComponent } from './kehoachsanxuatthang/kehoachsanxuatthang.component';
import { KehoachsanxuatnammodalComponent } from './kehoachsanxuatnam/modal/kehoachsanxuatnammodal/kehoachsanxuatnammodal.component';
import { KehoachsanxuatthangmodalComponent } from './kehoachsanxuatthang/modal/kehoachsanxuatthangmodal/kehoachsanxuatthangmodal.component';
import { TreeTableModule } from 'primeng/treetable';
import { DanhsachhopdongsoimodalComponent } from './screen/danhsachhopdongsoi/danhsachhopdongsoimodal/danhsachhopdongsoimodal.component';
import { DanhsachhopdongvattuphumodalComponent } from './screen/danhsachhopdongvattuphu/danhsachhopdongvattuphumodal/danhsachhopdongvattuphumodal.component';
import { TinhdoanhthumodalComponent } from './modals/tinhdoanhthumodal/tinhdoanhthumodal.component';
import { DanhmuctygiangoaiteComponent } from './danhmuc/danhmuctygiangoaite/danhmuctygiangoaite.component';
import { DanhmucdongiasanphamComponent } from './danhmuc/danhmucdongiasanpham/danhmucdongiasanpham.component';
import { DoanhthuComponent } from './screen/doanhthu/doanhthu.component';
import { ModaldanhmuctygiangoaiteComponent } from './danhmuc/modal/modaldanhmuctygiangoaite/modaldanhmuctygiangoaite.component';
import { ModaldanhmucdongiasanphamComponent } from './danhmuc/modal/modaldanhmucdongiasanpham/modaldanhmucdongiasanpham.component';
import { NhapgiatinhdoanhthumodalComponent } from './modals/nhapgiatinhdoanhthumodal/nhapgiatinhdoanhthumodal.component';
import { ChiphibongComponent } from './danhsach/chiphibong/chiphibong.component';
import { ChiphixoComponent } from './danhsach/chiphixo/chiphixo.component';
import { ChiphidienComponent } from './danhsach/chiphidien/chiphidien.component';
import { ModalchiphibongComponent } from './danhsach/modal/modalchiphibong/modalchiphibong.component';
import { ModalchiphixoComponent } from './danhsach/modal/modalchiphixo/modalchiphixo.component';
import { ModalchiphidienComponent } from './danhsach/modal/modalchiphidien/modalchiphidien.component';
import { ChiphimodalComponent } from './modals/chiphimodal/chiphimodal.component';


@NgModule({
    declarations: [
        HopdongComponent,
        DanhmuchinhthucthanhtoanComponent,
        ModaldanhmuchinhthucthanhtoanComponent,
        DanhmucloaihopdongComponent,
        ModaldanhmucloaihopdongComponent,
        DanhmucloaitienteComponent,
        ModaldanhmucloaitienteComponent,
        DanhmucthutucthanhtoanComponent,
        ModaldanhmucthutucthanhtoanComponent,
        DanhmuctrangthaibaolanhComponent,
        ModaldanhmuctrangthaibaolanhComponent,
        DanhmucvattuphuComponent,
        ModaldanhmucvattuphuComponent,
        DanhmuccocaunhansuComponent,
        ModaldanhmuccocaunhansuComponent,
        DanhmuctinhluongComponent,
        ModaldanhmuctinhluongComponent,
        DanhmuctaisanComponent,
        ModaldanhmuctaisanComponent,
        //báo cáo
        TheodoihopdongnhapkhauComponent,
        DmLoaiHopDongComponent,
        ModalloaihopdongComponent,
        DanhsachhopdongbongxoComponent,
        DanhsachhopdongbongxoComponent,
        ChitiethopdongbongxoComponent,
        ChitietdanhsachhanghoaComponent,
        ChitietdieukhoanthanhtoanComponent,
        ChitietnhansuthuchienComponent,
        ChitietbaolanhComponent,
        ChitietthanhtoanComponent,
        ChitietphathopdongComponent,
        ChitiethopdongbongxomodalComponent,
        ChitietdieukhoanmodalComponent,
        NhansuthuchienmodalComponent,
        ChitietbaolanhmodalComponent,
        PhathopdongComponent,
        QuyettoanhopdongComponent,
        GiaonhanhanghoaComponent,
        GiahanhopdongComponent,
        LaphopdongbongxoComponent,
        LaphopdongsoiComponent,
        ModallaphopdongbongxoComponent,
        ModallaphopdongsoiComponent,
        GiahanhopdongmodalComponent,
        GiaonhanhanghoamodalComponent,
        PhathopdongmodalComponent,
        QuyettoanhopdongmodalComponent,
        GiaokehoachsanxuatComponent,
        GiaokehoachsanxuatmodalComponent,
        TheodoihopdongnhapkhauComponent,
        ChonthutucthanhtoanmodalComponent,
        ChitiethanghoamodalComponent,
        DanhmucphibanhangComponent,
        ModaldanhmucphibanhangComponent,
        DanhmucdinhmucmathangComponent,
        ModaldanhmucdinhmucmathangComponent,
        KehoachnhapbongComponent,
        ChitietkehoachnhapbongComponent,
        ChitiethanghoacuahopdongsoimodalComponent,
        NhapkhoComponent,
        ChitietnhapkhoComponent,
        XuatkhothanhphamhopdongComponent,
        ChitietxuatkhothanhphamhopdongComponent,
        XuatthanhphammathangmodalComponent,
        KehoachkinhdoanhdanhsachComponent,
        ModalkehoachkinhdoanhchitiettaomoiComponent,
        ModalkehoachkinhdoanhtheodoiComponent,
        DmtieuchichatluonghopdongComponent,
        DmtieuchichatluonghopdongmodalComponent,
        QuytrinhthanhtoanbongComponent,
        QuytrinhthanhtoanbongmodalComponent,
        ModaldongiakehoachthucteComponent,
        DanhsachtinhluongComponent,
        ModaldanhsachtinhluongComponent,
        MucluongcocaunhansuComponent,
        ChiphibanhangtheonamComponent,
        ModalchiphibanhangtheonamComponent,
        ModalmucluongcocaunhansuComponent,
        ThanhtoanhopdongsoiComponent,
        ThanhtoanhopdongsoimodalComponent,
        ChonmathangthanhtoanhopdongComponent,
        KehoachsanxuatmodalComponent,
        HopdongvattuphuComponent,
        HopdongvattuphumodalComponent,
        LuachonvattuphucuahanghoamodalComponent,
        HopdongxuatlobongxoComponent,
        HopdongxuatlobongxomodalComponent,
        DinhmucsanxuatComponent,
        NhapvattuphuComponent,
        ThanhtoanvattuphuComponent,
        NhapvattuphumodalComponent,
        ThanhtoanvattuphumodalComponent,
        DanhsachhopdongsoiComponent,
        DanhsachhopdongvattuphuComponent,
        ChondanhmucthutucthanhtoanmodalComponent,
        HopdongchonhanghoagiaokehoachmodalComponent,
        HopdongchonquycachdonggoimodalComponent,
        QuytrinhdanhgiakhachhangComponent,
        QuytrinhdanhgiakhachhangmodalComponent,
        ChonkhachhangmodalComponent,
        ChinhsuadanhgiakhachhangmodalComponent,
        DanhmuctieuchidanhgiaComponent,
        KehoachkinhdoanhthangComponent,
        DanhmuctieuchidanhgiamodalComponent,
        ModalkehoachkinhdoanhthangComponent,
        KehoachsanxuatnamComponent,
        KehoachsanxuatthangComponent,
        KehoachsanxuatnammodalComponent,
        KehoachsanxuatthangmodalComponent,
        DanhsachhopdongsoimodalComponent,
        DanhsachhopdongvattuphumodalComponent,
        TinhdoanhthumodalComponent,
        DanhmuctygiangoaiteComponent,
        DanhmucdongiasanphamComponent,
        DoanhthuComponent,
        ModaldanhmuctygiangoaiteComponent,
        ModaldanhmucdongiasanphamComponent,
        NhapgiatinhdoanhthumodalComponent,
        ChiphibongComponent,
        ChiphixoComponent,
        ChiphidienComponent,
        ModalchiphibongComponent,
        ModalchiphixoComponent,
        ModalchiphidienComponent,
        ChiphimodalComponent,
    ],
    imports: [
        CommonModule,
        PanelModule,
        CardModule,
        SharedModule,
        HopdongRoutingModule,
        HttpClientModule,
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
        TreeTableModule,
    ],
    providers: [
        SignalRService,
        LoaderService,
        SanXuatService,
        Dat09Service,
        HopDongService,
        DanhMucHopDongService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
        // { provide: LOCALE_ID, useValue: 'vi-VN' },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HopdongModule { }
