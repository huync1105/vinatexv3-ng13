import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';


@Component({
  selector: 'app-dinhmuctieuchichatluongsoimodal',
  templateUrl: './dinhmuctieuchichatluongsoimodal.component.html',
  styleUrls: ['./dinhmuctieuchichatluongsoimodal.component.css']
})
export class DinhmuctieuchichatluongsoimodalComponent implements OnInit {

  opt: any = ''
  item: any = [];
  SelectItem: any = {};

  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    console.log(this.item);

    if (this.item?.lstdmChiTieuChatLuong.length > 0) {
      this.item?.lstdmChiTieuChatLuong.forEach(element => {
        let indexOf = element.Ten.indexOf('Chi số thực tế (Ne)');
        if(indexOf > -1){
          element.disable = true;
        }
        else{
          element.disable = false;
        }       
      });
    }
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    this.services.dmDinhMucTieuChiChatLuongSoi().Set(this.item.lstdmChiTieuChatLuong).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.success(res.message);
          this.activeModal.close(res.message);
        } else {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.error(res.message);
        }
      }
    })
  }

}
