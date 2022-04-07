import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';
@Injectable({
    providedIn: 'root'
})
export class Dat09Service {
    constructor(private http: HttpClient) { }
    


     //DanhMucHinhThucThanhToan
    DanhMucHinhThucThanhToan() {
    return {
        GetListdmDanhMucHinhThucThanhToan:(data) => {
            let url = API.danhmuc + 'GetListdmDanhMucHinhThucThanhToan';
         return this.http.post(url,  httpOptions)
        },
        SetdmDanhMucHinhThucThanhToan: (data) => {
            let url = API.danhmuc + 'SetdmDanhMucHinhThucThanhToan';
         return this.http.post(url,  httpOptions)
        },
        DeletedmDanhMucHinhThucThanhToan: (data) => {
            let url = API.danhmuc + 'DeletedmDanhMucHinhThucThanhToan';
         return this.http.post(url,  httpOptions)
        },
    }
    }

 //DanhMucLoaiHopDong
 DanhMucLoaiHopDong() {
    return {
        GetListdmLoaiHopDong:(data) => {
            let url = API.danhmuc + ' GetListdmLoaiHopDong';
         return this.http.post(url,  httpOptions)
        },
        SetdmLoaiHopDong: (data) => {
            let url = API.danhmuc + 'SetdmLoaiHopDong';
         return this.http.post(url,  httpOptions)
        },
        DeletedmLoaiHopDong: (data) => {
            let url = API.danhmuc + 'DeletedmLoaiHopDong';
         return this.http.post(url,  httpOptions)
        },
    }
    }

 //  DanhMucLoaiTienTe
DanhMucLoaiTienTe() {
return {
    GetListdmLoaiTienTe:(data) => {
        let url = API.danhmuc + 'GetListdmLoaiTienTe';
     return this.http.post(url,  httpOptions)
    },
    SetdmLoaiTienTe: (data) => {
        let url = API.danhmuc + 'SetdmLoaiTienTe';
     return this.http.post(url,  httpOptions)
    },
    DeletedmLoaiTienTe: (data) => {
        let url = API.danhmuc + 'DeletedmLoaiTienTe';
     return this.http.post(url,  httpOptions)
    },
}
}

//DanhMucThuTucThanhToan
DanhMucThuTucThanhToan() {
    return {
        GetListdmThuTucThanhToan:(data) => {
            let url = API.danhmuc + 'GetListdmThuTucThanhToan';
         return this.http.post(url,  httpOptions)
        },
        SetdmThuTucThanhToan: (data) => {
            let url = API.danhmuc + 'SetdmThuTucThanhToan';
         return this.http.post(url,  httpOptions)
        },
        DeletedmThuTucThanhToan: (data) => {
            let url = API.danhmuc + 'DeletedmThuTucThanhToan';
         return this.http.post(url,  httpOptions)
        },
    }
    }

//DanhMucTrangThaiBaoLanh
DanhMucTrangThaiBaoLanh() {
    return {
        GetListdmDanhMucTrangThaiBaoLanh:(data) => {
            let url = API.danhmuc + 'GetListdmDanhMucTrangThaiBaoLanh';
         return this.http.post(url,  httpOptions)
        },
        SetdmDanhMucTrangThaiBaoLanh: (data) => {
            let url = API.danhmuc + 'SetdmDanhMucTrangThaiBaoLanh';
         return this.http.post(url,  httpOptions)
        },
        DeletedmDanhMucTrangThaiBaoLanh: (data) => {
            let url = API.danhmuc + 'DeletedmDanhMucTrangThaiBaoLanh';
         return this.http.post(url,  httpOptions)
        },
    }
    }

    Importdm(View,FileName){
        // View:
        // BienDong,
        // MucDichSuDung
        // TinhTrangTaiSan,
        // NguonGocDat
        // CapHangCongTrinh
        // HienTrangSuDung
        // TaiSan,
        // DonVi,
        // HinhThucXuLy
        // DuAn
        // LoaiCongTrinh
        // PhuongAnSapXep
        // DonViSoHuuNhaDat
        let url = API.danhmuc + `Importdm${View}?FileName=${FileName}`;
        return this.http.get(url,httpOptions);
    }

    // SetActionRole(data) {
    //     let url = API.QLTSD + 'SetActionRole';
    //     return this.http.post(url, data, httpOptions);
    // }

    ChangePass(data){ //{"OldPassword":"1","NewPassword":"12"}
        let url = API.auth + 'QuanTri/ChangePass';
        return this.http.post(url, data, httpOptions);
    }

    ForgotPass(data){ //{"UserName":"1"}
        let url = API.auth + 'QuanTri/ForgotPassword';
        return this.http.post(url, data, httpOptions);
    }

    


    
    

    // Global function
    Avatar(str: string) {
        if (str !== null && str !== undefined && str.trim() !== '') {
            return API.imgURL + str;
        } else {
            return 'assets/img/defavatar.png';
        }
    }
    Img(str: string) {
        if (str !== null && str !== undefined && str.trim() !== '') {
            return API.imgURL + str;
        } else {
            return 'assets/img/defavatar.png';
        }
    }
    relativeDate(date) {
        let createdDate = new Date(date).getTime();
        let today = new Date().getTime();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var elapsed = today - createdDate;
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' giây trước';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' phút trước';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' giờ trước';
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ngày trước';
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' tháng trước';
        }
        else {
            return Math.round(elapsed / msPerYear) + ' năm trước';
        }
    }
    //Global function
    dateToUnix(data: any) {
        let date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setDate(data.day);
        date.setMonth(data.month - 1);
        date.setFullYear(data.year);
        return date.getTime() / 1000;
    }
    unixToDate(unix: number) {
        let date = new Date(unix * 1000);
        let day = '0' + date.getDate();
        let month = '0' + (date.getMonth() + 1);
        return day.slice(-2) + '/' + month.slice(-2) + '/' + date.getFullYear();
    }
    unixToPicker(unix: number) {
        let date = new Date(unix * 1000);
        let day = '0' + date.getDate();
        let month = '0' + (date.getMonth() + 1);
        return {
            day: +day,
            month: +month,
            year: date.getFullYear()
        };
    }
    dateStringRender(str) {

    }
    download(url) {
        window.open(API.imgURL+url);
    }
}
