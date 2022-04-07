import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { UploadmodalComponent } from '../../modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-uploadhdsdsanxuat',
  templateUrl: './uploadhdsdsanxuat.component.html',
  styleUrls: ['./uploadhdsdsanxuat.component.css']
})
export class UploadhdsdsanxuatComponent implements OnInit {
  hdsd: any={};
  constructor(private _modal: NgbModal, private _service: SanXuatService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.getiHDSD();
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // this.hdsd.ID = 0;
      this.hdsd.FileNameGUI = data[data.length - 1].Name;
      this.hdsd.FileName = data[data.length - 1].NameLocal;
      // this.hdsd.DuongDan = data[data.length - 1].Url;
    }, (reason) => {
    });
  }
  uploadHDSD(){
    this._service.HDSD().Set(this.hdsd).subscribe((res:any)=>{
      if(res?.State===1){
        this._toastr.success(res.message)
      }else{
        this._toastr.error(res.message)
      }
    })
  }
  getiHDSD(){
    this._service.HDSD().Get().subscribe((res:any)=>{
      this.hdsd = res;
    })
  }
}
