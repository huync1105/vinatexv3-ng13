import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';
@Injectable({
    providedIn: 'root'
})
export class DanhMucHopDongService {
    constructor(private http: HttpClient, public store: StoreService) { }
    //Example (Ví dụ)
    //POST
    POST(data) {
        let url = API.HopDong + 'endpoint';
        return this.http.post(url, data, httpOptions);
    }
    //GET
    GET(Id) {
        let url = API.HopDong + `endpoint?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }

    DanhMucThuTucThanhToan() {
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmThuTucThanhToan`, httpOptions);
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmThuTucThanhToan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmThuTucThanhToan`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmThuTucThanhToan?id=${id}`, httpOptions)
            }
        }
    }

    //

    GetListAlldmTheoLoaiThanhToan() {
        let url = API.HopDong + 'DanhMuc/GetListAlldmTheoLoaiThanhToan';
        return this.http.get(url, httpOptions);
    }

    DanhMucLoaiTienTe() {
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiTienTe`, httpOptions);
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmLoaiTienTe?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmLoaiTienTe`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmLoaiTienTe?id=${id}`, httpOptions)
            }
        }
    }

    //
    DanhMucLoaiHopDong() {
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiHopDong`, httpOptions);
            },

            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmLoaiHopDong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmLoaiHopDong`, data, httpOptions)
            },
            DeleteList: (data) => {
                return this.http.post(`${url}DanhMuc/DeleteListdmLoaiHopDong`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmLoaiHopDong?id=${id}`, httpOptions)
            }

        }
    }

    //
    DanhMucHinhThucThanhToan() {
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmHinhThucThanhToan`, httpOptions);
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmHinhThucThanhToan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {

                return this.http.post(`${url}DanhMuc/SetdmHinhThucThanhToan`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmHinhThucThanhToan?Id=${id}`, httpOptions)
            }
        }
    }

    //
    DanhMucTrangThaiBaoLanh() {
        let url = API.HopDong
        return {
            GetListAlldmLoaiBaoLanh: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiBaoLanh`, httpOptions);
            },
            GetdmTrangThaiBaoLanh: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmTinhTrangBaoLanh`, httpOptions);
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmTinhTrangBaoLanh?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmTinhTrangBaoLanh`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmTinhTrangBaoLanh?id=${id}`, httpOptions)
            }
        }
    }
    DanhMucTieuChuanChatLuong() {
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmTieuChuanChatLuong`, httpOptions);
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmTieuChuanChatLuong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmTieuChuanChatLuong`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}DanhMuc/DeletedmTieuChuanChatLuong`, data, httpOptions)
            }
        }
    }

    // Modal danh mục kế hoạch
    //
    DanhMucVatTuPhu() {
        let url = API.KeHoach
        return {
            GetListAll: () => {
                return this.http.get(`${url}DanhMuc/GetListAlldmVatTuPhu`, httpOptions)
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmVatTuPhu?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmVatTuPhu`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmVatTuPhu`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmVatTuPhu?Id=${id}`, httpOptions)
            }
        }
    }
    //
    DanhMucCoCauNhanSu() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmCoCauNhanSu?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmCoCauNhanSu`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmCoCauNhanSu`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmCoCauNhanSu?Id=${id}`, httpOptions)
            }
        }
    }
    //
    DanhMucDinhMucMatHang() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmDinhMucMatHang?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmDinhMucMatHang`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmDinhMucMatHang`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmDinhMucMatHang?id=${id}`, httpOptions)
            }
        }
    }
    //
    DanhMucChiPhiBanHang() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmChiPhiBanHang?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmChiPhiBanHang`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmChiPhiBanHang`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmChiPhiBanHang?Id=${id}`, httpOptions)
            }
        }
    }
    //
    DanhMucTaiSan() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmTaiSan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmTaiSan`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmTaiSan`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmTaiSan?Id=${id}`, httpOptions)
            }
        }
    }
    //
    DanhMucTinhLuong() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DanhMuc/GetListdmTinhLuong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmTinhLuong`, data, httpOptions)
            },
            DeleteList: (data) => {
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmTinhLuong`, data, httpOptions)
            },
            Delete: (id) => {
                return this.http.get(`${url}DanhMuc/DeletedmTinhLuong?Id=${id}`, httpOptions)
            }
        }
    }

    //.......... quantri/danhmuc ......................

    //
    DinhMucMatHangTheoNam() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}DinhMucMatHangHangNam/GetAllPaging?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DinhMucMatHangHangNam/AddDinhMucMatHangHangNam`, data, httpOptions)
            },
        }
    }
    /////
    DanhSachKeHoachKinhDoanh() {
        let url = API.KeHoach
        //http://103.130.212.45:2269/KeHoachAPI/
        return {
            GetChiPhi: (Id)=>{
                return this.http.get(`${url}KeHoachKinhDoanh/GetChiPhiSanPhamKeHoachKinhDoanh?IdKeHoachKinhDoanh=${Id}`, httpOptions)
            },
            Get: (Id) => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/GetListQuyTrinh`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/SetQuyTrinh`, data, httpOptions)
            },
            GetListSanPham: (data) => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetKeHoachKinhDoanh_SanPham_ChiTiet
                ?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            NextQuyTrinh: () => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetNextSoQuyTrinh`, httpOptions)
            },
            ChuyenTiep: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/ChuyenTiepQuyTrinh`, data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/KhongDuyetQuyTrinh`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/DeleteQuyTrinh`, data, httpOptions)
            }, DieuChinh: (IdKeHoachKinhDoanh) => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetKeHoachKinhDoanhChoDieuChinh?IdKeHoachKinhDoanh=${IdKeHoachKinhDoanh}`, httpOptions)
            },
            GetKeHoachKinhDoanhDangThucHien: () => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetKeHoachKinhDoanhDangThucHien`, httpOptions)
            },
            KiemTraTonTaiQuyTrinh: (Nam) => {
                return this.http.get(`${url}KeHoachKinhDoanh/KiemTraTonTaiQuyTrinh?Nam=${Nam}`, httpOptions)
            },
        }
    }
    KeHoachKinhDoanhThang() {
        let url = API.KeHoach + 'KeHoachKinhDoanhThang/';
        return {
            Get: (Id) => {
                return this.http.get(`${url}GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.post(`${url}GetListQuyTrinh`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}SetQuyTrinh`, data, httpOptions)
            },
            NextQuyTrinh: () => {
                return this.http.get(`${url}GetNextSoQuyTrinh`, httpOptions)
            },
            ChuyenTiep: (data) => {
                return this.http.post(`${url}ChuyenTiepQuyTrinh`, data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(`${url}KhongDuyetQuyTrinh`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}DeleteQuyTrinh`, data, httpOptions)
            },
            GetListSanPhamTheoKeHoachKinhDoanhNam: (IdKeHoachKinhDoanhNam, Thang) => {
                return this.http.get(`${url}GetListSanPhamTheoKeHoachKinhDoanhNam?IdKeHoachKinhDoanhNam=${IdKeHoachKinhDoanhNam}&Thang=${Thang}`, httpOptions)
            },
            KiemTraTonTaiQuyTrinh: (Thang, Nam) => {
                return this.http.get(`${url}KiemTraTonTaiQuyTrinh?Nam=${Nam}&Thang=${Thang}`, httpOptions)
            },

        }
    }
    KeHoachSanXuatNam() {
        let url = API.KeHoach + 'KeHoachSanXuatNam/';
        return {
            Get: (Id) => {
                return this.http.get(`${url}GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.post(`${url}GetListQuyTrinh`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}SetQuyTrinh`, data, httpOptions)
            },
            NextQuyTrinh: () => {
                return this.http.get(`${url}GetNextSoQuyTrinh`, httpOptions)
            },
            ChuyenTiep: (data) => {
                return this.http.post(`${url}ChuyenTiepQuyTrinh`, data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(`${url}KhongDuyetQuyTrinh`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}DeleteQuyTrinh`, data, httpOptions)
            },
            GetListSanPhamTheoKeHoachKinhDoanhNam: (IdKeHoachKinhDoanhNam, IdDuAn) => {
                return this.http.get(`${url}GetListSanPhamTheoKeHoachKinhDoanhNam?IdKeHoachKinhDoanhNam=${IdKeHoachKinhDoanhNam}&IdDuAn=${IdDuAn}`, httpOptions)
            },
            KiemTraTonTaiQuyTrinh: (IdDuAn, Nam) => {
                return this.http.get(`${url}KiemTraTonTaiQuyTrinh?Nam=${Nam}&IdDuAn=${IdDuAn}`, httpOptions)
            },
        }
    }

    KeHoachKinhDoanh_DonGia() {
        let url = API.KeHoach
        return {
            GetList: (data) => {
                return this.http.get(`${url}KeHoachKinhDoanh_DonGia/GetListQuyTrinh?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh_DonGia/SetListKeHoachKinhDoanh_DonGia`, data, httpOptions)
            },
        }
    }
    //Danh Sách kế hoạch
    DanhSachTinhLuong() {
        let url = API.KeHoach
        return {
            Get: (Id) => {
                return this.http.get(`${url}DanhSachTinhLuongHangNam/GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.get(`${url}DanhSachTinhLuongHangNam/GetAllPaging?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Update: (data) => {
                return this.http.post(`${url}DanhSachTinhLuongHangNam/UpdateDanhSachTinhLuongHangNam`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhSachTinhLuongHangNam/AddDanhSachTinhLuongHangNam`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}DanhSachTinhLuongHangNam/DeleteDanhSachTinhLuongHangNam`, data, httpOptions)
            }
        }
    }

    MucLuongCoCauNhanSu() {
        let url = API.KeHoach
        return {
            Get: (Id) => {
                return this.http.get(`${url}MucLuongHangNam/GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.get(`${url}MucLuongHangNam/GetAllPaging?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Update: (data) => {
                return this.http.post(`${url}MucLuongHangNam/UpdateMucLuongHangNam`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}MucLuongHangNam/AddMucLuongHangNam`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}MucLuongHangNam/DeleteMucLuongHangNam`, data, httpOptions)
            }
        }
    }

    ChiPhiBanHangTheoNam() {
        let url = API.KeHoach
        return {
            Get: (Id) => {
                return this.http.get(`${url}ChiPhiBanHangHangNam/GetById?Id=${Id}`, httpOptions)
            },
            GetList: (data) => {
                return this.http.get(`${url}ChiPhiBanHangHangNam/GetAllPaging?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
            },
            Update: (data) => {
                return this.http.post(`${url}ChiPhiBanHangHangNam/UpdateChiPhiBanHangHangNam`, data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}ChiPhiBanHangHangNam/AddChiPhiBanHangHangNam`, data, httpOptions)
            },
            Delete: (data) => {
                return this.http.post(`${url}ChiPhiBanHangHangNam/DeleteChiPhiBanHangHangNam`, data, httpOptions)
            }
        }
    }

    DinhMucSanXuat() {
        let url = API.SCM
        return {
            GetList: () => {
                return this.http.get(`${url}DanhMuc/GetListDinhMucSanXuatPhanXuong?IdDuAn=${this.store.getCurrent()}`, httpOptions)
            },
            Update: (data) => {
                return this.http.post(`${url}DanhMuc/UpdateDinhMucSanXuatPhanXuong`, data, httpOptions)
            },
        }
    }

    DanhMucTyGia() {
        let url = API.SCM
        return {
            GetList: () => {
                return this.http.get(`${url}DanhMuc/GetListdmTyGia`, httpOptions)
            },
            Get: (Nam) => {
                return this.http.get(`${url}DanhMuc/GetdmTyGia?Nam=${Nam}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}DanhMuc/SetdmTyGia`, data, httpOptions)
            },
            Delete:(data)=>{
                return this.http.post(`${url}DanhMuc/DeletedmTyGia`, data, httpOptions)
            }
        }
    }
    DanhMucDonGia() {
        let url = API.KeHoach
        return {
            GetList: () => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetListBangGiaSanPham`, httpOptions)
            },
            Get: (Nam) => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetBangGiaSanPham?Nam=${Nam}`, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/CapNhatBangGiaSanPham`, data, httpOptions)
            },
            GoiYGia:(data)=>{
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}KeHoachKinhDoanh/GetGoiYGiaSanPham`, data, httpOptions)
            }
        }
    }
    TinhToanDoanhThu() {
        let url = API.KeHoach
        return {
            Get: IdKeHoachKinhDoanh => {
                return this.http.get(`${url}KeHoachKinhDoanh/GetDoanhThuKeHoachKinhDoanh?IdKeHoachKinhDoanh=${IdKeHoachKinhDoanh}`, httpOptions)
            },
            GetThang: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/GetDoanhThuKeHoachKinhDoanhSanPhamTheoThang`,data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(`${url}KeHoachKinhDoanh/CapNhatDoanhThuKeHoachKinhDoanhSanPhamTheoThang`, data, httpOptions)
            }
        }
    }

    KeHoachKinhDoanh_DonGiaDinhMuc(){
        let url = API.KeHoach;
        return{
            ChiPhi:(opt)=>{
                return this.CPAll(opt);
            },
            Set:(data)=>{
                data.IdDuAn = this.store.getCurrent()
                return this.http.post(`${url}DonGiaDinhMuc/Set_DonGiaDinhMucNam`,data,httpOptions);
            }
        }
    }
    CPAll(opt){
        let url = API.KeHoach;
        return{
            GetList:()=>{
                return this.http.get(`${url}DonGiaDinhMuc/GetAll_${opt}?IdDuAn=${this.store.getCurrent()}`,httpOptions);
            },
            Get:(Nam)=>{
                return this.http.get(`${url}DonGiaDinhMuc/GetByNam_${opt}?IdDuAn=${this.store.getCurrent()}&Nam=${Nam}`,httpOptions);
            }
        }
    }
}

