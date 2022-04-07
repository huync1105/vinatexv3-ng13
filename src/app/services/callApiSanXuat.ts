import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root'
})
export class SanXuatService {
    constructor(private http: HttpClient, private store: StoreService) {

    }
    //Cấp bông
    //this.store.getCurrent();
    //data.IdNhaMay =this.store.getCurrent().toString();
    DoiKienPhieuXuatBong(IdPhieu, IdCu, IdMoi) {
        let url = API.SCMQuanLyKho;
        return this.http.get(`${url}DoiKienPhieuXuatBong?IdPhieuXuatBong=${IdPhieu}&IddmItemKienCu=${IdCu}&IddmItemKienMoi=${IdMoi}`, httpOptions)
    }
    GetDanhSachKienCoTheThayThe(IddmItem) {
        let url = API.SCMQuanLyKho;
        return this.http.get(`${url}GetDanhSachKienCoTheThayThe?IddmItem=${IddmItem}`, httpOptions)
    }
    GetLoBongTrongKhoIdLoBong(IdLoBong) {
        let url = API.SCMQuanLyKho;
        return this.http.get(`${url}GetLoBongTrongKhoIdLoBong?IdLoBong=${IdLoBong}`, httpOptions)
    }
    GetAllQuyen() {
        let url = API.auth;
        return this.http.get(url + `QuanTri/GetAllQuyen`, httpOptions);
    }

    GetListThanhToanTheo() {
        return this.http.get(`${API.HopDong}DanhMuc/GetListThanhToanTheo`, httpOptions);
    }

