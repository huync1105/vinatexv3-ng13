import { deepCopy } from 'src/app/services/globalfunction';
import { vn } from 'src/app/services/const';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-chitiethanghoamodal',
  templateUrl: './chitiethanghoamodal.component.html',
  styleUrls: ['./chitiethanghoamodal.component.css']
})
export class ChitiethanghoamodalComponent implements OnInit {
  lang: any = vn;
  listLoaiMatHang_ref: any = [];
  opt: any = '';
  item: any = {};
  listLoaiBong: any = []
  listThanhToanThuTuc: any = []
  data: any = {};
  listLoaiMatHang: any = [];
  listDieuKhoanThanhToan: any = {};
  IdQuyTrinh: any;
  selectedItems: any = [];
  selectedItemsGoc: any = [];
  items: any = [];
  checkedAll: boolean = false;
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _serviceHopDong: HopDongService,
  ) { }


  ngOnInit(): void {
    this.selectedItemsGoc = deepCopy(this.selectedItems);
    this._serviceHopDong.QuyTrinhHopDong().GetListAlldmTieuChuanChatLuong().subscribe((res: any) => {
      this.items = res;
      this.items.forEach(obj => {
        obj.checked = false;
        if (this.selectedItems.length > 0) {
          if (this.selectedItems.some(item => obj.id === item.iddmTieuChuanChatLuong && (item.isXoa != true || item.isXoa == undefined))) {
            obj.checked = true;
          }
        }
      });
      if (this.items.every(obj => obj.checked === true)) {
        this.checkedAll = true;
      }
    });
  }


  accept() {
    this.activeModal.close(this.selectedItems)
  }

  checkAll(e) {
      this.items.forEach(item => {
        item.checked = e.checked;
        this.checkItem(item)
      });
  }
checkItem(item){
  // this.checkedAll = this.items.every(ele => ele.checked)

if(item.checked == true)
{
  let itemFind: any = this.selectedItems.filter((e: any) =>e.iddmTieuChuanChatLuong === item.id)[0]
  if(itemFind === undefined){
    let itemFinds = this.items.find(e => e.checked === true && e.id === item.id);
    itemFinds = {
      idHopDong: this.IdQuyTrinh,
      iddmTieuChuanChatLuong: itemFinds.id,
      dacTinh: itemFinds.dacTinh,
      donVi: itemFinds.donVi,
      tieuChuan: itemFinds.tieuChuan,
      isXoa: false,
      id: '',
    }
    this.selectedItems.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.selectedItems.filter((e: any) =>e.iddmTieuChuanChatLuong === item.id)[0];
    if(itemFind !== undefined){
      itemFind.isXoa = true;
    }
  }
}
onClose() {
  this.activeModal.close(this.selectedItemsGoc)
}
}
