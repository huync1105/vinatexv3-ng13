import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon-tai-san-khau-hao-modal',
  templateUrl: './chon-tai-san-khau-hao-modal.component.html',
  styleUrls: ['./chon-tai-san-khau-hao-modal.component.css']
})
export class ChonTaiSanKhauHaoModalComponent implements OnInit {

  opt: any = "";
  // filter: any = {};
  keyword: any = '';
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[];
  listTaiSanDaChon: any[] = [];
  idBoPhanSuDung: any = '';
  selectedNodes: TreeNode[] = [];

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

  TreeItems(list) {
    list.forEach(ele => {
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => ele.data.IdTaiSan === null)
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1
    }
    this._serviceTaiSan
      .GetTaiSanTheoLoai()
      .GetListTaiSanKhauHao("", this.idBoPhanSuDung, this.paging.currentPage, 20, this.keyword)
      .subscribe((res: any) => {
        this.items = res.Items.map(ele => {
          return {
            data: {
              ...ele,
            },
            children: []
          }
        })
        this.items = this.TreeItems(this.items);
        this.listTaiSanDaChon = this.CheckExistedTaiSan(this.items)
        this.listIdDaChon.forEach(ele => {
          this.listTaiSanDaChon.forEach(obj => {
            if (obj.data.Id === ele) {
              this.selectedNodes.push(obj)
            }
          })
        })
        // console.log('this items:', this.items);
        // let resItems = [];
        // this.items = [];
        // resItems = res.Data;
        // resItems.forEach(obj => {
        //   obj.checked = this.listIdDaChon?.includes(obj.Id);
        //   let obj_copy: any = {};
        //   if (obj?.listTaiSan) {
        //     obj_copy.children = [];
        //     obj.listTaiSan.forEach(element => {
        //       element.checked = this.listIdDaChon.includes(element.Id);
        //       obj_copy.children.push({ data: element, expanded: true });
        //     });
        //     obj.listTaiSan = null;
        //   }
        //   obj_copy.data = obj;
        //   this.items.push({ data: obj_copy.data, children: obj_copy.children, expanded: true });
        // });
        // this.checked();
        this.paging.totalCount = res.TotalCount;
      })
  }

  CheckExistedTaiSan(list: Array<any>) {
    let newArr = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.CheckExistedTaiSan(ele.children)];
      }
    })
    return newArr;
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

  // checked(item) {
  //   this.items.forEach(ele => {
  //     ele.children.forEach(a => {

  //     })
  //   })
  // }

  // FilterTree() {
  //   let data: any = [];
  //   this.items.forEach(obj => {
  //     if (obj.data.checked) {
  //       data.push({
  //         TaiSan: obj.data,
  //         IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
  //         IdTaiSan: obj.data.Id,
  //         IdCha: null,
  //         Id: '',
  //       });
  //     }
  //     if (validVariable(obj.children) && obj.children.length > 0) {
  //       obj.children.forEach(objchildren => {
  //         if (objchildren.data.checked) {
  //           data.push({
  //             TaiSan: objchildren.data,
  //             IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
  //             IdTaiSan: objchildren.data.Id,
  //             IdCha: obj.data.checked ? obj.data.Id : null,
  //             Id: '',
  //           });
  //         }
  //       });
  //     }
  //   });
  //   return data;
  // }

  SetData() {
    let data = [];
    data = this.selectedNodes.map(ele => {
      return {
        IdTaiSan: ele.data.Id,
        MaTaiSan: ele.data.Ma,
        TenTaiSan: ele.data.Ten,
        NguyenGia: ele.data.NguyenGia,
        GiaTriConLai: ele.data.GiaTriConLai
      }
    })
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.SetData());
  }

  nodeSelect() {
    console.log(this.selectedNodes);
  }

  

}
