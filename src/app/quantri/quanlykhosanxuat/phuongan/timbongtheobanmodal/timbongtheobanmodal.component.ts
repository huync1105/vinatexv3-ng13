import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-timbongtheobanmodal',
  templateUrl: './timbongtheobanmodal.component.html',
  styleUrls: ['./timbongtheobanmodal.component.css']
})
export class TimbongtheobanmodalComponent implements OnInit {
  BanBong:string;
  TenLo:string;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  accept() {
    this.activeModal.close(this.BanBong);
  }
}
