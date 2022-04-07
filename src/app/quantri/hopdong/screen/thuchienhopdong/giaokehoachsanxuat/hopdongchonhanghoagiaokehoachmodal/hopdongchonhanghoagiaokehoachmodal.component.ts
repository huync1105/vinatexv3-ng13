import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-hopdongchonhanghoagiaokehoachmodal',
  templateUrl: './hopdongchonhanghoagiaokehoachmodal.component.html',
  styleUrls: ['./hopdongchonhanghoagiaokehoachmodal.component.css']
})
export class HopdongchonhanghoagiaokehoachmodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
    constructor(public _activeModal: NgbActiveModal, public _toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.items.forEach(item => {
      item.checked = false;
    });
    if (this.selectedItems.length !== 0) {
      switch (this.opt) {
        default:
          console.log(this.selectedItems)
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.iddmItem === item.iddmItem && sItem.idHopDong === item.idHopDong)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
      }
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
    if (this.items.length !== 0) {
      this.checkedAll = this.items.every((ele) => ele.checked);
    }
  }
  resetFilter() {
    this.KeyWord = '';
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }
  checked(item) {
    if(item.checked == true)
    {
      let itemFind: any = this.selectedItems.filter((e: any) =>e.iddmItem === item.iddmItem && e.idHopDong === item.idHopDong)[0]
      if(itemFind === undefined){
        let itemFinds = this.items.find(e => e.iddmItem === item.iddmItem && e.idHopDong === item.idHopDong);
        this.selectedItems.push(itemFinds)
      }
      else
        itemFind.isXoa = false;
    }
    else{
      let itemFind = this.selectedItems.filter((e: any) =>e.iddmItem === item.iddmItem && e.idHopDong === item.idHopDong)[0];
      if(itemFind !== undefined){
        itemFind.isXoa = true;
      }
    }
  }
  accept() {
    this._activeModal.close(this.selectedItems)
  }
}
