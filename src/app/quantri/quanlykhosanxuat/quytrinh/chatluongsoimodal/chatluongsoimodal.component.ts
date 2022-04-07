import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { maskOption, vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { ChatluongsoimathangmodalComponent } from '../chatluongsoimathangmodal/chatluongsoimathangmodal.component';

@Component({
  selector: 'app-chatluongsoimodal',
  templateUrl: './chatluongsoimodal.component.html',
  styleUrls: ['./chatluongsoimodal.component.css']
})
export class ChatluongsoimodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  MO:any = maskOption;
  listdmKho: any = [];
  editTableItem: any = {};
  newTableItem: any = {};
  filter: any = {};
  listdmPhanXuong: any = [];
  lang: any = vn;
  lstSanPham: any = [];
  userInfo: any ;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, 
    private _auth: AuthenticationService,
    public _modal: NgbModal, ) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.getDanhSachChiTieuChatLuong();
    }
    else{
    this.userInfo = this._auth.currentUserValue;
    this.KiemTraButtonModal();
    }
    if (this.item.NgayKiemTraUnix !== null && this.item.NgayKiemTraUnix !== undefined) {
      this.item.NgayKiemTra = UnixToDate(this.item.NgayKiemTraUnix);
    }
    if (this.item.TuNgayUnix !== null && this.item.TuNgayUnix !== undefined) {
      this.item.TuNgay = UnixToDate(this.item.TuNgayUnix);
    }
    if (this.item.DenNgayUnix !== null && this.item.DenNgayUnix !== undefined) {
      this.item.DenNgay = UnixToDate(this.item.DenNgayUnix);
    }
    this.getListdmPhanXuong();
    this.initTabIndex();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if(this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
    if (this.item.TuNgay !== null && this.item.TuNgay !== undefined)
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    if (this.item.DenNgay !== null && this.item.DenNgay !== undefined)
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    this.services.PhieuChatLuongSoi().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this.services.PhieuChatLuongSoi().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayKiemTra === null || this.item.NgayKiemTra === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else if (this.item.TuNgay === null || this.item.TuNgay === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else if (this.item.DenNgay === null || this.item.DenNgay === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else if (this.item.IddmPhanXuong === null || this.item.IddmPhanXuong === undefined)
      this.toastr.error("Bạn chưa chọn phân xưởng");
    else {
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);

      this.services.PhieuChatLuongSoi().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
            this.initTabIndex()
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
      this.services.PhieuChatLuongSoi().Delete(this.item.Id).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.toastr.success(res.message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  GetMatHangTheoKho() {
    let data = {
      IddmPhanXuong: this.item.IddmPhanXuong,
      Ngay: DateToUnix(this.item.NgayKiemTra),
      TuNgay: DateToUnix(this.item.TuNgay) ,
      DenNgay: DateToUnix(this.item.DenNgay),
    };
    this.services.GetlistdmMatHangKiemTraChatLuong(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(ChatluongsoimathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      // modalRef.componentInstance.

      modalRef.result.then((data) => {
        this.lstSanPham = data.data;
        this.item.lstDanhMuc.forEach(element => {
          let chatluongpush = [];
          console.log(this.lstSanPham)
          this.lstSanPham.forEach(danhmuc => {
            let datapush: any = {
              IddmChiTieu: element.Id,
              IddmItem: danhmuc.IddmItem,
              IdLoHang: danhmuc.IdLoHang,
              ChiTieuLyThuyet:danhmuc.lstChiTieuTieuChuan.find(chitieumathang=>chitieumathang.idChiTieu===element.Id)?.TieuChuan
            }
            for (let i = 0; i < element.lstChatLuongSanPham.length; i++) {
              if (element.lstChatLuongSanPham[i].IddmItem === danhmuc.Id) {
                datapush.ChiTieuThucTe = element.lstChatLuongSanPham[i].ChiTieuThucTe;
                // datapush.IdLoHang = element.lstChatLuongSanPham[i].IdLoHang;
                break;
              }
            }
            chatluongpush.push(datapush);
          });
          element.lstChatLuongSanPham = chatluongpush;
        });
        //
        let sanphampush = [];
        this.lstSanPham.forEach(danhmuc => {
          let datapush: any = {
            IddmItem: danhmuc.IddmItem,
            IdLoHang: danhmuc.IdLoHang,
            Ten: danhmuc.Ten,
          }
          sanphampush.push(datapush);
        });
        this.item.lstSanPham = sanphampush;
        this.initTabIndex();
      }, (reason) => {
        // không
      });
    })
  }
  getListKho() {
    var data: any = {}
    data.Loai = 10;
    data.CurrentPage = 0;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getDanhSachChiTieuChatLuong() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    }
    this.services.GetDanhSachChiTieuChatLuong(data).subscribe((res: any) => {
      this.item.lstDanhMuc = res;
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  initTabIndex(){
    console.table(this.item.lstDanhMuc.map(ele=>{
      return {
          Ten:ele.Ten,
          Ma:ele.Ma
      }
    }));
    for(let i = 0;i<this.item.lstDanhMuc.length;i++){
      for(let j=0;j<this.item.lstDanhMuc[i].lstChatLuongSanPham.length;j++){
        this.item.lstDanhMuc[i].lstChatLuongSanPham[j].tabIndex = i+1+(j*(this.item.lstDanhMuc.length));
        if(this.item.lstDanhMuc[i].lstChatLuongSanPham[j].ChiTieuThucTe===0){
          this.item.lstDanhMuc[i].lstChatLuongSanPham[j].ChiTieuThucTe = null;
        }
      }
    }
  }
  move(event, index) {
    let string = 'ArrowRightArrowUpArrowDownArrowLeftEnter'
    if (string.includes(event.key)) {
      event.preventDefault()
      let listInput = document.querySelectorAll('.dat09focus');
      let listTabIndex = [];
      listInput.forEach(ele => listTabIndex.push(ele.getAttribute('tabindex')));
      if (event.key === 'ArrowRight') {
        let nextFocusIndex = `${this.item.lstDanhMuc.length + index}`;
        console.log(nextFocusIndex);
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        console.log(realIndexInDom);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
      if (event.key === 'ArrowLeft') {
        let nextFocusIndex = `${index - this.item.lstDanhMuc.length}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        (listInput[realIndexInDom] as HTMLElement)?.focus();
      }
      if (event.key === 'ArrowDown' || event.key === 'Enter' ) {
        let nextFocusIndex = `${index + 1}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        let domObject:HTMLElement = (listInput[realIndexInDom] as HTMLElement);
        if(domObject.hasAttribute('disabled')){
          nextFocusIndex = `${index + 2}`;
          realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
          domObject = (listInput[realIndexInDom] as HTMLElement);
        }
        domObject?.focus();
      }
      if (event.key === 'ArrowUp') {
        let nextFocusIndex = `${index - 1}`;
        let realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
        let domObject:HTMLElement = (listInput[realIndexInDom] as HTMLElement);
        if(domObject.hasAttribute('disabled')){
          nextFocusIndex = `${index - 2}`;
          realIndexInDom = listTabIndex.findIndex(ele => ele === nextFocusIndex);
          domObject = (listInput[realIndexInDom] as HTMLElement);
        }
        domObject?.focus();
      }
    }
  }
  rebind(e,item,indexChild,Ma){
    if(e!==undefined){
      item.ChiTieuThucTe = parseFloat(e);
    }
    let arr = 'Thin50Thick50Neps200';
    if(arr.includes(Ma)){
      let Thin = this.item.lstDanhMuc.find(ele=>ele.Ma ==='Thin50')?.lstChatLuongSanPham[indexChild].ChiTieuThucTe||0;
      let Thick = this.item.lstDanhMuc.find(ele=>ele.Ma ==='Thick50')?.lstChatLuongSanPham[indexChild].ChiTieuThucTe||0;
      let Neps = this.item.lstDanhMuc.find(ele=>ele.Ma ==='Neps200')?.lstChatLuongSanPham[indexChild].ChiTieuThucTe||0;
      this.item.lstDanhMuc.find(ele=>ele.Ma ==='IPI').lstChatLuongSanPham[indexChild].ChiTieuThucTe = Thin + Thick + Neps;
    }
  }
}
