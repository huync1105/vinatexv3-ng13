import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';


@Component({
  selector: 'app-lapkehoachlichxichnam',
  templateUrl: './lapkehoachlichxichnam.component.html',
  styleUrls: ['./lapkehoachlichxichnam.component.css']
})
export class LapkehoachlichxichnamComponent implements OnInit {
  opt: any = "";
  listNam: any = [];
  item: any = {isChon:0,};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  store: any;
  TaiSanItem: any = [];
  count: number;
  trangThai:any = 0;


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
    // let data = {
    //   Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
    //   IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
    //   IdDuAn: 0,
    // };
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20,
      MaCongDoan: '',
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
      IdUser: '',
      Ngay: 0,
      LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.LichXich().GetListTaiSanTheoNam(data).subscribe((res: any) => {
      let baoDuong = res.Data.listTaiSan;
      this.item.listTaiSan.forEach(ele => {
        let taiSan = baoDuong.filter(obj => obj.IdTaiSan === ele.IdTaiSan);
        if (taiSan !== undefined) {
          ele.listLichBaoDuong = [];
          ele.listLichBaoDuong = taiSan[0]?.listLichBaoDuong;
        }
      })
    })

    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    this.GetNextSoQuyTrinh();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();

    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.LichXich().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    this.item.listTaiSan = this.item.listTaiSan.filter(ele => !ele.isXoa);
    return this.item;
  }
  GhiLai() {
    this._serviceTaiSan.LichXich().Set(this.setData()).subscribe((res: any) => {
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
    this._serviceTaiSan.LichXich().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.LichXich().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.LichXich().Delete(this.item.Id).subscribe((res: any) => {
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
  ThemMoiDanhSachTaiSan() {
   
    // if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ loại tài sản và bộ phận sử dụng!");
    //   return
    // }
    let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      // let listKetQua = [];
      // this.item.listTaiSan.forEach(Tai_San => {
      //   let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien !== undefined) {
      //     Tai_San.listBaoDuong = []
      //     for(let i = 1;i<=12;i++){
      //       Tai_San.listBaoDuong.push(
      //         {
      //           ThoiGian:i,
      //           listChiTiet:[],
      //         }
      //       )
      //     }
      //     listKetQua.push(Tai_San);
      //   }
      // });
      // // vong lap 2
      // res.forEach(Tai_San => {
      //   let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien === undefined) {
      //     Tai_San.listBaoDuong = []
      //     for(let i = 1;i<=12;i++){
      //       Tai_San.listBaoDuong.push(
      //         {
      //           ThoiGian:i,
      //           listChiTiet:[],
      //         }
      //       )
      //     }
      //     listKetQua.push(Tai_San);
      //   }
      // }); 
      // this.item.listTaiSan = listKetQua;

      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan');
      this.item.listTaiSan.forEach(ele => {
        if (!validVariable(ele.listBaoDuong)) {
          ele.listBaoDuong = []
          for (let i = 1; i <= 12; i++) {
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
  ChonLoaiTaiSan(i) {
    let item = this.item.listTaiSan.splice(i, 1)[0];
  }
  changeTab(e) {
    console.log('eeee', e);
    
    this.trangThai = e.index;
  }
}
