import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-hopdongxuatlobongxomodal',
  templateUrl: './hopdongxuatlobongxomodal.component.html',
  styleUrls: ['./hopdongxuatlobongxomodal.component.css']
})
export class HopdongxuatlobongxomodalComponent implements OnInit {
  
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  lang: any = vn;
  data: any = {};
  type: any = '';
  nametype: any = '';
  listHopDong: any = [];
  listHopDongFull: any = [];
  IdDuAn: any = 0;
  userInfo: any;
  listLoBong: any = [];
  listKho: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService,) {
      this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        idDuAn: this.IdDuAn,
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
    this.getListHopDong();
    this.getListdmKho();
  }
  getListHopDong(){
    this._hopdong.QuyTrinhHopDong().GetListHopDongBanChoVay(this.item.idDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
      this.listHopDongFull = res;
    })
  }
  
  getListdmKho(){
    let data: any = {
      CurrentPage: 0,
      Loai: 2,
    }
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    if(this.CheckTruocKhiLuu()){
      if (this.item.ngay !== null && this.item.ngay !== undefined)
        this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhXuatBongXo().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if(this.CheckTruocKhiLuu()){
      if (this.item.ngay !== null && this.item.ngay !== undefined)
        this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhXuatBongXo().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhXuatBongXo().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if(this.CheckTruocKhiLuu())
    {
      this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhXuatBongXo().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.getQuyTrinh(res.data.id)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._hopdong.QuyTrinhXuatBongXo().Delete(this.item.id).subscribe((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getQuyTrinh(Id) {
    this._hopdong.QuyTrinhXuatBongXo().Get(Id).subscribe((res1: any) => {
      this.item=res1.data;
      this.item.ngay = UnixToDate(this.item.ngayUnix);
      this.KiemTraButtonModal();
      let dnm: any = {}
      dnm.IddmLoaiBong = this.item.iddmLoaiBong;
      dnm.CurrentPage = 0;
      this._services.GetListLoBong(dnm).subscribe((res: any) => {
        this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
      });
      if(this.item.isKetThuc === false){
        this.chonLoBongAll();
      }
    })
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
    this.tinhTongSoKien();
  }

  Onclose() {
    this.activeModal.close();
  }
  CheckTruocKhiLuu(){
    if(validVariable(this.newTableItem.soKien)){
      this.add();
    }
    let isCheck: any = false;
    this.item.listItem.forEach(element => {
      if (element.soKien > element.tonKho) {
        isCheck = true;
      }
    });
    if (isCheck === true) {
      this.toastr.error("Bạn không được nhập số lượng quá tồn kho!");
      return false;
    }
    else if (!validVariable(this.item.idHopDong)) {
      this.toastr.error("Bạn chưa chọn hợp đồng!");
      return false;
    }
    else if (!validVariable(this.item.ngay)) {
      this.toastr.error("Bạn chưa chọn  ngày!");
      return false;
    }
    else if (!validVariable(this.item.noiDung)) {
      this.toastr.error("Bạn chưa điền nội dung!");
      return false;
    }
    return true;
  }
  chonHopDong(){
    let data: any = this.listHopDongFull.filter(e=> e.id == this.item.idHopDong);
    if(data !== undefined){
      this.item.tenLoaiBongXo = data[0].tenLoaiBongXo;
      this.item.xuatXu = data[0].xuatXu;
      this.item.iddmLoaiBong = data[0].iddmLoaiBong;
      // this.item.soKien = data[0].soKien;
      // this.item.soLuong = data[0].soLuong;
      this.item.loai = data[0].loai;

      let dnm: any = {}
      dnm.IddmLoaiBong = data[0].iddmLoaiBong;
      dnm.CurrentPage = 0;
      this._services.GetListLoBong(dnm).subscribe((res: any) => {
        this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
      });
    }
  }
  tinhTongSoKien(){
    this.item.soKien = 0;
    if(validVariable(this.item.listItem)){
      this.item.listItem.forEach(element => {
        if(element.isXoa !== true)
        this.item.soKien = this.item.soKien +  element.soKien
      });
    }
    this.item.soKien += (this.newTableItem.soKien || 0);
  }
  tinhTongKhoiLuong(){
    this.item.soLuong = 0;
    if(validVariable(this.item.listItem)){
      this.item.soLuong = this.item.listItem.reduce((total, ele) => {
      return total + ele.khoiLuong }, 0);
    }
    
    this.item.soLuong += (this.newTableItem.khoiLuong || 0);
  }
  chonLoBong(item){
    this._hopdong.QuyTrinhXuatBongXo().getLuuKhoKhoBongHopDong(item.iddmKho || '', this.item.idLoBong || '', this.item.loai || 2).subscribe((res1: any) => {
      item.tonKho = res1[0].TonSoLuong;
    })
  }
  chonLoBongAll(){
    this._hopdong.QuyTrinhXuatBongXo().getLuuKhoKhoBongHopDong('', this.item.idLoBong || '', this.item.loai || 2).subscribe((res1: any) => {
      if(res1.length > 0){
        this.item.listItem.forEach(element => {
          let itemFind = res1.filter(e => e.IddmKho === element.iddmKho);
          if(itemFind !== undefined && itemFind.length > 0){
            element.tonKho = itemFind[0].TonSoLuong;
          }
        });
        if(validVariable(this.newTableItem.iddmKho)){
          let itemFindNew = res1.filter(e => e.IddmKho === this.newTableItem.iddmKho);
          this.newTableItem.tonKho = itemFindNew[0].TonSoLuong;
        }
      }
      else{
        this.item.listItem.forEach(element => {
            element.tonKho = 0;
        });
        if(validVariable(this.newTableItem.iddmKho)){
          this.newTableItem.tonKho = 0;
        }
      }
    })
  }
}
