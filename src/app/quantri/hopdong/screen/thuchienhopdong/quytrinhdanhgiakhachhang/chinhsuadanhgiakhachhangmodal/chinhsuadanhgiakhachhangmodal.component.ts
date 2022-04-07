import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import { TreeNode } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
@Component({
  selector: 'app-chinhsuadanhgiakhachhangmodal',
  templateUrl: './chinhsuadanhgiakhachhangmodal.component.html',
  styleUrls: ['./chinhsuadanhgiakhachhangmodal.component.css']
})
export class ChinhsuadanhgiakhachhangmodalComponent implements OnInit {
  item: any = {};
  IdQuyTrinh: any = '';
  checkedAll: boolean = false;
  paging: any = {};
  listTieuChiDanhGia: TreeNode[];
  listTieuChiCha: any = [];
  listHopDong: any = []
  KeyWord: any = '';
  mapXuatNhapRoute = {
    BongXo: '/quantri/hopdongsanxuat/danhsachhopdongbongxo/',
    Soi: '/quantri/hopdongsanxuat/danhsachhopdongsoi/',
    VatTuPhu: '/quantri/hopdongsanxuat/danhsachhopdongvattuphu/'
  }
  constructor(
    public activeModal: NgbActiveModal, public toastr: ToastrService, private _hopdong: HopDongService,
  ) { }

  ngOnInit(): void {
    if (!validVariable(this.item.listTieuChiDanhGia))
      this.item.listTieuChiDanhGia = [];
    this.listTieuChiDanhGia = [];
    this.listTieuChiCha = this.item.listTieuChiDanhGia.filter(e => e.iddmTieuChiCha === null || e.iddmTieuChiCha === '')
    this.listTieuChiCha.forEach(element => {
      let data: any = { "data": element, "children": [], "expanded": true };
      let children = this.item.listTieuChiDanhGia.filter(e => e.iddmTieuChiCha === element.iddmTieuChiDanhGia);
      element.isCon = false;
      children.forEach(elChi => {
        elChi.isCon = true;
        let dataChil: any = { "data": elChi, "children": [], "expanded": true };
        data.children.push(dataChil);
      });
      this.listTieuChiDanhGia.push(data);
    });
    this.getListHopDong();
  }
  getListHopDong() {
    this._hopdong.QuyTrinhDanhGia().listHopDong(this.item.idKhachHang).subscribe((res1: any) => {
      this.listHopDong = res1.data;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = this.listHopDong.length;
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref_copy.slice(start, end);
  }
  accept() {
    this.item.ketQuaDanhGia = this.listTieuChiCha.reduce((total, ele) => {
      return total + (ele.diem || 0)
    }, 0);
    this.activeModal.close(this.item)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = deepCopy(this.item.listHopDong);
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele => ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
    }
    else {
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listThuTucThanhToan_ref.length;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref.slice(0, 15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
  Onclose() {
    this.activeModal.close()
  }
  tinhDiemDanhGia(item) {
    // if (item.diem > item.diemToiDa) {
    //   this.toastr.error("Bạn không được nhập điểm đánh giá vượt quá điểm tối đa!!!");
    // }
    // else {
      let itemFindCha = this.listTieuChiCha.filter(e => e.iddmTieuChiDanhGia == item.iddmTieuChiCha);
      let itemFinds = this.item.listTieuChiDanhGia.filter(e => e.iddmTieuChiCha == item.iddmTieuChiCha);
      if (itemFinds !== undefined) {
        if (itemFinds.length > 0) {
          itemFindCha[0].diem = itemFinds.reduce((total, ele) => {
            return total + ele.diem
          }, 0);
        }
      // }
    }
  }
  viewHopDong(item){
    if(item.loai === 11){
      window.open(`#${this.mapXuatNhapRoute.Soi}${item.id || ''}`, "_blank");
    }
    else if(item.loai === 23){
      window.open(`#${this.mapXuatNhapRoute.VatTuPhu}${item.id ||''}`, "_blank");
    }
    else{
      window.open(`#${this.mapXuatNhapRoute.BongXo}${item.id || ''}`, "_blank");
    }
  }
}
