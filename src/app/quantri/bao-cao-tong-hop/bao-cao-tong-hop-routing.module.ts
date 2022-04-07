import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaoCaoTongHopComponent } from './bao-cao-tong-hop.component';
import { BongChaiTongHopComponent } from './bong-chai-tong-hop/bong-chai-tong-hop.component';
import { GhepThoTongHopComponent } from './ghep-tho-tong-hop/ghep-tho-tong-hop.component';
import { OngTongHopComponent } from './ong-tong-hop/ong-tong-hop.component';
import { SoiConTongHopComponent } from './soi-con-tong-hop/soi-con-tong-hop.component';

const routes: Routes = [
  { path: '', component: BaoCaoTongHopComponent },
  { path: 'bongchaitonghop', component: BongChaiTongHopComponent },
  { path: 'ghepthotonghop', component: GhepThoTongHopComponent },
  { path: 'soicontonghop', component: SoiConTongHopComponent },
  { path: 'ongtonghop', component: OngTongHopComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BaoCaoTongHopRoutingModule { }
