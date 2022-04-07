import { dinhDangSo, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from "./../../../../../../services/Hopdong/hopdong.service";
import { DanhMucHopDongService } from "./../../../../../../services/Hopdong/danhmuchopdong.service";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UploadmodalComponent } from "src/app/quantri/modal/uploadmodal/uploadmodal.component";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  mapArrayForDropDown,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-chitiethopdongbongxo",
  templateUrl: "./chitiethopdongbongxo.component.html",
  styleUrls: ["./chitiethopdongbongxo.component.css"],
})
export class ChitiethopdongbongxoComponent implements OnInit {
  @Input('listLoaiMatHang') listLoaiMatHang: any = [];
  @Output('listLoaiMatHangChange') listLoaiMatHangChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('listHangHoaChange') listHangHoaChange: EventEmitter<any> = new EventEmitter<any>();

  getKhachHang: any = []
  getKhachHang1: any = []
  optionsVatLieu = [
    { label: 'Bông', value: 2 },
    { label: 'Xơ', value: 5 },
  ]
  selected1: any = {};
  selected: any = {};
  dinhDangSo = dinhDangSo;
  listKhachHangA: any = []
  listKhachHangB: any = []
  listHinhThucThanhToan: any = [];
  listLoaiHopDong: any = [];
  listLoaiHopDongFull: any = [];
  isHienHopDongGoc: any = false;
  listLoaiTienTe: any = [];
  listdmKhachHang: any = [];
  getdmKhachHangForCopy: any = {};
  listHopDongGoc: any = [];
  @Input('item') item: any = {};
  @Input('listHangHoa') hangHoa: any = {};
  @Input('lstFileUploadCu') lstFileUploadCu: any = [];
  @Input() isSoi;
  @Input() loaiNguyenVatLieu: number;
  @Output() onChange = new EventEmitter<any>();
  @Output('itemChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('lstFileUploadCuChange') lstFileUploadCuChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onVatLieu: EventEmitter<number> = new EventEmitter<number>();
  @Input("opt") opt: string;
  @Input() getSearchStatus: boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();
  checkbutton: any = {};
  lang: any = vn;
  listHopDong: any = [];
  listHopDongFull: any = [];
  isHienThiLoaiHD: boolean = false
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _modal: NgbModal,
  ) {
  }

  onChangBenA(event, isChange = false) {
    let IddmKhachHang = "";
    if (isChange === false)
      IddmKhachHang = event.value;
    else
      IddmKhachHang = this.item.iddmKhachHangA;
    let selected = this.getKhachHang.find(
      (ele) => ele.Id === IddmKhachHang
    );
    this.selected.DiaChi = selected?.DiaChi
    this.selected.ChucVu = selected?.ChucVu
    this.selected.Ma = selected?.Ma
    this.selected.MaSoThue = selected?.MaSoThue
    this.selected.NguoiDaiDien = selected?.NguoiDaiDien
    this.selected.SoDienThoai = selected?.SoDienThoai
    this.selected.SoFax = selected?.SoFax
    this.selected.Ten = selected?.Ten
    this.selected.TaiKhoanNganHang = selected?.TaiKhoanNganHang
  }

  onChangBenB(event, isChange = false) {
    let IddmKhachHang = "";
    if (isChange === false)
      IddmKhachHang = event.value;
    else
      IddmKhachHang = this.item.iddmKhachHangB;
    let selected1 = this.getKhachHang.find(
      (ele) => ele.Id === IddmKhachHang
    );
    this.selected1.DiaChi = selected1?.DiaChi
    this.selected1.ChucVu = selected1?.ChucVu
    this.selected1.Ma = selected1?.Ma
    this.selected1.MaSoThue = selected1?.MaSoThue
    this.selected1.NguoiDaiDien = selected1?.NguoiDaiDien
    this.selected1.SoDienThoai = selected1?.SoDienThoai
    this.selected1.SoFax = selected1?.SoFax
    this.selected1.Ten = selected1?.Ten
    this.selected1.TaiKhoanNganHang = selected1?.TaiKhoanNganHang
  }


