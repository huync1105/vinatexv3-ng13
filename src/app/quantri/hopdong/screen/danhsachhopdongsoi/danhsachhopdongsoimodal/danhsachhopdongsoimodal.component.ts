import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhsachhopdongsoimodal',
  templateUrl: './danhsachhopdongsoimodal.component.html',
  styleUrls: ['./danhsachhopdongsoimodal.component.css']
})
export class DanhsachhopdongsoimodalComponent implements OnInit {
  title: string = "Hợp đồng sợi"
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = [];
  userInfo: any;
  newItem: any = {};
  isXo: boolean = true
  isSoi: boolean = true
  lang: any = vn;
  isBongXo: boolean = true
  listdmMatHang: any = [];
  filter: any = {
    keyWord: "",
  };
  opt:string='';
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }

  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
      this._servicesSanXuat.GetListdmItemByHangHoa(1).subscribe((res: any) => {
        this.listdmMatHang = res;
      });
      this.GetQuyTrinh(this.item.hopDong.id);
  }
  
  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.data
      this.item.hopDong.idTrangThai = res1.data.hopDong.idTrangThai;
      this.item.hopDong.id = res1.data.hopDong.id;
      this.item.hopDong.ngayKy = UnixToDate(this.item.hopDong.ngayKyUnix);
      this.item.hopDong.ngayHieuLuc = UnixToDate(this.item.hopDong.ngayHieuLucUnix);
      this.item.hopDong.ngayGiaoHang = UnixToDate(this.item.hopDong.ngayGiaoHangUnix);
      if (this.item.listHangHoa.length > 0) {
          this.item.hopDong.thanhTien = this.item.listHangHoa.reduce((total, ele) => {
              return total + ((ele.soLuong || 0) * (ele.donGia || 0)* (1 + (ele.thueGTGT || 0)/100))}, 0)
      }
      if (this.item.hopDong.isBenBanChiu) {
        this.item.hopDong.BenBanChiu = this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.BenBanChiu;
      }
      else {
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenBanChiu = !this.item.hopDong.BenMuaChiu;
      }
      if (this.item.listDieuKhoanThanhToan.length > 0) {
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.ngayThanhToan = UnixToDate(element.ngayThanhToanUnix);
          if (element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc = [];
        });
      }
      if (this.item.listBaoLanh.length > 0) {
        this.item.listBaoLanh.forEach(element => {
          element.hieuLucBaoLanh = UnixToDate(element.hieuLucBaoLanhUnix);
        });
      }
      if (validVariable(this.item.hopDong.idHopDong)) {
        this.item.hopDong.isPhuLuc = true;
      }
    })
  }
}
