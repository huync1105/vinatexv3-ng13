import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kiemkekhovattuphumodal',
  templateUrl: './kiemkekhovattuphumodal.component.html',
  styleUrls: ['./kiemkekhovattuphumodal.component.css']
})
export class KiemkekhovattuphumodalComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  opt: any = "";
  Id: any = "";
  item: any = {};
  checkbutton: any = {
      Ghi: true,
      KhongDuyet: false,
      ChuyenTiep: false,
      Xoa: false,
  };
  listdmKho: any = [];
  listdmViTri: any = [];
  listLoBong: any = [];
  listLoHang: any = [];
  paging: any = {};
  listItem: any = [];
  title: any = "";
  newItem: any = {};
  listNewMatHang: any = [];
  listNewMatHang_ref: any = [];
  KeyWord: string;
  constructor(
      public activeModal: NgbActiveModal,
      private services: SanXuatService,
      public toastr: ToastrService,
      public _modal: NgbModal
  ) { }

  ngOnInit(): void {
      if (this.opt !== "edit") {
          this.GetNextSoQuyTrinh();
      } else {
          this.GetQuyTrinh();
      }
      var data: any = {};
      data.CurrentPage = 0;
      data.Loai = 23;
      this.item.Loai = 23;
      this.services.GetListdmKho(data).subscribe((res: any) => {
          this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
      });
      // this.services
      //     .PhieuKiemKeKhoBongPhe()
      //     .GetlistdmMatHangKiemKeBongPhe(data.Loai = 7)
      //     .subscribe((res: any) => {
      //         this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
      //         this.listNewMatHang_ref = res;
      //     });
  }
  checklistMatHang(item) {
      if (this.listNewMatHang !== undefined && this.listNewMatHang !== null) {
          for (let i = 0; i < this.listNewMatHang.length; i++) {
              if (this.listNewMatHang[i].label === item.Ten) {
                  this.listNewMatHang.splice(i, 1);
                  break;
              }
          }
      }
  }
  checklistMatHangTheoKho() {
      if (this.listNewMatHang !== undefined && this.listNewMatHang !== null && this.listNewMatHang.length > 0) {
          if (this.item.listItem !== undefined && this.item.listItem !== null && this.item.listItem.length > 0) {
              for (let i = 0; i < this.listNewMatHang.length; i++) {
                  for (let j = 0; j < this.item.listItem.length; j++) {
                      if (this.listNewMatHang[i].label === this.item.listItem[j].Ten) {
                          this.listNewMatHang.splice(i, 1);
                          break;
                      }
                  }
              }
          }

      }
  }
  resetFilter() {
      this.KeyWord = null;
  }
  filter() {
      this.changePage({ page: 0 })
  }
  GetQuyTrinh() {
      this.services
          .PhieuKiemKeVatTuPhu()
          .Get(this.Id)
          .subscribe((res1: any) => {
              this.item = res1;
              this.paging.CurrentPage = 1;
              this.paging.TotalPage = 5;
              this.paging.TotalItem = res1.listItem.length;
              this.item.listItem = res1.listItem;
              this.listItem = this.item.listItem.slice(0, 10);
              this.KiemTraButtonModal();
              this.checklistMatHangTheoKho();
          });
  }
  KiemTraButtonModal() {
      this.services
          .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
          .subscribe((res) => {
              this.checkbutton = res;
          });
  }

  ChuyenDuyet() {
      this.item.listItem = deepCopy(this.listItem);
      this.services
          .PhieuKiemKeVatTuPhu()
          .ChuyenTiep(this.item)
          .subscribe((res: any) => {
              if (res) {
                  if (res.State === 1) {
                      this.activeModal.close();
                  } else {
                      this.toastr.error(res.message);
                  }
              }
          });
  }

  GetNextSoQuyTrinh() {
      this.services
          .PhieuKiemKeVatTuPhu()
          .GetNextSo()
          .subscribe((res: any) => {
              this.item.SoQuyTrinh = res.SoQuyTrinh;
          });
  }

  GhiLai() {
      this.services
          .PhieuKiemKeVatTuPhu()
          .Set(this.item)
          .subscribe((res: any) => {
              if (res) {
                  if (res.State === 1) {
                      this.toastr.success(res.message);
                      this.opt = "edit";
                      this.paginator.changePage(0);
                      this.Id = res.objectReturn.Id;
                      this.GetQuyTrinh();
                  } else {
                      this.toastr.error(res.message);
                  }
              }
          });
  }
  XoaQuyTrinh() {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
          backdrop: "static",
      });
      modalRef.componentInstance.message =
          "B???n c?? ch???c ch???n mu???n x??a quy tr??nh n??y ch????";
      modalRef.result
          .then((res) => {
              this.services
                  .PhieuKiemKeVatTuPhu()
                  .Delete(this.item)
                  .subscribe((res: any) => {
                      console.log(res);
                      if (res?.State === 1) {
                          this.activeModal.close();
                      } else {
                          this.toastr.error(res.message);
                      }
                  });
          })
          .catch((er) => console.log(er));
  }

  delete(index) {
      let item = this.item.listItem.splice((this.paging.CurrentPage-1)*10+index, 1)[0];
      if (item.Id === "" || item.Id === null || item.Id === undefined) {
      } else {
          this.toastr.warning("Thao t??c n??y ?????ng ngh??a vi???c kh??ng ki???m k??, kh??ng ?????ng ngh??a vi???c x??a kh???i kho");
          item.isXoa = true;
          this.item.listItem.push(JSON.parse(JSON.stringify(item)));
      }
      this.listItem = this.item.listItem.filter(ele => ele.isXoa !== true).slice((this.paging.CurrentPage-1)*10,10);
      this.paging.TotalItem = Math.ceil(this.item.listItem.filter(ele => ele.isXoa !== true).length);
  }

  GetMatHangTheoKho() {
      this.services.PhieuKiemKeVatTuPhu().luuKhoKiemKeKhoVatTuPhu(this.item.IddmKho).subscribe((res1: any) => {
          this.item.listItem = res1;
          this.listItem = this.item.listItem.slice(0, 10);
          this.paging.CurrentPage = 1;
          this.paging.TotalPage = 5;
          this.paging.TotalItem = res1.length;
          this.checklistMatHangTheoKho();
      });
  }
  changePage(event) {
      let clone = [];
      console.log(this.KeyWord);
      if (validVariable(this.KeyWord)) {
          clone = this.item.listItem.filter(ele => ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()));
      } else {
          clone = this.item.listItem
      }
      console.log(clone);
      this.paging.CurrentPage = event.page + 1;
      let start = 10 * event.page;
      let end = start + 10;
      this.paging.TotalItem = 0;
      this.paging.TotalItem = clone.length;
      if (start + 10 > clone.length) {
          end = clone.length;
      }
      this.listItem = clone.slice(start, end);
      console.log(this.listItem)
  }
  setNewItemName(event) {
      let selected = this.listNewMatHang_ref.find(
          (ele) => ele.Id === event.value
      );
      this.newItem.Ten = selected?.Ten;
      this.newItem.Ma = selected?.Ma;
      this.checklistMatHang(this.newItem);
  }
  add() {
      if (validVariable(this.newItem.IddmItem)) {
          this.item.listItem.push(deepCopy(this.newItem));
          this.newItem = {};
          console.log(this.paging);
          if (this.listItem.length > this.paging.CurrentPage * 10) {
              console.log(Math.floor(this.listItem.length / 10));
              this.paginator.changePage(
                  Math.floor(this.listItem.length / 10)
              );
          } else {
              this.changePage({ page: this.paging.CurrentPage - 1 });
          }
      } else {
          this.toastr.error("Vui l??ng ch???n m???t h??ng c???n th??m!");
      }
  }
 
  refreshFilter() {
      this.KeyWord = null;
      this.changePage({ page: 0 })
  }
  copy(value) {
      this.item.listItem.forEach(itemTon => {
          itemTon.TrongLuong = value;
      });
  }
}
