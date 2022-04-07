import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-luachonvattuphucuahanghoamodal',
  templateUrl: './luachonvattuphucuahanghoamodal.component.html',
  styleUrls: ['./luachonvattuphucuahanghoamodal.component.css']
})
export class LuachonvattuphucuahanghoamodalComponent implements OnInit {
  item: any = {};
  listThanhToanThuTuc: any = [];
  listHangHoa: any = [];
  listHangHoaGoc: any = [];
  IdQuyTrinh : any = '';
  Loai : any = 0;
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên ',
      field: 'Ten',
      width: 'unset'
    },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};

  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.listThanhToanThuTuc.length);
    this.listHangHoaGoc = deepCopy(this.listHangHoa);

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listThanhToanThuTuc.length;
    if(this.listHangHoa != undefined && this.listHangHoa!= null)
    {
      for(let i = 0; i < this.listHangHoa.length; i++){
        console.log(this.listHangHoa[i])
        let itemFind = this.listThanhToanThuTuc.find(
          ele => (ele.Id === this.listHangHoa[i].iddmVatTuPhu )
         )
        if(validVariable(itemFind)){
          itemFind.checked = true;
        }
      }
    }
    this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc.slice(0,15);
    this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
  }
  checkAll(e) {
    this.listThanhToanThuTuc.forEach(item => {
      item.checked = e.checked;
      this.checkItem(item)
    });
  }

  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref_copy.slice(start,end);
  }
  accept() {
    this.activeModal.close(this.listHangHoa)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = deepCopy(this.listThanhToanThuTuc);
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
      console.log(filter)
      this.item.listThuTucThanhToan_ref = filter;
      this.item.listThuTucThanhToan_ref_copy = filter;
    }
    else {
      this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc;
      this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listThuTucThanhToan_ref.length;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
  
checkItem(item){
if(item.checked == true)
{
  let itemFind: any = this.listHangHoa.filter((e: any) =>e.iddmVatTuPhu === item.Id)[0]
  if(itemFind === undefined){
    let itemFinds = this.listThanhToanThuTuc.find(e => e.checked === true && e.Id === item.Id);
    itemFinds = {
      idHopDong: this.IdQuyTrinh || '',
      iddmVatTuPhu: itemFinds.Id,
      tendmItem: itemFinds.Ten,
      iddmLoaiSoi: itemFinds.IddmLoaiSoi,
      // tendmMatHang: itemFinds.Ten,
      madmItem: itemFinds.Ma,
      isXoa: false,
      id: '',
    }
    this.listHangHoa.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.listHangHoa.filter((e: any) =>e.iddmVatTuPhu === item.id)[0];
    if(itemFind !== undefined){
      itemFind.isXoa = true;
    }
  }
}
Onclose() {
  this.activeModal.close(this.listHangHoaGoc)

}
}
