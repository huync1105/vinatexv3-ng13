import { StoreService } from "./../store.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { httpOptions, API } from "./../host";
@Injectable({
  providedIn: "root",
})
export class HopDongService {
  constructor(private http: HttpClient, public store: StoreService) { }

  download(url) {
    window.open(url);
  }
  QuyTrinhHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(url + "HopDong/GetNextSoQuyTrinhHopDong",httpOptions);
      },
      GetOptionsVatLieu: () => {
        return this.http.get(url + `DanhMuc/GetListAlldmLoaiNguyenVatLieu`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListQuyTrinhHopDong", data, httpOptions);
      },
      GetListHopDongSapDenHanTT: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongSapDenHanTT", data, httpOptions);
      },
      GetListHopDongQuaHanTT: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongQuaHanTT", data, httpOptions);
      },
      GetListHopDongQuaHanBanGiao : (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongQuaHanBanGiao", data, httpOptions);
      },
      GetListHopDongSapHetHanBanGiao : (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongSapHetHanBanGiao", data, httpOptions);
      },
      GetListHopDongQuaHanBaoLanh : (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongQuaHanBaoLanh", data, httpOptions);
      },
      GetListHopDongSapHetHanBaoLanh : (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListHopDongSapHetHanBaoLanh", data, httpOptions);
      },
      GetListSoi: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListQuyTrinhHopDongSoi", data, httpOptions);
      },
      GetListVatTuPhu: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListQuyTrinhHopDongVatTuPhu", data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(
          url + `HopDong/GetQuyTrinhHopDong?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        return this.http.post(
          url + "HopDong/SetQuyTrinhHopDong",
          data,
          httpOptions
        );
      },

      Deletes: (Id) => {
        return this.http.get(
          url + `HopDong/DeleteQuyTrinhHopDong?Id=${Id}`,
          httpOptions
        );

      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "HopDong/KhongDuyetQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "HopDong/ChuyenTiepQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      // get all danh sach hop dong theo ten
      GetListAll: (Loai) => {
        return this.http.get(url + `HopDong/GetAllQuyTrinhHopDong_Opt?Loai=${Loai}`, httpOptions);
      },

      GetListAlldmTieuChuanChatLuong: () => {
        return this.http.get(url + `DanhMuc/GetListAlldmTieuChuanChatLuong`, httpOptions);
      },
      getListDieuKhoan: (IdHopDong) => {
        return this.http.get(url + `HopDong/GetListDieuKhoanThanhToan?IdHopDong=${IdHopDong}`, httpOptions);
      },
      getListMatHang: (IdHopDong) => {
        return this.http.get(url + `HopDong/GetListMatHang?IdHopDong=${IdHopDong}`, httpOptions);
      },
      GetListHopDongBanChoVay: (IdDuAn) => {
        return this.http.get(url + `HopDong/GetDanhSachHopDongBanChoVay?IdDuAn=${IdDuAn}`, httpOptions);
      },
      GetListHopDongForPhuLuc: (Loai) => {
        return this.http.get(url + `HopDong/GetListHopDongForPhuLuc?Loai=${Loai}`, httpOptions);
      },
      GetDanhSachHopDongMua: (IdDuAn) => {
        return this.http.get(url + `HopDong/GetDanhSachHopDongMua?IdDuAn=${IdDuAn}`, httpOptions);
      },
      XuatExcel: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "HopDong/GetListQuyTrinhHopDongSoi", data, httpOptions);
      },
    };
  }


  GiaHanHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "GiaHanHopDong/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();

        return this.http.post(
          url + "GiaHanHopDong/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `GiaHanHopDong/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/PhatHopDong/DeleteQuyTrinh",
          data,
          httpOptions
        );
      },


    };
  }


  QuyetToanHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "QuyetToan/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();

        return this.http.post(
          url + "QuyetToan/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(url + `QuyetToan/GetById?Id=${Id}`,httpOptions);
      },
      Set: (data) => {
        return this.http.post(url + "QuyetToan/SetQuyTrinh",data,httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(url + "QuyetToan/KhongDuyetQuyTrinh",data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(url + "QuyetToan/ChuyenTiepQuyTrinh",data,httpOptions);
      },
      Delete: (data) => {
        return this.http.post(url + "QuyetToan/DeleteQuyTrinh", data, httpOptions);
      },
      GetThongTinQuyetToanByHopDong: (IdHopDong) => {
        return this.http.get(url + `QuyetToan/GetThongTinQuyetToanByHopDong?IdHopDong=${IdHopDong}`,httpOptions);
      },
    };
  }

  PhatHopDong() {
    let url = API.HopDong;
    return {
      PhatHopDong: (data) => {
        return this.http.post(url + "PhatHopDong", data, httpOptions);
      },
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "PhatHopDong/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();

        return this.http.post(
          url + "PhatHopDong/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(url + `PhatHopDong/GetById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(
          url + "PhatHopDong/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "PhatHopDong/DeleteQuyTrinh",
          data,
          httpOptions
        );
      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "PhatHopDong/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "PhatHopDong/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
    };
  }


  QuyTrinhThanhToan() {
    let url = API.HopDong;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "ThanhToan/GetListQuyTrinh",data,httpOptions);
      },
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "ThanhToan/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `ThanhToan/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        data.idDuAn = this.store.getCurrent();

        return this.http.post(
          url + "ThanhToan/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (Id) => {
        return this.http.get(
          url + `ThanhToan/DeleteQuyTrinh?Id=${Id}`,
          httpOptions
        );

      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "ThanhToan/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "ThanhToan/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
      getListInvoice: (IdHopDong) => {
        return this.http.get(
          url + `ThanhToan/GetListInvoiceHopDong?IdHopDong=${IdHopDong}`, httpOptions
        );
      },
      GetListInvoiceHopDongChiTiet: (data) => {
        return this.http.post(
          url + 'ThanhToan/GetListInvoiceHopDongChiTiet', data,httpOptions
        );
      },
      GetListThanhToanHopDong: (IdHopDong) => {
        return this.http.get(url + `ThanhToan/GetListThanhToanHopDong?IdHopDong=${IdHopDong}`,httpOptions);
      },
      XuatExcel: (Id) => {
        return this.http.get( url + `ThanhToan/ExportPhieuThanhToanSoi?Id=${Id}`, httpOptions);
      },
    };
  }

  GiaoKeHoachSanXuat() {
    let url = API.HopDong;
    return {
      GetListMatHangGiaoKeHoachSanXuat: (IdDuAn) => {
        return this.http.get(
          url + `HopDong/GetListMatHangGiaoKeHoachSanXuat?IdDuAn=${IdDuAn}`,
          httpOptions
        );
      },    
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "GiaoKeHoachSanXuat/GetNextSoQuyTrinh",
          httpOptions
        );
      },  
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent()
        return this.http.post(
          url + "GiaoKeHoachSanXuat/GetListQuyTrinh",
          data,
          httpOptions
        );
      },  
      Get: (Id) => {
        return this.http.get(
          url + `GiaoKeHoachSanXuat/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        // data.idDuAn = 53
        return this.http.post(
          url + "GiaoKeHoachSanXuat/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + `GiaoKeHoachSanXuat/DeleteQuyTrinh`,
          data,
          httpOptions
        );

      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "GiaoKeHoachSanXuat/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "GiaoKeHoachSanXuat/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
      XuatExcel: (data) => {
        data.idDuAn = this.store.getCurrent()
        return this.http.post(
          url + "GiaoKeHoachSanXuat/GetListQuyTrinh",
          data,
          httpOptions
        );
      },  
    };
  };
  QuyTrinhXuatBongXo() {
    let url = API.HopDong;
    return {
      GetList: (data) => {
      data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "PhieuXuatLoBong/GetListPhieuXuatLoBong",data,httpOptions);
      },
      GetNextSoQuyTrinh: () => {
        return this.http.get(url + "PhieuXuatLoBong/GetNextSoQuyTrinh",httpOptions);
      },
      Get: (Id) => {
        return this.http.get(url + `PhieuXuatLoBong/GetById?Id=${Id}`,httpOptions);
      },
      Set: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "PhieuXuatLoBong/SetPhieuXuatLoBong",data,httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(url + `PhieuXuatLoBong/DeletePhieuXuatLoBong?Id=${Id}`,httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(url + "PhieuXuatLoBong/KhongDuyetQuyTrinh",data,httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(url + "PhieuXuatLoBong/ChuyenTiepQuyTrinh",data,httpOptions);
      },
      getLuuKhoKhoBongHopDong: (IddmKho, IdLoBong, Loai) => {
        let idDuAn =this.store.getCurrent()
        return this.http.get(API.SCMChoModuleHopDong + `getLuuKhoKhoBongHopDong?IdDuAn=${idDuAn}&IddmKho=${IddmKho}&IdLoBong=${IdLoBong}&Loai=${Loai}`, httpOptions);
      },
    };
  };
  QuyTrinhDanhGia() {
    let url = API.HopDong;
    return {
      GetList: (data) => {
      data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "DanhGia/GetListQuyTrinh",data,httpOptions);
      },
      GetNextSoQuyTrinh: () => {
        return this.http.get(url + "DanhGia/GetNextSoQuyTrinh",httpOptions);
      },
      Get: (Id) => {
        return this.http.get(url + `DanhGia/GetById?Id=${Id}`,httpOptions);
      },
      Set: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "DanhGia/SetQuyTrinh",data,httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(url + `DanhGia/DeleteQuyTrinh?Id=${Id}`,httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(url + "DanhGia/KhongDuyetQuyTrinh",data,httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(url + "DanhGia/ChuyenTiepQuyTrinh",data,httpOptions);
      },
      listHopDong: (IdKhachHang) => {
        return this.http.get(url + `DanhGia/GetListHopDongKhachHang?IdKhachHang=${IdKhachHang}`,httpOptions);
      },
    };
  };
  dmTieuChiDanhGia() {
    let url = API.HopDong;
    return {
      GetList: (data) => {
      data.idDuAn = this.store.getCurrent();
        return this.http.post(url + "DanhMuc/GetListdmTieuChiDanhGia",data,httpOptions);
      },
      Get: (Id) => {
        return this.http.get(url + `DanhMuc/GetdmTieuChiDanhGiaById?Id=${Id}`,httpOptions);
      },
      Set: (data) => {
        return this.http.post(url + "DanhMuc/SetdmTieuChiDanhGia",data,httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(url + `DanhMuc/DeletedmTieuChiDanhGia?Id=${Id}`,httpOptions);
        // return this.http.get(url + `DanhMuc​/DeletedmTieuChiDanhGia?Id=${Id}`,httpOptions);
      },
    };
  };
  GetOptions(){
    let url = API.HopDong;
    return {
      GetAllHopDong:()=>{
        return this.http.get(url + "HopDong/GetAllHopDongSoi",httpOptions);
      }
    }
  }
}
