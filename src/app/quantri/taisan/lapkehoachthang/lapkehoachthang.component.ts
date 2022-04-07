import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';

@Component({
  selector: 'app-lapkehoachthang',
  templateUrl: './lapkehoachthang.component.html',
  styleUrls: ['./lapkehoachthang.component.css']
})
export class LapkehoachthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = "";
  listNam: any = [];
  item: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  TaiSanItem: any = [];
  store: any;

  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    this.GetNextSoQuyTrinh();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }

    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    // this._serviceTaiSan.LichXich().GetListTaiSanTheoThang(data).subscribe((res: any) => {
    //   this.TaiSanItem = res.Data;
    // })
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();

    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });

    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.LichXichThang().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    // modalRef.componentInstance.Chon = this.TaiSanItem;
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan');
      this.item.listTaiSan.forEach(ele => {
        if (!validVariable(ele.listBaoDuong)) {
          ele.listBaoDuong = []
          for (let i = 1; i <= 30; i++) {
            ele.listBaoDuong.push(
              {
                ThoiGian: i,
                listChiTiet: [],
              }
            )
          }
        }
      })
    })
      .catch((er) => {
      });
  }

  Chon(item, itemLoaiBaoDuongDeChon) {
    let modalRef = this._modal.open(ModalluachonloaibaoduongComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.Lay_Chon = itemLoaiBaoDuongDeChon;
    modalRef.componentInstance.listItemDaChon = item.listChiTiet ? item.listChiTiet.map(ele => ele.IddmLoaiBaoDuong) : []
    modalRef.result.then((res: any) => {
      item.listChiTiet = res;
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    return this.item;
  }
  GhiLai() {
    this._serviceTaiSan.LichXichThang().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.item = res.Data;
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        // this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.LichXichThang().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.LichXichThang().KhongDuyet(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.LichXichThang().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

}

