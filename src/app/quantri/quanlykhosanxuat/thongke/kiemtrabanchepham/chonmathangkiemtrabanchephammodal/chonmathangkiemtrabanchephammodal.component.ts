import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonmathangkiemtrabanchephammodal',
  templateUrl: './chonmathangkiemtrabanchephammodal.component.html',
  styleUrls: ['./chonmathangkiemtrabanchephammodal.component.css']
})
export class ChonmathangkiemtrabanchephammodalComponent implements OnInit {
  listMatHang: any = [];
  listItem: any = [];
  cols: any = [
    {
      header: 'Số máy',
      field: 'TendmMay',
      width: 'unset'
    },
    {
      header: 'Ne',
      field: 'Ne',
      width: '10rem'
    },
    {
      header: 'Mặt hàng',
      field: 'Ten',
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
    if(this.listItem != undefined && this.listItem!= null && this.listItem.length > 0)
    {
      for(let i = 0; i < this.listItem.length; i++){
        let itemFind = this.listMatHang.find(
          ele => (ele.IddmItem === this.listItem[i].IddmItem && ele.IddmMay == this.listItem[i].IddmMay && ele.IddmLoaiSoi == this.listItem[i].IddmLoaiSoi)
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
  resetFilter(){
    this.KeyWord = "";
  }
}
