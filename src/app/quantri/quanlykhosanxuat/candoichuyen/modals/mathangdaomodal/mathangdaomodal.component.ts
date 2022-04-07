import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-mathangdaomodal',
  templateUrl: './mathangdaomodal.component.html',
  styleUrls: ['./mathangdaomodal.component.css']
})
export class MathangdaomodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService) { }

  ngOnInit(): void {
    if(this.items.length > 0){
      this.items.forEach(element => {
        element.SoLuong = element.TonSoLuong
      });
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
  checked(){
    this.checkedAll = this.items.every(ele=>ele.checked)
  }
  accept(){
    let dataReturn = this.items.filter(ele=>ele.checked===true && ele.SoLuong>0);
    if(dataReturn.length!==0){
      this._activeModal.close(dataReturn)
    }else{
      this._activeModal.dismiss();
    }
  }
}
