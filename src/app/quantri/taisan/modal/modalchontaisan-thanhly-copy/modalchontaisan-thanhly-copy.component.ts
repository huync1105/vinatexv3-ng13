import { dataLoader } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan-thanhly-copy',
  templateUrl: './modalchontaisan-thanhly-copy.component.html',
  styleUrls: ['./modalchontaisan-thanhly-copy.component.css']
})
export class ModalchontaisanThanhlyCopyComponent implements OnInit {
  opt: any = "";
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = "";
  checkedAll: boolean = false;
  selectedNodes: TreeNode[] = [];
  listTaiSanDaChon: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  Keyword: any = '';
  filter: any = {};

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
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
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
    }
    this._serviceTaiSan.GetListTaiSanThanhLy().GetList(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.map(ele => {
        return {
          data: {
            ...ele
          },
          children: []
        }
      });
      this.items = this.TreeItems(this.items)
      this.listTaiSanDaChon = this.TimCheck(this.items)
      this.listItemDaChon.forEach(ele => {
        this.listTaiSanDaChon.forEach(obj => {
          if (obj.data.Id === ele) {
            this.selectedNodes.push(obj)
          }
        })
      })
    })
  }

  TreeItems(list) {
    list.forEach(ele => {
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => ele.data.IdTaiSan === null)
  }
  TimCheck(list: Array<any>) {
    let newArr = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.TimCheck(ele.children)];
      }
    })
    return newArr;
  }
  FilterTree() {
    let data = [];
    data = this.selectedNodes.map(ele => {
      console.log(ele);
      
      return {
        MaTaiSan: ele.data.Ma,
        Id:'',
        // Id: ele.data.Id,
        GiaTriConLai: ele.data.GiaTriConLai,
        TenTaiSan: ele.data.Ten,
        IdTaiSan: ele.data.Id,
      }
    })
    return data;
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

//   GetList() {
//   let data = {
//     CurrentPage: 0,
//     PageSize: 0,
//     Keyword: '',
//     IddmLoaiTaiSan: '',
//     IdBoPhanSuDung: this.item.IdBoPhanSuDung,
//   }
//   this._serviceTaiSan.GetListTaiSanThanhLy().GetList(data).subscribe((res: any) => {
//     let items = [];
//     this.items = [];
//     items = res.Data;
//     items.forEach(obj => {
//       obj.checked = this.listItemDaChon.includes(obj.Id);
//       let obj_copy: any = {};
//       if (obj?.listTaiSan) {
//         obj_copy.children = [];
//         obj.listTaiSan.forEach(element => {
//           element.checked = this.listItemDaChon.includes(element.Id);
//           obj_copy.children.push({ data: element });
//         });
//         obj.listTaiSan = undefined;
//       }
//       obj_copy.data = obj;
//       this.items.push({ data: obj_copy.data, children: obj_copy.children });
//     });
//     this.checkedAll = items.every(ele => ele.checked);
//   });
// }

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

// checked() {
//   this.checkedAll = this.TimCheck();
//   this.items.forEach(obj => {
//     obj.children.forEach(objchildren => {
//       objchildren.data.checked = obj.data.checked;
//     })
//   })

// }

// FilterTree() {
//   let data: any = [];
//   this.items.forEach(obj => {
//     if (obj.data.checked) {
//       data.push({
//         IdTaiSan: obj.data.Id,
//         Id: '',
//         TenTaiSan: obj.data.Ten,
//         MaSanPham: obj.data.Ma,
//         NguyenGia: obj.data.NguyenGia,
//         GiaTriConLai: obj.data.GiaTriConLai,
//       });
//     }
//     if (validVariable(obj.children) && obj.children.length > 0) {
//       obj.children.forEach(objchildren => {
//         if (objchildren.data.checked) {
//           data.push({
//             IdTaiSan: objchildren.data.Id,
//             Id: '',
//             TenTaiSan: objchildren.data.Ten,
//             MaTaiSan: objchildren.data.Ma,
//             NguyenGia: objchildren.data.NguyenGia,
//             GiaTriConLai: objchildren.data.GiaTriConLai,
//           });
//         }
//       });
//     }
//   });
//   return data;
// }
  

  GhiLai() {
    this.activeModal.close(this.FilterTree());
    console.log(this.FilterTree());
    
  }

}