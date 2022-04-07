import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-baocaothongketiendienmodal',
  templateUrl: './baocaothongketiendienmodal.component.html',
  styleUrls: ['./baocaothongketiendienmodal.component.css']
})
export class BaocaothongketiendienmodalComponent implements OnInit {
  listKhungGio: any = [];
  NgayNhap: any = Date;
  items: any = [];
  constructor(private _service: SanXuatService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    let data: any = {};
    this._service.ThongKeDien().GetDanhSachLoaiKhungGio(data).subscribe((res: any) => {
      this.listKhungGio = res;
    })
  }

}
