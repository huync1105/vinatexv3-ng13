import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-modaldongiakehoachthucte',
  templateUrl: './modaldongiakehoachthucte.component.html',
  styleUrls: ['./modaldongiakehoachthucte.component.css']
})
export class ModaldongiakehoachthucteComponent implements OnInit {

  item: any = {};
  filter: any = {};
  listPhanXuong: any = [];
  idSanPham: string = "";
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  showDropDown: boolean = false;

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { }

  ngOnInit(): void {
    this.getListPhanXuong();
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  // Ghilai() {
  //   this._danhMucHopDong.KeHoachKinhDoanh_DonGia.Set(this.item).subscribe((res: any) => {
  //     if (res.statusCode !== 200) {
  //       this.toastr.error(res.message);
  //     } else {
  //       this.toastr.success(res.message);
  //       this.activeModal.close();
  //     } 
  //     this.activeModal.close();
  //   })
  // }

}
