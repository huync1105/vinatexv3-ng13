import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-themlotuonglaimodal',
  templateUrl: './themlotuonglaimodal.component.html',
  styleUrls: ['./themlotuonglaimodal.component.css']
})
export class ThemlotuonglaimodalComponent implements OnInit {
  items: any = [];
  KeyWord: any = '';
  selectedItems: any = [];
  IdQuyTrinh: any = '';
  checkedAll:boolean;
  constructor(public _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
      let selected = this.items.filter(item => sItem.IdLoBong === item.IdLoBong)[0];
      if (selected) {
        selected.checked = true;
        selected.disable = true;
      }
    });
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        if(!item.disable){
          item.checked = false;
        }
      });
    }
  }
  checked(){
    this.checkedAll = this.items.every(ele=>ele.checked)
  }
  accept() {
    this._activeModal.close(this.items.filter(item => item.checked && !item.disable).map(ele => {
      return {
        ...ele,
        // Ten: `${ele.Ma} - ${ele.Ten}`,
        IdGiaoKeHoachSanXuat: this.IdQuyTrinh,
        IddmItem: ele.Id,
        Id: '',
      }
    }));
  }

}
