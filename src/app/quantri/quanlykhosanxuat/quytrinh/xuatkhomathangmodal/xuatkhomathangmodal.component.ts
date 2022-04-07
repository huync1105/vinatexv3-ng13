import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhomathangmodal',
  templateUrl: './xuatkhomathangmodal.component.html',
  styleUrls: ['./xuatkhomathangmodal.component.css']
})
export class XuatkhomathangmodalComponent implements OnInit {

  listMatHang: any = [];
  listItem: any = [];
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên lô',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Số kiện',
      field: 'SoLuong',
      width: 'unset'
    },
    {
      header: 'Khối lượng /kiện (kg)',
      field: 'TrongLuong',
      width: 'unset'
    },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};
  item: any = {};
  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    console.log(this.listItem)
    if(this.listItem != undefined && this.listItem!= null && this.listItem.length > 0)
    {
      for(let i = 0; i < this.listItem.length; i++){
        var itemFind = this.listMatHang.find(
          ele => (ele.IddmItem === this.listItem[i].IddmItem && ele.IdLoHang == this.listItem[i].IdLoHang)
        );
        if(itemFind !== undefined)
          itemFind.checked = true;
      }
    }
    this.item.listItem = this.listMatHang.slice(0,15);
    this.item.listItem_copy = this.listMatHang;
  }
  accept() {
    var itemFind: any = this.listMatHang.filter(function (obj) {
      return obj.checked == true;
    });
    console.log(itemFind);
    this.activeModal.close(
      { data: itemFind }
    );
  }
  checkAll(e) {
    if (e.checked) {
      this.listMatHang.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listMatHang.forEach(item => {
        item.checked = false;
      });
    }
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem = this.item.listItem_copy.slice(start,end);
  }
  // timKiemMatHang() {
  //   var listItem : any = [];
  //   this.listItem_new.forEach(element => {
  //     if(element.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || element.TenLoHang.toLowerCase().includes(this.KeyWord.toLowerCase()))
  //       listItem.push(element)
  //   });
  //   debugger
  //   this.listItem_new = listItem;
  // }
  // refresh(){
  //   this.KeyWord = '';
  //   var start = 15 * (this.paging.CurrentPage - 1);
  //   var end =  start + 15;
  //   if((start + 15) > this.paging.TotalItem)
  //     end= this.paging.TotalItem;
  //   this.item.listItem = this.listMatHang.slice(start,end);
  // }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listItem_copy = this.listMatHang;
      let filter: any = this.item.listItem_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase())
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
      this.item.listItem = filter;
      this.item.listItem_copy = filter;
    }
    else {
      this.item.listItem = this.listMatHang;
      this.item.listItem_copy = this.listMatHang;
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listItem.length;
    this.item.listItem = this.item.listItem.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
}
