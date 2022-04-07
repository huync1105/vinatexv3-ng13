import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validVariable } from 'src/app/services/globalfunction';
import { ThongTinHangHoaModalComponent } from '../thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';

@Component({
  selector: 'app-thong-tin-hang-hoa',
  templateUrl: './thong-tin-hang-hoa.component.html',
  styleUrls: ['./thong-tin-hang-hoa.component.css']
})
export class ThongTinHangHoaComponent implements OnInit, OnChanges {

  @Input() item: any = {};
  listItem_copy: any = [];
  filter: any = {};
  paging: any = {};
  checkedAll: boolean = false;
  fileUpload: any;


  constructor(
    public modal: NgbModal,
    public activeModal: NgbActiveModal,
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item.listItem) {
      this.LoadData();
    } else {
      this.item.listItem = [];
    }
  } 

  ngOnInit(): void {
  }
  
  SearchHangHoa(keyword) {
    if ((validVariable(keyword)) && keyword.trim() !== '') {
      this.listItem_copy = this.listItem_copy.filter(ele => {
        return ele.MadmItem.includes(keyword) || ele.TendmItem.includes(keyword)
      })
      this.paging.totalCount = this.listItem_copy.length
    } else {
      this.LoadData();
    }
    // console.log(keyword);
  }

  LoadData() {
    this.listItem_copy = this.item.listItem;
    this.filter = {};
    this.paging = {
      currentPage: 1,
      totalCount: this.item.listItem.length,
    };
    this.checkedAll = false;
  }

  AddHangHoa() {
    let modalRef = this.modal.open(ThongTinHangHoaModalComponent, {
      size: "xl",
      backdrop: "static",
    })
    if (!validVariable(this.item.listItem)) {
      this.item.listItem = [];
    }
    modalRef.componentInstance.checkListItem = this.item.listItem;
    modalRef.result
      .then((res: any) => {
        this.item.listItem = this.item.listItem.concat(res);
        this.listItem_copy = this.item.listItem
        this.LoadData();
      })
      .catch(er => {});
    }

    DeleteListHangHoa() {
      this.item.listItem = this.item.listItem.filter(item => {
        return !item.checked === true;
      })
      this.LoadData();
    }

    CheckAllHangHoa() {
      this.item.listItem.forEach((obj)=>{
        obj.checked = this.checkedAll;
      })
    }
  
  // ExportListHangHoa() {
  //   let data = {
  //     CurrentPage: 0,
  //     PageSize: 20,
  //     Ma: "",
  //     Ten: "",
  //     Keyword: this.filterHangHoa.keyword,
  //     GhiChu: "",
  //   }
  //   this.taiSanService.NhaCungUng().ExportItem(data).subscribe((res: any)=>{
  //     window.open(res.Data);
  //   })
  // }

  // ImportListHangHoa() {
  //   let modalRef = this.modal.open(UploadmodalComponent, {
  //     size: 'md',
  //     backdrop: 'static',
  //   })
  //   modalRef.result
  //     .then((res: any)=>{
  //       this.fileUploadHangHoa = res;
  //       this.taiSanService.NhaCungUng().Import(this.fileUploadHangHoa[0]).subscribe(()=>{
  //         this.LoadListHangHoa(true);
  //       })
  //     })
  //     .catch(er=>{})
  //     .finally()

  // }

  // SearchHangHoa() {
  //   this.listHangHoa = this.listHangHoa.filter(item => {
  //     if (
  //       item.Ma.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase()) ||
  //       item.Ten.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase())
  //     ) {
  //       // console.log(true);
  //       return item;
  //     } else {
  //       // console.log(false);
  //     }
  //   })
  //   if (this.filterHangHoa.keyword === '') {
  //     this.LoadListHangHoa();
  //   }
  // }

  

  // changePage(event) {
  //   this.pageHangHoa.currentPage = event + 1;
  //   this.LoadListHangHoa(false);
  // }

}
