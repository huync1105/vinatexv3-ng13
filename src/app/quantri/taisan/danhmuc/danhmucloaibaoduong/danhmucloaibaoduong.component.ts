import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModalbaoduongComponent } from '../../modal/modalbaoduong/modalbaoduong.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
@Component({
  selector: 'app-danhmucloaibaoduong',
  templateUrl: './danhmucloaibaoduong.component.html',
  styleUrls: ['./danhmucloaibaoduong.component.css']
})
export class DanhmucloaibaoduongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  fileUpload: any;
  items: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  cols: any = [
    {
      header: 'Loại tài sản',
      field: 'TendmLoaiTaiSan',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Thời gian và số người thực hiện',
      field: 'ThoiGianVaSoNguoiThucTe',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Lịch bảo dưỡng',
      field: 'ThoiGianNangSuat',
      width: '150px',
      align: 'center'
    },
  ];
  selectedItems: any = [];
  listTaiSan: any = [];
  TenLoaiTaiSan: '';
  filter: any = {};

  constructor(private _modal: NgbModal, private _danhMucTaiSan: DanhmuctaisanService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.GetList();
    let data = { PageSize: 20, CurrentPage: this.paging.CurrentPage, Keyword: this.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })

  }
  resetFilter() {
     this.filter = {};
     this.Keyword = '';
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.Keyword,
      IddmLoaiTaisan: this.filter.IddmLoaiTaisan?this.filter.IddmLoaiTaisan : '',
      Ma: "",
      Ten: ""
    };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      // this.items.forEach(obj => {
      //   obj.TenLoaiTaiSan = this.listTaiSan.find(ele => ele.value == obj.IddmLoaiTaiSan).label;
      //   console.log(obj.TenLoaiTaiSan);
      // });
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {
    let modalRef = this._modal.open(ModalbaoduongComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới loại bảo dưỡng';
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(ModalbaoduongComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật loại bão dưỡng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().DeleteList([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    const listId = this.selectedItems.map(({ Id }) => Id);
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().DeleteList(listId).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  importExcel(){
    let modalRef = this._modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        this._danhMucTaiSan.DanhMucLoaiBaoDuong().Importdm(this.fileUpload[0]).subscribe(()=>{
          this.resetFilter();
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  }
  exportExcel(){
    let data = {
      PageSize:20, 
      CurrentPage:0,
      Keyword:this.Keyword, 
     
    };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().download(res.TenFile);
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }

}
