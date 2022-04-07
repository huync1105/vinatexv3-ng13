import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChondanhmucthutucthanhtoanmodalComponent } from '../../quyettoanhopdong/chondanhmucthutucthanhtoanmodal/chondanhmucthutucthanhtoanmodal.component';

@Component({
  selector: 'app-thanhtoanvattuphumodal',
  templateUrl: './thanhtoanvattuphumodal.component.html',
  styleUrls: ['./thanhtoanvattuphumodal.component.css']
})
export class ThanhtoanvattuphumodalComponent implements OnInit {

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
  listDieuKhoanThanhToan: any = [];
  listDieuKhoanThanhToanFull: any = [];
  listThanhToanInvoice: any = [];
  listThanhToanInvoiceFull: any = [];
  listIdThanhToanInvoice: any = [];
  IdDuAn: any = 0;
  listLoaiThanhToan: any = [{ label: 'Thanh toán theo kế hoạch thanh toán', value: 1 },
  { label: 'Thanh toán theo mặt hàng', value: 2 }];
  userInfo: any;

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService, private _servicesdmHopDong: DanhMucHopDongService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        listFileDinhKem: [],
        listThanhToanMatHang: [],
        listThanhToanThuHoi: [],
        listThanhToanInvoice: [],
        idDuAn: this.IdDuAn,
        loai: 23,
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      this.getQuyTrinh(this.item.id);
    }
    this.getListHopDong();

  }
  getListHopDong() {
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(this.item.idDuAn, 23).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
    })
  }

  getListDieuKhoanThanhToan() {
    if (this.item.loaiThanhToan === 1) {
      this._hopdong.QuyTrinhHopDong().getListDieuKhoan(this.item.idHopDong).subscribe((res: any) => {
        this.listDieuKhoanThanhToanFull = res.data;
        this.listDieuKhoanThanhToan = mapArrayForDropDown(res.data, 'noiDung', 'id');
        var data = this.listDieuKhoanThanhToanFull.filter(e=> e.id == this.item.idThanhToanDieuKhoan);
        if(data !== undefined){
          this.item.giaTriThanhToanHopDong = data[0].giaTri || 0;
        }
      })
      this.item.listThanhToanMatHang = []
      this.item.listThanhToanDotGiaoNhan = []
      this.listIdThanhToanInvoice = []
    }
    else if (this.item.loaiThanhToan === 2) {
      this._hopdong.QuyTrinhThanhToan().getListInvoice(this.item.idHopDong).subscribe((res: any) => {
        this.listThanhToanInvoice = mapArrayForDropDown(res.data, 'soQuyTrinh', 'ma');
        this.listThanhToanInvoiceFull = res.data;
      })
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    let isChuaNopDu: any = false;
    for (let i = 0; i < this.item.listHoSoDinhKem.length; i++) {
      if (this.item.listHoSoDinhKem[i].isNopDu !== true) {
        isChuaNopDu = true;
        break;
      }
    }
    if (isChuaNopDu === true) {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.message = "Bạn chưa nộp đủ tài liệu bạn chắc chắn muốn lưu quy trình này chứ?"
      modalRef.result.then(res => {
        if (this.CheckTruocKhiLuu()) {
          if (this.item.ngayThanhToan !== null && this.item.ngayThanhToan !== undefined)
            this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
          this._hopdong.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
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
      }).catch()
    }
    else{
      if(this.CheckTruocKhiLuu()){
        if (this.item.ngayThanhToan !== null && this.item.ngayThanhToan !== undefined)
          this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
        this._hopdong.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
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
  }

  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhThanhToan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if (this.CheckTruocKhiLuu()) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
      this._hopdong.QuyTrinhThanhToan().Set(this.item).subscribe((res: any) => {
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
      this._hopdong.QuyTrinhThanhToan().Delete(this.item.id).subscribe((res: any) => {
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
    this._hopdong.QuyTrinhThanhToan().Get(Id).subscribe((res1: any) => {
      this.item = res1.data;
      this.listIdThanhToanInvoice = []
      if (this.item.ngayThanhToanUnix !== null && this.item.ngayThanhToanUnix !== undefined) {
        this.item.ngayThanhToan = UnixToDate(this.item.ngayThanhToanUnix);
      }
      if (this.item.listThanhToanDotGiaoNhan.length > 0) {
        this.item.listThanhToanDotGiaoNhan.forEach(element => {
          this.listIdThanhToanInvoice.push(element.ma)
        });
      }
      this.KiemTraButtonModal();
      this.getListDieuKhoanThanhToan();
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
  }

  Onclose() {
    this.activeModal.close();
  }
  CheckTruocKhiLuu() {
    if (this.newTableItem.Ten != undefined || this.newTableItem.SoCan != undefined || this.newTableItem.SoKien != undefined || this.newTableItem.IddmViTri != undefined) {
      this.add();
    }
    if (this.item.idHopDong === null || this.item.idHopDong === undefined) {
      this.toastr.error("Bạn chưa chọn hợp đồng!");
      return false;
    }
    else if (this.item.ngayThanhToan === null || this.item.ngayThanhToan === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày!");
      return false;
    }
    return true;
  }
  getListItem() {
    this.item.listThanhToanMatHang = [];
    this.item.listThanhToanDotGiaoNhan = [];
    this.listIdThanhToanInvoice.forEach(element => {
      let item: any = this.listThanhToanInvoiceFull.filter(e => e.ma == element)
      if (item !== undefined) {
        let itempush: any = {
          ma: element,
        }
        this.item.listThanhToanDotGiaoNhan.push(itempush);
      }
    });
    let data: any = deepCopy(this.listIdThanhToanInvoice);
    data.unshift(this.item.idHopDong);
    this._hopdong.QuyTrinhThanhToan().GetListInvoiceHopDongChiTiet(data).subscribe((res: any) => {
      res.data.forEach(element => {
        let itempush: any = {
          id: '',
          ma: element.soInvoice,
          soContainer: element.soContainer,
          tongSoKien: element.tongSoKien,
          soLuongDaThanhToan: element.soLuongDaThanhToan,
          tongKhoiLuong: element.tongKhoiLuong,
          donGia: element.donGia,
        }
        this.item.listThanhToanMatHang.push(itempush);
      });
    })
  }
  layGiaTri() {
    var data = this.listDieuKhoanThanhToanFull.filter(e => e.id == this.item.idThanhToanDieuKhoan);
    if (data !== undefined) {
      this.item.giaTriThanhToan = data[0].giaTri || 0;
      this.item.giaTriThanhToanHopDong = data[0].giaTri || 0;
    }
  }
  TinhThanhTien() {
    this.item.giaTriThanhToan = 0;
    if (this.item.listThanhToanMatHang === null || this.item.listThanhToanMatHang === undefined)
      this.item.listThanhToanMatHang = []
    this.item.listThanhToanMatHang.forEach(element => {
      this.item.giaTriThanhToan += (element.soLuong || 0) * (element.donGia || 0);
    });
  }
  chonDanhMuc() {
    this._servicesdmHopDong.DanhMucThuTucThanhToan().GetListAll().subscribe((res1: any) => {
      let modalRef = this._modal.open(ChondanhmucthutucthanhtoanmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.componentInstance.listHangHoa = this.item.listHoSoDinhKem || [];
      modalRef.result.then(res => {
        this.item.listHoSoDinhKem = res;
      }).catch(er => { console.log(er) });
    })
  }
}
