import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs/internal/scheduler/async';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-chitietkehoachnhapbong',
  templateUrl: './chitietkehoachnhapbong.component.html',
  styleUrls: ['./chitietkehoachnhapbong.component.css']
})
export class ChitietkehoachnhapbongComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "id": "",
    "idKeHoachNhapBong": this.item.id,
  };
  editTableItem: any = [];
  listLoBong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  userInfo: any;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listduan: any = [];
  listhopdong: any = [];
  listhopdong_copy: any = [];
  listdmCapBong: any = [];
  listdmKho: any = []
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private _auth: AuthenticationService,
    private store: StoreService,
    private _servicesHopDong: HopDongService,
  ) {
  }

  ngOnInit(): void {
    this.userInfo = this._auth.currentUserValue;
    this.GetDanhSachDuAnByIdUser();
    if (this.opt !== 'edit') {
      this.item = {
        id: "",
        listInvoice: [],
      }
      this.item.idDuAn = this.store.getCurrent();
      this.GetDanhSachHopDongByNhaThau();
      this.GetNextSoQuyTrinh();
    }
    else {
      this.GetItem(this.item.id);
    }
    this.data.CurrentPage = 0;
    
    this._services.GetListOptdmCapBong().subscribe((res: any) => {
      this.listdmCapBong = mapArrayForDropDown(res, "Ten", "Id");
    });
   
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if(this.item.isKetThuc === true){
          this._services.CheckEditPhieuInvoice(this.item.id || '').subscribe(res => {
          if(res == true){
            this.item.isEdit = true;
            this.checkbutton.Ghi = true;
          }
        })
      }
    })
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listduan = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  GetDanhSachHopDongByNhaThau() {
    this._servicesHopDong.QuyTrinhHopDong().GetDanhSachHopDongMua(this.item.idDuAn).subscribe((res: any) => {//lay bong va xo
      this.listhopdong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
      this.listhopdong_copy = deepCopy(res);
    })
  }

  GetListdmLoaiBongForHopDong() {
    let item = this.listhopdong_copy.find(obj => obj.id == this.item.idHopDong);
    this.item.soLuong = item.soLuong;
    this.item.giaCif = item.giaCif;
    this.item.tenLoaiBongXo = item.tenLoaiBongXo;
    this.item.iddmLoaiBong = item.iddmLoaiBong;
    this.item.iddmCapBong = item.iddmCapBong;
    this.item.iddmDacTinh = item.iddmDacTinh;
    this.item.soContainer = item.soContainer;
    this.item.soKien = item.soKien;
    this.item.tendmCapBong = validVariable(this.item.iddmCapBong) ? this.listdmCapBong.find(e=> e.value == this.item.iddmCapBong).label : '';
    this._services.dmDacTinhBong().GetDacTinh(this.item.iddmLoaiBong || '', this.item.iddmCapBong || '').subscribe((res: any) => {
      this.item.dacTinhBong = validVariable(this.item.iddmDacTinh) ? res.find(e=> e.Id == this.item.iddmDacTinh).DacTinh : '';
    });
    this.data.Loai = item.loai;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
    });
  }

  ChuyenDuyet() {
    if (this.setdata()) {
      this._services.KeHoachNhapBong().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    if (this.setdata()) {
      this._services.KeHoachNhapBong().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.KeHoachNhapBong().GetNextSo().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  setdata() {
    if(validVariable(this.newTableItem.soContainer) && validVariable(this.newTableItem.soLuong) && validVariable(this.newTableItem.soKien)
    && validVariable(this.newTableItem.thoiGianCapCang) && validVariable(this.newTableItem.thoiGianDuKien)){
      this.add()
    }
    let isCheckThoiGian : any = false;
    let isCheckKho : any = false;
    
    if(validVariable(this.item.listInvoice)){
      for(let i = 0; i < this.item.listInvoice.length; i ++){
        if(!validVariable(this.item.listInvoice[i].thoiGianDuKien) || !validVariable(this.item.listInvoice[i].thoiGianCapCang)){
          isCheckThoiGian = true;
          break;
        }
        if(!validVariable(this.item.listInvoice[i].iddmKho)){
          isCheckKho = true;
          break;
        }
      }
    }
    
    if(isCheckThoiGian === true)
    {
      this.toastr.error('Vui lòng chọn thời gian')
      return false;
    }
    else if(isCheckKho === true)
    {
      this.toastr.error('Vui lòng chọn kho')
      return false;
    }
    else if (!validVariable(this.item.idHopDong)) {
      this.toastr.error('Vui lòng chọn hợp đồng')
      return false;
    }
    else if (!validVariable(this.item.thoiGianDuKien)) {
      this.toastr.error('Vui lòng chọn thời gian dự kiến')
      return false;
    }
    else if (!validVariable(this.item.thoiGianCapCang)) {
      this.toastr.error('Vui lòng chọn thời gian cập cảng')
      return false;
    }
    else{
      this.item.thoiGianDuKienUnix = DateToUnix(this.item.thoiGianDuKien);
      this.item.thoiGianCapCangUnix = DateToUnix(this.item.thoiGianCapCang);
      if (this.item.listInvoice.length > 0) {
        this.item.listInvoice.forEach(obj => {
          obj.thoiGianDuKienUnix = DateToUnix(obj.thoiGianDuKien);
          obj.thoiGianCapCangUnix = DateToUnix(obj.thoiGianCapCang);
        });
      }
      return true;
    }
  }

  GhiLai() {
    
    if (this.setdata()) {
      this._services.KeHoachNhapBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.GetItem(res.data);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetItem(Id) {
    this._services.KeHoachNhapBong().Get(Id).subscribe((res: any) => {
      this.item = res.data;
      this.item.thoiGianDuKien = UnixToDate(this.item.thoiGianDuKienUnix);
      this.item.thoiGianCapCang = UnixToDate(this.item.thoiGianCapCangUnix);
      if (this.item.listInvoice.length > 0) {
        this.item.listInvoice.forEach(obj => {
          obj.thoiGianDuKien = UnixToDate(obj.thoiGianDuKienUnix);
          obj.thoiGianCapCang = UnixToDate(obj.thoiGianCapCangUnix);
        });
      }
      this._servicesHopDong.QuyTrinhHopDong().GetDanhSachHopDongMua(this.item.idDuAn).subscribe((res: any) => {
        this.listhopdong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
        this.listhopdong_copy = deepCopy(res);
        this.GetListdmLoaiBongForHopDong();
      })
      this.KiemTraButtonModal();
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.KeHoachNhapBong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
      
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  add() {
    if(!validVariable(this.newTableItem.thoiGianCapCang) || !validVariable(this.newTableItem.thoiGianDuKien)){
      this.toastr.error('Vui lòng chọn thời gian')
    }
    if (this.item.listInvoice == undefined || this.item.listInvoice == null)
      this.item.listInvoice = [];
    this.newTableItem.id = "";
    this.newTableItem.idKeHoachNhapBong = this.item.id;
    if(!validVariable(this.newTableItem.soContainer))
      this.newTableItem.soContainer = 0;
    if(!validVariable(this.newTableItem.soLuong))
      this.newTableItem.soLuong = 0;
    if(!validVariable(this.newTableItem.soKien))
      this.newTableItem.soKien = 0;
    this.item.listInvoice.push(this.newTableItem);
    this.tinhTongContainer_SoKien();
    this.newTableItem = {
      "id": "",
      "idKeHoachNhapBong": this.item.id,
    }
  }
  edit(item, index) {
    this.item.listInvoice.forEach(element => {
      element.editField = false;
    });
    this.item.listInvoice[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    if (!validVariable(this.item.listInvoice[index].id)) {
      this.item.listInvoice.splice(index, 1)
    } else {
      this.item.listInvoice[index].isXoa = true;
    }
    this.tinhTongContainer_SoKien();
  }
  saveEdit(item, index) {
    this.item.listInvoice[index] = item;
    this.item.listInvoice[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listInvoice[index].editField = false;
  }
  Onclose() {
    this.activeModal.close();
  }
  editItem(item) {
    // let modalRef = this._modal.open(KehoachnhapnguyenlieuitemmodalComponent, {
    //   size: 'fullscreen',
    //   backdrop: 'static'
    // })
    // modalRef.componentInstance.item = item;

    // modalRef.result.then((res: any) => {
    //   item.Container = 0;
    //   item.TongSoKien = 0;
    //   item.SoLuongNhap = 0;
    //   console.log(res)
    //   item.listDot = res.data;
    //   item.listDot.forEach(element => {
    //     item.Container += element.Container;
    //     item.TongSoKien += element.TongSoKien;
    //     item.SoLuongNhap += element.SoLuongNhap;
    //   });
    // })
    //   .catch(er => { console.log(er) })
  }

  tinhTongContainer_SoKien() {
    this.item.soContainer = 0;
    this.item.soKien = 0;
    this.item.listInvoice.forEach(obj => {
      if (this.item.isXoa == undefined || this.item.isXoa == false) {
        this.item.soContainer += obj.soContainer;
        this.item.soKien += obj.soKien;
      }
    });
  }

}
