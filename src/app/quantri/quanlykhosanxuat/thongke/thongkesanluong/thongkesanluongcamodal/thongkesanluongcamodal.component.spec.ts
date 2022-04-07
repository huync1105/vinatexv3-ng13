import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ThongkesanluongcamodalComponent } from './thongkesanluongcamodal.component';

describe('ThongkesanluongcamodalComponent', () => {
  let component: ThongkesanluongcamodalComponent;
  let fixture: ComponentFixture<ThongkesanluongcamodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongcamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongcamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// <div class="p-col-12 p-p-0 pintable-containertk" voiPintable [pinnedCols]="4">
//             <table>
//                 <thead>
//                     <tr>
//                         <th rowspan="2" class="tc-w-30">#</th>
//                         <th rowspan="2" class="tc-w-100">Số máy</th>
//                         <th rowspan="2" class="tc-w-50">Ne</th>
//                         <th rowspan="2" class="tc-w-200">Mặt hàng</th>
//                         <th *ngFor="let col of listCaSanXuat" [attr.colspan]="col.SoCot">{{col.Ten}}</th>
//                         <th rowspan="2" class="tc-w-200">Ghi chú</th>
//                     </tr>
//                     <tr>
//                         <!-- <th style="display: none;"></th>
//                         <th style="display: none;"></th>
//                         <th style="display: none;"></th>
//                         <th style="display: none;"></th> -->
//                         <ng-container *ngFor="let col of listCaSanXuat">
//                             <th *ngIf="item.CongDoan==='ONG'" class="tc-w-200">Lô hàng</th>
//                             <th *ngIf="item.CongDoan==='ONG'" class="tc-w-100">Sản lượng màn hình (kg)</th>
//                             <th *ngIf="item.CongDoan!=='ONG'" class="tc-w-100">Khối lượng (kg)</th>
//                             <th class="tc-w-100">Chiều dài (m)</th>
//                             <th *ngIf="item.CongDoan==='CON'" class="tc-w-100">Chữ đồng hồ (g/cọc)
//                                 <p-checkbox [(ngModel)]="checkedAll" (onChange)="checkAll($event)" binary="true"
//                                     inputId="binary"></p-checkbox>
//                             </th>
//                             <th *ngIf="item.CongDoan==='CON' || item.CongDoan==='THO'" class="tc-w-100">Cọc chết (cọc)
//                             </th>
//                             <th *ngIf="item.CongDoan==='CON'" class="tc-w-100">Hút mối (kg)</th>
//                         </ng-container>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <!-- <ng-container *ngIf="itemtbl!=='clone'">  -->
//                     <tr *ngFor="let itemtbl of listItem; let i = index">
//                         <td class="tc-w-30" style="background-color: #fff;">{{i+1}}</td>
//                         <td class="text-left tc-w-100" style="background-color: #fff;">{{itemtbl.TendmMay}}</td>
//                         <td class="text-left tc-w-50" style="background-color: #fff;">{{itemtbl.Ne}}</td>
//                         <td class="text-left tc-w-200" style="background-color: #fff;">{{itemtbl.Ten}} 
//                             <span *ngIf="item.CongDoan==='ONG'&& itemtbl.IdLoHangDao!==null "> - Đảo</span>
//                         </td>
//                         <ng-container *ngFor="let col of listCaSanXuat">
//                             <td *ngIf="itemtbl.CongDoan==='ONG'" class="tc-w-200">
//                                 <div class="p-inputgroup">
//                                     <div style="flex:1">
//                                         <p-dropdown [filter]="true" [options]="listLoHang" [autofocusFilter]="true"
//                                             placeholder="Chọn lô hàng" styleClass="p-inputtext-sm"
//                                             [(ngModel)]="itemtbl.IdLoHang"></p-dropdown>
//                                     </div>
//                                     <button pButton pRipple icon="pi pi-copy"
//                                         class="p-button-sm p-button-rounded p-button-text p-mr-2"
//                                         (click)="ApDung(itemtbl)"></button>
//                                 </div>
//                             </td>
//                             <td class="tc-w-100">
//                                 <span *ngIf="itemtbl.DonViNangSuat=== 0">
//                                     {{itemtbl.KhoiLuongTinhToan |number:'0.3-3'}}
//                                 </span>
//                                 <p-inputNumber *ngIf="itemtbl.DonViNangSuat=== 1" #inputNumber
//                                     (keyup.enter)="enterCon(i*5+1)" [tabindex]="i*5+1" [minFractionDigits]="3"
//                                     locale="en-EN" [(ngModel)]="itemtbl.KhoiLuong"
//                                     (ngModelChange)="TinhTongKhoiLuongBong()">
//                                 </p-inputNumber>
//                             </td>
//                             <td *ngIf="itemtbl.DonViNangSuat===1" class="text-right tc-w-100">
//                                 {{itemtbl.ChieuDai |number:'0.3-3'}}
//                                 <div style="display:none">
//                                     <p-inputNumber *ngIf="item.CongDoan==='CON'" [minFractionDigits]="3" locale="en-EN"
//                                         [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enterCon(i*5+2)"
//                                         [tabindex]="i*5+2" (ngModelChange)="TinhCongThucMoi(itemtbl)">
//                                     </p-inputNumber>
//                                 </div>
//                             </td>
//                             <td *ngIf="itemtbl.DonViNangSuat===0" class="tc-w-100">
//                                 <p-inputNumber
//                                     *ngIf="item.CongDoan==='CHAIPC' || item.CongDoan==='GHEPSOBOPC' || item.CongDoan==='ONG' "
//                                     [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChieuDai" #inputNumber
//                                     (keyup.enter)="enter(i)" [tabindex]="i+1" (ngModelChange)="TinhGiaTri(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='CON'" [minFractionDigits]="3" locale="en-EN"
//                                     [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enterCon(i*5+2)"
//                                     [tabindex]="i*5+2" (ngModelChange)="TinhCongThucMoi(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='CHAICOTTON'" [minFractionDigits]="3"
//                                     locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
//                                     (ngModelChange)="TinhKhoiLuongChaiCotton(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='GHEPSOBOCOTTON' || item.CongDoan==='GHEPTRONB' || item.CongDoan==='GHEPTRONA' 
//                                     || item.CongDoan==='GHEPDAURA' || item.CongDoan==='GHEPSOBOPE'"
//                                     [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
//                                     (ngModelChange)="TinhKhoiLuongGhepSoBoChaiCotton(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber #inputNumber *ngIf="item.CongDoan==='THO'" [minFractionDigits]="3"
//                                     locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
//                                     (ngModelChange)="TinhKhoiLuongTho(itemtbl)" (keyup.enter)="enter(i*2+1)"
//                                     [tabindex]="i*2+1">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='CHAIPE'" [minFractionDigits]="3" locale="en-EN"
//                                     [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enter(i)"
//                                     [tabindex]="i+1" (ngModelChange)="TinhKhoiLuongChaiPE(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='CHAIKY'" [minFractionDigits]="3" locale="en-EN"
//                                     [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enter(i)"
//                                     [tabindex]="i+1" (ngModelChange)="TinhKhoiLuongChaiKy(itemtbl)">
//                                 </p-inputNumber>
//                                 <p-inputNumber *ngIf="item.CongDoan==='CUONCUI'" [minFractionDigits]="3" locale="en-EN"
//                                     [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enter(i)"
//                                     [tabindex]="i+1" (ngModelChange)="TinhKhoiLuongCuonCui(itemtbl)">
//                                 </p-inputNumber>
//                             </td>
//                             <td *ngIf="item.CongDoan==='CON'" class="p-d-flex p-flex-row tc-w-100">
//                                 <p-inputNumber #inputNumber (keyup.enter)="enterCon(i*5+3)" [tabindex]="i*5+3"
//                                     [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChuDongHo"
//                                     (ngModelChange)="KhoiLuongBongCongDoanCon(itemtbl)"
//                                     [disabled]="itemtbl.DonViNangSuat===1 || itemtbl.isM === true">
//                                 </p-inputNumber>
//                                 <input type="checkbox" class="p-inputtext-sm" [(ngModel)]="itemtbl.isM"
//                                     (ngModelChange)="KhoiLuongBongCongDoanCon(itemtbl)" style="margin: 5px!important" />
//                                 <label>M</label>
//                             </td>
//                             <td *ngIf="item.CongDoan==='CON'" class="tc-w-100">
//                                 <span *ngIf="itemtbl.DonViNangSuat===1">
//                                     {{itemtbl.CocChet |number:'0.0'}}
//                                 </span>
//                             </td>
//                             <td *ngIf="item.CongDoan==='CON'" class="tc-w-100">
//                                 <span *ngIf="itemtbl.DonViNangSuat===1">
//                                     {{itemtbl.HutMoi |number:'0.3-3'}}
//                                 </span>
//                             </td>
//                             <td *ngIf="item.CongDoan==='THO'" class="tc-w-100">
//                                 <span *ngIf="itemtbl.DonViNangSuat===1 ">
//                                     {{itemtbl.CocChet |number:'0.3-3'}}
//                                 </span>
//                             </td>
//                         </ng-container>
//                         <td class="tc-w-200">
//                             <input type="text" class="p-inputtext-sm" [(ngModel)]="itemtbl.GhiChu" pInputText />
//                         </td>
//                     </tr>
//                     <!-- </ng-container> -->
//                     <!-- <ng-container *ngIf="itemtbl==='clone' && item.CongDoan==='ONG'">
//                         <tr style="height: 40px;">
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                         </tr>
//                     </ng-container> -->
//                 </tbody>
//                 <tfoot>
//                     <!-- <tr>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td *ngIf="item.CongDoan==='ONG'" class="text-right">
//                         </td>
//                         <td class="text-right">
//                             {{TongKhoiLuong |number:'0.3-3'}}
//                         </td>
//                         <td class="text-right">
//                             {{listItem|isXoa|SumByKey:'KhoiLuongTinhToan'|number:'0.3-3'}}
//                         </td>
//                         <td class="text-right">
//                             {{listItem|isXoa|SumByKey:'ChieuDai'|number:'0.3-3'}}
//                         </td>
//                         <td *ngIf="item.CongDoan==='CON'" class="text-right">
//                             {{listItem|isXoa|SumByKey:'ChuDongHo'|number:'0.3-3'}}
//                         </td>
//                         <td *ngIf="item.CongDoan==='CON' || item.CongDoan==='THO'" class="text-right">
//                             {{listItem|isXoa|SumByKey:'CocChet'|number:'0.0'}}
//                         </td>
//                         <td *ngIf="item.CongDoan==='CON'" class="text-right">
//                             {{listItem|isXoa|SumByKey:'HutMoi'|number:'0.3-3'}}
//                         </td>
//                         <td></td>
//                     </tr> -->
//                 </tfoot>
//             </table>
//             <br />
//         </div>



// <div class="p-col-12 p-p-0 d-flex flex-column" style="overflow-x: scroll; overflow-y: scroll;position: relative;">
//             <table class="table">
//                 <thead>
//                     <tr>
//                         <th class="align-content-center first-col sticky-col" rowspan="3"
//                             style="border:1px solid #dee2e6!important;">#</th>
//                         <th class="align-content-center second-col sticky-col" rowspan="3"
//                             style="border:1px solid #dee2e6!important;">Số máy</th>
//                         <th class="align-content-center third-col sticky-col" rowspan="3"
//                             style="border:1px solid #dee2e6!important;">Ne</th>
//                         <th class="align-content-center forth-col sticky-col" rowspan="3"
//                             style="border:1px solid #dee2e6!important;">Mặt hàng</th>
//                         <th *ngFor="let col of listCaSanXuat" [attr.colspan]="col.SoCot">{{col.Ten}}</th>
//                         <th rowspan="3">Ghi chú</th>
//                     </tr>
                    // <tr>
                    //     <ng-container *ngFor="let col of listCaSanXuat">
                    //         <th [attr.colspan]="col.SoCot">
                    //             <div class="d-flex flex-column flex-lg-row">
                    //                 <label class="p-col-12 p-lg-4 p-p-0 my-auto">Ca<span
                    //                         class="text-danger">*</span>:</label>
                    //                 <div class="p-col-12 p-lg-8 p-p-0">
                    //                     <p-dropdown [options]="listCaThucTe" placeholder="Ca"
                    //                         styleClass="p-inputtext-sm" [(ngModel)]="item.IddmCaSanXuatThucTe">
                    //                     </p-dropdown>
                    //                 </div>
                    //             </div>
                    //         </th>
                    //     </ng-container>
                    // </tr>
//                     <tr>
//                         <ng-container *ngFor="let ban of listCaSanXuat">
//                             <th *ngIf="item.CongDoan==='ONG'">Lô hàng</th>
//                             <th *ngIf="item.CongDoan==='ONG'">Sản lượng màn hình (kg)</th>
//                             <th *ngIf="item.CongDoan!=='ONG'">Khối lượng (kg)</th>
//                             <th>Chiều dài (m)</th>
//                             <th *ngIf="item.CongDoan==='CON'">Chữ đồng hồ (g/cọc)
//                                 <p-checkbox [(ngModel)]="checkedAll" (onChange)="checkAll($event)" binary="true"
//                                     inputId="binary"></p-checkbox>
//                             </th>
//                             <th *ngIf="item.CongDoan==='CON' || item.CongDoan==='THO'">Cọc chết (cọc)
//                             </th>
//                             <th *ngIf="item.CongDoan==='CON'">Hút mối (kg)</th>
//                         </ng-container>
//                     </tr>
//                 </thead>
//                 <tbody>
                    // <tr *ngFor="let itemtbl of listItem">
                    //     <td class="align-content-center first-col sticky-col"
                    //         style="background-color:#fff; border:1px solid #dee2e6 !important;"></td>
                    //     <td class="align-content-center second-col sticky-col text-left"
                    //         style="background-color:#fff; border:1px solid #dee2e6!important;">{{itemtbl.TendmMay}}
                    //     </td>
                    //     <td class="text-left align-content-center third-col sticky-col"
                    //         style="background-color:#fff; border:1px solid #dee2e6!important;">{{itemtbl.Ne}}</td>
                    //     <td class="text-left align-content-center forth-col sticky-col"
                    //         style="background-color:#fff; border:1px solid #dee2e6!important;">{{itemtbl.Ten}}
                    //         <span *ngIf="item.CongDoan==='ONG'&& itemtbl.IdLoHangDao!==null "> - Đảo</span>
                    //     </td>
                    //     <ng-container *ngFor="let col of listCaSanXuat">
                    //         <td *ngIf="itemtbl.CongDoan==='ONG'">
                    //             <div class="p-inputgroup">
                    //                 <div style="flex:1">
                    //                     <p-dropdown [filter]="true" [options]="listLoHang" [autofocusFilter]="true"
                    //                         placeholder="Chọn lô hàng" styleClass="p-inputtext-sm"
                    //                         [(ngModel)]="itemtbl.IdLoHang"></p-dropdown>
                    //                 </div>
                    //                 <button pButton pRipple icon="pi pi-copy"
                    //                     class="p-button-sm p-button-rounded p-button-text p-mr-2"
                    //                     (click)="ApDung(itemtbl)"></button>
                    //             </div>
                    //         </td>
                    //         <td>
                    //             <span *ngIf="itemtbl.DonViNangSuat=== 0">
                    //                 {{itemtbl.KhoiLuongTinhToan |number:'0.3-3'}}
                    //             </span>
                    //             <p-inputNumber *ngIf="itemtbl.DonViNangSuat=== 1" #inputNumber
                    //                 (keyup.enter)="enterCon(i*5+1)" [tabindex]="i*5+1" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.KhoiLuong"
                    //                 (ngModelChange)="TinhTongKhoiLuongBong()">
                    //             </p-inputNumber>
                    //         </td>
                    //         <td *ngIf="itemtbl.DonViNangSuat===1" class="text-right">
                    //             {{itemtbl.ChieuDai |number:'0.3-3'}}
                    //             <div style="display:none">
                    //                 <p-inputNumber *ngIf="item.CongDoan==='CON'" [minFractionDigits]="3"
                    //                     locale="en-EN" [(ngModel)]="itemtbl.ChieuDai" #inputNumber
                    //                     (keyup.enter)="enterCon(i*5+2)" [tabindex]="i*5+2"
                    //                     (ngModelChange)="TinhCongThucMoi(itemtbl)">
                    //                 </p-inputNumber>
                    //             </div>
                    //         </td>
                    //         <td *ngIf="itemtbl.DonViNangSuat===0">
                    //             <p-inputNumber
                    //                 *ngIf="item.CongDoan==='CHAIPC' || item.CongDoan==='GHEPSOBOPC' || item.CongDoan==='ONG' "
                    //                 [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
                    //                 #inputNumber (keyup.enter)="enter(i)" [tabindex]="i+1"
                    //                 (ngModelChange)="TinhGiaTri(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='CON'" [minFractionDigits]="3" locale="en-EN"
                    //                 [(ngModel)]="itemtbl.ChieuDai" #inputNumber (keyup.enter)="enterCon(i*5+2)"
                    //                 [tabindex]="i*5+2" (ngModelChange)="TinhCongThucMoi(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='CHAICOTTON'" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
                    //                 (ngModelChange)="TinhKhoiLuongChaiCotton(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='GHEPSOBOCOTTON' || item.CongDoan==='GHEPTRONB' || item.CongDoan==='GHEPTRONA' 
                    //             || item.CongDoan==='GHEPDAURA' || item.CongDoan==='GHEPSOBOPE'"
                    //                 [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
                    //                 (ngModelChange)="TinhKhoiLuongGhepSoBoChaiCotton(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber #inputNumber *ngIf="item.CongDoan==='THO'" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.ChieuDai"
                    //                 (ngModelChange)="TinhKhoiLuongTho(itemtbl)" (keyup.enter)="enter(i*2+1)"
                    //                 [tabindex]="i*2+1">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='CHAIPE'" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.ChieuDai" #inputNumber
                    //                 (keyup.enter)="enter(i)" [tabindex]="i+1"
                    //                 (ngModelChange)="TinhKhoiLuongChaiPE(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='CHAIKY'" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.ChieuDai" #inputNumber
                    //                 (keyup.enter)="enter(i)" [tabindex]="i+1"
                    //                 (ngModelChange)="TinhKhoiLuongChaiKy(itemtbl)">
                    //             </p-inputNumber>
                    //             <p-inputNumber *ngIf="item.CongDoan==='CUONCUI'" [minFractionDigits]="3"
                    //                 locale="en-EN" [(ngModel)]="itemtbl.ChieuDai" #inputNumber
                    //                 (keyup.enter)="enter(i)" [tabindex]="i+1"
                    //                 (ngModelChange)="TinhKhoiLuongCuonCui(itemtbl)">
                    //             </p-inputNumber>
                    //         </td>
                    //         <td *ngIf="item.CongDoan==='CON'" class="p-d-flex p-flex-row">
                    //             <p-inputNumber #inputNumber (keyup.enter)="enterCon(i*5+3)" [tabindex]="i*5+3"
                    //                 [minFractionDigits]="3" locale="en-EN" [(ngModel)]="itemtbl.ChuDongHo"
                    //                 (ngModelChange)="KhoiLuongBongCongDoanCon(itemtbl)"
                    //                 [disabled]="itemtbl.DonViNangSuat===1 || itemtbl.isM === true">
                    //             </p-inputNumber>
                    //             <input type="checkbox" class="p-inputtext-sm" [(ngModel)]="itemtbl.isM"
                    //                 (ngModelChange)="KhoiLuongBongCongDoanCon(itemtbl)"
                    //                 style="margin: 5px!important" />
                    //             <label>M</label>
                    //         </td>
                    //         <td *ngIf="item.CongDoan==='CON'">
                    //             <span *ngIf="itemtbl.DonViNangSuat===1">
                    //                 {{itemtbl.CocChet |number:'0.0'}}
                    //             </span>
                    //         </td>
                    //         <td *ngIf="item.CongDoan==='CON'">
                    //             <span *ngIf="itemtbl.DonViNangSuat===1">
                    //                 {{itemtbl.HutMoi |number:'0.3-3'}}
                    //             </span>
                    //         </td>
                    //         <td *ngIf="item.CongDoan==='THO'">
                    //             <span *ngIf="itemtbl.DonViNangSuat===1 ">
                    //                 {{itemtbl.CocChet |number:'0.3-3'}}
                    //             </span>
                    //         </td>
                    //     </ng-container>
                    //     <td>
                    //         <input type="text" class="p-inputtext-sm" [(ngModel)]="itemtbl.GhiChu" pInputText />
                    //     </td>
                    // </tr>
//                 </tbody>
//             </table>
//         </div>