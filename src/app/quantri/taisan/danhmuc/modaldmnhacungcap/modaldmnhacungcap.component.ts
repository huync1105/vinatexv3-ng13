import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-modaldmnhacungcap',
  templateUrl: './modaldmnhacungcap.component.html',
  styleUrls: ['./modaldmnhacungcap.component.css']
})
export class ModaldmnhacungcapComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucTaiSan:DanhmuctaisanService, public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
  
  }
  
  GhiLai() {
      this._danhMucTaiSan.DanhMucNhaCungCap().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
        this.activeModal.close();
      })
    }
  }
  
