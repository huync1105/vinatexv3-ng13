import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-doikienbongmodal',
  templateUrl: './doikienbongmodal.component.html',
  styleUrls: ['./doikienbongmodal.component.css']
})
export class DoikienbongmodalComponent implements OnInit {
  KeyWord:string='';
  items:any=[];
  CurrentItem:any=[];
  IdPhieu:string;
  IdKienCu:string;
  IdKienMoi:string;
  constructor(private _activeModal:NgbActiveModal,public _services:SanXuatService,public _toastr:ToastrService) { }

  ngOnInit(): void {
  }
  doiKien(item){
    this.IdKienMoi = item.IddmItem;
    let cloneItem = deepCopy(item);
    item.Ten = this.CurrentItem[0].Ten;
    item.Mic = this.CurrentItem[0].Mic;
    item.Ma = this.CurrentItem[0].Ma;
    this.CurrentItem[0].Ten = cloneItem.Ten;
    this.CurrentItem[0].Ma = cloneItem.Ma;
    this.CurrentItem[0].Mic = cloneItem.Mic;
  }
  accept(){
    this._services.DoiKienPhieuXuatBong(this.IdPhieu,this.CurrentItem[0].IddmItem,this.IdKienMoi).subscribe((res:any)=>{
      if(res){
        if(validVariable(res.Error)){
          this._toastr.error(res.Detail)
        }else if(validVariable(res.Message)){
          this._toastr.error(res.Message)
        }
        else{
          this._activeModal.close([res])
        }
      }
      
    })
    // this._activeModal.close(this.CurrentItem);
  }
  cancel(){
    this._activeModal.dismiss();
  }
}
