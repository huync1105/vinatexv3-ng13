import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { KienlocongdieuchinhmodalComponent } from '../kienlocongdieuchinhmodal/kienlocongdieuchinhmodal.component';
 
@Component({
  selector: 'app-phieudieuchinhmodal',
  templateUrl: './phieudieuchinhmodal.component.html',
  styleUrls: ['./phieudieuchinhmodal.component.css']
})
export class PhieudieuchinhmodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi:true,
    KhongDuyet:false,
    ChuyenTiep:false,
    Xoa:false,
  }
  newTableItem:any={};
  filter:any = {};
  listPhuongAnPhaBong: any = [];
  listSoBan: any = [];
  listTimBong_Kien: any = [];
  listdmViTri: any = [];
  lang: any = vn;
  listItemChon: any = []
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(
    private router: Router,
    public activeModal: NgbActiveModal, 
    private services: SanXuatService, public toastr: 
    ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.item)
    this.getTimBong_Kien();

    if(this.item.isKhongTuDong === true){
      this.getlistPhuongAnPhaBong();
    }

    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.item.isKhongTuDong = true;
      this.getlistPhuongAnPhaBong();
    }
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListdmViTri();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '',this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      
    })
  }
  getlistPhuongAnPhaBong() {
    this.services.PhuongAnPhaBong().GetHoanThanh().subscribe((res: any) => {
      this.listPhuongAnPhaBong = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
  }
  getTimBong_Kien() {
    let datapush: any = [];
    this.services.PhuongAnPhaBong().TimBong_Kien(this.item.IdPhuongAnPhaBong).subscribe((res: any) => {
      res.forEach(element => {
        let data = {
          label:element,
          value:element
        };
        datapush.push(data)
      });
      this.listSoBan = datapush;
      console.log(this.listSoBan)
    })
  }
  getListItem() {
    console.log(this.item)
    if(this.item.listItem!== undefined && this.item.listItem!== null){
      this.item.listItem.forEach(element => {
      element.isXoa = true;
    });
    }
    this.services.PhuongAnPhaBong().GetListItemDieuChinhTimBong(this.item.IdPhuongAnPhaBong, this.item.ThuTu).subscribe((res: any) => {
      if(this.item.listItem== undefined && this.item.listItem== null){
        this.item.listItem = res;
      }
    else{
      this.item.listItem = this.item.listItem.concat(res);
    }
    });
  }
  ChuyenDuyet() {
    var isCheck: any = false;
    this.item.listItem.forEach(element => {
      if(element.IddmItemDieuChinh === '' || element.IddmItemDieuChinh === undefined || element.IddmItemDieuChinh === null){
        isCheck = true;
      }
    });
    if(isCheck === true){
      this.toastr.error("Bạn chưa chọn kiện điều chỉnh");
    }
    else{
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhuongAnDieuChinhTimBong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.PhuongAnDieuChinhTimBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this.services.PhuongAnDieuChinhTimBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.Ngay = UnixToDate(this.item.NgayUnix);
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhuongAnDieuChinhTimBong().Delete(this.item).subscribe((res: any) => {
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

  getListdmViTri() {
    this.services.GetListdmViTriOpt().subscribe((res:any)=>{
      this.listdmViTri = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getPhuongAnPhaBong(Id) {
    this.router.navigate(['/ThongTinChung/GiaVatLieuNhanCongMay']);   
  }
  getKienLoBongDieuChinh(i, item) {
    this.listItemChon = deepCopy(this.item.listItem);

    if(this.item.listItem !== null && this.item.listItem !== undefined){
      this.listItemChon.splice(i, 1)
    }
    this.services.PhuongAnPhaBong().GetLoBongTrongKho_DieuChinh(item.Mic, item.IdLoBong).subscribe((res:any)=>{
      let modalRef = this._modal.open(KienlocongdieuchinhmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item_new = res;
      modalRef.componentInstance.itemRemove = item;
      modalRef.componentInstance.IddmItem = item.IddmItemDieuChinh;
      modalRef.componentInstance.listItem = this.listItemChon;
      modalRef.result.then((data) => {
        item.IddmItemDieuChinh = data.data.IddmItem;
        item.TenDieuChinh = data.data.Ten;
        item.IddmViTriDieuChinh = data.data.IddmViTri;
        item.TendmViTriDieuChinh = data.data.TendmViTri;
        item.MicDieuChinh = data.data.Mic;
      }, (reason) => {
        // không
      });
    })
  }
  GetLoBongTrongKho() {
    
  }
}
