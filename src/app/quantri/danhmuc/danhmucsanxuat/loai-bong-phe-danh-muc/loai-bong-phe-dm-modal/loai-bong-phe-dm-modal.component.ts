import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-loai-bong-phe-dm-modal',
  templateUrl: './loai-bong-phe-dm-modal.component.html',
  styleUrls: ['./loai-bong-phe-dm-modal.component.css']
})
export class LoaiBongPheDmModalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  khongclicknhieu: any = false;
  listCongDoan: any = [];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListCongDoan()
  }
  GetListCongDoan() {
    this.sanXuatService.GetListCongDoan().subscribe((res:any[])=>{
      this.listCongDoan = mapArrayForDropDown(res,'Ten','Id')
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.sanXuatService.DanhMucLoaiBongPhe().Set(this.item).subscribe((res:any)=>{
        this.resAction(res);
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
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
