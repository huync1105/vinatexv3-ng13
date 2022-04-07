// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-chitiethanghoacuahopdongsoimodal',
//   templateUrl: './chitiethanghoacuahopdongsoimodal.component.html',
//   styleUrls: ['./chitiethanghoacuahopdongsoimodal.component.css']
// })
// export class ChitiethanghoacuahopdongsoimodalComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { deepCopy, validVariable } from 'src/app/services/globalfunction';


import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-chitiethanghoacuahopdongsoimodal',
  templateUrl: './chitiethanghoacuahopdongsoimodal.component.html',
  styleUrls: ['./chitiethanghoacuahopdongsoimodal.component.css']
})
export class ChitiethanghoacuahopdongsoimodalComponent implements OnInit {
  item: any = {};
  listThanhToanThuTuc: any = [];
  listHangHoa: any = [];
  listHangHoaGoc: any = [];
  IdQuyTrinh : any = '';
  Loai : any = 0;
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên ',
      field: 'Ten',
      width: 'unset'
    },
    // {
    //   header: 'Ne',
    //   field: 'Ne',
    //   width: 'unset'
    // },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};

  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.listThanhToanThuTuc);
    this.listHangHoaGoc = deepCopy(this.listHangHoa);

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listThanhToanThuTuc.length;
    if(this.listHangHoa != undefined && this.listHangHoa!= null)
    {
      for(let i = 0; i < this.listHangHoa.length; i++){
        let itemFind = this.listThanhToanThuTuc.find(
          ele => (ele.IddmItem === this.listHangHoa[i].iddmItem  && this.listHangHoa[i].isXoa !== true)
         )
        if(validVariable(itemFind)){
          itemFind.checked = true;
        }
      }
    }
    this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc.slice(0,15);
    this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
  }
  checkAll(e) {
    this.listThanhToanThuTuc.forEach(item => {
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
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref_copy.slice(start,end);
  }
  accept() {
    this.activeModal.close(this.listHangHoa)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = deepCopy(this.listThanhToanThuTuc);
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
      console.log(filter)
      this.item.listThuTucThanhToan_ref = filter;
      this.item.listThuTucThanhToan_ref_copy = filter;
    }
    else {
      this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc;
      this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listThuTucThanhToan_ref.length;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
  
checkItem(item){
if(item.checked == true)
{
  let itemFind: any = this.listHangHoa.filter((e: any) =>e.iddmItem === item.Id)[0]
  if(itemFind === undefined){
    let itemFinds = this.listThanhToanThuTuc.find(e =>e.Id === item.Id);
    itemFinds = {
      idHopDong: this.IdQuyTrinh || '',
      iddmItem: itemFinds.Id,
      tendmItem: itemFinds.Ten,
      iddmLoaiSoi: itemFinds.IddmLoaiSoi,
      // tendmMatHang: itemFinds.Ten,
      madmItem: itemFinds.Ma,
      isXoa: false,
      id: '',
      thueGTGT: 10,
      soLuong: 0,
      donGia: 0,
    }
    this.listHangHoa.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let i : any = 0;
    for(; i < this.listHangHoa.length ; i ++){
      if(item.Id === this.listHangHoa[i].iddmItem){
        break;
      }
    }
    let itemFind  = this.listHangHoa.splice(i, 1)[0];
    if(validVariable(itemFind.id)){
      itemFind.isXoa = true;
      this.listHangHoa.push(JSON.parse(JSON.stringify(itemFind)));
    }
  }
}
Onclose() {
  this.activeModal.close(this.listHangHoaGoc)

}
}
