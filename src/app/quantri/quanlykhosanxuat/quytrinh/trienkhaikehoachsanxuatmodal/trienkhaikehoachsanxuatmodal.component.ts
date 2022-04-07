import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { BotrimaymodalComponent } from '../../modals/botrimaymodal/botrimaymodal.component';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-trienkhaikehoachsanxuatmodal',
  templateUrl: './trienkhaikehoachsanxuatmodal.component.html',
  styleUrls: ['./trienkhaikehoachsanxuatmodal.component.css'],
  providers: [DatePipe]
})
export class TrienkhaikehoachsanxuatmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    Id: '',
  };
  listCongDoan: any = [];
  filter: any = {};
  checkbutton: any = {};
  listGiaoKeHoach: any = [];
  listPhanXuong: any = [];
  tempDataGiaoKeHoach: any = [];
  listMatHangGiaoKeHoach: any = [];
  itemGiaoKeHoach: any = {};
  mapGiaoKeHoachNIdPhanXuong: any = {};
  lang: any = vn;
  yearRangeChonGiaoKeHoach: string = `${((new Date()).getFullYear() - 10)}:${((new Date()).getFullYear())}`;
  maxDateChonMay: Date = null;
  minDateChonMay: Date = null;
  IddmPhanXuong: string = '';
  PoolMaySanXuat: any = {};
  mapCongDoan_TinhTrangMay: any = {};
  listCaSanXuat:any[]=[];
  constructor(public activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    this.getListPhanXuong();
    this.getListCaSanXuat();
  }
  validVariable(e) {
    return validVariable(e);
  }
  getListCaSanXuat(){
    this._services.GetListOptdmCaSanXuat().subscribe((res:any)=>{
      this.listCaSanXuat = res;    
    })
  }
  getListPhanXuong() {
    this._services.GetOptions().GetPhanXuong().subscribe((res: Array<any>) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      if (validVariable(this.item.IddmPhanXuong)) {
        this.getListGiaoKeHoach({ value: this.item.IddmPhanXuong });
      }
      if (validVariable(this.item.IdGiaoKeHoachSanXuat)) {
        this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
      }
    })
  }

  GetListMatHangChuaLapKeHoach(event, reset?) {
    if (validVariable(this.item.TuNgayUnix) && this.item.TuNgayUnix !== 0) {
      this.item.TuNgay = UnixToDate(this.item.TuNgayUnix)
    }
    if (validVariable(this.item.DenNgayUnix) && this.item.DenNgayUnix !== 0) {
      this.item.DenNgay = UnixToDate(this.item.DenNgayUnix)
    }
    if (validVariable(this.item.listCongDoan) && this.item.listCongDoan.length !== 0) {
      this.listCongDoan = mapArrayForDropDown(this.item.listCongDoan, 'Ten', 'Ma');
      this.filter.CongDoan = 'ONG';
    }
    this._services.GetOptions().GetListMatHangChuaLapKeHoach(event.value, this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listMatHangGiaoKeHoach = res;
      if (reset) {
        this.item.listItem = [];
        this.item.TuNgay = null;
        this.item.DenNgay = null;
        this.item.listItemMay = [];
        this.item.listCongDoan = [];
        this.filter.CongDoan = null;
      }
      if (validVariable(this.item.listItem) && this.item.listItem?.length !== 0) {
        this.item.listItem.forEach(mathang => {
          if (validVariable(mathang.TuNgayUnix) && validVariable(mathang.DenNgayUnix)) {
            mathang.TuNgay = UnixToDate(mathang.TuNgayUnix);
            mathang.DenNgay = UnixToDate(mathang.DenNgayUnix);
          }
        });
      }
    })
    if (validVariable(this.item.listItemMay) && this.item.listItemMay?.length !== 0) {
      this.item.listCongDoan.forEach(cd => {
        this.TinhLaiTinhTrangMay(cd.Ma)
      });
    }
    // this.TinhNangSuat();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }

  GetNextSoQuyTrinh() {
    this._services.TrienKhaiKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  getListGiaoKeHoach(event, reset?) {
    this._services.TrienKhaiKeHoachSanXuat().GetListGiaoKeHoachSanXuatChuaLapKeHoach(event.value).subscribe((res: any) => {
      res.sort((a, b) => new Date(b.Modified).getTime() - new Date(a.Modified).getTime());
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'NoiDung', 'Id');
      if (reset) {
        this.item.listItem = [];
        this.item.TuNgay = null;
        this.item.DenNgay = null;
        this.item.listItemMay = [];
        this.item.listCongDoan = [];
        this.filter.CongDoan = null;
      }
    })
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'lg',
    })
    modalRef.componentInstance.items = deepCopy(this.listMatHangGiaoKeHoach);
    modalRef.componentInstance.opt = "KhoiLuongKeHoach";
    modalRef.componentInstance.selectedItems = deepCopy(this.item.listItem);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      this.item.listItem = [...deepCopy(res), ...this.item.listItem.filter(ele => ele.isXoa)];
      this.TinhNangSuat()
    }).catch(er => {
    })
  }

  ValidData() {
    if (!validVariable(this.item.TuNgay) || !validVariable(this.item.DenNgay)) {
      this.toastr.error('Vui lòng nhập khoảng thời gian!');
      return false;
    }
    if (!validVariable(this.item.IddmPhanXuong)) {
      this.toastr.error('Vui lòng chọn phân xưởng!');
      return false
    }
    if (!validVariable(this.item.IdGiaoKeHoachSanXuat)) {
      this.toastr.error('Vui lòng chọn kế hoạch giao!');
      return false
    }
    if (!validVariable(this.item.NoiDung)) {
      this.toastr.error('Vui lòng nhập nội dung!');
      return false
    }
    return true
  }
  SetData() {
    this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    let dateArr = this.getDates(UnixToDate(this.item.TuNgayUnix), UnixToDate(this.item.DenNgayUnix));
    this.item.listItemMay.filter(ele => ele.isXoa !== true).forEach(mathang => {
      mathang.listItem = [];
      for (let may in this.PoolMaySanXuat[mathang.CongDoan]) {
        dateArr.forEach(ngay => {
          let mayTrongPool = this.PoolMaySanXuat[mathang.CongDoan][may][ngay.prop];
          if (mayTrongPool.TinhTrang === 1 && mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhaiMatHang === mathang.Id) {
            mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhai = this.item.Id;
            mayTrongPool.IdGiaoKeHoachSanXuat = this.item.IdGiaoKeHoachSanXuat;
            mathang.listItem.push(mayTrongPool);
          }
        })
      }
    });
    return this.item;
  }
  TinhSoMayDaBoTri() {
    this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    let dateArr = this.getDates(UnixToDate(this.item.TuNgayUnix), UnixToDate(this.item.DenNgayUnix));
    this.item.listItemMay.filter(ele => ele.isXoa !== true).forEach(mathang => {
      let TongSoMayDaBoTri = 0;
      for (let may in this.PoolMaySanXuat[mathang.CongDoan]) {
        let co = dateArr.some(ngay => {
          let mayTrongPool = this.PoolMaySanXuat[mathang.CongDoan][may][ngay.prop]
          return mayTrongPool.TinhTrang === 1 && mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhaiMatHang === mathang.Id
        })
        if (co) {
          TongSoMayDaBoTri++;
        }
      }
      mathang.SoMay = TongSoMayDaBoTri;
    });
  }
  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      let data: any = {};
      if (currentDate.getDate() === 1) {
        data.header = `01/${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : (currentDate.getMonth() + 1)}`
      } else {
        data.header = this.datepipe.transform(currentDate, 'dd')
      }
      data.prop = this.datepipe.transform(currentDate, 'dd_MM_yyyy');
      dates.push(data);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  GetTrienKhaiKeHoach(IdTrienKhaiKeHoach) {
    this._services.TrienKhaiKeHoachSanXuat().Get(IdTrienKhaiKeHoach).subscribe(res => {
      this.item = res;
      this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
      this.KiemTraButtonModal();
    });
  }
  GhiLai() {
    if (this.ValidData()) {
      this._services.TrienKhaiKeHoachSanXuat().Set(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.GetTrienKhaiKeHoach(res.objectReturn.Id)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }

  }
  ChuyenDuyet() {
    if (this.ValidData()) {
      this._services.TrienKhaiKeHoachSanXuat().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.ValidData()) {
      this._services.TrienKhaiKeHoachSanXuat().KhongDuyet(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
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
      this._services.TrienKhaiKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
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
  delete(item, index) {

  }
  boTriLai() {
    this.item.TuNgay = null;
    this.item.TuNgayUnix = null;
    this.item.DenNgay = null;
    this.item.DenNgayUnix = null;
    // }
  }
  validChonLai(mathang) {
    if (validVariable(mathang.TuNgay) && validVariable(mathang.DenNgay)) {
      return true;
    } else {
      return false;
    }
  }
  merge(newArr: Array<any>, existingArr: Array<any>, diffProp: string): Array<any> {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle[diffProp] === oldEle[diffProp]
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      if (oldEle.isXoa !== true) {
        let indexCheck = newArr.findIndex(
          (newEle) => newEle[diffProp] === oldEle[diffProp]
        );
        if (indexCheck === -1) {
          removeIndex.push(index);
        }
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      if (existingArr[removeIndex[i]].Id === '') {
        let removeItem: any = existingArr.splice(removeIndex[i], 1)[0];
        if (validVariable(removeItem.TuNgay) && validVariable(removeItem.DenNgay) && validVariable(removeItem.listItemTemp) && JSON.stringify(removeItem.listItemTemp) !== '{}') {
          removeItem.TuNgayUnix = DateToUnix(removeItem.TuNgay);
          removeItem.DenNgayUnix = DateToUnix(removeItem.DenNgay);
          let dateArr = this.getDates(UnixToDate(removeItem.TuNgayUnix), UnixToDate(removeItem.DenNgayUnix));
          for (let congDoan in removeItem.listItemTemp) {
            removeItem.listItemTemp[congDoan].forEach(may => {
              dateArr.forEach(ngay => {
                let mayTrongPool = this.PoolMaySanXuat[congDoan][may.prop][ngay.prop];
                if (mayTrongPool.TinhTrang === 1 && mayTrongPool.IddmItem === removeItem.IddmItem) {
                  mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhai = null;
                  mayTrongPool.IdGiaoKeHoachSanXuat = null;
                  mayTrongPool.ChiSo = undefined;
                  mayTrongPool.TinhTrang = 0;
                  mayTrongPool.IddmItem = null;
                }
              })
            });
          }
        }
      } else {
        existingArr[removeIndex[i]].isXoa = true;
        if (validVariable(existingArr[i].TuNgay) && validVariable(existingArr[i].DenNgay) && validVariable(existingArr[i].listItemTemp) && JSON.stringify(existingArr[i].listItemTemp) !== '{}') {
          existingArr[i].TuNgayUnix = DateToUnix(existingArr[i].TuNgay);
          existingArr[i].DenNgayUnix = DateToUnix(existingArr[i].DenNgay);
          let dateArr = this.getDates(UnixToDate(existingArr[i].TuNgayUnix), UnixToDate(existingArr[i].DenNgayUnix));
          for (let congDoan in existingArr[i].listItemTemp) {
            existingArr[i].listItemTemp[congDoan].forEach(may => {
              dateArr.forEach(ngay => {
                let mayTrongPool = this.PoolMaySanXuat[congDoan][may.prop][ngay.prop];
                if (mayTrongPool.TinhTrang === 1 && mayTrongPool.IddmItem === existingArr[i].IddmItem) {
                  mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhai = null;
                  mayTrongPool.IdGiaoKeHoachSanXuat = null;
                  mayTrongPool.ChiSo = undefined;
                  mayTrongPool.TinhTrang = 0;
                  mayTrongPool.IddmItem = null;
                }
              })
            });
          }
        }
      }
    }
    return existingArr;
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
  validDenNgay(mathang, e) {
    if (validVariable(mathang.TuNgay)) {
      if ((DateToUnix(e) - DateToUnix(mathang.TuNgay)) < 0) {
        this.toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.DenNgay = null;
        }, 500)
      } else {
        this.TinhNangSuat();
      }
    } else {
      setTimeout(() => {
        mathang.DenNgay = null;
      }, 500)
      this.toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
  ThayDoiSoCa() {
    this.item.listItemMay = [];
    this.item.listCongDoan = [];
    this.listCongDoan = [];
    this.filter.CongDoan = null;
    this.TinhNangSuat()
  }
  TinhNangSuat() {
    if (validVariable(this.item.TuNgay) && validVariable(this.item.DenNgay)) {
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
      if (!validVariable(this.item.SoCa) || this.item.SoCa === 0) {
        this.item.SoCa = ((this.item.DenNgayUnix - this.item.TuNgayUnix) / (24 * 3600) + 1) * this.listCaSanXuat.length;
      }
    }
    if (validVariable(this.item.listItem) && this.item.listItem.length !== 0 && validVariable(this.item.TuNgay) && validVariable(this.item.DenNgay)) {
      this._services.TrienKhaiKeHoachSanXuat().TinhNangSuat(this.item).subscribe((res: any) => {
        this.listCongDoan = mapArrayForDropDown(res.listCongDoan, 'Ten', 'Ma');
        res.listCongDoan.forEach(cd => {
          this.mapCongDoan_TinhTrangMay[cd.Ma] = {
            TongKhoiLuong: res.listItemMay.filter(mathang => mathang.CongDoan === cd.Ma).reduce((Tong, mh) => Tong + mh.KhoiLuongSanXuat, 0),
            SoMayCanDoi: cd.SoMayCanDoi,
            SoMayHienCo: cd.SoMayHienCo,
            SoMayTinhToan: cd.SoMayTinhToan,
          }
        });
        this.filter.CongDoan = 'ONG';
        res.listItemMay.sort((a, b) => {
          return ('' + a.Ten).localeCompare(b.Ten);
        })
        this.item.listItemMay = res.listItemMay;
        this.item.listCongDoan = res.listCongDoan;
      })
    }
  }
  resetFilter() {
    this.filter.KeyWord = '';
  }
  chonCongDoan(e) {
    if (e === 'THO') {
      console.log(this.item.listItemMay.filter(ele => ele.CongDoan === 'THO'))
      this.item.listItemMay.filter(ele => ele.CongDoan === 'THO').forEach(mathang => {
        mathang.IddmPhanXuong = this.item.IddmPhanXuong;
        this._services.TrienKhaiKeHoachSanXuat().GetChiSo(mathang).subscribe((res: any) => {
          mathang.listNMtemp = res.map(ele => {
            return {
              label: ele.toString(),
              value: ele
            }
          });
        })
      });
    }
  }
  SetChiSo(e, item) {
    item.ChiSoMoi = e.value;
    this._services.TrienKhaiKeHoachSanXuat().SetChiSo(item).subscribe((res: any) => {
      item.Ten = res.Ten;
      item.ChiSo = res.ChiSo;
      item.SoMayTinhToan = res.SoMayTinhToan;
      item.SoMayCanDoi = res.SoMayCanDoi;
      item.KhoiLuongSanXuat = res.KhoiLuongSanXuat;
      item.NangSuatDinhMuc = res.NangSuatDinhMuc;
      this.TinhLaiTinhTrangMay('THO');
      // console.log(this.item.listItemMay)
    })
  }
  TinhLaiTinhTrangMay(CongDoan) {
    this.mapCongDoan_TinhTrangMay[CongDoan] = {
      ...this.mapCongDoan_TinhTrangMay[CongDoan],
      SoMayHienCo: this.item.listCongDoan.filter(cd => cd.Ma === CongDoan)[0]?.SoMayHienCo,
      TongKhoiLuong: this.item.listItemMay.filter(mathang => mathang.CongDoan === CongDoan).reduce((Tong, mh) => Tong + mh.KhoiLuongSanXuat, 0),
      SoMayCanDoi: this.item.listCongDoan.filter(cd => cd.Ma === CongDoan)[0]?.SoMayHienCo - this.item.listItemMay.filter(mathang => mathang.CongDoan === CongDoan).reduce((Tong, mh) => Tong + mh.SoMayTinhToan, 0),
      SoMayTinhToan: this.item.listItemMay.filter(mathang => mathang.CongDoan === CongDoan).reduce((Tong, mh) => Tong + mh.SoMayTinhToan, 0),
    }
  }
  exportExcelMau() {
    this._services.TrienKhaiKeHoachSanXuat().Export(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}