  GetListdmLoaiBongForHopDong() {
    this._servicesSanXuat
      .GetListdmLoaiBongForHopDong(this.item.loai)
      .subscribe((res: any) => {
        this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
        this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
      });
    this.getListHopDongGoc();
  }
  LayGiaTriHopDong() {
    if (this.item.isLayTheoGiaTriHangHoa == true)
      this.item.giaTri = this.hangHoa.giaTriHopDongMatHang || 0;
    if (this.isSoi === true)
      this.item.giaTri = this.item.thanhTien || 0;
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   this.onChangBenA("",true);
  //   this.onChangBenB("",true);
  //   for (const propName in changes) {
  //     const chng = changes[propName];
  //     const cur = JSON.stringify(chng.currentValue.soQuyTrinh);
  //     const prev = JSON.stringify(chng.previousValue);
  //   }
  // }

  ngOnInit() {
    this.GetFormOptions();
    if (this.item.isPhuLuc) {
      this._service.QuyTrinhHopDong().GetListHopDongForPhuLuc(this.item.loai || 2).subscribe((res: any) => {
        this.listHopDong = mapArrayForDropDown(res, "soTenHopDong", "id");
        this.listHopDongFull = res;
      });
    }
    if (this.opt !== "edit") {
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
    else {
      this.getListHopDongGoc();
      // if (this.itemcha.lstFileUploadCu === undefined || this.itemcha.lstFileUploadCu === null)
      //   this.itemcha.lstFileUploadCu = [];
      // this.itemcha.lstFileUploadCu.forEach(element => {
      //   this.itemcha.listTen += `${element.TenGoc}`;
      // });
    }
    if (this.isSoi === true || this.item.isPhuLuc === true)
      this.isHienThiLoaiHD = true
  }


  // ngDoCheck() {
  //   this.itemChange.emit(this.item);
  //   this.itemchaChange.emit(this.itemcha);
  //   this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
  //   this.listLoaiMatHangChange.emit(this.listLoaiMatHang);

  // }

  GetFormOptions() {
    this._servicesdmHopDong
      .DanhMucLoaiHopDong()
      .GetListAll()
      .subscribe((res: any) => {
        this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
        this.listLoaiHopDongFull = res;
        if (this.opt === "edit")
          this.chonHopDongGoc();
      });

    this._servicesSanXuat
      .dmKhachHang()
      .GetListOpt()
      .subscribe((res: any) => {
        this.getKhachHang = res
        this.getKhachHang1 = res
        this.listdmKhachHang = mapArrayForDropDown(res, "Ten", "Id");
        if (this.opt === "edit") {
          this.onChangBenA('', true)
          this.onChangBenB('', true)

        }
      });


    this._servicesdmHopDong
      .DanhMucHinhThucThanhToan()
      .GetListAll()
      .subscribe((res: any) => {
        this.listHinhThucThanhToan = mapArrayForDropDown(res, "ten", "id");
      });
    this._servicesdmHopDong
      .DanhMucLoaiTienTe()
      .GetListAll()
      .subscribe((res: any) => {

        this.listLoaiTienTe = mapArrayForDropDown(res, "ten", "id");
      });
  }
  Loai(loai: boolean) {
    this.item.IsBong = loai;
  }
  chonHopDongGoc() {
    this.isHienHopDongGoc = false;
    if (this.isSoi !== true) {
      let itemFind = this.listLoaiHopDongFull.filter(el => el.id == this.item.iddmLoaiHopDong)
      if (itemFind !== undefined) {
        if (itemFind[0].ma == "BAN") {
          this.getListHopDongGoc();
          this.isHienHopDongGoc = true;
        }
      }
    }
  }
  getListHopDongGoc() {
    this._service.QuyTrinhHopDong().GetListAll(this.item.loai || 0)
      .subscribe((res: Array<any>) => {
        this.listHopDongGoc = mapArrayForDropDown(res, "soTenHopDong", "id");
      });
  }
  listHangHoaTheoHopDong() {
    this._service.QuyTrinhHopDong().getListMatHang(this.item.idHopDongGoc || '')
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          let data: any = res.data[0];
          data.id = '';
          data.soLuong = 0;
          data.soKien = 0;
          data.soContainer = 0;
          data.DonGiaThanhToan = data.donGia *(100 +(data.thueGTGT || 0))/100 ;
          data.giaTriHopDongMatHang = 0;
          if(this.item.isLayTheoGiaTriHangHoa === true){
            this.item.giaTri =  data.giaTriHopDongMatHang;
          }
          this.listHangHoaChange.emit(data);
        }
      });
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.item.file="sdfkhsldkfjhsldkjf";
      if(!validVariable(this.lstFileUploadCu))
        this.lstFileUploadCu = []
      data.forEach(element => {
        let item: any = {}
        item.id = '';
        item.fileNameGui = element.Name;
        item.fileName = element.NameLocal;
        item.link = element.Url;
        this.lstFileUploadCu.push(item);
        
      });
      this.lstFileUploadCuChange.emit(this.lstFileUploadCu);
    }, (reason) => {
    });
  }
  chonHopDong(e) {
    let itemFind = this.listHopDongFull.filter(el => el.id == e.value)
    if (itemFind !== undefined) {
      this.item.iddmLoaiHopDong = itemFind[0].iddmLoaiHopDong;
    }
  }
  removeItemDinhKem(item){
    let i = this.lstFileUploadCu.indexOf(item)
    let itemFind = this.lstFileUploadCu.splice(i, 1)[0];
    if(itemFind.id !== ''){
      itemFind.isXoa = true;
      this.lstFileUploadCu.push(JSON.parse(JSON.stringify(itemFind)));
    }
  } 
}
