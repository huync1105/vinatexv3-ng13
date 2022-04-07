import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-modaldmloaidien',
  templateUrl: './modaldmloaidien.component.html',
  styleUrls: ['./modaldmloaidien.component.css']
})
export class ModaldmloaidienComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  listNhomKho: any = [];
  listPhanXuong: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,private sanXuatService:SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  accept() {
    this.item.HoatDong  = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    this.sanXuatService.dmLoaiDien().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
    
  }
 
  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.activeModal.close(res.message);
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }
}
