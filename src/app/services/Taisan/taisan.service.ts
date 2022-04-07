import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaisanService {

  constructor(private http: HttpClient, public store: StoreService) { }

  NhapTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyTaiSan/GetNextQuyTrinhNhapTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/GetListQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetQuyTrinhNhapTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/SetQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/ChuyenTiepQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/ChuyenTiepQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/DeleteQuyTrinhNhapTaiSanById?Id=${Id}`, httpOptions);
      },
      GetListTaiSan: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanForLapKeHoachLichXich`, data, httpOptions);
      },
      GetListNhomTaiSan: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetListDanhMucTaiSanByIddmLoaiTaiSan?IddmLoaiTaiSan=${Id}`, httpOptions);
      },
    };
  }

  LichXich() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BaoDuongTaiSan/GetNextLapKeHoachLichXichNam`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListLapKeHoachLichXichNam`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/GetLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/SetLapKeHoachLichXichNam`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/KhongDuyetLapKeHoachLichXich`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/ChuyenTiepLapKeHoachLichXich`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/DeleteLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },
      GetListTaiSan: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanForLapKeHoachLichXichNam`, data, httpOptions);
      },
      GetListTaiSanTheoNam: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanForLapKeHoachLichXichNam`, data, httpOptions);
      },
      GetListTaiSanTheoThang: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanForLapKeHoachLichXichThang`, data, httpOptions);
      },
    };
  }

  LichXichThang() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BaoDuongTaiSan/GetNextLapKeHoachLichXichThang`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListLapKeHoachLichXichThang`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/GetLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/SetLapKeHoachLichXichThang`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/KhongDuyetLapKeHoachLichXich`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/ChuyenTiepLapKeHoachLichXich`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/DeleteLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },

    };
  }
  ListLichXichNam() {
    let url = API.TaiSan;
    return {
      GetListBaoDuong: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetLichXichNamLoaiBaoDuong`, data, httpOptions);
      },
      GetListMay: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetLichXichNamLoaiTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmLoaiBaoDuongById?Id=${Id}`, httpOptions);
      },
    };
  }
  ListLichXichThang() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetLichXichThangLoaiBaoDuong`, data, httpOptions);
      },
    };
  }
  ChiTietTaiSanLichBaoDuong() {
    let url = API.TaiSan;
    return {
      GetNam: (Id, Ngay) => {
        return this.http.get(`${url}QuanLyTaiSan/GetChiTietTaiSanById_LichBaoDuongNam?Id=${Id}&Ngay=${Ngay}`, httpOptions);
      },
      GetThang: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetChiTietTaiSanById_LichBaoDuongThang?Id=${Id}`, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetChiTietTaiSanById_LichBaoDuong?Id=${Id}`, httpOptions);
      },
    };
  }

  QuyTrinhBaoDuong() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BaoDuongTaiSan/GetNextQuyTrinhBaoDuong`, httpOptions);
      },
      GetList: (data) => {
        // data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListQuyTrinhBaoDuong`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/GetQuyTrinhBaoDuongById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/SetQuyTrinhBaoDuong`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/KhongDuyetQuyTrinhBaoDuong`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/ChuyenTiepQuyTrinhBaoDuong`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/DeleteQuyTrinhBaoDuongById?Id=${Id}`, httpOptions);
      },
      GetListTaiSanBaoDuong: (data) => {
        // data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanBaoDuong`, data, httpOptions);
      },
    };
  }

  ThoiHanCungCap() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetNextQuyTrinhThoiHanCungCap`, httpOptions);
      },
      GetList: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListQuyTrinhThoiHanCungCap`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetQuyTrinhThoiHanCungCapById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/SetQuyTrinhThoiHanCungCap`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/KhongDuyetQuyTrinhThoiHanCungCap`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/ChuyenTiepQuyTrinhThoiHanCungCap`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/DeleteQuyTrinhThoiHanCungCapById?Id=${Id}`, httpOptions);
      },
      LuaChon: (data) => {

        return this.http.post(`${url}QuanLyVatTuDuTru/SelectTaiSanQuytrinhThoiHanCungCap`, data, httpOptions);
      },
      GetListNhaCungUng: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetListNhaCungUngByIdTaiSan?IdTaiSan=${Id}`, httpOptions);
      },
    };
  }

  QuyTrinhXuLySuCo() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BaoDuongTaiSan/GetNextQuyTrinhXuLySuCo`, httpOptions);
      },
      GetList: (data) => {
        // data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListQuyTrinhXulySuCo`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/GetQuyTrinhXuLySuCoById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/SetQuyTrinhXuLySuCo`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/KhongDuyetQuyTrinhXuLySuCo`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/ChuyenTiepQuyTrinhXuLySuCo`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/DeleteQuyTrinhXuLySuCoById?Id=${Id}`, httpOptions);
      },

    };
  }

  BanGiaoTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        // return this.http.get(`${url}BanGiaoTaiSan/GetNextQuyTrinhBanGiao`, httpOptions);
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhBanGiaoTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        // return this.http.get(`${url}NhatKySuDung/GetBanGiaoTaiSanById?Id=${Id}`, httpOptions);
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  KhauHaoTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhKhauHaoTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhKhauHaoTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhKhauHaoTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhKhauHaoTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhKhauHaoTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhKhauHaoTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhKhauHaoTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  DieuChuyenTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhDieuChuyenTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhDieuChuyenTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhDieuChuyenTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhDieuChuyenTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhDieuChuyenTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhDieuChuyenTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhDieuChuyenTaiSanById?Id=${Id}`, httpOptions);
      },
      GetListTaiSan: (data) => {
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanDieuChuyen`, data, httpOptions);
      },
    };
  }

  PhieuThuHoiTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhThuHoiTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhThuHoiTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhThuHoiTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  ThanhLyTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhThanhLyTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhThanhLyTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhThanhLyTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  HieuXuatTaiSan() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        return this.http.post(`${url}TaiSan/GetListHieuSuatTaiSanTheoThoiGian`, data, httpOptions);
      },
      GetListTaiSan: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanNhapHieuSuat?IdDuAn=${this.store.getCurrent()}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}TaiSan/GetListHieuSuatTaiSanTheoThoiGianById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}TaiSan/SetHieuSuatTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}TaiSan/DeleteHieuSuatTaiSanTheoThoiGianById?Id=${Id}`, httpOptions);
      },
    };
  }

  SuCoSuaChua() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}GetNextQuyTrinhSuCoSuaChuaTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}GetAllSuCoSuaChua`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}GetSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}SetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}KhongDuyetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}ChuyenTiepQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}DeleteSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  GetListTaiSanThuHoi() {
    let url = API.TaiSan;
    return {
      GetListTaiSan: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanThuHoi?IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
    };
  }

  ListDanhSachTaiSan() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/GetListTaiSan`, data, httpOptions);
      },

      Get: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetChiTietTaiSanById?Id=${Id}`, httpOptions);
      },
      // Get: (Id) => {
      //   return this.http.get(`${url}TaiSan/GetChiTietTaiSanById?IdTaiSan=${Id}`, httpOptions);
      // },
      // Get: (Id) => {
      //   return this.http.get(`${url}QuanLyTaiSan/GetQuyTrinhNhapTaiSanById?Id=${Id}`, httpOptions);
      // },
    }
  }

  ListDanhSachBienDong() {
    let url = API.TaiSan;
    return {
      Get: (data) => {
        return this.http.post(`${url}NhatKySuDung/GetListBienDong`, data, httpOptions);
      },
    }
  }

  ListDanhSachSuCo() {
    let url = API.TaiSan;
    return {
      Get: (data) => {
        return this.http.post(`${url}TaiSan/GetListSuCoByIdTaiSan`, data, httpOptions);
      },
    }
  }
  ListDanhSachVatTu() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListVatTuCanThayThe`, data, httpOptions);
      },
      KiemTraNCC: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/SelectTaiSanQuytrinhThoiHanCungCap`, data, httpOptions);
      },
    };
  }
  QuyTrinhNhapTu() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetNextNhapVatTuDuTru`, httpOptions);
      },
      GetList: (data) => {
        // data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListNhapVatTuDuTru`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetNhapVatTuDuTruById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/SetNhapVatTuDuTru`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/KhongDuyetNhapVatTuDuTru`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/ChuyenTiepNhapVatTuDuTru`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/DeleteNhapVatTuDuTruById?Id=${Id}`, httpOptions);
      },
      GetListVatTu: (data) => {
        // return this.http.post(`${url}NhatKySuDung/GetListVatTuChuaBanGiao`, data, httpOptions);
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListVatTuQuyTrinhNhapVatTu`, data, httpOptions);
      },
    };
  }
  QuyTrinhDeNghiThayVatTu() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetNextDeNghiThayDoiVatTu`, httpOptions);
      },
      GetList: (data) => {
        // data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListDeNghiThayDoiVatTu`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/GetDeNghiThayDoiVatTuById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/SetDeNghiThayDoiVatTu`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/KhongDuyetDeNghiThayDoiVatTu`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/ChuyenTiepDeNghiThayDoiVatTu`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}QuanLyVatTuDuTru/DeleteDeNghiThayDoiVatTuById?Id=${Id}`, httpOptions);
      },
      GetListVatTu: (data) => {
        return this.http.post(`${url}QuanLyVatTuDuTru/GetListVatTuCanThayThe`, data, httpOptions);
      },
    };
  }
  GetListTaiSanThanhLy() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanThanhLy`, data, httpOptions);
      },
    };
  }

  NhomNhaCungUng() {
    let url = API.CungUng;
    return {
      GetListdmNhomNhaCungung: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmNhomNhaCungung`, data, httpOptions);
      },
      SetdmNhomNhaCungUng: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmNhomNhaCungUng`, data, httpOptions);
      },
      GetdmNhomNhaCungUng: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmNhomNhaCungUng?Id=${Id}`, httpOptions)
      },
      DeleteListNhomCungUng: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhomNhaCungUng`, data, httpOptions)
      },
      ExportNhomNhaCungUng: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmNhomNhaCungUng`, data, httpOptions)
      },
      ImportFile: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmNhomNhaCungUng?FileName=${data.Name}`, httpOptions)
      }
    }
  }

  NhaCungUng() {
    let url = API.CungUng;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmNhaCungUng`, data, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmNhaCungUng`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmNhaCungUng?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhaCungUng`, data, httpOptions)
      },
      Export: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmNhaCungUng`, data, httpOptions)
      },
      Import: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmNhaCungUng?FileName=${data.Name}`, httpOptions)
      },
      GetListItem: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmItem`, data, httpOptions);
      },
      SetItem: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmItem`, data, httpOptions);
      },
      GetItem: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmItem?Id=${Id}`, httpOptions)
      },
      DeleteListItem: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmItem`, data, httpOptions)
      },
      ExportItem: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmItem`, data, httpOptions)
      },
      ImportItem: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmItem?FileName=${data.Name}`, httpOptions)
      },
      GetListTinhTrang: () => {
        return this.http.get(`${url}DanhMuc/GetlistdmTinhTrangNhaCungUng`, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DanhGiaNhaCungUng() {
    let url = API.CungUng;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyNhaCungUng/GetNextSoQuyTrinhDanhGia`, httpOptions);
      },
      GetList: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyNhaCungUng/GetListQuyTrinhDanhGia`, data, httpOptions);
      },
      Get: (Id) => {
        // return this.http.get(`${url}NhatKySuDung/GetBanGiaoTaiSanById?Id=${Id}`, httpOptions);
        return this.http.get(`${url}QuanLyNhaCungUng/GetQuyTrinhDanhGia?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/SetQuyTrinhDanhGia`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/KhongDuyetQuyTrinhDanhGia`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/ChuyenTiepQuyTrinhDanhGia`, data, httpOptions);
      },
      Delete: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/DeleteQuyTrinhDanhGia`, data, httpOptions);
      },
    };
  }

  TieuChiDanhGia() {
    let url = API.CungUng;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmTieuChiDanhGia`, data, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmTieuChiDanhGia`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmTieuChiDanhGia?Id=${Id}`, httpOptions)
      },
      Delete: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmTieuChiDanhGia`, data, httpOptions)
      },
      Export: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmTieuChiDanhGia`, data, httpOptions)
      },
      Import: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmTieuChiDanhGia?FileName=${data.Name}`, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }



  // SuCoSuaChua() {
  //   let url = API.TaiSan;
  //   return {
  //     GetNextSoQuyTrinh: () => {
  //       return this.http.get(`${url}SuCoSuaChua/GetNextQuyTrinhSuCoSuaChuaTaiSan`, httpOptions);
  //     },
  //     GetList: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/GetAllSuCoSuaChua`, data, httpOptions);
  //     },
  //     Get: (Id) => {
  //       return this.http.get(`${url}SuCoSuaChua/GetSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
  //     },
  //     Set: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/SetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     KhongDuyet: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/KhongDuyetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     ChuyenTiep: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/ChuyenTiepQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     Delete: (Id) => {
  //       return this.http.get(`${url}SuCoSuaChua/DeleteSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
  //     },
  //   };
  // }



  GetOptions() {
    let url = API.TaiSan;
    return {
      // GetListTaiSanChuaBanGiao: () => {
      //   return this.http.get(`${url}TaiSan/GetListTaiSanChuaBanGiao`, httpOptions);
      // },
      GetListTaiSanChuaBanGiao: () => {
        return this.http.get(`${url}NhatKySuDung/GetListTaiSanChuaBanGiao`, httpOptions);
      },
      GetListTaiSanDaBanGiao: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanDaBanGiao?IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
      ListBaoDuongTaiSan: (IdTaiSan, IddmDonViTinh) => {
        return this.http.get(`${url}TaiSan/ListBaoDuongTaiSan?IdTaiSan=${IdTaiSan}&IddmDonViTinh=${IddmDonViTinh}`, httpOptions);
      },
      GetListTaiSan: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanNhapHieuSuat?IdDuAn=${this.store.getCurrent()}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
    }
  }
  GetTaiSanTheoLoai() {
    let url = API.TaiSan;
    return {
      GetListTaiSanDaBanGiao: (IdBoPhanSuDung) => {
        let data = {
          CurrentPage: 0,
          PageSize: 0,
          Keyword: '',
          IddmLoaiTaiSan: '',
          IdBoPhanSuDung: IdBoPhanSuDung
        }
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanDaBanGiao`, data, httpOptions)
      },
      GetListTaiSanChuaBanGiao: (CurrentPage: number, PageSize: number, KeyWord, IddmLoaiTaiSan, IdBoPhanSuDung) => {
        let data = {
          CurrentPage: CurrentPage,
          PageSize: PageSize,
          Keyword: KeyWord,
          IddmLoaiTaiSan: IddmLoaiTaiSan,
          IdBoPhanSuDung: IdBoPhanSuDung
        }
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanChuaBanGiao`, data, httpOptions)
      },
      // GetListTaiSanThuHoi:(IdBoPhanSuDung)=>{
      //   let data ={
      //     CurrentPage: 0,
      //     PageSize: 0,
      //     Keyword: '',
      //     IddmLoaiTaiSan: '',
      //     IdBoPhanSuDung: IdBoPhanSuDung
      //   }
      //   return this.http.post(`${url}NhatKySuDung/GetListTaiSanThuHoi`,data,httpOptions)
      // }
      // GetListTaiSanThuHoi:(data)=>{
      GetListTaiSanKhauHao: (IdDuAn, IdBoPhanSuDung, CurrentPage: number, PageSize: number, Keyword) => {
        let data = {
          IdDuAn: IdDuAn,
          IdBoPhanSuDung: IdBoPhanSuDung,
          CurrentPage: CurrentPage,
          PageSize: PageSize,
          Keyword: Keyword,
        }
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanKhauHao`, data, httpOptions)
      },
      GetListTaiSanDieuChuyen: (CurrentPage: number, PageSize: number, KeyWord, IddmLoaiTaiSan, IdBoPhanSuDung) => {
        let data = {
          CurrentPage: CurrentPage,
          PageSize: PageSize,
          Keyword: KeyWord,
          IddmLoaiTaiSan: IddmLoaiTaiSan,
          IdBoPhanSuDung: IdBoPhanSuDung
        }
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanDieuChuyen`, data, httpOptions)
      },
      // GetListTaiSanThuHoi: (IdBoPhanSuDung) => {
      //   let data = {
      //     CurrentPage: 0,
      //     PageSize: 0,
      //     Keyword: '',
      //     IddmLoaiTaiSan: '',
      //     IdBoPhanSuDung: IdBoPhanSuDung
      //   }
      //   return this.http.post(`${url}NhatKySuDung/GetListTaiSanThuHoi`, data, httpOptions)
      // },
      GetListTaiSanThuHoi: (data) => {
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanThuHoi`, data, httpOptions)
      },
    }
  }

}
