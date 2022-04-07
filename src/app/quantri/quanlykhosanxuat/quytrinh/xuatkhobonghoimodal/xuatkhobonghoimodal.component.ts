import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhobonghoimodal',
  templateUrl: './xuatkhobonghoimodal.component.html',
  styleUrls: ['./xuatkhobonghoimodal.component.css']
})
export class XuatkhobonghoimodalComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  opt: any = ''
  Id: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listPhanXuong: any = [];
  listPhuongAnPhaBong: any = [];
  listItem: any = [];
  paging: any = {CurrentPage: 1};
  listdmKhachHang: any = [];
  listKien: any = [];
  listKienFull: any = [];
  listTrienKhaiKeHoachSanXuat:any=[];
  newTableItem: any = {};
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    let data: any = {
      CurrentPage: 0
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList({...data,isHoanThanh:false}).subscribe((res:any)=>{
      this.listTrienKhaiKeHoachSanXuat = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res: any) => {
      this.listPhuongAnPhaBong = mapArrayForDropDown((typeof res) === 'object'?res.items:res, 'Ten', 'Id');
    })
    
    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listdmKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    if (this.opt !== 'edit') {
      data.Loai = 6;
      data.IddmPhanXuong =  this.item.IddmPhanXuong || "";
      this.services.GetListdmKho(data).subscribe((res: any) => {
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
      this.item.Loai =6;
    }
    else
      this.GetQuyTrinh();
  }
  GetQuyTrinh() {
    this.services.PhieuXuatSanXuat().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(Math.round(this.item.NgayChungTuUnix));
      }
      this.listItem = deepCopy(res1.listItem);
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      this.getLuuKho();
      let data: any = {
        CurrentPage: 0,
        Loai: 6,
        IddmPhanXuong: this.item.IddmPhanXuong || "",
      }
      this.services.GetListdmKho(data).subscribe((res: any) => {
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.checkTruocKhiLuu()) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (validVariable(this.newTableItem.IddmItem)) {
        if(this.item.listItem === undefined || this.item.listItem === null)
          this.item.listItem = [];
        this.item.listItem.push(deepCopy(this.newTableItem));
        this.newTableItem = {};
      }
      this.services.PhieuXuatSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } 
  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.checkTruocKhiLuu()) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (validVariable(this.newTableItem.IddmItem)) {
        if(this.item.listItem === undefined || this.item.listItem === null)
          this.item.listItem = [];
        this.item.listItem.push(deepCopy(this.newTableItem));
        this.newTableItem = {};
      }
      this.services.PhieuXuatSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.Id = this.item.Id;
            this.KiemTraButtonModal();
            this.GetQuyTrinh();
          } 
          else {
            this.toastr.error(res.message)
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
      this.services.PhieuXuatSanXuat().Delete(this.item).subscribe((res: any) => {
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

  // GetLuuKho(sFilter) {
  //   this.services.getLuuKho(this.item.IddmKho,'', 0 , sFilter).subscribe((res1: any) => {
  //     let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
  //       size: 'fullscreen',
  //       backdrop: 'static'
  //     })
  //     modalRef.componentInstance.opt = 'edit';
  //     modalRef.componentInstance.listMatHang = res1;
  //     modalRef.result.then((data) => {
  //       this.item.listItem = data.data;
  //     }, (reason) => {
  //       // không
  //     });
  //   })
  // }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start, end);
  }
  Onclose() {
    this.activeModal.close();
  }
  getLuuKho(){
    this.services.getLuuKhoKiemKeKhoBongHoi(this.item.IddmKho, "", "", "").subscribe((res: any) => {
      this.listKien = mapArrayForDropDown(res, 'Ten', 'IddmItem');
      this.listKienFull = res;
    })
  }
  getTon(item){
    this.listKienFull.forEach(element => {
      if(element.IddmItem == item.IddmItem){
        item.TonSoLuong = element.TonSoLuong;
        item.TonTrongLuong = element.TonTrongLuong;
      }
    });
  }
  add() {
    if (validVariable(this.newTableItem.IddmItem)) {
      if(this.item.listItem === undefined || this.item.listItem === null)
        this.item.listItem = [];
      this.item.listItem.push(deepCopy(this.newTableItem));
      this.newTableItem = {};
      console.log(this.paging);
      if (this.item.listItem.length > this.paging.CurrentPage * 10) {
          console.log(Math.floor(this.item.listItem.length / 10));
          this.paginator.changePage(
              Math.floor(this.item.listItem.length / 10)
          );
      } 
      // else {
      //     this.changePage({ page: this.paging.CurrentPage - 1 });
      // }
    } else {
        this.toastr.error("Vui lòng chọn mặt hàng cần thêm!");
    }
  }
  checkTruocKhiLuu(){
    if (this.item.Ngay === null || this.item.Ngay === undefined)
    {
      this.toastr.error('Bạn chưa chọn ngày chứng từ!')
      return false;
    }
    if(this.item.listItem !== undefined){
      if(this.item.listItem.length > 0){
        this.item.listItem.forEach(element => {
          if(!validVariable(element.IddmItem) && element.isXoa !== true){
            this.toastr.error('Bạn chưa chọn kiện!')
            return false;
          }
        });
      }
    }
    return true;
  }
}