import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-sucosuachua2',
  templateUrl: './sucosuachua2.component.html',
  styleUrls: ['./sucosuachua2.component.css']
})
export class Sucosuachua2Component implements OnInit {
  @Input("ThongTinQuerySuCoTaiSan") ThongTinQuerySuCoTaiSan:any=null;
  
  paging: any = {CurrentPage:1};
  item: any;
  listItems:any =[];
  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService, private _serviceTaiSan: TaisanService,) { }
  
  ngOnInit(): void {
    // console.log(112)
    // this.GetList();
  }
  ngOnChanges(changes: SimpleChanges){
    this.GetList();
  }
  
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      ...this.ThongTinQuerySuCoTaiSan,
      
      CurrentPage: this.paging.CurrentPage,
    }
    this._serviceTaiSan.ListDanhSachSuCo().Get(data).subscribe((res: any) => {
       console.log(res)
         if (res.StatusCode !== 200) {
    this.toastr.error(res.Message);
  } else {
    this.listItems=res.Data.Items;
    this.paging = res.Data;
    // this.toastr.success(res.Message);
    // this.activeModal.close();
  }
      //  this.listItems=res.Data.Items;
      //  this.paging = res.Data;
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.Page + 1;
    this.GetList();
  }

}
