import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chonkienchovaymodal',
  templateUrl: './chonkienchovaymodal.component.html',
  styleUrls: ['./chonkienchovaymodal.component.css']
})
export class ChonkienchovaymodalComponent implements OnInit {

  listMatHang: any = [];
  listItem: any = [];
  
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
        if(this.listItem[i].isXoa === true)
          continue;
        let itemFind = this.listMatHang.find(
          ele => (ele.IddmItem === this.listItem[i].IddmItem)
        );
        if(itemFind !== undefined)
          itemFind.checked = true;
      }
    }
    this.item.listItem = this.listMatHang.slice(0,15);
    this.item.listItem_copy = this.listMatHang;
  }
  accept() {
    this.activeModal.close(
      { data: this.listItem }
    );
  }
  checkAll(e) {
    if (e.checked) {
      this.listMatHang.forEach(item => {
        item.checked = true;
        let itemFind: any = this.listItem.filter((e: any) =>e.IddmItem === item.IddmItem)[0]
      if(itemFind === undefined){
        let itemFinds = {
          IddmItem: item.Id,
          Ten: item.Ten,
          Mic: item.Mic,
          TonSoLuong: item.TonSoLuong,
          isXoa: false,
          id: '',
        }
        this.listItem.push(itemFinds)
      }
      else
        itemFind.isXoa = false;

      });
    } else {
      this.listMatHang.forEach(item => {
        item.checked = false;
      });
      this.listItem.forEach(element => {
        element.isXoa = true;
      });
    }
  }
  checkItem(item){
    if(item.checked == true)
    {
      let itemFind: any = this.listItem.filter((e: any) =>e.IddmItem === item.IddmItem)[0]
      if(itemFind === undefined){
        let itemFinds = this.listMatHang.find(e =>e.IddmItem === item.IddmItem);
        itemFinds = {
          IddmItem: itemFinds.Id,
          Ten: itemFinds.Ten,
          Mic: itemFinds.Mic,
          TonSoLuong: itemFinds.TonSoLuong,
          isXoa: false,
          Id: '',
        }
        this.listItem.push(itemFinds)
      }
      else
        itemFind.isXoa = false;
    }
      else{
        let i : any = 0;
        for(; i < this.listItem.length ; i ++){
          if(item.IddmItem === this.listItem[i].IddmItem){
            let itemFind  = this.listItem.splice(i, 1)[0];
            if(validVariable(itemFind.Id)){
              itemFind.isXoa = true;
              this.listItem.push(JSON.parse(JSON.stringify(itemFind)));
            }
            break;
          }
        }
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
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listItem_copy = this.listMatHang;
      let filter: any = this.item.listItem_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase())
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
