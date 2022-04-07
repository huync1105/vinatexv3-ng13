import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { ChonhanghoamodalComponent } from 'src/app/quantri/quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { ChonquycachdonggoimodalComponent } from 'src/app/quantri/quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { vn } from 'src/app/services/const';
import { DateToDatePicker, DateToUnix, deepCopy, mapArrayForDropDown, merge, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
// import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';
// import { ChonquycachdonggoimodalComponent } from '../../modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';

@Component({
  selector: 'app-kehoachsanxuatmodal',
  templateUrl: './kehoachsanxuatmodal.component.html',
  styleUrls: ['./kehoachsanxuatmodal.component.css']
})
export class KehoachsanxuatmodalComponent implements OnInit {

  opt: any = ''
  item: any = {
    Id: ''
    // SoQuyTrinh: 'PKK_0000_001',
    // listKienHang: []
  };
  lang: any = vn;
  filter: any = {
    KeyWord: ''
  };
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];
  listMucDich: any = [
    { value: 0, label: 'Xuất khẩu' },
    { value: 1, label: 'Nội địa' },
  ]
  listPhanXuong: any = []; listMatHang: any = [];
  listQuyCachDongGoi: any = [];
  listKeHoachForCopy: any = [];
  GiaoKeHoachForCopy: any = {};
  canCopy: boolean = false;
  canExport:boolean = false;
  yearRange: string = `${((new Date()).getFullYear())}:${((new Date()).getFullYear()) + 5}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService,private HopDongService:HopDongService) {

  }

  ngOnInit(): void {
    this.item.idDuAn = this._store.getCurrent();
    this.GetFormOptions()
    this.KiemTraButtonModal();
    // if (this._store.getCurrent()) {
     
    // }
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetListGiaoKeHoachForCopy();     
    }
  }
  ngDoCheck(): void {
    this.Calculate();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
      if(validVariable(this.item.Id)){
        this.canExport = true;
      }else{
        this.canExport = false;
      }
    })
  }
  GetListGiaoKeHoachForCopy() {
    let data = {
      PageSize: 25,
      CurrentPage: 0,
      TabTrangThai: 3,
      sFilter: null,
      TuNgay: null,
      DenNgay: null,
      Ma: "",
      Ten: "",
    }
    this.services.GiaoKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      res.forEach(kehoach => {
        kehoach.HienThi = `${kehoach.SoQuyTrinh} - ${kehoach.noiDung} - ${kehoach.TendmPhanXuong}`
      });
      this.listKeHoachForCopy = mapArrayForDropDown(res, 'HienThi', "Id");
    })
  }
  GetGiaoKeHoachForCopy({ value: Id }) {
    this.services.GiaoKeHoachSanXuat().Get(Id).subscribe((res: any) => {
      if (validVariable(res.Id)) {
        this.toastr.success('Tải thành công dữ liệu! Bạn có thể sao chép!')
        this.GiaoKeHoachForCopy = res;
        this.canCopy = true;
      }
      else {
        this.toastr.error('Tải dữ liệu từ kế hoạch không thành công! Vui lòng thử kế hoạch khác!')
      }
    })
  }
  CopyKeHoach() {
    this.GiaoKeHoachForCopy.created = null;
    this.GiaoKeHoachForCopy.modified = null;
    this.GiaoKeHoachForCopy.IdTrangThai = '';
    let cloneData = deepCopy({
      ...this.GiaoKeHoachForCopy,
      soQuyTrinh: this.item.soQuyTrinh,
      Id: ''
    });
    cloneData.ngayBatDau = DateToDatePicker(this.GiaoKeHoachForCopy.ngayBatDau);
    cloneData.ngayKetThuc = DateToDatePicker(this.GiaoKeHoachForCopy.ngayKetThuc);
    cloneData.listItem.forEach(ele => {
      ele.Id = '';
      ele.IdQuyTrinh = this.item.Id;
    });
    this.item = cloneData;
    if (this.item.listItem != undefined && this.item.listItem != null) {
      this.item.listItem.filter(objlistItem => {
        objlistItem.listItem.filter(objlistItem2 => {
          objlistItem2.objQuyCachDongGoi = this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
        });
      });
    }
    this.item.isDieuChinh = true;
  }
  GetFormOptions() {
    this.HopDongService.GiaoKeHoachSanXuat().GetListMatHangGiaoKeHoachSanXuat(this.item.idDuAn).subscribe((res:any) => {
      this.listMatHang = res.data;
      this.listMatHang.forEach(obj=>{
        obj.Ne = obj.ne;
        obj.DoSan = obj.doSan;
        obj.Ma = obj.ma;
        obj.TendmLoaiSoi = obj.ne;
        obj.Ten = obj.ten;
        obj.DaGiao = obj.daGiao;
        obj.GhiChu = obj.ghiChu;
        obj.TenHopDong = obj.tenHopDong;
        obj.SoHopDong = obj.soHopDong;
      });
    })
    this.services.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
    this.services.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      if (validVariable(this.item.idDuAn)) {
        this.getPhanXuong(this.item.idDuAn, true);
      }
    })
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!!!update) {
      this.item.iddmPhanXuong = null;
    }
    this.services.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // console.log(data);
      // console.log(this.item.TepDinhKems);
      // let itemupload:any = {};
      // itemupload.ID = 0;
      // itemupload.TenGui = data[data.length - 1]?.Name||null;
      // itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      // itemupload.DuongDan = data[data.length - 1]?.Url||null;
      // if(itemupload.TenGui!== null){
      //   if(this.item.TepDinhKems.length!==0){
      //     this.item.TepDinhKems.forEach(ele => {
      //       ele.isXoa =true;
      //     });
      //   }
      //   this.item.TepDinhKems.unshift(itemupload);
      //   console.log(this.item);
      // }
    }, (reason) => {

    });
  }
  ChuyenDuyet() {
    if (this.validData()) {
      this.HopDongService.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    if (this.validData()) {
      this.HopDongService.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
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
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    // this.services.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
    //   this.listPhuongAnSapXep = res;
    //   if (this.opt === 'edit') {
    //     if (this.item.listTaiSanQuyTrinh.length !== 0) {
    //       this.item.listTaiSanQuyTrinh.forEach(ele => {
    //         ele.tempPhuongAnSapXep = res.filter(pa => pa.ID === ele.IDdmPhuongAnDeXuat)[0];
    //       });
    //     }
    //   }
    // })
  }
  GetNextSoQuyTrinh() {
    this.HopDongService.GiaoKeHoachSanXuat().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.data;
    })
  }
  GetQuyTrinh(Id) {
    this.HopDongService.GiaoKeHoachSanXuat().Get(Id).subscribe((res: any) => {
      this.item = res;
      // console.log(res);
    })
  }
  validData() {
    if (!validVariable(this.item.noiDung)) {
      this.toastr.error('Vui lòng nhập nội dung!')
      return false;
    }
    if (!validVariable(this.item.iddmPhanXuong)) {
      this.toastr.error('Vui lòng nhập phân xưởng!')
      return false;
    }
    if (!validVariable(this.item.tongSoCa)) {
      this.toastr.error('Vui lòng nhập tổng số ca!')
      return false;
    }
    if (validVariable(this.item.ngayBatDau)) {
      this.item.ngayBatDauUnix = DateToUnix(this.item.ngayBatDau);
    } else {
      this.toastr.error('Vui lòng nhập từ ngày!')
      return false;
    }
    if (validVariable(this.item.ngayKetThuc)) {
      this.item.ngayKetThucUnix = DateToUnix(this.item.ngayKetThuc);
    } else {
      this.toastr.error('Vui lòng nhập đến ngày!')
      return false;
    }
    if (validVariable(this.item.ngayBatDau) && validVariable(this.item.ngayKetThuc)) {
      if ((DateToUnix(this.item.ngayKetThuc) - DateToUnix(this.item.ngayBatDau)) <= 0) {
        this.toastr.error('Từ ngày phải nhỏ hơn đến ngày!');
        return false;
      }
    }
    let checkArray = this.item.listItem.every(ele=>validVariable(ele.KhoiLuongKeHoach)&&ele.KhoiLuongKeHoach!==0)
    if (!checkArray) {
      this.toastr.error('Có mặt hàng không nhập khối lượng!')
      return false;
    }
    return true;
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "GiaoKeHoachSanXuatHopDong";    
    modalRef.result.then(res => {
      if (res.length > 0) {
        res.forEach(obj => this.item.listItem.push(obj))
      }
      // merge(res, this.item.listItem, 'IddmItem')
    }).catch(er => {
      console.log(er);
    })
  }

  changeKeHoachSanXuat(e, item, index) {
    if (e.value != undefined && item.value != null && item.value > 0
      && item.listItem != undefined && item.listItem.length > 0) {
      let tong = 0;
      item.listItem.forEach(obj => {
        if (!obj.isXoa) {
          tong += obj.KhoiLuong;
        }
      });
      if (item.value < tong) {
        this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      }
    }
    if(validVariable(this.item.Id)){
      item.isEdited = true;
    }
  }

  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(ChonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listItem || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      // merge(res, this.item.listItem, 'IddmQuyCachDongGoi');
      item.isEdited = true;
      item.listItem = res.listItem;
      // if (item.KhoiLuongKeHoach != undefined && item.KhoiLuongKeHoach != null && item.KhoiLuongKeHoach > 0
      //   && item.listItem != undefined && item.listItem.length > 0) {
      //   let tong = 0;
      //   item.listItem.filter(obj => {
      //     if(!obj.isXoa){
      //       tong += obj.KhoiLuong;
      //     }          
      //   });
      //   if (item.KhoiLuongKeHoach < tong) {
      //     this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      //   }
      // }
    }).catch(er => {
      console.log(er);
    })
  }

  Calculate() {
    let TongKL = 0;
    let KLxChiSo = 0;
    this.item.listItem.forEach(mathang => {
      TongKL += validVariable(mathang.KhoiLuongKeHoach) ? mathang.KhoiLuongKeHoach : 0;
      KLxChiSo += validVariable(mathang.KhoiLuongKeHoach) ? (mathang.KhoiLuongKeHoach * mathang.Ne) : 0;
    });
    if (
      TongKL !== 0 && KLxChiSo !== 0
    ) {
      this.item.chiSoBQ = Math.ceil((KLxChiSo / TongKL) * 100) / 100;
      this.item.tongKhoiLuong = TongKL;
      if (validVariable(this.item.tongSoCa)) {
        // this.item.ne30 = Math.ceil(((TongKL / this.item.chiSoBQ) * 30 / this.item.tongSoCa) * 100) / 100
        this.item.ne30 = TongKL * this.item.chiSoBQ / 30 / this.item.tongSoCa;
      }
    }
  }
  GhiLai() {
    if (this.validData()) {
      this.HopDongService.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            if (this.item.listItem != undefined && this.item.listItem != null) {
              this.item.listItem.filter(objlistItem => {
                objlistItem.listItem.filter(objlistItem2 => {
                  objlistItem2.objQuyCachDongGoi = this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
                });
              });
            }
            this.KiemTraButtonModal();
            this.Calculate();
          } else {
            this.Calculate();
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
      this.HopDongService.GiaoKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    console.log(item)
    // let item = this.items.splice(i, 1)[0];
    if (item.Id.trim() === '') {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  refreshFilterMatHang() {
    this.filter.KeyWord = '';
  }
  TinhSoCa() {
    console.log(this.item.ngayBatDau, this.item.ngayKetThuc);
    if (validVariable(this.item.ngayBatDau) && validVariable(this.item.ngayKetThuc)) {
      this.item.ngayBatDauUnix = DateToUnix(this.item.ngayBatDau);
      this.item.ngayKetThucUnix = DateToUnix(this.item.ngayKetThuc);
      // console.log(this.item.tongSoCa);
      if (!validVariable(this.item.tongSoCa) || this.item.tongSoCa === 0) {
        this.item.tongSoCa = ((this.item.ngayKetThucUnix - this.item.ngayBatDauUnix) / (24 * 3600) + 1) * 3;
        // console.log(this.item.tongSoCa);
      }
    }
  }
  validDenNgay(mathang, e) {
    if (validVariable(mathang.TuNgay)) {
      if ((DateToUnix(e) - DateToUnix(mathang.TuNgay)) < 0) {
        this.toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.DenNgay = null;
        }, 500)
      } else {
        this.TinhSoCa();
      }
    } else {
      setTimeout(() => {
        mathang.DenNgay = null;
      }, 500)
      this.toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
  change(index) {
    if(validVariable(this.item.Id)){
      this.item.listItem[index].isEdited = true;
    }
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
    })
  }
  exportExcel(){
    this.services.GiaoKeHoachSanXuat().ExportGiaoKeHoachSanXuat(this.item.Id).subscribe((res:any)=>{
      this.services.download(res.TenFile);
    })
  }
}
