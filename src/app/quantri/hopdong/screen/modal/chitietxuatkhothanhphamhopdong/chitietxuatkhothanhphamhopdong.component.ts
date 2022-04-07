import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatthanhphammathangmodalComponent } from '../xuatthanhphammathangmodal/xuatthanhphammathangmodal.component';


@Component({
  selector: 'app-chitietxuatkhothanhphamhopdong',
  templateUrl: './chitietxuatkhothanhphamhopdong.component.html',
  styleUrls: ['./chitietxuatkhothanhphamhopdong.component.css']
})
export class ChitietxuatkhothanhphamhopdongComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "Id": "",
    "idKeHoachXuatNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKho: any = [];
  listloaisoi: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  TongKhoiLuong = 0;
  TongThanhTien = 0;
  listdmKhachHang: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.GetListdmLoaiSoi();
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
          obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);

        });
      }
      this.TinhTongKhoiLuong();
      this.TinhTongThanhTien();
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListKho();
    this.getListdmKhachHang();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetListdmLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  checkValidate(){
    if(this.item.listItem.length > 0 && this.item.listItem.length !== undefined){
      for(let i = 0; i < this.item.listItem.length ; i ++){
        if(this.item.listItem[i].IdLoHang !== null && this.item.listItem[i].IdLoHang !== undefined){
          if(this.item.listItem[i].IddmQuyCachDongGoi === null || this.item.listItem[i].IddmQuyCachDongGoi === undefined){
            return false;
          }
        }
      }
    }
    return true;
  }
  ChuyenTiep() {
    if(!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else if (this.item.IddmKhachHang === null || this.item.IddmKhachHang === undefined) {
      this.toastr.error("Bạn chưa chọn khách hàng!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuXuatThanhPham().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.PhieuXuatThanhPham().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuXuatThanhPham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if(!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else if (this.item.IddmKhachHang === null || this.item.IddmKhachHang === undefined) {
      this.toastr.error("Bạn chưa chọn khách hàng!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuXuatThanhPham().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
              this.item.Ngay = UnixToDate(this.item.NgayUnix);
            }
            this.KiemTraButtonModal();
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
      this._services.PhieuXuatThanhPham().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    let data = {
      CurrentPage: 0,
      Loai: 11,
    }
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmKhachHang() {
    this._services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listdmKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
 
  Onclose() {
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    var data = {
      Ngay: DateToUnix(this.item.Ngay),
      IddmKho: this.item.IddmKho,
      // IddmPhanXuong: this.item.IddmPhanXuong,
    }
    let listItem : any = []
    if(this.item.listItem !== undefined && this.item.listItem !== null){
      listItem = this.item.listItem.filter((e: any) => e.isXoa !== true);
    }
    this._services.GetlistdmMatHangXuatThanhPham(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatthanhphammathangmodalComponent, {
        size: 'xl',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = listItem;
      modalRef.result.then((data) => {
        if( this.item.listItem !== undefined &&  this.item.listItem.length > 0){
          this.item.listItem.forEach(element => {
            element.isXoa = true;
          });
        }
        
        let listdatapush = [];
        data.data.forEach(element => {
          let datapush: any = {
            Ten: element.Ten,
            IddmItem: element.IddmItem,
            TenLoHang: element.TenLoHang,
            TonSoLuong: element.SoLuong,
            KhoiLuong: element.TrongLuong,
            IdLoHang: element.IdLoHang,
            IddmQuyCachDongGoi: element.IddmQuyCachDongGoi,
            TendmQuyCachDongGoi: element.TendmQuyCachDongGoi,
          };
          var isCheck : any = false
          if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
            for(let i =0 ; i < this.item.listItem.length; i++){
              if(this.item.listItem[i].IddmItem == element.IddmItem && this.item.listItem[i].IdLoHang == element.IdLoHang && this.item.listItem[i].IddmQuyCachDongGoi == element.IddmQuyCachDongGoi)
              {
                this.item.listItem[i].isXoa = false;
                this.item.listItem[i].Ten = element.Ten;
                this.item.listItem[i].IddmItem = element.IddmItem;
                this.item.listItem[i].TenLoHang = element.TenLoHang;
                this.item.listItem[i].TonSoLuong = element.SoLuong;
                this.item.listItem[i].KhoiLuong = element.TrongLuong;
                this.item.listItem[i].IdLoHang = element.IdLoHang;
                this.item.listItem[i].IddmQuyCachDongGoi = element.IddmQuyCachDongGoi;
                this.item.listItem[i].TendmQuyCachDongGoi = element.TendmQuyCachDongGoi;
                isCheck = true;
                break;
              }
            }
            if(isCheck === false)
            listdatapush.push(datapush);
          }
          else
            listdatapush.push(datapush);
        });
        if(this.item.listItem !== undefined && this.item.listItem !== null){
          this.item.listItem =this.item.listItem.concat(listdatapush);
        }
        else{
          this.item.listItem = listdatapush
        }
      }, (reason) => {
        // không
      });
    })
  }
  TinhTongKhoiLuong(){ 
    this.TongKhoiLuong = 0;
    this.TongThanhTien = 0;
    this.item.listItem.forEach(element => {
      this.TongKhoiLuong += (element.KhoiLuong ?? 0) * (element.SoLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0);
      this.TongThanhTien += (element.DonGia ?? 0) * ((element.SoLuong ?? 0) * (element.KhoiLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0));
    });
  }
  TinhTongThanhTien(){
    this.TongThanhTien = 0;
    this.item.listItem.forEach(element => {
      let thanhTien = (element.DonGia ?? 0) * ((element.SoLuong ?? 0) * (element.KhoiLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0));
      this.TongThanhTien = this.TongThanhTien + thanhTien;
    });
  }
  ExportExcel(){
    if(validVariable(this.item.Id)){
      this._services.BaoCao().ExportPhieuXuatKhoThanhPham_Bieu6({IdPhieuXuatKho:this.item.Id}).subscribe((res:any)=>{
        if (res) {
          if (validVariable(res.State)) {
            this.toastr.error(res.message);
          } else {
            this._services.download(res.TenFile);
          }
        }
      })
    }else{
      this.toastr.error('Vui lòng ghi lại phiếu sau đó xuất!')
    }
  }

}
