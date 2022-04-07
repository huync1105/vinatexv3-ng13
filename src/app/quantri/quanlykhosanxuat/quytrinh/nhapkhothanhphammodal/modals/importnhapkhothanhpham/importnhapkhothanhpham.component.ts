import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploaderOptions, FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { API } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-importnhapkhothanhpham',
  templateUrl: './importnhapkhothanhpham.component.html',
  styleUrls: ['./importnhapkhothanhpham.component.css']
})
export class ImportnhapkhothanhphamComponent implements OnInit {
  uploader: FileUploader;
  IdDuAn: any;
  TepImport: any = {
    TenGoc: ''
  }
  constructor(public _modalActive: NgbActiveModal, private _modal: NgbModal,
    private service: SanXuatService, private _toastr: ToastrService, private store: StoreService) { }

  ngOnInit(): void {
    this.IdDuAn = this.store.getCurrent();
    let option: FileUploaderOptions = {
      url: `${API.uploadURL}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
    }

    this.uploader = new FileUploader(option);
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    let res = JSON.parse(response);
    console.log(res)
    this.TepImport.TenGui = res[0].Name;
    this.TepImport.TenGoc = res[0].NameLocal;
    this.TepImport.DuongDan = res[0].Url;
  };
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }
  accept(){
    this.service.ImportPhieuKiemKeKho(this.TepImport.TenGui).subscribe((res: any) => {
      this._modalActive.close({items:res})
    })
  }
}
