import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HopdongchonhanghoagiaokehoachmodalComponent } from "../hopdongchonhanghoagiaokehoachmodal/hopdongchonhanghoagiaokehoachmodal.component";
import { HopdongchonquycachdonggoimodalComponent } from "../hopdongchonquycachdonggoimodal/hopdongchonquycachdonggoimodal.component";
import { CalcmodalComponent } from "src/app/quantri/modal/calcmodal/calcmodal.component";
@Component({
  selector: 'app-giaokehoachsanxuatmodal',
  templateUrl: './giaokehoachsanxuatmodal.component.html',
  styleUrls: ['./giaokehoachsanxuatmodal.component.css']
})
export class GiaokehoachsanxuatmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {Ghi: true,
    Xoa: false,
    ChuyenTiep: false,
    KhongDuyet: false,};
  opt: any = "";
  listHopDong: any = [];
  listPhanXuong: any = []; listMatHang: any = [];
  item: any = {};
  filter: any = {};
  listDonVi: any = [];
  listMucDich: any = [
    { value: 0, label: 'Xuất khẩu' },
    { value: 1, label: 'Nội địa' },
  ]
  listCaSanXuat:any =[];
  listQuyCachDongGoi: any = [];
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    public _toastr: ToastrService,
    public _modal: NgbModal,
    private _services: HopDongService,
    private _servicesDungChung: SanXuatService
  ) {}

  ngOnInit(): void {
    this.getListCaSanXuat();
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    } 
    else {
      this.KiemTraButtonModal();
    }
    this.item.ngayBatDau = UnixToDate(this.item.ngayBatDauUnix);
    this.item.ngayKetThuc = UnixToDate(this.item.ngayKetThucUnix);
    this._servicesDungChung.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      if (validVariable(this.item.idDuAn)) {
        this.getPhanXuong(this.item.idDuAn, true);
      }
    });
    this._servicesDungChung.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
  }
  getListCaSanXuat(){
    this._servicesDungChung.GetListOptdmCaSanXuat().subscribe((res:any)=>{
      this.listCaSanXuat = res;    
    })
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!update) {
      this.item.iddmPhanXuong = null;
    }
    this._servicesDungChung.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    });
    this.getListMatHang();
  }
  KiemTraButtonModal() {
    this._servicesDungChung.KiemTraButton(this.item.id || "", this.item.idTrangThai || "").subscribe((res: any) => {
        this.checkbutton = res;
      });
  }
  ChuyenDuyet() {
    if(this.checkTruocKhiLuu()){

    this._services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }
  }
  KhongDuyet() {
    if(this.checkTruocKhiLuu()){

    this._services.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }
  }

  GetNextSoQuyTrinh() {
    this._services.GiaoKeHoachSanXuat().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if(this.checkTruocKhiLuu()){
      this._services.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.message);
            this.opt = "edit";
            this.item.id = res.data.id;
            this.getQuyTrinh();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }
    
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        console.log(res);
        this._services
          .GiaoKeHoachSanXuat()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this._toastr.success(res.message);
              this.activeModal.close();
            } else {
              this._toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }

  add() {
    // if (this.item.listItem == undefined || this.item.listItem == null)
    //   this.item.listItem = [];
    // this.item.listItem.push(this.newTableItem);
    // this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    // if (item.id === "" || item.id === null || item.id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    // }
    if (this.item.listItem != undefined && this.item.listItem.length > 0) {
      this.item.tongKhoiLuong = 0;
      let KLxChiSo: any = 0;
      this.item.listItem.forEach(obj => {
          this.item.tongKhoiLuong += (obj.khoiLuong || 0);
          KLxChiSo += (obj.khoiLuong || 0) * (obj.ne || 0);
      });
      this.item.chiSoBQ = Math.ceil((KLxChiSo / this.item.tongKhoiLuong) * 100) / 100;
      this.item.ne30 = this.item.tongKhoiLuong * this.item.chiSoBQ / 30 / this.item.tongSoCa;
    }
    else{
      this.item.tongKhoiLuong = 0;
      this.item.chiSoBQ = 0;
      this.item.ne30 = 0;
    }
  }
  chonHangHoa() {
    let modalRef = this._modal.open(HopdongchonhanghoagiaokehoachmodalComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = this.item.listItem;
    modalRef.componentInstance.IdQuyTrinh = this.item.id;
    modalRef.componentInstance.opt = "";    
    modalRef.result.then(res => {
      if (res.length > 0) {
        this.item.listItem = res
        // res.forEach(obj => this.item.listItem.push(obj))
      }
    }).catch(er => {
      console.log(er);
    })
  }
  validDenNgay(mathang, e) {
    if (validVariable(mathang.ngayBatDau)) {
      if ((DateToUnix(e) - DateToUnix(mathang.ngayBatDau)) < 0) {
        this._toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.ngayKetThuc = null;
        }, 500)
      } else {
        this.TinhSoCa();
      }
    } else {
      setTimeout(() => {
        mathang.ngayKetThuc = null;
      }, 500)
      this._toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
  TinhSoCa() {
    console.log(this.item.ngayBatDau, this.item.ngayKetThuc);
    if (validVariable(this.item.ngayBatDau) && validVariable(this.item.ngayKetThuc)) {
      this.item.ngayBatDauUnix = DateToUnix(this.item.ngayBatDau);
      this.item.ngayKetThucUnix = DateToUnix(this.item.ngayKetThuc);
      if (!validVariable(this.item.tongSoCa) || this.item.tongSoCa === 0) {
        this.item.tongSoCa = ((this.item.ngayKetThucUnix - this.item.ngayBatDauUnix) / (24 * 3600) + 1) * this.listCaSanXuat.length;
      }
    }
  }
  getListMatHang(){
    this._services.GiaoKeHoachSanXuat().GetListMatHangGiaoKeHoachSanXuat(this.item.idDuAn || '').subscribe((res:any) => {
      this.listMatHang = [];
      res.data.forEach(obj=>{
        let data: any = {}
        data.idHopDong = obj.idHopDong;
        data.ne = obj.ne;
        data.doSan = obj.doSan;
        data.ma = obj.ma;
        data.tendmLoaiSoi = obj.tendmLoaiSoi;
        data.ten = obj.ten;
        data.daGiao = obj.daGiao;
        data.ghiChu = obj.ghiChu;
        data.soTenHopDong = obj.soTenHopDong;
        data.iddmItem = obj.iddmItem;
        data.khoiLuongHopDong = obj.khoiLuongHopDong;
        data.khoiLuongDaHoanThanh = obj.khoiLuongDaHoanThanh;
        this.listMatHang.push(data);
      });
    })
  }
  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(HopdongchonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listQuyCachDongGoi || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.id;
    modalRef.result.then(res => {
      item.isEdited = true;
      item.listQuyCachDongGoi = res.listItem;
    }).catch(er => {
      console.log(er);
    })
  }
  changeKeHoachSanXuat(item) {
    if (this.item.listItem != undefined && this.item.listItem.length > 0) {
      this.item.tongKhoiLuong = 0;
      let KLxChiSo: any = 0;
      this.item.listItem.forEach(obj => {
        if (!obj.isXoa) {
          this.item.tongKhoiLuong += (obj.khoiLuong || 0);
          KLxChiSo += (obj.khoiLuong || 0) * (obj.ne || 0);
        }
      });
      if (item.value < this.item.tongKhoiLuong) {
        this._toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      }
      this.item.chiSoBQ = Math.ceil((KLxChiSo / this.item.tongKhoiLuong) * 100) / 100;
      this.item.ne30 = this.item.tongKhoiLuong * this.item.chiSoBQ / 30 / this.item.tongSoCa;
    }
    if(validVariable(item.id)){
      item.isEdited = true;
    }
  }
  change(index) {
    if(validVariable(this.item.id)){
      this.item.listItem[index].isEdited = true;
    }
  }
  getQuyTrinh() {
    this._services.GiaoKeHoachSanXuat().Get(this.item.id).subscribe((res: any) => {
      this.item = res;
      this.item.ngayBatDau = UnixToDate(this.item.ngayBatDauUnix);
      this.item.ngayKetThuc = UnixToDate(this.item.ngayKetThucUnix);
        if (!validVariable(this.item.listItem)) {
          this.item.listItem = [];
        }
        this.item.listItem.filter(objlistItem => {
            objlistItem.listQuyCachDongGoi.filter(async objlistItem2 => {
              objlistItem2.objQuyCachDongGoi = await this.listQuyCachDongGoi.filter(obj => objlistItem2.iddmQuyCachDongGoi == obj.value)[0];
            });          
          });
      this.KiemTraButtonModal();
    } 
  )}
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
    })
  }
  checkTruocKhiLuu(){
    if(!validVariable(this.item.noiDung)){
      this._toastr.error("Bạn chưa nhập nội dung");
      return false;
    }
    else if(!validVariable(this.item.idDuAn)){
      this._toastr.error("Bạn chưa chọn dự án");
      return false;
    }
    else if(!validVariable(this.item.iddmPhanXuong)){
      this._toastr.error("Bạn chưa chọn phân xưởng");
      return false;
    }
    else if(!validVariable(this.item.ngayBatDau)){
      this._toastr.error("Bạn chưa ngày bắt đầu");
      return false;
    }
    else if(!validVariable(this.item.ngayKetThuc)){
      this._toastr.error("Bạn chưa ngày kết thúc");
      return false;
    }
    else if(!validVariable(this.item.tongSoCa)){
      this._toastr.error("Bạn chưa nhập tổng số ca");
      return false;
    }
    return true;
  }
}
