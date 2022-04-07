import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth.service';
import { vn } from 'src/app/services/const';
import { UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhsachhopdongvattuphumodal',
  templateUrl: './danhsachhopdongvattuphumodal.component.html',
  styleUrls: ['./danhsachhopdongvattuphumodal.component.css']
})
export class DanhsachhopdongvattuphumodalComponent implements OnInit {
  title: string = "Hợp đồng vật tư phụ"
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = []
  userInfo: any;
  newItem: any = {};
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };
isVatTuPhu : any= true;
isSoi : any = true;
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
opt:any='';
  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
      this.GetQuyTrinh(this.item.hopDong.id);
  }

  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.data
      this.item.hopDong.idTrangThai = res1.data.hopDong.idTrangThai;
      this.item.hopDong.id = res1.data.hopDong.id;
      this.item.hopDong.ngayKy = UnixToDate(this.item.hopDong.ngayKyUnix);
      this.item.hopDong.ngayHieuLuc = UnixToDate(this.item.hopDong.ngayHieuLucUnix );
      this.item.hopDong.ngayGiaoHang = UnixToDate(this.item.hopDong.ngayGiaoHangUnix);
      if(this.item.listHangHoa.length > 0){
          this.item.listHangHoa.forEach(element => {
              this.item.hopDong.thanhTien = (this.item.hopDong.thanhTien || 0) + ((element.soLuong || 0)*(element.donGia || 0))
          });
      }
      if (this.item.hopDong.isBenBanChiu) {
        this.item.hopDong.BenBanChiu = this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.BenBanChiu;
      }
      else {
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenBanChiu = !this.item.hopDong.BenMuaChiu;
      }
      if(this.item.listDieuKhoanThanhToan.length > 0){
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.ngayThanhToan = UnixToDate(element.ngayThanhToanUnix);
          if(element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc  = [];
        });
      }
      if(this.item.listBaoLanh.length > 0){
        this.item.listBaoLanh.forEach(element => {
          element.hieuLucBaoLanh = UnixToDate(element.hieuLucBaoLanhUnix);
        });
      }
      if(validVariable(this.item.hopDong.idHopDong))
      {
        this.item.hopDong.isPhuLuc = true;
      }
    })
  }
}
