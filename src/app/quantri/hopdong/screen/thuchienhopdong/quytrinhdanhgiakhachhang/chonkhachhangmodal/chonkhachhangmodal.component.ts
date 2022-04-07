import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-chonkhachhangmodal',
  templateUrl: './chonkhachhangmodal.component.html',
  styleUrls: ['./chonkhachhangmodal.component.css']
})
export class ChonkhachhangmodalComponent implements OnInit {
  item: any = {};
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh : any = '';
  Loai : any = 0;
  cols: any = [
    {
      header: 'Mã khách hàng',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên khách hàng',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số điện thoại',
      field: 'SoDienThoai',
      width: 'unset'
    },
    {
      header: 'Địa chỉ',
      field: 'DiaChi',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};
  listTieuChiDanhGia: any = [];
  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,private _hopdong: HopDongService,
  ) { }

  ngOnInit(): void {
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.items.length;
    if(this.selectedItems != undefined && this.selectedItems!= null)
    {
      for(let i = 0; i < this.selectedItems.length; i++){
        console.log(this.selectedItems[i])
        let itemFind = this.items.find(
          ele => (ele.Id === this.selectedItems[i].idKhachHang )
         )
        if(validVariable(itemFind)){
          itemFind.checked = true;
        }
      }
    }
    this.item.listItem_ref = this.items.slice(0,15);
    this.item.listItem_ref_copy = this.items;
    
  }
  
  checkAll(e) {
    this.items.forEach(item => {
      item.checked = e.checked;
      this.checkItem(item)
    });
  }

  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem_ref = this.item.listItem_ref_copy.slice(start,end);
  }
  accept() {
    this.activeModal.close(this.selectedItems)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listItem_ref_copy = deepCopy(this.items);
      let filter: any = this.item.listItem_ref_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
      console.log(filter)
      this.item.listItem_ref = filter;
      this.item.listItem_ref_copy = filter;
    }
    else {
      this.item.listItem_ref = this.items;
      this.item.listItem_ref_copy = this.items;
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listItem_ref.length;
    this.item.listItem_ref = this.item.listItem_ref.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
  
checkItem(item){
if(item.checked == true)
{
  let itemFind: any = this.selectedItems.filter((e: any) =>e.idKhachHang === item.Id)[0]
  if(itemFind === undefined){
    let itemFinds = this.items.find(e => e.Id === item.Id);
      let data: any = {
        idKhachHang: itemFinds.Id,
        khachHang: {
          diaChi: itemFinds.DiaChi,
          isXoa: false,
          id: '',
          soDienThoai: itemFinds.SoDienThoai,
          soFax: itemFinds.SoFax,
          ghiChu: itemFinds.GhiChu,
          maSoThue: itemFinds.MaSoThue,
          nguoiDaiDien: itemFinds.NguoiDaiDien,
          chucVu: itemFinds.ChucVu,
          taiKhoanNganHang: itemFinds.TaiKhoanNganHang,
          ten: itemFinds.Ten,
          ma: itemFinds.Ma,
        },
        tenKhachHang: itemFinds.Ten,
        maKhachHang: itemFinds.Ma,
        listTieuChiDanhGia: this.listTieuChiDanhGia,
        ketQuaDanhGia: 0,
      }
      this.selectedItems.push(data)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.selectedItems.filter((e: any) =>e.idKhachHang === item.Id)[0];
    if(itemFind !== undefined){
      itemFind.isXoa = true;
    }
  }
}
Onclose() {
  this.activeModal.close()
}
}
