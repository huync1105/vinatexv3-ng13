import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalthanhlytaisanComponent } from '../modal/modalthanhlytaisan/modalthanhlytaisan.component';
@Component({
  selector: 'app-thanhlytaisan',
  templateUrl: './thanhlytaisan.component.html',
  styleUrls: ['./thanhlytaisan.component.css']
})
export class ThanhlytaisanComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = {  CurrentPage: 1, TotalPages: 1, TotalCount: 1};
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "THANHLYTAISAN";
  listPhanXuong:any=[];

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .ThanhLyTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.GetList();
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
  }
  resetFilter() {
    this.keyWord = '';
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
      sFilter: this.keyWord,
      TabTrangThai: this.trangThai,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,

    };
    this._serviceTaiSan.ThanhLyTaiSan().GetList(data).subscribe((res: any) => {
      // res.Data.Items.forEach(obj=>{  
      //   obj.TenPhanXuong = this.listPhanXuong.find(ele=>ele.value===obj.IddmPhanXuong)?.label||null;          
      // });
      this.items = res.Data.Items;  
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/thanhlytaisan/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(ModalthanhlytaisanComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard:false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = ' Thanh lý tài sản';
    modalRef.componentInstance.item = {
      Id: '',IdTaiSan: "", IdTrangThai: '', SoQuyTrinh: "", TenTrangThai: "",TendmPhanXuong:"",
      isKetThuc: false,listFileDinhKem:[],listTaiSan:[],
    };
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item) {
    let modalRef = this._modal.open(ModalthanhlytaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật thanh lý tài sản';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then(data => {
      })
      .catch(er => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }
  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }
}