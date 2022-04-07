import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachontaisantheolichxich',
  templateUrl: './modalluachontaisantheolichxich.component.html',
  styleUrls: ['./modalluachontaisantheolichxich.component.css']
})
export class ModalluachontaisantheolichxichComponent implements OnInit {
  opt: any = "";
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  Chon: any = [];
  listCha: any = [];
  listLoaiTaiSan: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  TaiSanItem: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    let data = {
      Keyword: this.filter.Keyword,
      CurrentPage: 0,
      PageSize: 20,
      MaCongDoan: '',
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
    this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.GetList();
  }
  GetList() {
    let data = {
      Keyword: this.filter.Keyword,
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      MaCongDoan: '',
      IdBoPhanSuDung:this.item.IdBoPhanSuDung,
      IddmLoaiTaiSan:this.item.IddmLoaiTaiSan ,
      IdUser: '',
      Ngay: 0,
      LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.LichXich().GetListTaiSanTheoNam(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.TaiSanItem = res.Data;

      this.listdmLoaiBaoDuong = this.TaiSanItem.listdmLoaiBaoDuong;
      this.items = [];
      this.listCha = this.TaiSanItem.listTaiSan;
      this.listCha.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);
        let data: any = { data: obj, children: [] };
        obj.listTaiSan.forEach(con => {
          let datacon: any = { data: con, children: [] };
          con.checked = this.listItemDaChon.includes(con.IdTaiSan);
          data.children.push(datacon);
        });
        this.items.push(data);
      });
      this.checkedAll = this.listCha.every(ele => ele.checked);
    })
  }

  TimCheck() {
    let cha: boolean = false;
    let con: boolean = false;
    cha = this.items.every(ele => ele.data.checked);
    this.items.filter(obj => {
      if (validVariable(obj.children) && obj.children.length > 0) {
        con = obj.children.every(ele => ele.data.checked);
        if (!con) {
          return false;
        }
      }
    });
    if ((cha) && (con)) {
      return true;
    }
    else {
      return false;
    }
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.data.checked = true;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = true;
          });
        }
      });
    } else {
      this.items.forEach(obj => {
        obj.data.checked = false;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = false;
          });
        }
      });
    }
  }
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          IdTaiSan: obj.data.IdTaiSan,
          Id: '',
          TenTaiSan: obj.data.TenTaiSan,
          listLichBaoDuong: obj.data.listLichBaoDuong
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            data.push({
              IdTaiSan: objchildren.data.IdTaiSan,
              Id: '',
              TenTaiSan: objchildren.data.TenTaiSan,
              listLichBaoDuong: objchildren.data.listLichBaoDuong
            });
          }
        });
      }
    });
    return data;
  }
  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}
