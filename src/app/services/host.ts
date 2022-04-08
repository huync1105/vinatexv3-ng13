import { HttpHeaders } from '@angular/common/http';
// const host1 = 'http://eos.harmonyes.com.vn:2269';
// const host1 = 'http://103.130.212.45:2269';//cong test/
// const host1 = 'http://103.130.212.45:2368';//Tong Cong Ty Det May Nam Dinh
// const host1 = 'http://hoaxa.vinatex.harmonyes.com.vn:2368';//Tong Cong Ty Det May Nam Dinh moi
// const host1 = 'http://hoaxa.vinatex.harmonyes.com.vn';//Tong Cong Ty Det May Nam Dinh moi
// const host1 = 'http://phuhung.vinatex.harmonyes.com.vn/';//Nha May Phu Hung
// export const host1 = `${window.location.origin.includes('localhost')?'http://103.130.212.45:2369':(window.location.origin)}`;
export const host1 = `http://103.130.212.45:2269`;
// export const host2 = 'http://10.0.5.25:7169';
// export const host2 = 'http://10.0.5.25:7169';
// export const host1 = 'http://soindt.vinatex.com.vn';
// export const host1 = 'http://soisph.vinatex.com.vn';
// export const host1 = `${window.location.origin.includes('localhost')?'http://soisph.vinatex.com.vn':(window.location.origin)}`;
// export const host1 = 'http://eos.harmonyes.com.vn:1169';
// export const host1 = `${window.location.origin.includes('localhost')?'http://eos.harmonyes.com.vn:1169':(window.location.origin)}`;
// export const host1 = `${window.location.origin.includes('localhost')?'http://103.130.212.45:2368':(window.location.origin)}`;
// const host1 = 'http://vinatex.harmonyes.com.vn'; //Nha. May Soi Dong Van Hanosimex
// const host1 = 'http://phuhung.vinatex.harmonyes.com.vn'; //Nha. May phu hung
// const host = 'http://vinatex.harmonyes.com.vn';
// host public 'http://vinatex.harmonyes.com.vn';
// host phat trien 'http://eos.harmonyes.com.vn:1169';
// const host1 = 'http://serverda:1169'
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json,text/plain, */*',
    }),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    withCredentials: true,
};
export class API {    
    // public static auth = host1+'/SmartEOSAPI/';
    public static baseUrl = host1 + '/QLTS/';
    public static auth = host1 + '/SmartEOSAPI/';
    // public static baseUrl = host + '/';
    public static SCM = host1 + '/SCM/';
    public static HopDong = host1 + '/HopDong/';
    public static TaiSan = host1 + '/QLTS_Vinatex/';
    public static CungUng = host1 + '/QuanLyCungUng/';
    public static TaiSan2 = host1 + '/QuanLyCungUng/';
    public static KeHoachNhapBong = host1 + '/HopDong/KeHoachNhapBong/';    
    public static KeHoach = host1 + '/KeHoachAPI/';
    public static ThongKeDien = host1 + '/SCM/ThongKeDien/';
    public static KeHoachNguyenLieu = host1 + '/SCM/KeHoachNguyenLieu/';
    public static SCMQuanLyKho = host1 + '/SCM/QuanLyKho/';
    public static SCMChoModuleHopDong = host1 + '/SCM/APIChoModuleHopDong/';
    public static SCMDanhMuc = host1 + '/SCM/DanhMuc/';
    public static SCMKiemTraChatLuong = host1 + '/SCM/KiemTraChatLuong/';  
    public static SCMDashBoard = host1 +  '/SCM/BaoCao/';
    public static SCMBaoCao = host1 + '/SCM/BaoCao/';    
    public static danhmuc = API.baseUrl + 'DanhMuc/';
    public static QLTSD = API.baseUrl+'QuanLyTaiSanDat/';
    public static uploadURL = host1 + '/QLTS/FileUploader/Post';
    public static uploadURLalt = host1 + '/uploader/api/hdfiles';
    public static downloadURL = host1 +'/uploader/api/hdfiles'
    public static imgURL = host1;
}

