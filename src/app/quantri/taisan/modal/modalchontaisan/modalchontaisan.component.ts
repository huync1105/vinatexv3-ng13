import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { async } from 'rxjs/internal/scheduler/async';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan',
  templateUrl: './modalchontaisan.component.html',
  styleUrls: ['./modalchontaisan.component.css']
})
export class ModalchontaisanComponent implements OnInit {
  opt: any = "";

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
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.Loaddata();
  }

  Loaddata() {
    this._serviceTaiSan
    .GetTaiSanTheoLoai()
    .GetListTaiSanChuaBanGiao(0, 0, "","","")
    .subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data;
      items.forEach(obj => {
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
      this.checked();
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
    // this.checkedAll = this.items.every(ele => ele.data.checked)
    this.checkedAll = this.TimCheck();
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          // TaiSan: obj.data,
          TaiSan: {
            ...obj.data,
            MaTaiSan: obj.data.Ma,
            TenTaiSan: obj.data.Ten
          },
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
              // TaiSan: objchildren.data,
              TaiSan: {
                ...objchildren.data,
                MaTaiSan: objchildren.data.Ma,
                TenTaiSan: objchildren.data.Ten
              },
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
