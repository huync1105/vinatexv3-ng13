import { Component, OnInit } from '@angular/core';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NhomNhaCungUngModalComponent } from './nhom-nha-cung-ung-modal/nhom-nha-cung-ung-modal.component';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';

interface NhomNhaCungUng {
  Id: string,
  Ten: string,
  GhiChu: String,
}

@Component({
  selector: 'app-nhom-nha-cung-ung-danh-muc',
  templateUrl: './nhom-nha-cung-ung-danh-muc.component.html',
  styleUrls: ['./nhom-nha-cung-ung-danh-muc.component.css']
})
export class NhomNhaCungUngDanhMucComponent implements OnInit {

  filter: any = {};
  items: any[];
  checkedAll: boolean = false;
  keyword: string = '';
  paging: any = {};
  fileUpload: any;

  constructor(
    private taiSanService: TaisanService,
    public modal: NgbModal,
    public toast: ToastrService,
    // private upload: UploadmodalComponent
  ) { }

  ngOnInit(): void {
    this.resetListNhomNhaCungUng();
  }

  resetListNhomNhaCungUng() {
    this.filter = {};
    this.LoadListNhomCungUng(true);
  }

  LoadListNhomCungUng(reset?) {
    if (reset===true) {
      this.paging.currentPage = 1;
    }
    this.checkedAll = false;
    let data = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
    }
    this.taiSanService.NhomNhaCungUng().GetListdmNhomNhaCungung(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  AddNhomCungUng() {
    let modalRef = this.modal.open(NhomNhaCungUngModalComponent, {
      size: 'lg',
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
      .then((res: any) => {

      })
      .catch(er => {

      })
      .finally(() =>{
        this.LoadListNhomCungUng()
      })
  }

  UpdateNhomCungUng(id) {
    let modalRef = this.modal.open(NhomNhaCungUngModalComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'update';
    modalRef.componentInstance.item.Id = id;
    modalRef.result
      .then((res: any) => {
      })
      .catch(er => {
      })
      .finally(() =>{
        this.LoadListNhomCungUng()
      })
  }

  DeleteListNhomCungUng() {
    let listFilter = this.items.filter(item => {
      return item.checked === true;
    })
    let listId = [];
    listId = listFilter.reduce((a,b)=>{
      return a.concat(b.Id);
    }, [])
    if (listId.length !== 0) {
      this.taiSanService.NhomNhaCungUng().DeleteListNhomCungUng(listId).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message)
          this.LoadListNhomCungUng();
        } else {
          this.toast.error(res.Message)
        }
      })
    } else {
      this.toast.error('Chưa chọn nhóm nhà cung ứng')
    }
  }

  ExportNhomCungUng() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: this.filter.keyword,
      GhiChu: "",
    }
    this.taiSanService.NhomNhaCungUng().ExportNhomNhaCungUng(data).subscribe((res: any) => {
      console.log('http://103.130.212.45:2269' + res.Data);
      window.open('http://103.130.212.45:2269' + res.Data)
    });
  }

  ImportNhomCungUng() {
    let modalRef = this.modal.open(UploadmodalComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        console.log(this.fileUpload[0].Name);
        this.taiSanService.NhomNhaCungUng().ImportFile(this.fileUpload[0]).subscribe(()=>{
          this.resetListNhomNhaCungUng();
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  } 

  SearchNhomNhaCungUng() {
    this.items = this.items.filter(item => {
      if (
        item.Ma.toLowerCase().includes(this.filter.keyword.toLowerCase()) ||
        item.Ten.toLowerCase().includes(this.filter.keyword.toLowerCase())
      ) {
        // console.log(true);
        return item;
      } else {
        // console.log(false);
      }
    })
    if (this.filter.keyword === '') {
      this.resetListNhomNhaCungUng();
    }
  }

  CheckAllNhomCungUng(e) {
    if (this.checkedAll) {
      this.items.forEach(item => {
        item.checked = true;
      })
    } else {
      this.items.forEach(item => {
        item.checked = false;
      })
    }
  } 

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.LoadListNhomCungUng();
  }

}
