import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isXoaPipe } from './../services/isXoaPipe';
import { VNDPipe } from './../services/vnd.pipe';
import { FilterPipe } from './../services/filter.pipe';
import { FilterByKeyPipe } from './../services/filterbykey.pipe';
import { SumByKeyPipe } from './../services/sum.pipe';
import { SortByKeyPipe } from './../services/sortPipe.pipe';
import { CongDoanPipe } from './../services/congdoan.pipe';
import {CaPipe} from './../services/ca.pipe';
import { isDieuChinhPipe } from './../services/isDieuChinh.pipe';
import { BanGiaoTaiSanQuyTrinhComponent } from './ban-giao-tai-san-quy-trinh/ban-giao-tai-san-quy-trinh.component';
import { TaiLieuDanhSachComponent } from './tai-lieu-danh-sach/tai-lieu-danh-sach.component';
import { TraoDoiComponent } from './trao-doi/trao-doi.component';
import {AccordionModule} from 'primeng/accordion';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    BanGiaoTaiSanQuyTrinhComponent,
    TaiLieuDanhSachComponent,
    TraoDoiComponent,
  ],
  imports: [
    AccordionModule,
    CommonModule,
    FileUploadModule,
    TableModule,
    ScrollPanelModule,
    FormsModule,
    InputTextareaModule
  ],
  exports:[
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    BanGiaoTaiSanQuyTrinhComponent,
    TaiLieuDanhSachComponent,
    TraoDoiComponent,
  ]
})
export class SharedModule { }
