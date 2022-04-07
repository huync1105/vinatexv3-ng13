import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-vitrikienmodal',
  templateUrl: './vitrikienmodal.component.html',
  styleUrls: ['./vitrikienmodal.component.css']
})
export class VitrikienmodalComponent implements OnInit {
  item: any = {}
  itemBanDau: any = ""
  itemThayThe: any = ""

  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    this.services.CheckViTriKien(this.item.TenLoBong, this.item.Ten).subscribe((res: any) => {
      this.itemBanDau = res;
    })
    this.services.CheckViTriKien(this.item.TenLoBong, this.item.MaKienDoi).subscribe((res: any) => {
      this.itemThayThe = res;
    })
  }
}
