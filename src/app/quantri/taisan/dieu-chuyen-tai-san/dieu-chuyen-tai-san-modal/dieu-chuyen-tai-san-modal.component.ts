import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, merge, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanComponent } from '../../modal/modalchontaisan/modalchontaisan.component';
import { ModalluachontaisantheolichxichComponent } from '../../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';
import { ChonTaiSanDieuChuyenModalComponent } from '../chon-tai-san-dieu-chuyen-modal/chon-tai-san-dieu-chuyen-modal.component';

@Component({
  selector: 'app-dieu-chuyen-tai-san-modal',
  templateUrl: './dieu-chuyen-tai-san-modal.component.html',
  styleUrls: ['./dieu-chuyen-tai-san-modal.component.css']
})
export class DieuChuyenTaiSanModalComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  checkbutton: any = {};
  uploader: FileUploader;
  tabTrangThai: number = 0;
  listdmPhanXuong: any = [];
  listDonVi: any = [];
  NameFile: string = "";
  listTaiSan_copy: TreeNode[];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
    } else {
      this.title = "Cập nhật";
      let listTaiSan: TreeNode[] = [];
      listTaiSan = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele, index);
      });
      this.listTaiSan_copy = listTaiSan;
    }
    if (validVariable(this.item.IdDuAn)) {
      this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
        this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
      });
    }
  }

  Validate() {
    if (!validVariable(this.item.IdBoPhanSuDungChuyen) &&
      !validVariable(this.item.IdBoPhanSuDungDen)) {
      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  Setdata() {
    this.item.NgayDieuChuyenUnix = DateToUnix(this.item.NgayDieuChuyen);
    // this.item.listTaiSan = [];
    // this.item.listTaiSan = this.listTaiSan_copy.map(ele => {
    //   return this.mapDataViewToModel(ele);
    // });
  }

  
  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.DieuChuyenTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  
  isEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0
  }
  
  
  GhiLai() {
    if (this.Validate()) {
      this.Setdata();
      if (this.opt === 'add') {
        this.item.Created = new Date();
        this.item.Modified = new Date();
      }
      if (this.KiemTraBoPhan()) {
        this._serviceTaiSan.DieuChuyenTaiSan().Set(this.item).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.item.Id = res.Data.Id;
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.Message);
          }
        })
      } else {
        this.toastr.error("Bộ phận chuyển không được trùng với bộ phận nhận!")
      }
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
    .then((res) => {
        this._serviceTaiSan.DieuChuyenTaiSan().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => {});
    }
    
    ChuyenDuyet() {
      if (this.Validate()) {
        this.Setdata();
        this._serviceTaiSan.DieuChuyenTaiSan().ChuyenTiep(this.item).subscribe((res: any) => {
          if (res.StatusCode !== 200) {
            this.toastr.error(res.Message);
          } else {
            this.toastr.success(res.Message);
            this.activeModal.close();
          }
        })
      }
    }

    KhongDuyet() {
      if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.DieuChuyenTaiSan().KhongDuyet(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }
  
  mapDataViewToModel(item: any) {
    return {
      Id: '',
      IdBanGiao: this.item.Id || '',
      IdTaiSan: item.data?.IdTaiSan,
      SoLuong: item.data?.SoLuong,
      GhiChu: item.data?.GhiChu || '',
      MaTaiSan: item.data?.TaiSan?.Ma,
      TenTaiSan: item.data?.TaiSan?.Ten,
      listTaiSan: this.isEmpty(item.children) ? item.children.map(ele => this.mapDataViewToModel(ele)) : null
    }
  }

  mapDataModelToView(ele, index, indexCha?) {
    return {
      data: {
        Id: ele.Id,
        IdCha: null,
        IdQuyTrinhBanGiao: this.item.Id,
        IdTaiSan: ele.IdTaiSan,
        STT: indexCha ? `${indexCha}.${index + 1}` : index + 1,
        SoLuong: ele.SoLuong,
        GhiChu: ele.GhiChu,
        TaiSan: ele
      },
      children: this.isEmpty(ele.listTaiSan) ? ele.listTaiSan.map((eleCon, indexCon) => {
        return this.mapDataModelToView(eleCon, indexCon, index + 1)
      }) : null,
      expanded: true
    }
  }

  ThemMoiDanhSachTaiSan() {
    let listId = [];
    this.listTaiSan_copy && this.listTaiSan_copy.forEach(ele => {
      listId.push(ele.data.IdTaiSan)
      ele.children && ele.children.forEach(child => {
        listId.push(child.data.IdTaiSan)
      })
    })
    let modalRef = this._modal.open(ChonTaiSanDieuChuyenModalComponent, {
      size: "xl",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.listIdDaChon = listId;
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
        this.item.listTaiSan = res;
        let listTaiSan = [];
        res.forEach((element) => {
          let Stt = 0;
          if (!validVariable(element.IdCha)) {
            Stt++;
            element.STT = Stt
            listTaiSan.push({
              data: element,
              expanded: true,
              children: res.filter(ele => ele.IdCha === element.TaiSan.Id)
                .map((e, index) => {
                  e.STT = `${Stt}.${index + 1}`
                  return {
                    data: e
                  }
                })
            });
          }
        });
        this.listTaiSan_copy = listTaiSan;
      })
      .catch((er) => {
      });
  }

  XoaTaiSan(item) {
    item = undefined
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  KiemTraBoPhan() {
    if (this.item?.IdBoPhanSuDungChuyen === this.item?.IdBoPhanSuDungDen) {
      return false;
    }
    return true
  }

}
