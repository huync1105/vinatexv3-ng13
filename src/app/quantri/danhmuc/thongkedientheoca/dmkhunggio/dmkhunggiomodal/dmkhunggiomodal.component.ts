import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmkhunggiomodal',
  templateUrl: './dmkhunggiomodal.component.html',
  styleUrls: ['./dmkhunggiomodal.component.css']
})
export class DmkhunggiomodalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  listnhomcongto: any = [];
  listmaybienap: any = [];
  khongclicknhieu: any = false;
  listLoaiKhungGio: any = [];
  listKhungGioRef: any = [];
  nhomKhungGioSelected: any = [];

  constructor(public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    let data: any = {};
    this.sanXuatService.ThongKeDien().GetDanhSachLoaiKhungGio(data).subscribe((res: any) => {
      this.listLoaiKhungGio =  mapArrayForDropDown(res,'Ten', 'Id');
    })
  }


  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!');
    }
  }

  Save() {
    this.item.lstIdKhungGioApDung=[];
    this.listKhungGioRef.forEach(khungGio => {
      if(this.nhomKhungGioSelected.includes(khungGio.MaNhomKhungGio)){
        this.item.lstIdKhungGioApDung.push(khungGio.Id)
      }
    });
    this.sanXuatService.ThongKeDien().SetItemKhungGio(this.item).subscribe((res: any) => {
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
