import { Component, OnInit } from '@angular/core';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NhaCungUngModalComponent } from './nha-cung-ung-modal/nha-cung-ung-modal.component';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-nha-cung-ung-danh-muc',
  templateUrl: './nha-cung-ung-danh-muc.component.html',
  styleUrls: ['./nha-cung-ung-danh-muc.component.css']
})
export class NhaCungUngDanhMucComponent implements OnInit {

  filter: any = {};
  items: any[];
  checkedAll: boolean = false;
  keyword: string = '';
  paging: any = {};
  fileUpload: any;
  trangThai: any = 0;
  listTrangThai: any[] = [];

  constructor(
    private taiSanService: TaisanService,
    public modal: NgbModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.GetListTinhTrang();
    this.taiSanService.NhaCungUng().GetListTinhTrang().subscribe((res: any)=>{
      this.listTrangThai = res.Data;
      this.ResetListNhaCungUng();
    })
  }

  GetListTinhTrang() {
    this.taiSanService.NhaCungUng().GetListTinhTrang().subscribe((res: any)=>{
      this.listTrangThai = res.Data;
    })
  }

  ChangeTab(e) {
    this.trangThai = e.index;
    this.ResetListNhaCungUng();
  }

  ResetListNhaCungUng() {
    this.filter = {};
    this.LoadListNhaCungUng(true);
  }

  LoadListNhaCungUng(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    this.checkedAll = false;
    let data = {
      IddmTinhTrangNhaCungung: this.listTrangThai[this.trangThai]?.Id || '',
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
    }
    this.taiSanService.NhaCungUng().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  AddNhaCungUng() {
    let modalRef = this.modal.open(NhaCungUngModalComponent, {
      size: 'fullscreen',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: "",
      Ma: "",
      Ten: "",
      GhiChu: "",
      HoatDong: true,
    }
    modalRef.result
      .then((res: any) => {})
      .catch(er => {})
      .finally(() =>{
        this.LoadListNhaCungUng()
      })
  }

  UpdateNhaCungUng(id) {
    let modalRef = this.modal.open(NhaCungUngModalComponent, {
      size: 'fullscreen',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'update';
    modalRef.componentInstance.item.Id = id;
    modalRef.result
      .then((res: any) => {})
      .catch(er => {})
      .finally(() =>{
        this.LoadListNhaCungUng()
      })
  }

  DeleteListCungUng() {
    let listFilter = this.items.filter(item => {
      return item.checked === true;
    })
    let listId = [];
    listId = listFilter.reduce((a,b)=>{
      return a.concat(b.Id);
    }, [])
    if (listId.length === 0) {
      this.toast.error('Chưa chọn nhà cung ứng')
    } else {
      this.taiSanService.NhaCungUng().DeleteList(listId).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message)
          this.ResetListNhaCungUng();
        } else {
          this.toast.error(res.Message)
        }
      })
    }
  }

  ExportCungUng() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: this.filter.keyword,
      GhiChu: "",
    }
    this.taiSanService.NhaCungUng().Export(data).subscribe((res: any) => {
      this.taiSanService.NhaCungUng().download(res.Data)
    });
  }

  ImportCungUng() {
    let modalRef = this.modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        console.log(this.fileUpload[0].Name);
        this.taiSanService.NhaCungUng().Import(this.fileUpload[0]).subscribe(()=>{
          this.ResetListNhaCungUng();
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  } 

  CheckAllNhaCungUng() {
    this.items.forEach(item=>{
      item.checked = this.checkedAll;
    })
  }  

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.LoadListNhaCungUng(false);
  }

}
