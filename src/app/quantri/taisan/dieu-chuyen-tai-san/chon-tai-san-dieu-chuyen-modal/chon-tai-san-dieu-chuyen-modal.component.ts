import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon-tai-san-dieu-chuyen-modal',
  templateUrl: './chon-tai-san-dieu-chuyen-modal.component.html',
  styleUrls: ['./chon-tai-san-dieu-chuyen-modal.component.css']
})
export class ChonTaiSanDieuChuyenModalComponent implements OnInit {

  opt: any = "";
  filter: any = {};
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.Loaddata();
  }

  resetFilter() {
    
  }

  Loaddata() {
    this._serviceTaiSan
    .GetTaiSanTheoLoai()
    .GetListTaiSanDieuChuyen(0, 0, "","","")
    .subscribe((res: any) => {
      let resItems = [];
      this.items = [];
      resItems = res.Data;
      resItems.forEach(obj => {
        obj.checked = this.listIdDaChon?.includes(obj.Id);
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            element.checked = this.listIdDaChon.includes(element.Id);
            obj_copy.children.push({ data: element, expanded: true });
          });
          obj.listTaiSan = null;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children, expanded: true });
      });
      // this.checked();
    })
  }

  // TimCheck() {
  //   let cha: boolean = false;
  //   let con: boolean = false;
  //   cha = this.items.every(ele => ele.data.checked);
  //   this.items.filter(obj => {
  //     if (validVariable(obj.children) && obj.children.length > 0) {
  //       con = obj.children.every(ele => ele.data.checked);
  //       if (!con) {
  //         return false;
  //       }
  //     }
  //   });
  //   if ((cha) && (con)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // checkAll(e) {
  //   if (e.checked) {
  //     this.items.forEach(obj => {
  //       obj.data.checked = true;
  //       if (validVariable(obj.children) && obj.children.length > 0) {
  //         obj.children.forEach(objchildren => {
  //           objchildren.data.checked = true;
  //         });
  //       }
  //     });
  //   } else {
  //     this.items.forEach(obj => {
  //       obj.data.checked = false;
  //       if (validVariable(obj.children) && obj.children.length > 0) {
  //         obj.children.forEach(objchildren => {
  //           objchildren.data.checked = false;
  //         });
  //       }
  //     });
  //   }
  // }

  // checked(item?) {
  //   // this.checkedAll = this.items.every(ele => ele.checked)
  //   this.checkedAll = this.TimCheck();
  //   console.log(item);
  // }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          TaiSan: obj.data,
          IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
          IdTaiSan: obj.data.Id,
          IdCha: null,
          Id: '',
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            data.push({
              TaiSan: objchildren.data,
              IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
              IdTaiSan: objchildren.data.Id,
              IdCha: obj.data.checked ? obj.data.Id : null,
              Id: '',
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

}
