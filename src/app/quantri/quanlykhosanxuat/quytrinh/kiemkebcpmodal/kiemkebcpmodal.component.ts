import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kiemkebcpmodal',
  templateUrl: './kiemkebcpmodal.component.html',
  styleUrls: ['./kiemkebcpmodal.component.css']
})
export class KiemkebcpmodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listdmPhanXuong: any = [];
  listdmCaSanXuat: any = [];
  listLoBong: any = [];
  paging: any = {};
  listItemFull: any = [];
  listItem: any = [];
  listCongDoan: any = [];
  listCotCon: any = [];
  listMatHang: any = [];
  title: any = '';
  lang: any = vn;
  check: any = false;
  isLuu: any = false;
  Id: any = '';
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
    this.services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listdmCaSanXuat = mapArrayForDropDown(res, "Ten", 'Id');
    })
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      // this.getListdmHangMuc();
      this.GetListItemKiemKeBanChePham();
    }
    else {
      this.GetQuyTrinh();
    }
    
  }
  GetQuyTrinh() {
    this.services.PhieuKiemKeBanChePham().Get(this.Id).subscribe((res1: any) => {
      res1.CongDoan = this.listCongDoan[0].value;
      if (res1.NgayUnix !== null && res1.NgayUnix !== undefined) {
        res1.Ngay = UnixToDate(res1.NgayUnix);
      }
      this.item = res1;
      this.check = true;
      console.log(this.item)
      this.listItemFull = this.item.listItem;
      this.getItemTheoCongDoan();
      this.KiemTraButtonModal();
      this.KiemTraButtonModal();
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuKiemKeBanChePham().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.PhieuKiemKeBanChePham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    console.log(this.item)
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuKiemKeBanChePham().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.isLuu = true;
            this.item.Id = res.objectReturn.Id;
            this.Id = res.objectReturn.Id
            // this.item.CongDoan = this.listCongDoan[0].value
            this.GetQuyTrinh();
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
      this.services.PhieuKiemKeBanChePham().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
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

  getItemTheoCongDoan() {
    if (this.item.CongDoan !== undefined && this.item.CongDoan !== null) {
      this.listMatHang = [];
      this.listItem = [];
      this.listCotCon = [];
      this.listItemFull.forEach(element => {
        if (element.CongDoan === this.item.CongDoan) {
          this.listItem.push(element);
          if (element.SoCotCon > 0 && element.SoDongCon === 1) {
            this.listCotCon = this.listCotCon.concat(element.listCon)
          }
          // if ((this.item.CongDoan === 'CON' || this.item.CongDoan === 'ONG') && this.opt !== 'edit') {
          //   this.listMatHang.push(element);
          // }
          
        }
      });
      // if ((this.item.CongDoan === 'CON' || this.item.CongDoan === 'ONG') && this.opt === 'edit') {
        if ((this.item.CongDoan === 'CON' || this.item.CongDoan === 'ONG')) {
        this.services.dmKiemKeBanChePham().GetListAll().subscribe((res: any) => {
          res.forEach(element => {
            if(element.CongDoan === this.item.CongDoan){
              if (element.SoCotCon > 0 && element.SoDongCon === 1) {
                this.listCotCon = this.listCotCon.concat(element.listCon)
              }
              this.listMatHang.push(element);
            }
          });
        })
      }
      // if ((this.item.CongDoan === 'CON' || this.item.CongDoan === 'ONG') && this.opt !== 'edit') {
      //   this.check = false;
      //   this.getListCanDoiChuyenKiemKe();
      // }
    }
  }
  getListdmHangMuc() {
    this.services.dmKiemKeBanChePham().GetListAll().subscribe((res: any) => {
      res.forEach(element => {
        element.IddmHangMuc = element.Id;
        element.Id = "";
      });
      this.listItemFull = res;
      var listItemAdd : any = [];
      res.forEach(element => {
        if(element.listCon.length === 0){
          listItemAdd.push(element)
        }
      });
      this.item.listItem = listItemAdd;
    })
  }
  // getListCanDoiChuyenKiemKe(isThayDoi?) {
  //   this.listItem = [];
  //   this.item.listItem.forEach(element => {
  //     if(element.CongDoan === this.item.CongDoan)
  //       element.isXoa = true;
  //   });
  //   if (this.item.Ngay !== undefined && this.opt !== 'edit' && (this.check === false || isThayDoi == true)) {
  //     this.check = true;
  //     this.item.NgayUnix = DateToUnix(this.item.Ngay);
  //     this.services.GetListCanDoiChuyenKiemKe(this.item.IddmPhanXuong, this.item.CongDoan, this.item.NgayUnix).subscribe((res: any) => {
  //       this.listItem = res;
  //       // this.listItemFull = this.listItemFull.concat(res);
  //       this.item.listItem = this.item.listItem.concat(res);
  //     })
  //   }
  // }
  Onclose() {
    this.activeModal.close();
  }
  getListCanDoiChuyenKiemKe() {
    if(this.item.CongDoan === 'CON' || this.item.CongDoan === 'ONG'){
      this.listItem = [];
      this.item.listItem.forEach(element => {
        if(element.CongDoan === this.item.CongDoan)
          element.isXoa = true;
      });
      if (this.item.Ngay !== undefined) {
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
        this.services.GetListCanDoiChuyenKiemKe(this.item.IddmPhanXuong, this.item.CongDoan, this.item.NgayUnix).subscribe((res: any) => {
          this.listItem = res;
          this.item.listItem = this.item.listItem.concat(res);
        })
      }
    }
  }
  GetListItemKiemKeBanChePham(){
    if (this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
    }
    this.services.GetListItemKiemKeBanChePham(this.item.IddmPhanXuong, this.item.NgayUnix, this.item.IddmCaSanXuat).subscribe((res: any) => {
      this.listItemFull = res;
      this.item.listItem = res;
      var listItem: any = [];
      this.listItemFull.forEach(element => {
        if(element.CongDoan === this.item.CongDoan){
          listItem.push(element)
        }
      });
      this.listItem = listItem;
    })
  }
}
