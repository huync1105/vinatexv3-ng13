import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-banchephammodal',
  templateUrl: './banchephammodal.component.html',
  styleUrls: ['./banchephammodal.component.css']
})
export class BanchephammodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listCongDoan: any = [];
  listdmBanChePham: any = [];
  listdmBanChePhamFull: any = [];
  listItem: any = [];
  editTableItem: any = {};
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListdmBanChePham();
    this.getListCongDoan();
    
  }

  getListdmBanChePham() {
    this.services.dmKiemKeBanChePham().GetListAll().subscribe((res: any) => {
      this.listdmBanChePhamFull = res;
      if(this.item.CongDoan !== undefined){
        this.getListdmBanChePhamTheoCongDoan();
      }
    })
  }
  getListCongDoan() {
    this.services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  getListdmBanChePhamTheoCongDoan() {
    let listdm : any = [];
      this.listdmBanChePhamFull.forEach(element => {
        if(element.CongDoan === this.item.CongDoan){
          listdm.push(element);
        }
      });
      this.listdmBanChePham = mapArrayForDropDown(listdm, 'Ten', 'Ma');
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined) {
      this.item.Loai = 1;
      this.item.DonViThietKe = this.item.DonViDatHang;
      this.services.dmKiemKeBanChePham().Set(this.item).subscribe((res: any) => {
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
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }
}
