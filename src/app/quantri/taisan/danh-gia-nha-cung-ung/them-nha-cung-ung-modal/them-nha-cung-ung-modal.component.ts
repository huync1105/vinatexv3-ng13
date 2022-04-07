import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-them-nha-cung-ung-modal',
  templateUrl: './them-nha-cung-ung-modal.component.html',
  styleUrls: ['./them-nha-cung-ung-modal.component.css']
})
export class ThemNhaCungUngModalComponent implements OnInit {

  filter: any = {};
  paging: any = {};
  items: any = [];
  selectedList: any[] = [];
  checkListItem: any = [];
  checkedAll: boolean = false;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private taiSanService: TaisanService,
  ) { }

  ngOnInit(): void {
    this.ResetFilter();
  }

  ResetFilter() {
    this.filter = {};
    this.LoadData(true)
  }

  LoadData(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
    }
    this.taiSanService.NhaCungUng().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
      this.CheckExistedHangHoa();
    })
  }

  AddNhaCungUng() {
    // console.log(this.checkListItem);
    let newArr = this.checkListItem.map(item=>item.MadmNhaCungUng);
    this.selectedList = this.items.filter(item=>{
      return newArr.indexOf(item.Ma) === -1 && item.checked === true;
    })
    .map(item=> {
      return ({
        IddmNhaCungUng: item.Id,
        TendmNhaCungUng: item.Ten,
        MadmNhaCungUng: item.Ma,
        IdTrangThai: item.IddmTinhTrangNhaCungung,
      })
    })
    this.activeModal.close(this.selectedList);
  }

  CheckAllNhaCungUng() {
    this.items.forEach(item => {
      item.checked = this.checkedAll;
    })
  } 

  CheckExistedHangHoa() {
    this.items.forEach(item => {
      this.checkListItem.forEach(checkedItem => {
        if (item.Ma === checkedItem.MadmNhaCungUng) {
          item.checked = true;
        }
      })
    })
  }

}