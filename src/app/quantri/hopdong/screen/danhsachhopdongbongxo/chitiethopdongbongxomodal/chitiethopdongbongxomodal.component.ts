import { AuthenticationService } from "./../../../../../services/auth.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
  validVariable,
} from "src/app/services/globalfunction";

@Component({
  selector: "app-chitiethopdongbongxomodal",
  templateUrl: "./chitiethopdongbongxomodal.component.html",
  styleUrls: ["./chitiethopdongbongxomodal.component.css"],
})
export class ChitiethopdongbongxomodalComponent implements OnInit {
  title: string = "Hợp đồng bông/xơ"
  item: any = {};
  @Input() res1: any = [];
  hopDong: any = {};
  listLoaiMatHang: any = []
  listLoaiMatHang_ref: any = []
  listDieuKhoanThanhToan: any = [];
  userInfo: any;
  newItem: any = {};
  isBong: boolean = true
  filter: any = {
    keyWord: "",
  };
  lang: any = vn;

  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  };
Id:any = "";
  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetQuyTrinh();
    this._servicesSanXuat.GetListdmLoaiBongForHopDong(this.item.hopDong.loai || 0).subscribe((res: any) => {
      this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
      this.listLoaiMatHang_ref = res;
    })
  }
  GetQuyTrinh() {
    this._service.QuyTrinhHopDong().Get(this.Id).subscribe((res1: any) => {
      this.item = res1.data
      this.item.hopDong.idTrangThai = res1.data.hopDong.idTrangThai;
      this.item.hopDong.id = res1.data.hopDong.id;
      this.item.hopDong.ngayKy = UnixToDate(this.item.hopDong.ngayKyUnix);
      this.item.hopDong.ngayHieuLuc = UnixToDate(this.item.hopDong.ngayHieuLucUnix );
      this.item.hopDong.ngayGiaoHang = UnixToDate(this.item.hopDong.ngayGiaoHangUnix);
      this.item.hopDong.ngayDuKienVeKho = UnixToDate(this.item.hopDong.ngayDuKienVeKhoUnix);
      if(this.item.listHangHoa.length > 0){
        this.item.listHangHoa[0].DonGiaThanhToan =  (this.item.listHangHoa[0].donGia || 0) * 1.1;
        this.item.listHangHoa[0].giaTriHopDongMatHang =  (this.item.listHangHoa[0].DonGiaThanhToan || 0) * (this.item.listHangHoa[0].soLuong || 0);
      }
        this.item.hopDong.BenBanChiu = this.item.hopDong.isBenBanChiu;
        this.item.hopDong.BenMuaChiu = !this.item.hopDong.BenBanChiu;
      
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
