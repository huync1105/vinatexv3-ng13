import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chonhanghoamodal',
  templateUrl: './chonhanghoamodal.component.html',
  styleUrls: ['./chonhanghoamodal.component.css']
})
export class ChonhanghoamodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService) { }

  ngOnInit(): void {
    this.items.forEach(item => {
      item.checked = false;
    });
    if (this.selectedItems.length !== 0) {
      switch (this.opt) {
        case "KhoiLuongKeHoach":
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
            selected.KhoiLuongSanXuat = sItem.KhoiLuongSanXuat;
            if (selected) {
              selected.checked = true;
            }
          });
          break;
        case "KhoiLuongSanXuat":
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
        case "LoBong":
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IdLoBong === item.IdLoBong)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
        default:
          console.log(this.selectedItems)
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.Id)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
      }
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
    if (this.items.length !== 0) {
      this.checkedAll = this.items.every((ele) => ele.checked);
    }
  }
  resetFilter() {
    this.KeyWord = '';
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.items.every(ele => ele.checked)
  }
  accept() {
    switch (this.opt) {
      case "KhoiLuongKeHoach":
        let data = this.items.filter(item => item.checked)
        // data.forEach(mathang => {
        //   mathang.listItemTemp = {};
        //   this._services.GetOptions().GetListCongDoanTheoMatHang(mathang.IddmItem).subscribe((res: any) => {
        //     res.forEach(cd => {
        //       mathang.listItemTemp[cd.CongDoan] = []
        //     })
        //   })
        // });
        this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            IdGiaoKeHoachSanXuat_TrienKhai: this.IdQuyTrinh,
            IddmItem: ele.IddmItem,
            Id: '',
          }
        }))
        break;
      case "KhoiLuongSanXuat":
        this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            IdPhuongAnPhaBong: this.IdQuyTrinh,
            Id: '',
          }
        }));
        break;
      case "LoBong":
        let selected = this.items.filter(item => item.checked)
        if (selected.length > 0) {
          let loBongNguyen = selected.filter(ele => ele.IdLoBong !== null);
          if (loBongNguyen.length !== 0) {
            let valid = loBongNguyen.every(ele => validVariable(ele.TrongLuong) && validVariable(ele.Mic));
            if (valid) {
              this._activeModal.close(selected.map(ele => {
                return {
                  ...ele,
                  IdPhuongAnPhaBong: this.IdQuyTrinh,
                  tempBanBong: {},
                  Id: '',
                }
              }))
            } else {
              this._toastr.error('Vui lòng chỉ chọn lô bông có "Trọng Lượng Bình Quân" và "Mic Bình Quân"!!!')
            }
          } else {
            this._activeModal.close(selected.map(ele => {
              return {
                ...ele,
                IdPhuongAnPhaBong: this.IdQuyTrinh,
                tempBanBong: {},
                Id: '',
              }
            }))
          }
        } else {
          this._activeModal.close([]);
        }
        // this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
        //   return {
        //     ...ele,
        //     IdPhuongAnPhaBong: this.IdQuyTrinh,
        //     tempBanBong: {},
        //     Id: '',
        //   }
        // }))
        console.log(this.items.filter(item => item.checked));
        break;
      default:
        this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            // Ten: `${ele.Ma} - ${ele.Ten}`,
            IdGiaoKeHoachSanXuat: this.IdQuyTrinh,
            IddmItem: ele.Id,
            Id: '',
          }
        }));
    }
  }
}