    GetListOptdmCapBong() {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.get(url, httpOptions);
    }
    GetListdmCapBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCapBong(data) {
        let url = API.SCMDanhMuc + 'SetdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCapBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    //#region  Danh Muc Kho
    GetListdmKho(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'GetListdmKho';
        return this.http.post(url, data, httpOptions);
    }
    GetdmKhoThanhPhamHoiAm_DashBoard(data) {
        let url = API.SCMDanhMuc + `GetdmKhoThanhPhamHoiAm_DashBoard?IdDuAn=${data.IdDuAn}`;
        return this.http.get(url, httpOptions);
    }
    SetdmKho(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmKho';
        return this.http.post(url, data, httpOptions);
    }
    GetDashBoard_TruyXuatNguonGoc(IddmItem, TuNgay, DenNgay) {
        let url = API.SCMDashBoard + `GetDashBoard_TruyXuatNguonGoc?IddmItem=${IddmItem}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`;
        return this.http.get(url, httpOptions);
    }
    GetListdmKhoForLoaiBong(IdKeHoachNhapNguyenLieu_Item) {
        let url = API.SCMDanhMuc + `GetListdmKhoForLoaiBong?IdKeHoachNhapNguyenLieu_Item=${IdKeHoachNhapNguyenLieu_Item}`;
        return this.http.get(url, httpOptions);
    }

    GetListdmLoaiBongForHopDong(Loai) {
        let url = API.SCMDanhMuc + `GetListdmLoaiBongForHopDong?Loai=${Loai}`;
        return this.http.get(url, httpOptions);
    }
    //#endregion

    //#region  Danh mục máy biến áp
    DMMayBienAp() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachMayBienAp', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemMayBienAp?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemMayBienAp', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteMayBienAp', data, httpOptions);
            },
        }
    }
    //#endregion
    ImportPhieuKiemKeKho(FileName) {
        return this.http.get(`${API.SCMQuanLyKho}ImportPhieuKiemKeKho?FileName=${FileName}`, httpOptions)
    }
    //#region  Danh mục loại điện
    dmLoaiDienKV() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachLoaiDienKV', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemLoaiDienKV?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemLoaiDienKV', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteLoaiDienKV', data, httpOptions);
            },
        }
    }
    //#endregion

    dmLoaiDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachLoaiDien', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemLoaiDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemLoaiDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteLoaiDien', data, httpOptions);
            }
        }
    }

    //#region  Danh mục nhóm công tơ
    dmNhomCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachNhomCongToDien', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemNhomCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemNhomCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteNhomCongToDien', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmQuyCachDongGoi() {
        let url = API.SCMDanhMuc;
        return {
            GetList: () => {
                return this.http.get(url + 'GetListdmQuyCachDongGoi', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetListdmQuyCachDongGoi?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmQuyCachDongGoi', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmQuyCachDongGoi', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục phân nhóm máy
    dmPhanNhomMaySanXuat() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetListdmPhanNhomMaySanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetdmPhanNhomMay?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmPhanNhomMay', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeletedmPhanNhomMaySanXuat?Id=${Id}`, httpOptions);
            },
            GetdmPhanNhomMayBanChePham: (Id) => {
                return this.http.get(url + `GetdmPhanNhomMayBanChePham?Id=${Id}`, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Báo cáo
    BaoCao() {
        let url = API.SCMBaoCao;
        let url2 = API.SCMKiemTraChatLuong;
        return {
            TongHop: (data) => {
                return this.http.post(url + 'GetDashBoard_TongHop', data, httpOptions);
            },
            BieuDoCoCau: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetDashBoard_BieuDoCoCau', data, httpOptions);
            },
            GetDashBoard_NhuCauXuatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_NhuCauXuatHang', data, httpOptions);
            },
            GetDashBoard_CoCauMatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_CoCauMatHang', data, httpOptions);
            },
            GetBaoCaoQuyTrinhKiemTraChatLuong: (Nam, IddmPhanXuong, IddmChiTieu, KeyWord) => {
                return this.http.get(url2 + `GetBaoCaoQuyTrinhKiemTraChatLuong?Nam=${Nam}&IddmPhanXuong=${IddmPhanXuong}&IddmChiTieu=${IddmChiTieu || '2a3dbea0-6c3f-4e10-9774-6201027f4bd0'}&KeyWord=${KeyWord}`, httpOptions);
            },
            GetBieuDoDuongKiemTraChatLuong: (Nam, IddmPhanXuong, IddmChiTieu, IddmItem, LoaiThoiGian) => {
                return this.http.get(url2 + `GetBieuDoDuongKiemTraChatLuong?Nam=${Nam}&IddmPhanXuong=${IddmPhanXuong}&IddmChiTieu=${IddmChiTieu}&IddmItem=${IddmItem}&LoaiThoiGian=${LoaiThoiGian}`, httpOptions);
            },
            GetDanhSachChiTieuChatLuong_BieuDo: () => {
                return this.http.get(url2 + 'GetDanhSachChiTieuChatLuong_BieuDo', httpOptions);
            },
            GetDashBoard_CanDoiTonXuatHang: (data) => {
                return this.http.post(url + 'GetDashBoard_CanDoiTonXuatHang', data, httpOptions);
            },
            GetDashBoard_SanLuongOng: (data) => {
                return this.http.post(url + 'GetDashBoard_SanLuongOng', data, httpOptions);
            },
            BaoCaoThongLuongSanXuat: (data) => {
                return this.http.post(`${url}BaoCaoThongLuongSanXuat`, data, httpOptions);
            },
            BaoCaoThongLuongSanXuatMinMax: (data) => {
                return this.http.post(`${url}BaoCaoThongLuongSanXuatMinMax`, data, httpOptions)
            },
            GetListdmMayTheoCongDoan: (congDoan, PX) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmMayTheoCongDoan?CongDoan=${congDoan}&IddmPhanXuong=${PX}`, httpOptions);
            },
            ExportPhieuNhapKhoThanhPham_Bieu1: (data) => {
                return this.http.post(`${url}ExportPhieuNhapKhoThanhPham_Bieu1`, data, httpOptions);
            },
            ExportPhieuXuatKhoThanhPham_Bieu6: (data) => {
                return this.http.post(`${url}ExportPhieuXuatKhoThanhPham_Bieu6`, data, httpOptions);
            },
            ExportNhuCauXuatHang: (data) => {
                return this.http.post(`${url}ExportNhuCauXuatHang`, data, httpOptions)
            },
            ExportBaoCaoCanDoiSuDungBong: (data) => {
                data.IdDuAn = this.store.getCurrent()
                return this.http.post(`${url}ExportBaoCaoCanDoiSuDungBong`, data, httpOptions)
            },
            GetDashBoard_TongHop_LuyKe_ChiTiet: (data) => {
                data.IdDuAn = this.store.getCurrent()
                return this.http.post(`${url}GetDashBoard_TongHop_LuyKe_ChiTiet`, data, httpOptions)
            },
            ExportBaoCaoThongKeTienDien: (data) => {
                return this.http.post(`${url}ExportBaoCaoThongKeTienDien`, data, httpOptions);
            },
            GetBieuDo_TienDien: (data) => {
                return this.http.post(`${url}GetBieuDo_TienDien`, data, httpOptions)
            },
            GetBieuDo_TyLeThongKeSanLuong: (data) => {
                data.IdDuAn = this.store.getCurrent()
                return this.http.post(`${url}GetBieuDo_TyLeThongKeSanLuong`, data, httpOptions)
            },
        }
    }
    //#endregion


    //#region Định mức tiêu chí chất lượng sợi
    dmDinhMucTieuChiChatLuongSoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            Get: (data) => {
                return this.http.post(url + `GetDanhSachChiTieuChatLuongTheoSanPham`, data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetDanhSachChiTieuChatLuongTheoSanPham', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục tiêu chí chất lượng sợi
    dmTieuChiChatLuongsoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetDanhSachChiTieuChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemChiTieuChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemChiTieuChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteChiTieuChatLuong', data, httpOptions);
            },
            GetListdmTieuChiBanChePham: (CongDoan) => {
                return this.http.get(url + `GetListdmTieuChiChatLuongSoiBanChePham?CongDoan=${CongDoan}`, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục công tơ
    dmCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + `GetDanhSachCongToDien`, data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteCongToDien', data, httpOptions);
            },
        }
    }

    //#endregion

    //Ca sản xuất
    GetListOptdmCaSanXuat() {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.get(url, httpOptions);
    }
    GetListOptdmCaSanXuatThucTe() {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuatThucTe';
        return this.http.get(url, httpOptions);
    }
    GetListdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'SetdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'DeletedmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }


    // Loại bông
    GetListdmLoaiBongOnly(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBongOnly';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmLoaiBongHoiPhe() {
        let url = API.SCMDanhMuc + `GetListdmLoaiBongHoiPhe`;
        return this.http.get(url, httpOptions);
    }
    SetdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    GetListLoaiBong() {
        let url = API.SCMDanhMuc + `GetListLoaiBong`;
        return this.http.get(url, httpOptions);
    }

    //máy
    GetListOptdmMay() {
        let url = API.SCM + 'GetListdmMay';
        return this.http.get(url, httpOptions);
    }
    GetListdmMay(data) {
        let url = API.SCMDanhMuc + 'GetListdmMay';
        return this.http.post(url, data, httpOptions);
    }
    SetdmMay(data) {
        let url = API.SCMDanhMuc + 'SetdmMay';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmMay(data) {
        let url = API.SCMDanhMuc + 'DeletedmMay';
        return this.http.post(url, data, httpOptions);
    }

    //#region  mặt hàng

    GetListdmItemByHangHoa(Loai) {
        let url = API.SCMDanhMuc + `GetListdmItem?Loai=${Loai}`;
        return this.http.get(url, httpOptions);
    }


    GetListdmItem(data) {
        let url = API.SCMDanhMuc + 'GetListdmItem';
        return this.http.post(url, data, httpOptions);
    }
    SetdmItem(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmItem';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmItem(data) {
        let url = API.SCMDanhMuc + 'DeletedmItem';
        return this.http.post(url, data, httpOptions);
    }
    ImportDanhSachChiTieuChatLuongTheoSanPham(IdDuAn, TableName, FileName) {
        let url = API.SCMKiemTraChatLuong + `ImportDanhSachChiTieuChatLuongTheoSanPham?IdDuAn=${IdDuAn}&TableName=${TableName}&FileName=${FileName}`;
        return this.http.get(url, httpOptions);
    }
    ExportDanhSachChiTieuChatLuongTheoSanPham(data) {
        let url = API.SCMKiemTraChatLuong + 'ExportDanhSachChiTieuChatLuongTheoSanPham';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  phân xưởng
    GetListPhanXuongTheoUser() {
        let url = API.SCMDanhMuc + 'GetListPhanXuongTheoUser';
        return this.http.get(url, httpOptions);
    }
    GetListdmPhanXuongOpt() {
        let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
        return this.http.get(url, httpOptions);
    }
    GetListdmPhanXuong(data, isDanhMuc?) {
        if (isDanhMuc) {
            let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
            return this.http.post(url, data, httpOptions);
        }
        else {
            return this.http.get(`${API.SCMDanhMuc}GetListdmPhanXuongForIdDuAn?IdDuAn=${this.store.getCurrent()}`, httpOptions)
        }
    }
    SetdmPhanXuong(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'DeletedmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  loại sợi
    GetListOptdmLoaiSoi() {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.get(url, httpOptions);
    }
    GetListdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    SetdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  nhóm kho
    GetListdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'GetListdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    SetdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'SetdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmNhomKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region lô bông
    GetListLoBong(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'GetListLoBong';
        return this.http.post(url, data, httpOptions);
    }
    SetLoBong(data) {
        let url = API.SCMDanhMuc + 'SetLoBong';
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(url, data, httpOptions);
    }
    DeleteLoBong(data) {
        let url = API.SCMDanhMuc + 'DeleteLoBong';
        return this.http.post(url, data, httpOptions);
    }
    CopyLoBong(data) {
        let url = API.SCMDanhMuc + 'CopyLoBong';
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(url, data, httpOptions);
    }
    getLoBong(Id) {
        let url = API.SCMDanhMuc + `GetLoBongTheoId?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }
    //#endregion

    //Dùng chung
    GetListCongDoan() {
        let url = API.SCMDanhMuc + 'GetListCongDoan';
        return this.http.get(url, httpOptions);
    }
    GetlistCongDoanBoDayBongDayPE() {
        let url = API.SCMDanhMuc + 'GetlistCongDoanBoDayBongDayPE';
        return this.http.get(url, httpOptions);
    }
    KiemTraTabTrangThai(eAction) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraTab?eAction=${eAction}`;
        return this.http.get(url, httpOptions);
    }

    KiemTraButton(IdTable, IdTrangThai) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButton?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}`;
        return this.http.get(url, httpOptions);
    }
    KiemTraButtonUser(IdTrangThai, IdTable, IdUser) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButtonUser?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}&IdUser=${IdUser}`;
        return this.http.get(url, httpOptions);
    }
    GetListUser() {
        var IdDuAn = this.store.getCurrent();
        let url = API.auth + `DanhMuc/GetListNhanSuDuAn?IdDuAn=${IdDuAn}&MaDuAn=`;
        return this.http.get(url, httpOptions);
    }

    GetOptions() {
        return {
            GetMatHang: () => {
                return this.http.post(`${API.SCMDanhMuc}GetListdmItem`, { Loai: 1 }, httpOptions)
            },
            GetChiTietMatHangChoKHKD: () => {
                return this.http.post(`${API.SCM}APIChoModuleKeHoach/GetDanhMucSanPhamHopDong`, {}, httpOptions)
            },
            GetNhaMay: () => {
                return this.http.post(`${API.auth}DanhMuc/GetDanhSachDuAn_Advance`, {}, httpOptions)
            },
            GetPhanXuong: (IdDuAn?) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmPhanXuongForIdDuAn?IdDuAn=${IdDuAn ? IdDuAn : this.store.getCurrent()}`, httpOptions)
            },
            GetListGiaoKeHoachSanXuatChuaLapKeHoach: () => {
                return this.http.get(`${API.SCMQuanLyKho}GetListGiaoKeHoachSanXuatChuaLapKeHoach`, httpOptions)
            },
            // GetListMatHangChuaLapKeHoach: (IdGiaoKeHoachSanXuat) => {
            //     return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IdGiaoKeHoachSanXuat=${IdGiaoKeHoachSanXuat}`, httpOptions)
            // },
            GetListMatHangChuaLapKeHoach: (IdGiaoKeHoachSanXuat, IddmPhanXuong) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IdGiaoKeHoachSanXuat=${IdGiaoKeHoachSanXuat}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions)
            },
            GetListCongDoanTheoMatHang: (IddmMatHang) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListCongDoanTheoMatHang?IddmMatHang=${IddmMatHang}`, httpOptions)
            },
            GetListMayTheoCongDoan: (IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMayTheoCongDoan?IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetDanhSachDuAnByIdUser: (IdUser) => {
                return this.http.get(`${API.auth}DanhMuc/GetDanhSachDuAnByIdUser?IdUser=${IdUser}`, httpOptions)
            },
            GetListTinhTrangMay: (Id, IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListTinhTrangMay?Id=${Id}&IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetTonKhoCuaNguyenLieu: (idKho, idNguyenLieu) => {
                return this.http.get(`${API.KeHoachNguyenLieu}GetTonKhoCuaNguyenLieu?idKho=${idKho}&idNguyenLieu=${idNguyenLieu}`, httpOptions)
            },
            // DanhMuc/GetListdmLoaiBong_DashBoard
            GetListdmLoaiBong_DashBoard: () => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmLoaiBong_DashBoard`, httpOptions)
            },
            GetdmKhoTheoDuAn_DashBoard: () => {
                return this.http.get(`${API.SCMDanhMuc}GetdmKhoTheoDuAn_DashBoard?IdDuAn=${this.store.getCurrent()}`, httpOptions)
            },
            GetdmKhoTheoDuAn_NhuCauSuDungBong_DashBoard: () => {
                return this.http.get(`${API.SCMDanhMuc}GetdmKhoTheoDuAn_NhuCauSuDungBong_DashBoard?IdDuAn=${this.store.getCurrent()}`, httpOptions)
            },
            GetdmKhoTheoDuAn_CoCauTonBong_DashBoard: () => {
                return this.http.get(`${API.SCMDanhMuc}GetdmKhoTheoDuAn_CoCauTonBong_DashBoard?IdDuAn=${this.store.getCurrent()}`, httpOptions)
            },
            GetListdmLoaiBong_NhuCauSuDungBong_DashBoard: (IddmKho) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmLoaiBong_NhuCauSuDungBong_DashBoard?IddmKho=${IddmKho}`, httpOptions)
            },
            GetListdmLoaiBong_CoCauTonBong_DashBoard: (IddmKho) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmLoaiBong_CoCauTonBong_DashBoard?IddmKho=${IddmKho}`, httpOptions)
            },
            GetListdmItemTheoKhoThanhPhamHoiAm_DashboardNhuCauXuatHang: (data) => {
                return this.http.post(`${API.SCMDanhMuc}GetListdmItemTheoKhoThanhPhamHoiAm_DashboardNhuCauXuatHang`, data, httpOptions);
            },
            GetDashBoard_CanDoiTonXuatHang_TenMatHang: (data) => {
                return this.http.post(`${API.SCMBaoCao}GetDashBoard_CanDoiTonXuatHang_TenMatHang`, data, httpOptions);
            },
            GetDanhSachHopDongByNhaThau: (IdDuAn, Loai) => {
                return this.http.get(`${API.HopDong}HopDong/GetDanhSachHopDongByNhaThau?IdDuAn=${IdDuAn}&Loai=${Loai}`, httpOptions)
            },
            GetDanhSachHopDongByNhaThauSoi: (IdDuAn) => {
                return this.http.get(`${API.HopDong}HopDong/GetDanhSachHopDongByNhaThauSoi?IdDuAn=${IdDuAn}`, httpOptions)
            },
            GetMatHangVatTuPhu: () => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmItemLoaiVatTuPhu`, httpOptions)
            },
            //  api lisstt
            GetDanhMucNoiDiaXuatKhau: () => {
                return this.http.get(`${API.KeHoach}DanhMuc/GetDanhMucNoiDiaXuatKhau`, httpOptions)
            },
            GetListdmPhanXuong: () => {
                return this.http.get(`${API.SCM}DanhMuc/GetListdmPhanXuong`, httpOptions)
            },

        }
    }

    //GiaoKeHoachSanXuat
    GiaoKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListGiaoKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetGiaoKeHoachSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetGiaoKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepGiaoKeHoachSanXuat', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            },
            HoanThanh: (data) => {
                return this.http.post(url + 'HoanThanhGiaoKeHoachSanXuat', data, httpOptions);
            },
            ExportGiaoKeHoachSanXuat: (Id) => {
                return this.http.get(url + `ExportGiaoKeHoachSanXuat?Id=${Id}`, httpOptions);
            }
        }
    }
    //TrienKhaiKeHoachSanXuat
    TrienKhaiKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhTrienKhaiKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id, ChiTiet?) => {
                return this.http.get(url + `GetTrienKhaiKeHoachSanXuat?Id=${Id}&ChiTiet=${ChiTiet === false ? false : true}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            KhongDuyet: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'KhongDuyetTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            TinhNangSuat: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'TinhNangSuat', data, httpOptions);
            },
            GetChiSo: (data) => {
                return this.http.post(url + 'GetChiSo', data, httpOptions);
            },
            SetChiSo: (data) => {
                return this.http.post(url + 'SetChiSo', data, httpOptions);
            },
            Export: (Id) => {
                return this.http.get(url + `ExportTrienKhaiKeHoachSanXuat?Id=${Id}`, httpOptions);
            },
            GetListGiaoKeHoachSanXuatChuaLapKeHoach: (IddmPhanXuong) => {
                return this.http.get(url + `GetListGiaoKeHoachSanXuatChuaLapKeHoach?IddmPhanXuong=${IddmPhanXuong}`, httpOptions)
            },
            HoanThanh: (data) => {
                return this.http.post(url + 'HoanThanhTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
        }
    }
    //CanDoiChuyen
    CanDoiChuyen() {
        let url = API.SCMQuanLyKho;
        return {
            GetListCanDoiChuyen: (IddmPhanXuong, CongDoan, TuNgayUnix, DenNgayUnix) => {
                return this.http.get(`${url}GetListCanDoiChuyen?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&TuNgay=${TuNgayUnix}&DenNgay=${DenNgayUnix}`, httpOptions);
            },
            GetCanDoiChuyen: (IddmPhanXuong, CongDoan, NgayUnix) => {
                return this.http.get(`${url}GetCanDoiChuyen?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${NgayUnix}`, httpOptions);
            },
            SetCanDoiChuyen: (data) => {
                data.IdDuAn = this.store.getCurrent().toString();
                return this.http.post(`${url}SetCanDoiChuyen`, data, httpOptions);
            },
            SetCanDoiChuyen_ApDungNgay: (data) => {
                return this.http.get(`${url}SetCanDoiChuyen_ApDungNgay?IddmPhanXuong=${data.IddmPhanXuong}&CongDoan=${data.CongDoan}&Ngay=${data.NgayUnix}&TuNgay=${data.TuNgayUnix}&DenNgay=${data.DenNgayUnix}&Xoa=true`)
            },
            GetlistdmMatHangDao: (IddmPhanXuong) => {
                return this.http.get(`${url}GetlistdmMatHangDao?IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
            },
            ThemMatHangDao: (data) => {
                return this.http.post(`${url}ThemMatHangDao`, data, httpOptions);
            },
            SetDieuChinhCanDoiChuyen: (data) => {
                return this.http.post(`${url}SetDieuChinhCanDoiChuyen`, data, httpOptions);
            },
            XoaMatHangDao: (Id) => {
                return this.http.get(`${url}XoaMatHangDao?Id=${Id}`, httpOptions)
            }
        }
    }
    //#region  NhapLoBong
    QuyTrinhPhieuNhapLoBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapLoBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong', data, httpOptions)
            },
            GetNextSoLoBong: (IddmLoaiBong, IddmCapBong) => {
                return this.http.get(url + `GetNextSoLoBong?IddmLoaiBong=${IddmLoaiBong}&IddmCapBong=${IddmCapBong}`, httpOptions)
            },
            ExportExcel: (Id) => {
                return this.http.get(url + `ExportPhieuNhapLoBong?Id=${Id}`, httpOptions)
            },
            ExportPhieuNhapLoBongXo: (Id) => {
                return this.http.get(url + `ExportPhieuNhapLoBongXo?Id=${Id}`, httpOptions)
            },
            ExportHoaDonNhapKhoBong: (Id) => {
                url = API.SCMDanhMuc
                return this.http.get(`${url}ExportHoaDonNhapKhoBong?Id=${Id}`, httpOptions)
            },
            ExportHoaDonNhapKhoXo: (Id) => {
                url = API.SCMDanhMuc
                return this.http.get(`${url}ExportHoaDonNhapKhoXo?Id=${Id}`, httpOptions)
            },
            ExportBangKeNhapKhoXo: (data) => {
                url = API.SCMDanhMuc
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBangKeNhapKhoXo`, data, httpOptions)
            },
            ExportBangKeNhapKhoBong: (data) => {
                url = API.SCMDanhMuc
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBangKeNhapKhoBong`, data, httpOptions)
            },
            GetListChoHopDong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(API.SCMChoModuleHopDong + 'GetListPhieuNhapLoBong', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  NhapChatLuong
    PhieuNhapLoBong_ChatLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong_ChatLuong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong_ChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            Import: (Id, FileName) => {
                return this.http.get(url + `ImportExcelPhieuNhapLoBong_ChatLuong?Id=${Id}&FileName=${FileName}`, httpOptions)
            },
            Import_Mic: (Id, FileName) => {
                return this.http.get(url + `ImportExcelPhieuNhapLoBong_ChatLuong_Mic?Id=${Id}&FileName=${FileName}`, httpOptions)
            },
            exportExcelMau: (Loai) => {
                return this.http.get(url + `ExportMauExcelChatLuong?Loai=${Loai}`, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu bàn giao bông xơ
    PhieuBanGiaoBongXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuBanGiaoBongXo', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuBanGiaoBongXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuBanGiaoBongXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuBanGiaoBongXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuBanGiaoBongXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuBanGiaoBongXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuBanGiaoBongXo', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu hạ cấp
    PhieuHaCap() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuHaCap', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuHaCap', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuHaCap?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuHaCap', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuHaCap', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuHaCap', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuHaCap', data, httpOptions)
            },
        }
    }
    //#endregion


    //#region  phiếu điều chuyển
    PhieuDieuChuyen() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuDieuChuyen', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuDieuChuyen', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuDieuChuyen?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuDieuChuyen', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuDieuChuyen', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuDieuChuyen', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuDieuChuyen', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region nhập kế hoạch nguyên liệu
    NhapKeHoachNguyenLieu() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachNhapNguyenLieu', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachNhapNguyenLieu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapNguyenLieu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachNhapNguyenLieu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapNguyenLieu', data, httpOptions)
            },
            GetListChuaNhap: (IdKeHoachInvoice_Item, Loai) => {
                let IdDuAn = this.store.getCurrent();
                return this.http.get(url + `GetListKeHoachNhapNguyenLieu_ChuaNhapHang?IdDuAn=${IdDuAn}&IdKeHoachInvoice_Item=${IdKeHoachInvoice_Item}&Loai=${Loai}`, httpOptions)
            },
            HoanThanh: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'HoanThanhKeHoachNhapNguyenLieu', data, httpOptions);
            },
        }
    }

    //#region nhập kế hoạch nguyên liệu
    KeHoachXuatHang() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachXuatHang', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListKeHoachXuatHang', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachXuatHang?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachXuatHang', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachXuatHang', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachXuatHang', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachXuatHang', data, httpOptions)
            },
            ExportThongBaoXuatHang: (Id) => {
                url = API.SCMBaoCao
                return this.http.get(url + `ExportThongBaoXuatHang?Id=${Id}`, httpOptions);
            }
        }
    }
    //#endregion

    //#region thống kê điện
    ThongKeDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                // data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListThongKeDien', data, httpOptions);
            },
            Get: (data) => {
                return this.http.post(url + `GetThongKeDien`, data, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeDien', data, httpOptions);
            },
            GetDanhSachKhungGio: (data) => {
                return this.http.post(url + 'GetDanhSachKhungGio', data, httpOptions);
            },
            GetItemKhungGio: (Id) => {
                return this.http.get(url + `GetItemKhungGio?Id=${Id}`, httpOptions);
            },
            SetItemKhungGio: (data) => {
                return this.http.post(url + 'SetItemKhungGio', data, httpOptions);
            },
            DeleteKhungGio: (data) => {
                return this.http.post(url + 'DeleteKhungGio', data, httpOptions);
            },
            GetDanhSachLoaiKhungGio: (data) => {
                return this.http.post(url + 'GetDanhSachLoaiKhungGio', data, httpOptions);
            },
            GetBaoCaoThongKeTienDien: (data) => {
                let urlBC = API.SCMBaoCao;
                return this.http.post(urlBC + 'GetBaoCaoThongKeTienDien', data, httpOptions);
            },
            GetItemBaoCaoThongKeTienDien: (data) => {
                let urlBC = API.SCMBaoCao;
                return this.http.post(urlBC + 'GetItemBaoCaoThongKeTienDien', data, httpOptions);
            }
        }
    }
    //#endregion

    ThongKeSanLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhThongKeSanLuong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListThongKeSanLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetThongKeSanLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeSanLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteThongKeSanLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepThongKeSanLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetThongKeSanLuong', data, httpOptions)
            },
            GetMatHang: (IddmPhanXuong, IddmCaSanXuat, Ngay) => {
                return this.http.get(url + `GetMatHangThongKeSanLuong?IddmPhanXuong=${IddmPhanXuong}&IddmCaSanXuat=${IddmCaSanXuat}&Ngay=${Ngay}`, httpOptions)
            },
            GetMatHangTheoNgay: (IddmPhanXuong, Ngay) => {
                return this.http.get(url + `GetMatHangThongKeSanLuongTheoNgay?IddmPhanXuong=${IddmPhanXuong}&Ngay=${Ngay}`, httpOptions)
            },
            DinhMuc: (Id) => {
                return this.http.get(url + `updateSanLuongDinhMuc?Id=${Id}`, httpOptions);
            },
            GetTyLeThongKeSanLuongBongPhe: (IdThongKeSanLuong: any = '') => {
                return this.http.get(url + `GetTyLeThongKeSanLuongBongPhe?IdThongKeSanLuong=${IdThongKeSanLuong}`, httpOptions)
            },
            TinhTyLeThongKeSanLuongBongPhe: (data) => {
                console.log('service', data);
                return this.http.post(`${url}TinhTyLeThongKeSanLuongBongPhe`, data, httpOptions)
            }
        }
    }
    //Pha bông
    PhuongAnPhaBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnPhaBong', httpOptions);
            },
            GetLoBongTrongKho: (IdDuAn, IddmPhanXuong) => {
                return this.http.get(url + `GetLoBongTrongKho?IdDuAn=${IdDuAn}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions)
            },
            TinhKhoiLuongBong: (data) => {
                return this.http.post(url + 'TinhKhoiLuongBong', data, httpOptions)
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhuongAnPhaBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnPhaBong?Id=${Id}`, httpOptions);
            },
            LamMoiDuLieu: (Id) => {
                return this.http.get(url + `GetPhuongAnPhaBong?Id=${Id}&isDieuChinh=true`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = parseInt(this.store.getCurrent());
                return this.http.post(url + 'SetPhuongAnPhaBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnPhaBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnPhaBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnPhaBong', data, httpOptions)
            },
            GetHoanThanh: () => {
                return this.http.get(url + `GetListPhuongAnPhaBongHoanThanh`, httpOptions);
            },
            TimBong_Kien: (IdPhuongAnPhaBong) => {
                return this.http.get(url + `GetListPhuongAnTimBong_Kien?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}`, httpOptions);
            },
            GetListItemDieuChinhTimBong: (IdPhuongAnPhaBong, ThuTu) => {
                return this.http.get(url + `GetListItemDieuChinhTimBong?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}&ThuTu=${ThuTu}`, httpOptions);
            },
            GetLoBongTrongKho_DieuChinh: (Mic, IdLoBong) => {
                let IdDuAn = parseInt(this.store.getCurrent());
                return this.http.get(url + `GetLoBongTrongKho_DieuChinh?IdDuAn=${IdDuAn}&Mic=${Mic}&IdLoBong=${IdLoBong}`, httpOptions);
            },
            GetListdmLoaiBong_PAPB: () => {
                return this.http.get(API.SCMDanhMuc + `GetListdmLoaiBong_PAPB`, httpOptions);
            },
            KiemTraButtonDieuChinhPhuongAnPhaBong: (IdPhuongAnPhaBong) => {
                return this.http.get(url + `KiemTraButtonDieuChinhPhuongAnPhaBong?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}`, httpOptions);
            },
            DieuChinhPhuongAnPhaBong: (IdPhuongAnPhaBong) => {
                return this.http.get(url + `DieuChinhPhuongAnPhaBong?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}`, httpOptions);
            },
            UpdateDieuChinhPhuongAnPhaBong: (data) => {
                return this.http.post(`${url}UpdateDieuChinhPhuongAnPhaBong`, data, httpOptions)
            },
            ExportPhuongAnPhaBong: (IdPhuongAnPhaBong) => {
                url = API.SCMBaoCao;
                return this.http.get(url + `ExportPhuongAnPhaBong?Id=${IdPhuongAnPhaBong}`, httpOptions);
            },
            ExportTimBong: (IdPhuongAnPhaBong, BanBong) => {
                return this.http.get(url + `ExportTimBong?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}&BanBong=${BanBong}`, httpOptions);
            },
            SetSoBanTimTuDongMax: (data) => {
                return this.http.post(`${url}SetSoBanTimTuDongMax`, data, httpOptions)
            }
        }
    }



    Importdm(TableName, FileName) {
        let IdDuAn = this.store.getCurrent().toString()
        let url = API.SCMDanhMuc + `ImportDanhMuc?IdDuAn=${IdDuAn}&TableName=${TableName}&FileName=${FileName}`;
        return this.http.get(url, httpOptions);
    }
    Exportdm(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + `ExportDanhMuc`;
        return this.http.post(url, data, httpOptions);
    }
    download(url) {
        window.open(API.imgURL + url);
    }
    getLuuKho(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKho?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKhac(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKhoKhac?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKiemKe(IddmKho, IdLoBong, sFilter, IdLoHang) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKe?IdDuAn=0&IddmKho=${IddmKho}&IdLoHang=${IdLoHang || ''}&IdLoBong=${IdLoBong || ''}&sFilter=${sFilter}`;
        // 
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKiemKeThanhPham(IddmKho, IdLoBong, sFilter, IdLoHang) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKeThanhPham?IdDuAn=0&IddmKho=${IddmKho}&IdLoHang=${IdLoHang || ''}&IdLoBong=${IdLoBong || ''}&sFilter=${sFilter}`;
        // 
        return this.http.get(url, httpOptions);
    }
    KhoiTaoItem() {
        let url = API.SCMDanhMuc + 'KhoiTaoDinhMuc';
        return this.http.get(url, httpOptions);
    }
    PhieuNhapThanhPham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapThanhPham', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapThanhPham', data, httpOptions)
            },
            ExportBangKeNhapKhoThanhPham: (data) => {
                data.IdDuAn = this.store.getCurrent();
                url = API.SCMBaoCao
                return this.http.post(url + 'ExportBangKeNhapKhoThanhPham', data, httpOptions)
            },
        }
    }
    PhieuNhapHoiAm() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapHoiAm', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapHoiAm', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapHoiAm?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapHoiAm', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapHoiAm', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapHoiAm', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapHoiAm', data, httpOptions)
            },
            GetListMatHang: (data) => {
                return this.http.post(url + 'GetlistdmMatHangHoiAm', data, httpOptions)
            },
        }
    }
    PhieuChatLuongSoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKiemTraChatLuong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListQuyTrinhKiemTraChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetQuyTrinhKiemTraChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetQuyTrinhKiemTraChatLuong', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + 'DeleteQuyTrinhKiemTraChatLuong?Id=' + Id, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepQuyTrinhKiemTraChatLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetQuyTrinhKiemTraChatLuong', data, httpOptions)
            },
        }
    }

    TimBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhuongAnTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhuongAnTimBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnTimBong', data, httpOptions)
            },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, { IdDuAn: this.store.getCurrent(), listItem: data }, httpOptions)
            },
            TimBongTuDong: (IdTimBong) => {
                return this.http.get(`${url}TaoPhuongAnTimBong?Id=${IdTimBong}`, httpOptions)
            }
        }
    }

    SanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhuongAnSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnSanXuat', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // ChuyenTiep: (data) => {
            //     return this.http.post(url + 'ChuyenTiepPhuongAnSanXuat', data, httpOptions)
            // },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            }
        }
    }

    XepBanBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhuongAnXepBanBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnXepBanBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnXepBanBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnXepBanBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnXepBanBong', data, httpOptions)
            },
            // GetListKienBong: (data) => {
            //     return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            // },
            GetListForCopyXepBanBong: (data) => {
                return this.http.post(url + `GetListForCopyXepBanBong`, data, httpOptions)
            }
        }
    }

    //#region  định lượng

    GetListDinhMuc(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'GetListDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    GetDinhMuc(Id) {
        let url = API.SCMDanhMuc + `GetDinhMuc?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }
    SetDinhMuc(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    DeleteDinhMuc(data) {
        let url = API.SCMDanhMuc + 'DeleteDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuKiemKeKho() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeThanhPham', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeThanhPham', data, httpOptions)
            },
            GetlistdmMatHangThanhPhamKiemKe: () => {
                return this.http.get(url + `GetlistdmMatHangThanhPhamKiemKe`, httpOptions);
            },
        }
    }
    //#region  định lượng

    GetListdmViTri(data) {
        let url = API.SCMDanhMuc + 'GetListdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmViTriOpt() {
        let url = API.SCMDanhMuc + `GetListdmViTri`;
        return this.http.get(url, httpOptions);
    }
    SetdmViTri(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmViTri(data) {
        let url = API.SCMDanhMuc + 'DeletedmViTri';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuXuatSanXuat() {
        let url = API.SCMQuanLyKho;
        let urlDM = API.SCMDanhMuc;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBong', data, httpOptions)
            },
            ExportExcel: (Id) => {
                return this.http.get(urlDM + `ExportPhieuXuatKhoBong?Id=${Id}`, httpOptions);
            },
            ExportHoaDon: (Id) => {
                return this.http.get(urlDM + `ExportHoaDonXuatKhoBong?Id=${Id}`, httpOptions);
            },
            ExportBangKeXuatKhoBong: (data) => {
                return this.http.post(urlDM + 'ExportBangKeXuatKhoBong', data, httpOptions);
            },
            GetListKienDoi: (IdPhieuXuatBong) => {
                return this.http.get(url + `GetListKienDoi?IdPhieuXuatBong=${IdPhieuXuatBong}`, httpOptions);
            },
        }
    }
    PhuongAnDieuChinhTimBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnDieuChinhTimBong', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnDieuChinhTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnDieuChinhTimBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            GetKienLoBong: (IdPhuongAnPhaBong, IdLoBong, IddmKho, Mic) => {
                return this.http.get(url + `GetKienLoBongDieuChinh?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}&IdLoBong=${IdLoBong}&IddmKho=${IddmKho}&Mic=${Mic}`, httpOptions)
            },
        }
    }
    PhieuXuatKhoXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatXo', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatXo', data, httpOptions)
            },
            ExportPhieuXuatKhoXo: (Id) => {
                return this.http.get(`${url}ExportPhieuXuatKhoXo?Id=${Id}`, httpOptions)
            },
            ExportHoaDonXuatKhoXo: (Id) => {
                url = API.SCMDanhMuc;
                return this.http.get(`${url}ExportHoaDonXuatKhoXo?Id=${Id}`, httpOptions)
            },
            ExportPhieuXuatKhoXo_BangKe: (data) => {
                url = API.SCMDanhMuc;
                return this.http.post(`${url}ExportBangKeXuatKhoXo`, data, httpOptions)
            }
        }
    }
    PhieuXuatBongPhe() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBongPhe', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatBongPhe', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBongPhe?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBongPhe', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuXuatBongPhe', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBongPhe', data, httpOptions)
            },
            ExportHoaDonXuatKhoBongPhe: (Id) => {
                url = API.SCMDanhMuc
                return this.http.get(`${url}ExportHoaDonXuatKhoBongPhe?Id=${Id}`, httpOptions)
            },
            ExportBangKeXuatKhoBongPhe: (data) => {
                url = API.SCMDanhMuc
                return this.http.post(`${url}ExportBangKeXuatKhoBongPhe`, data, httpOptions)
            }
        }
    }

    //Dashboard
    DashBoard() {
        let url = API.SCMDashBoard
        return {
            NhuCauSuDungBong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_NhuCauSuDungBong`, data, httpOptions);
            },
            CoCauTonBong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_CoCauTonBong`, data, httpOptions);
            },
            CanDoiTon: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}GetDashBoard_CanDoiTon`, data, httpOptions);
            },
            // GetCoCauTonBong:(data)=>{
            //     return this.http.post(`${url}/GetCoCauTonBong`,data,httpOptions);
            // },
            BaoCaoSanLuongLuyKe_BieuDoDuong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}BaoCaoSanLuongLuyKe_BieuDoDuong`, data, httpOptions);
            },
            BaoCaoSanLuongLuyKe_BieuDoCot: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}BaoCaoSanLuongLuyKe_BieuDoCot`, data, httpOptions);
            },
            ExportBaoCaoThongKeDien: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBaoCaoThongKeDien`, data, httpOptions);
            },
            ExportBaoCaoThongKeChatLuong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBaoCaoThongKeChatLuong`, data, httpOptions)
            },
            ExportThongKeSanLuong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportThongKeSanLuong`, data, httpOptions);
            },
            GetDashBoard_TruyXuatNguonGocTongHop: (data) => {
                return this.http.post(`${url}GetDashBoard_TruyXuatNguonGocTongHop`, data, httpOptions)
            },
            GetDashBoard_PhieuNhapKho: (data) => {
                return this.http.post(`${url}GetDashBoard_PhieuNhapKho`, data, httpOptions);
            },
            GetDashBoard_PhieuXuatKho: (data) => {
                return this.http.post(`${url}GetDashBoard_PhieuXuatKho`, data, httpOptions);
            },
            GetDashBoard_PhieuNhapKhoBong: (data) => {
                return this.http.post(`${url}GetDashBoard_PhieuNhapKhoBong`, data, httpOptions);
            },
            GetDashBoard_PhieuXuatKhoBong: (data) => {
                return this.http.post(`${url}GetDashBoard_PhieuXuatKhoBong`, data, httpOptions);
            },
            GetListdmItemTheoPhanXuong_DashboardSanLuong: (data) => {
                return this.http.post(`${API.SCMDanhMuc}GetListdmItemTheoPhanXuong_DashboardSanLuong`, data, httpOptions)
            },
            ExportBaoCaoThongKeChatLuongBanChePham: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBaoCaoThongKeChatLuongBanChePham`, data, httpOptions)
            },
            GetDashBoard_TongHop_TyLeBongPheBongHoi: (data) => {
                return this.http.post(`${url}GetDashBoard_TongHop_TyLeBongPheBongHoi`, data, httpOptions)
            }
        }
    }


    GetDanhSachChiTieuChatLuong(data) {
        let url = API.SCMKiemTraChatLuong + 'GetDanhSachChiTieuChatLuong';
        return this.http.post(url, data, httpOptions);
    }

    PhieuXuatThanhPham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatThanhPham', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatThanhPham', data, httpOptions)
            },
            ExportBangKeXuatKhoThanhPham: (data) => {
                data.IdDuAn = this.store.getCurrent();
                url = API.SCMBaoCao
                return this.http.post(url + 'ExportBangKeXuatKhoThanhPham', data, httpOptions)
            },
            GetListChoHopDong: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(API.SCMChoModuleHopDong + 'GetListPhieuXuatThanhPham', data, httpOptions);
            },
        }
    }
    PhanQuyen() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListUserTheoGiaoDien', data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetUserTheoGiaoDien', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeleteUserTheoGiaoDien?Id=${Id}`, httpOptions);
            },
        }
    }
    LoHang() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListLoMatHang', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetLoMatHang?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetLoMatHang', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeleteLoMatHang?Id=${Id}`, httpOptions);
            },
        }
    }
    GetlistdmMatHangKiemTraChatLuong(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangKiemTraChatLuong';
        return this.http.post(url, data, httpOptions);
    }
    GetlistdmMatHangThanhPham(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangThanhPham';
        return this.http.post(url, data, httpOptions);
    }
    GetlistdmMatHangHaCap(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangHaCap';
        return this.http.post(url, data, httpOptions);
    }
    GetListLoaiSoiTietKiem() {
        let url = API.SCMDanhMuc + `GetListLoaiSoiTietKiem`;
        return this.http.get(url, httpOptions);
    }
    GetlistdmMatHangXuatThanhPham(data) {
        let url = API.SCMQuanLyKho + 'GetlistdmMatHangXuatThanhPham';
        return this.http.post(url, data, httpOptions);
    }
    Notifications() {
        let url = API.auth + 'Notification/'
        return {
            GetListNotification: () => {
                return this.http.get(`${url}GetListNotification`, httpOptions)
            },
            GetMoreNotification: (lastId) => {
                return this.http.get(`${url}GetListNotification?idIdLast=${lastId}`, httpOptions)
            },
            GetNotiCounAndNew: () => {
                return this.http.get(`${url}GetNotification`, httpOptions)
            },
            MarkAllRead: () => {
                return this.http.post(`${url}MarkAllRead`, {}, httpOptions)
            },
            XemNotification: (data) => {
                return this.http.post(`${url}XemNotification`, data, httpOptions)
            }
        }
    }
    PhieuKiemKeBanChePham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeBanChePham', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeBanChePham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeBanChePham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeBanChePham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeBanChePham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeBanChePham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeBanChePham', data, httpOptions)
            },
        }
    }
    dmKiemKeBanChePham() {
        let url = API.SCMDanhMuc;
        return {
            GetListAll: () => {
                return this.http.get(url + `GetListdmKiemKeBanChePham`, httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListdmKiemKeBanChePham', data, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmKiemKeBanChePham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmKiemKeBanChePham', data, httpOptions);
            },
        }
    }
    GetListCanDoiChuyenKiemKe(IddmPhanXuong, CongDoan, Ngay) {
        let url = API.SCMQuanLyKho + `GetListCanDoiChuyenKiemKe?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${Ngay}`;
        return this.http.get(url, httpOptions);
    }
    GetListThongKeSanLuong(IddmPhanXuong, CongDoan, Ngay) {
        let url = API.SCMQuanLyKho + `GetListThongKeSanLuong?IddmPhanXuong=${IddmPhanXuong}&CongDoan=${CongDoan}&Ngay=${Ngay}`;
        return this.http.get(url, httpOptions);
    }
    GetListItemKiemKeBanChePham(IddmPhanXuong, Ngay, IddmCaSanXuat) {
        let url = API.SCMQuanLyKho + `GetListItemKiemKeBanChePham?IddmPhanXuong=${IddmPhanXuong}&Ngay=${Ngay}&IddmCaSanXuat=${IddmCaSanXuat}`;
        return this.http.get(url, httpOptions);
    }
    dmDacTinhBong() {
        let url = API.SCMDanhMuc;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetListdmDacTinhBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetdmDacTinhBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmDacTinhBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmDacTinhBong', data, httpOptions);
            },
            GetDacTinh: (IddmLoaiBong, IddmCapBong) => {
                return this.http.get(url + `GetdmDacTinhBong?IddmLoaiBong=${IddmLoaiBong}&IddmCapBong=${IddmCapBong}`, httpOptions);
            },
        }
    }
    NhapKeHoachNguyenLieuInvoice() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachNhapNguyenLieuInvoice', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachNhapNguyenLieuInvoice?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapNguyenLieuInvoice', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachNhapNguyenLieuInvoice', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapNguyenLieuInvoice', data, httpOptions)
            },
            KeHoachForInvoice: () => {
                return this.http.get(url + `GetListKeHoachNhapNguyenLieuForInvoice`, httpOptions)
            },
            ExportExcel: (Id) => {
                return this.http.get(url + `ExportKeHoachNhapNguyenLieuInvoice?Id=${Id}`, httpOptions)
            }
        }
    }
    GetListKgCone() {
        let url = API.SCMDanhMuc + `GetListKgCone`;
        return this.http.get(url, httpOptions);
    }
    GetListdmKgCone(data) {
        let url = API.SCMDanhMuc + 'GetListKgCone';
        return this.http.post(url, data, httpOptions);
    }
    SetdmKgCone(data) {
        let url = API.SCMDanhMuc + 'SetdmKgCone';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmKgCone(data) {
        let url = API.SCMDanhMuc + 'DeletedmKgCone';
        return this.http.post(url, data, httpOptions);
    }
    QuyTrinhPhieuBongPhe() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapBongPhe', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapBongPhe', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapBongPhe?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapBongPhe', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapBongPhe', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapBongPhe', data, httpOptions)
            },
            ExportHoaDonNhapKhoBongPhe: (Id) => {
                url = API.SCMDanhMuc
                return this.http.get(url + 'ExportHoaDonNhapKhoBongPhe?Id=' + Id, httpOptions)
            },
            ExportBangKeNhapKhoBongPhe: (data) => {
                url = API.SCMDanhMuc
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(`${url}ExportBangKeNhapKhoBongPhe`, data, httpOptions)
            }
        }
    }
    dmKhachHang() {
        let url = API.SCMDanhMuc;
        return {
            GetListOpt: () => {
                return this.http.get(url + 'GetListdmKhachHang', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListdmKhachHang', data, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetdmKhachHang', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmKhachHang', data, httpOptions);
            },
            GetListdmKhachHangTheoId: (Id) => {
                return this.http.get(url + `GetListdmKhachHangTheoId?Id=${Id}`, httpOptions);
            },
        }
    }
    GetListLoaiNhomKho() {
        let url = API.SCMDanhMuc + 'GetListLoaiNhomKho';
        return this.http.get(url, httpOptions);
    }
    PhieuKiemKeKhoBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeBongXo', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeBongXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeBongXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeBongXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeBongXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeBongXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeBongXo', data, httpOptions)
            },
            GetlistdmMatHangKiemKe: (IddmKho, IdLoBong) => {
                return this.http.get(url + `getLuuKhoKiemKeKhoBong?IdDuAn=0&IddmKho=${IddmKho}&IdLoBong=${IdLoBong}`, httpOptions);
            },
            getLuuKhoKiemKeKhoXoTheoItem: (IddmItem) => {
                return this.http.get(url + `getLuuKhoKiemKeKhoXoTheoItem?IddmItem=${IddmItem}`, httpOptions);
            },
            GetlistdmMatHangKiemKeBongHoi: (Loai, IddmLoaiBong) => {
                return this.http.get(url + `GetlistdmMatHangKiemKeBongHoi?Loai=${Loai}&IddmLoaiBong=${IddmLoaiBong}`, httpOptions);
            },
            ExportBangKe: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + `ExportBangKeNhapKhoBongPhe`, data, httpOptions);
            }
        }
    }
    GetTheKho(data) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + 'GetTheKho';
        return this.http.post(url, data, httpOptions);
    }
    GetLuuKhoTheKho(data) {
        // data.IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + 'GetLuuKhoTheKho';
        return this.http.post(url, data, httpOptions);
    }
    getLuuKhoKiemKeKhoXo(IddmKho, IdLoBong, sFilter, IdLoHang) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKeKhoXo?IdDuAn=0&IddmKho=${IddmKho}&IdLoHang=${IdLoHang || ''}&IdLoBong=${IdLoBong || ''}&sFilter=${sFilter}`;
        // 
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKiemKeKhoBongPhe(IddmKho, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKeKhoBongPhe?IdDuAn=0&IddmKho=${IddmKho}&sFilter=${sFilter}`;
        // 
        return this.http.get(url, httpOptions);
    }
    PhieuKiemKeKhoBongPhe() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeBongXo', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeBongPhe', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeBongPhe?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeBongPhe', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeBongPhe', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeBongPhe', data, httpOptions)
            },
            GetlistdmMatHangKiemKeBongPhe: (Loai) => {
                return this.http.get(url + `GetlistdmMatHangKiemKeBongPhe?Loai=${Loai}`, httpOptions);
            }
        }
    }
    ExportNhuCauXuatHangTheoMatHang(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMBaoCao + 'ExportNhuCauXuatHangTheoMatHang';
        return this.http.post(url, data, httpOptions);
    }
    GetLuuKhoTheKhoBongXo(data) {
        // data.IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + 'GetLuuKhoTheKhoBongXo';
        return this.http.post(url, data, httpOptions);
    }
    GetLuuKhoBongPhe(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKhoBongPhe?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    ExportGetTheKho(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMQuanLyKho + 'ExportGetTheKho';
        return this.http.post(url, data, httpOptions);
    }
    getLuuKhoKiemKeKhoBongHoi(IddmKho, IdLoBong, sFilter, IdLoHang) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `getLuuKhoKiemKeKhoBongHoi?IdDuAn=0&IddmKho=${IddmKho}&IdLoHang=${IdLoHang || ''}&IdLoBong=${IdLoBong || ''}&sFilter=${sFilter}`;
        // 
        return this.http.get(url, httpOptions);
    }
    GetLuuKhoXo(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKhoXo?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    HDSD() {
        let url = API.SCMDanhMuc
        return {
            Set: (data) => {
                return this.http.post(`${url}SetTepDinhKemHuongDanSuDung`, data, httpOptions)
            },
            Get: () => {
                return this.http.get(`${url}GetTepDinhKemHuongDanSuDung`, httpOptions)
            }
        }
    }
    dmChiSoTrienKhai() {
        let url = API.SCMDanhMuc;
        return {
            GetListOpt: () => {
                return this.http.get(url + `GetListdmChiSoTrienKhai?IdDuAn=${this.store.getCurrent()}`, httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListdmChiSoTrienKhai', data, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetChiSoTrienKhai', data, httpOptions);
            },
            Delete: (Id) => {
                return this.http.get(url + `DeletedmChiSoTrienKhai?Id=${Id}`, httpOptions);
            },
        }
    }
    GetThongTinKien(IddmItem) {
        let url = API.SCMQuanLyKho;
        return this.http.get(url + `GetThongTinKien?IddmItem=${IddmItem}`, httpOptions);
    }
    PhieuKiemKeHoiAm() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeHoiAm', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeHoiAm', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeHoiAm?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeHoiAm', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeHoiAm', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeHoiAm', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeHoiAm', data, httpOptions)
            },
        }
    }
    GetHeThong(MaHeThong) {
        let url = API.SCMDanhMuc + `GetHeThong?MaHeThong=${MaHeThong}`;
        return this.http.get(url, httpOptions);
    }
    CheckViTriKien(TenLoBong, TenKien) {
        let url = API.SCMDanhMuc + `CheckViTriKien?TenLoBong=${TenLoBong}&TenKien=${TenKien}`;
        return this.http.get(url, httpOptions);
    }
    QuyTrinhPhieuNhapVatTuPhu() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapVatTuPhu', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuNhapVatTuPhu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapVatTuPhu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapVatTuPhu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapVatTuPhu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapVatTuPhu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapVatTuPhu', data, httpOptions)
            }
        }
    }
    PhieuXuatVatTuPhu() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatVatTuPhu', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatVatTuPhu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatVatTuPhu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatVatTuPhu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatVatTuPhu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuXuatVatTuPhu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatVatTuPhu', data, httpOptions)
            },
        }
    }
    PhieuKiemKeVatTuPhu() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeVatTuPhu', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuKiemKeVatTuPhu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeVatTuPhu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeVatTuPhu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeVatTuPhu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeVatTuPhu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeVatTuPhu', data, httpOptions)
            },
            luuKhoKiemKeKhoVatTuPhu: (IddmKho) => {
                return this.http.get(url + `getLuuKhoKiemKeKhoVatTuPhu?IdDuAn=0&IddmKho=${IddmKho}&sFilter=`, httpOptions);
            }
        }
    }
    KeHoachNhapBong() {
        let url = API.KeHoachNhapBong;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinh', httpOptions);
            },
            GetList: (data) => {
                data.idDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListQuyTrinhKeHoachNhapBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetQuyTrinhKeHoachNhapBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetKeHoachNhapBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepKeHoachNhapBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapBong', data, httpOptions)
            },
        }
    }
    PhieuXuatBongChoVay() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBongChoVay', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListPhieuXuatBongChoVay', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBongChoVay?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBongChoVay', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBongChoVay', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatBongChoVay', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBongChoVay', data, httpOptions)
            },
        }
    }
    CheckEditPhieuInvoice(IdKeHoachNhapNguyenLieuDongBo) {
        let url = API.SCMChoModuleHopDong + `CheckEditPhieuInvoice?IdKeHoachNhapNguyenLieuDongBo=${IdKeHoachNhapNguyenLieuDongBo}`;
        return this.http.get(url, httpOptions);
    }
    ThongKeSanLuongNhieuCa() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuThongKeSanLuongNhieuCa', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListThongKeSanLuongNhieuCa', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetThongKeSanLuongNhieuCa?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeSanLuongNhieuCa', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteThongKeSanLuongNhieuCa', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepThongKeSanLuongNhieuCa', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetThongKeSanLuongNhieuCa', data, httpOptions)
            },

        }
    }
    KiemTraBanChePham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemTraBanChePham', httpOptions);
            },
            GetList: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'GetListKiemTraBanChePham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKiemTraBanChePham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKiemTraBanChePham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKiemTraBanChePham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepKiemTraBanChePham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKiemTraBanChePham', data, httpOptions)
            },
            GetMatHang: (IddmPhanXuong, Ngay, CongDoan) => {
                return this.http.get(url + `GetMatHangKiemTraBanChePham?IddmPhanXuong=${IddmPhanXuong}&Ngay=${Ngay}&CongDoan=${CongDoan}`, httpOptions)
            },
        }
    }
    DanhMucLoaiBongPhe() {
        let url = API.SCMDanhMuc;
        return {
            Get: (Id) => {
                return this.http.get(url + `GetdmLoaiBongPhe?Id=${Id}`, httpOptions)
            },
            GetPromise: (Id) => {
                return this.http.get(url + `GetdmLoaiBongPhe?Id=${Id}`, httpOptions).toPromise()
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListdmLoaiBongPhe', data, httpOptions)
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmLoaiBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmLoaiBongPhe', data, httpOptions);
            },
        }
    }
}
