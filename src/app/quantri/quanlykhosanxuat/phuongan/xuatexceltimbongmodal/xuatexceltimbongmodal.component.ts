import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-xuatexceltimbongmodal',
  templateUrl: './xuatexceltimbongmodal.component.html',
  styleUrls: ['./xuatexceltimbongmodal.component.css']
})
export class XuatexceltimbongmodalComponent implements OnInit {
  BanBong:string;
  IdPhuongAnPhaBong:string;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _services:SanXuatService) { }

  ngOnInit(): void {
  }
  accept() {
    this._services.PhuongAnPhaBong().ExportTimBong(this.IdPhuongAnPhaBong,this.BanBong).subscribe((res:any)=>{
      console.log(res);
      this._services.download(res.TenFile);
      this.activeModal.dismiss('');
    })
  }
}
