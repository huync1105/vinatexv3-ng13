import { vn } from './../../../../../../services/const';
import { Subscription } from 'rxjs';
import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal/chitiethanghoacuahopdongsoimodal.component';
import { SanXuatService } from './../../../../../../services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable , dinhDangSo} from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { LuachonvattuphucuahanghoamodalComponent } from './luachonvattuphucuahanghoamodal/luachonvattuphucuahanghoamodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit, DoCheck {
  @Input('listHangHoa') item: any = {
    iddmLoaiVatTu: '',
  };
  @Input('listHangHoaSoi') listHangHoaSoi: any = [];
  @Input('hopDong') hopDong: any = {};
  @Input('listTieuChuanChatLuong') listTieuChuanChatLuong: any = [];
  @Input('listLoaiMatHang') listLoaiMatHang: any = [];
  @Input() isXo: boolean
  @Input() isBong: boolean
  @Input() isVatTuPhu: boolean
  @Input() res1: any = []
  @Input("opt") opt: string;
  @Input() iddmLoaiHopDong: any
  @Output('loaiNguyenVatLieu') onChange = new EventEmitter();
  // @Output('listHangHoaChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('hopDongChange') hopDongChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('listHangHoaChange') listHangHoaChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('listLoaiMatHangChange') listLoaiMatHangChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('listHangHoaSoiChange') listHangHoaSoiChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() chiTieuChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('listTieuChuanChatLuongChange') listTieuChuanChatLuongChange: EventEmitter<any> = new EventEmitter();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  unsup: Subscription
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  currentMyText: number = 5
  dinhDangSo = dinhDangSo;
  listThanhToanThuTuc: any = []
  listKeHoachNhapBong: any = []
  listdmQuyCachDongGoi: any = [];
  listdmCapBong: any = [];
  listdmDacTinh: any = [];

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private _danhmucHopDong: DanhMucHopDongService,
    private _servicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetOptions()
    this.tinhDonGiaThanhToan();
  }


  ngDoCheck() {
    this.listHangHoaChange.emit(this.item);    
    this.hopDongChange.emit(this.hopDong);
    this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
    this.listHangHoaSoiChange.emit(this.listHangHoaSoi);
    this.listTieuChuanChatLuongChange.emit(this.listTieuChuanChatLuong);
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if ('loaiNguyenVatLieu' in changes) {
  //   if (typeof changes['loaiNguyenVatLieu'].currentValue !== 'number') {
  //   const loaiNguyenVatLieu = Number(changes['loaiNguyenVatLieu'].currentValue);
  //   if (Number.isNaN(loaiNguyenVatLieu)) {
  //   this.hopDong.loaiNguyenVatLieu = null;
  //   } else {
  //   this.hopDong.loaiNguyenVatLieu = this.item.iddmLoaiVatTu;
  //   }
  //   }
  //   }
  //   }

  GetOptions() {
    this._servicesSanXuat.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
        this.listdmQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
      });
      
      this._servicesSanXuat.GetListOptdmCapBong().subscribe((res: any) => {
        this.listdmCapBong = mapArrayForDropDown(res, "Ten", "Id");
      });
      if(!validVariable(this.hopDong.loai)){
        let data: any = {CurrentPage : 0}
        this._servicesSanXuat.dmDacTinhBong().GetList(data).subscribe((res: any) => {
          this.listdmDacTinh = mapArrayForDropDown(res, "DacTinh", "Id");
        });
      }
      else
        this.getlistCapBong();

  }
  getlistCapBong(){
    this._servicesSanXuat.dmDacTinhBong().GetDacTinh(this.item.iddmLoaiBong || '', this.item.iddmCapBong || '').subscribe((res: any) => {
      this.listdmDacTinh = mapArrayForDropDown(res, "DacTinh", "Id");
    });
  }

  add() {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.selectedItems = this.listTieuChuanChatLuong;
    modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
    modalRef.result.then(res => {
      this.listTieuChuanChatLuong= deepCopy(res);  
    }).catch(er => { console.log(er) });
  }
  delete(index) {
    if (!validVariable(this.listHangHoaSoi[index].id)) {
      this.listHangHoaSoi.splice(index, 1);
    } else {
      let item = this.listHangHoaSoi.splice(index, 1)[0];
      item.isXoa = true;
      this.listHangHoaSoi.push(JSON.parse(JSON.stringify(item)));
    }
    this.tinhgiaTriHopDongSoi("");
  }


  chonKeHoach() {
    let Loai = 1;
    if(this.isVatTuPhu)
      Loai = 23;
    this._servicesSanXuat.GetListdmItemByHangHoa(Loai).subscribe((res1: any) => {
      let modalRef = this._modal.open(ChitiethanghoacuahopdongsoimodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.componentInstance.listHangHoa = this.listHangHoaSoi;
      modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
      modalRef.result.then(res => {
        this.listHangHoaSoi= deepCopy(res);  
      }).catch(er => { console.log(er) });
    })
  }
  tinhDonGiaThanhToan() {
    this.item.donGia = this.dinhDangSo(this.item.donGia);
    this.item.thueGTGT = this.dinhDangSo(this.item.thueGTGT);
    this.item.DonGiaThanhToan = 0;
    this.item.DonGiaThanhToan = this.item.donGia *(100 +(this.item.thueGTGT || 0))/100 ;
    this.tinhgiaTriHopDong();
  }

  tinhgiaTriHopDong() {
    this.item.soLuong = this.dinhDangSo(this.item.soLuong);
    this.item.giaTriHopDongMatHang = this.item.DonGiaThanhToan * this.item.soLuong;
    if(this.hopDong.isLayTheoGiaTriHangHoa === true)
      this.hopDong.giaTri = this.item.giaTriHopDongMatHang;
  }
  tinhgiaTriHopDongSoi(e) {
    if(e!= ""){
      e.soLuong = dinhDangSo(e.soLuong);
      e.donGia = dinhDangSo(e.donGia);
      e.thueGTGT = dinhDangSo(e.thueGTGT);
    }
    this.hopDong.thanhTien = 0;

    this.listHangHoaSoi.forEach(ele => {
      if(ele.isXoa !== true)
        this.hopDong.thanhTien = this.hopDong.thanhTien + (ele.soLuong || 0) * (ele.donGia || 0)* (1 + (ele.thueGTGT || 0)/100)
    });
    
    if(this.hopDong.isLayTheoGiaTriHangHoa === true)
      this.hopDong.giaTri = this.hopDong.thanhTien;
  }
  
  chonVatTuPhu() {
    this._danhmucHopDong.DanhMucVatTuPhu().GetListAll().subscribe((res1: any) => {
      let modalRef = this._modal.open(LuachonvattuphucuahanghoamodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listHangHoa = this.listHangHoaSoi;
      modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.result.then(res => {
        this.listHangHoaSoi= res;  
      }).catch(er => { console.log(er) });
    })
  }
}
