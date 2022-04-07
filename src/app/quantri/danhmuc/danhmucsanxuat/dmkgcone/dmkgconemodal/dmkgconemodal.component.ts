import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dmkgconemodal',
  templateUrl: './dmkgconemodal.component.html',
  styleUrls: ['./dmkgconemodal.component.css']
})
export class DmkgconemodalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  khongclicknhieu: any = false;

 
  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) {

  }
  ngOnInit(): void {
  }
  
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    this.item.GiaTri = this.item.GiaTri || 0;
    this.sanXuatService.SetdmKgCone(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.activeModal.close(res.message);
        } else {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.error(res.message)
        }
      }
    })
  }
}
