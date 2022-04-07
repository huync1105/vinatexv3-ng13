import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chonmathangthanhtoanhopdong',
  templateUrl: './chonmathangthanhtoanhopdong.component.html',
  styleUrls: ['./chonmathangthanhtoanhopdong.component.css']
})
export class ChonmathangthanhtoanhopdongComponent implements OnInit {
  item: any = {};
  listMatHang: any = [];
  listItem: any = [];
  listItemGoc: any = [];
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
    {
      header: 'Ne',
      field: 'Ne',
      width: 'unset'
    },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};

  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if(this.listItem === undefined || this.listItem === null)
      this.listItem = []
    this.listItemGoc = deepCopy(this.listItem);
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    if(this.listItem != undefined && this.listItem!= null)
    {
      for(let i = 0; i < this.listItem.length; i++){
        console.log(this.listItem[i])
        let itemFind = this.listMatHang.find(
          ele => (ele.IddmItem === this.listItem[i].iddmItem )
         )
        if(validVariable(itemFind)){
          itemFind.checked = true;
        }
      }
    }
    this.item.listMatHang_ref = this.listMatHang.slice(0,15);
    this.item.listMatHang_ref_copy = this.listMatHang;
  }
  checkAll(e) {
    this.listMatHang.forEach(item => {
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
    this.activeModal.close(this.listItem)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = this.listMatHang;
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.ten.toLowerCase().includes(this.KeyWord.toLowerCase())
        // obj => {
        // if(obj.Ten === "CD 23"){
        //   debugger

        // }
        // let Ten = obj.Ten.toLowerCase();
        // let indexOf = Ten.includes(this.KeyWord.toLowerCase());
        // return indexOf != false
      // }
      );
      console.log(filter)
      this.item.listThuTucThanhToan_ref = filter;
      this.item.listThuTucThanhToan_ref_copy = filter;
    }
    else {
      this.item.listThuTucThanhToan_ref = this.listMatHang;
      this.item.listThuTucThanhToan_ref_copy = this.listMatHang;
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
  let itemFind: any = this.listItem.filter((e: any) =>e.iddmItem === item.Id)[0]
  if(itemFind === undefined){
    let itemFinds = this.listMatHang.find(e => e.checked === true && e.Id === item.Id);
    itemFinds = {
      iddmItem: itemFinds.Id,
      tendmMatHang: itemFinds.Ten,
      madmMatHang: itemFinds.Ma,
      isXoa: false,
      id: '',
    }
    this.listItem.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.listItem.filter((e: any) =>e.IddmItem === item.id)[0];
    if(itemFind !== undefined){
      itemFind.isXoa = true;
    }
  }
}
Onclose() {
  this.activeModal.close(this.listItemGoc)

}
}
