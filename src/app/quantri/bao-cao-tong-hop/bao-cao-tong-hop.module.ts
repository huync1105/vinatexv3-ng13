import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BaoCaoTongHopComponent } from './bao-cao-tong-hop.component';
import { BaoCaoTongHopRoutingModule } from './bao-cao-tong-hop-routing.module';
import { BongChaiTongHopComponent } from './bong-chai-tong-hop/bong-chai-tong-hop.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { GhepThoTongHopComponent } from './ghep-tho-tong-hop/ghep-tho-tong-hop.component';
import { SoiConTongHopComponent } from './soi-con-tong-hop/soi-con-tong-hop.component';
import { OngTongHopComponent } from './ong-tong-hop/ong-tong-hop.component';

@NgModule({
  declarations: [
    BaoCaoTongHopComponent, 
    BongChaiTongHopComponent, GhepThoTongHopComponent, SoiConTongHopComponent, OngTongHopComponent,
    // SumByKeyPipe
  ],
  imports: [
    CommonModule,
    BaoCaoTongHopRoutingModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    SharedModule,
    PaginatorModule
  ],
  exports: [
    BaoCaoTongHopComponent,
    BongChaiTongHopComponent
  ],
  providers: [
    DatePipe,
    // SumByKeyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class BaoCaoTongHopModule { }
