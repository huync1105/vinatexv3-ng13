import { Component, OnInit, ViewChildren } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { UploadmodalComponent } from "src/app/quantri/modal/uploadmodal/uploadmodal.component";
import { Dat09Service } from "src/app/services/callApi";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
    deepCopy,
    mapArrayForDropDown,
    validVariable,
    DateToUnix,
    UnixToDate,
    formatdate,
} from "src/app/services/globalfunction";

@Component({
    selector: "app-dmthongkedienmodal",
    templateUrl: "./dmthongkedienmodal.component.html",
    styleUrls: ["./dmthongkedienmodal.component.css"],
})
export class DmthongkedienmodalComponent implements OnInit {
    opt: any = "";
    item: any = {};
    nametype: any = "";
    lstKhungGio: any = [];
    khongclicknhieu: any = false;
    idCaSanXuat: any = '';
    @ViewChildren('input') listInput;
    cols: any = [
        // {
        //     header: "Số tiêu thụ (KW)",
        //     field: "SoTieuThu",
        //     width: "unset",
        //     align: "right",
        // },
        {
            header: "Hệ số nhân",
            field: "HeSoNhan",
            width: "unset",
            align: "right",
        },
        {
            header: "Hệ số TI",
            field: "HeSoTI",
            width: "unset",
            align: "right",
        },
        {
            header: "Tiêu thụ trong ca (KW)",
            field: "TieuThuTrongCa",
            width: "unset",
            align: "right",
        },
    ];
    listdmCaSanXuat: any = []
    constructor(
        public activeModal: NgbActiveModal,
        public toastr: ToastrService,
        public _modal: NgbModal,
        private _services: SanXuatService
    ) {}

    ngOnInit(): void {
        this.nametype = `- ngày ${formatdate(this.item.NgayNhap, false)}, ${
            this.item.Ten
        }`;
        if (this.item.lstMayBienAp.length > 0) {

            this.lstKhungGio = this.item.lstMayBienAp[0].lstKhungGio;
            this.lstKhungGio.forEach((element) => {
                let liststring: any = [];
                liststring = element.Ten.split(" ÷ ");
                element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} ${liststring[1]?`đến ${liststring[1]}`:''}`;
            });
        }
        this._services
          .GetListOptdmCaSanXuat()
          .subscribe((res: any) => {
              this.listdmCaSanXuat = mapArrayForDropDown(res, "Ten", "Id");
          });
          console.log(this.item)
    }

    // changeTab(e) {
    //     this.lstKhungGio = this.item.lstMayBienAp[e.index].lstKhungGio;
    //     this.lstKhungGio.forEach((element) => {
    //         let liststring: any = [];
    //         liststring = element.Ten.split(" ÷ ");
    //         element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} đến ${liststring[1]}`;
    //     });
    // }

    GhiLai() {
        this.khongclicknhieu = !this.khongclicknhieu;
        let checkSoMoi = true;
        this.item.lstMayBienAp.forEach((objlstMayBienAp,indexMBA) => {
            objlstMayBienAp.lstKhungGio.forEach((objlstKhungGio,indexKhungGio) => {
                objlstKhungGio.lstCongTo.forEach((objlstCongTo,indexCongTo) => {
                    if(objlstCongTo.SoTieuThu ===null || objlstCongTo.SoTieuThu === undefined){
                        objlstCongTo.SoTieuThu = 0;
                    }
                    console.log(objlstCongTo.SoTieuThu);
                    if (
                        objlstCongTo.SoMoi > 0 &&
                        objlstCongTo.SoCu > objlstCongTo.SoMoi
                    ) {
                        // console.log('MBA: '+indexMBA)
                        // console.log('KhungGio: '+indexKhungGio)
                        // console.log('CongTo: '+indexCongTo)
                        // console.log(objlstCongTo)
                        checkSoMoi = false
                    }
                });
            });
        });
        console.log(this.item.lstMayBienAp);
        if (checkSoMoi) {
            this._services
                .ThongKeDien()
                .Set(this.item)
                .subscribe((res: any) => {
                    if (res) {
                        if (res.State === 1) {
                            this.toastr.success(res.message);
                            this.khongclicknhieu = !this.khongclicknhieu;
                            this.activeModal.close();
                            // this._services
                            //     .ThongKeDien()
                            //     .Get(this.item)
                            //     .subscribe((res: any) => {
                            //         this.item = res;
                            //     });
                        } else {
                            this.khongclicknhieu = !this.khongclicknhieu;
                            this.toastr.error(res.message);
                        }
                    }
                });
        } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(
                "Yêu cầu nhập lớn hơn 0 và không được nhỏ hơn số cũ"
            );
        }
    }

    tinhgiatri(item) {
        // console.log(this.listInput.toArray());
        if(validVariable(item.SoMoi)){
            if (item.SoMoi > 0 && item.SoCu < item.SoMoi) {
                item.SoTieuThu = 0;
                item.TieuThuTrongCa = 0;
                item.SoTieuThu = item.SoMoi - item.SoCu;
                item.TieuThuTrongCa = item.SoTieuThu * item.HeSoNhan * item.HeSoTI;
            } else {
                item.SoTieuThu = 0;
                item.TieuThuTrongCa = 0;
                this.toastr.error(
                    "Yêu cầu nhập lớn hơn 0 và không được nhỏ hơn số cũ"
                );
            }
        }
    }
    tinhgiatri_Bang_So_Tieu_Thu(item) {
        // console.log(this.listInput.toArray());
        if(validVariable(item.SoTieuThu)){
            if (item.SoTieuThu > 0) {
                item.SoMoi = 0;
                item.TieuThuTrongCa = 0;
                item.SoMoi = item.SoTieuThu + item.SoCu;
                item.TieuThuTrongCa = item.SoTieuThu * item.HeSoNhan * item.HeSoTI;
            } else {
                item.SoMoi = item.SoCu;
                item.TieuThuTrongCa = 0;
                this.toastr.error(
                    "Yêu cầu nhập lớn hơn 0!"
                );
            }
        }
    }

    Onclose() {
        this.activeModal.close();
    }
    Enter(page,index){
        let i = page*9+index;
        if(i<this.listInput.toArray().length){
            this.listInput.toArray()[i+1].el.nativeElement.children[0].children[0].focus();
          }else{
            this.listInput.toArray()[0].el.nativeElement.children[0].children[0].focus();
          }
    }
    changeTab(e?) {
        let index = 0;
        if(e !== undefined)
            index = e.index;
        if (this.item.lstMayBienAp.length > 0) {
            this.lstKhungGio = [];
            this.item.lstMayBienAp[index].lstKhungGio.forEach((element) => {
                if( this.idCaSanXuat !== null && this.idCaSanXuat !== ''){
                    if(element.idCaSanXuat === this.idCaSanXuat){
                        let liststring: any = [];
                        liststring = element.Ten.split(" ÷ ");
                        element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} ${liststring[1]?`đến ${liststring[1]}`:''}`;
                        this.lstKhungGio.push(element);
                    }
                }
                else{
                    let liststring: any = [];
                    liststring = element.Ten.split(" ÷ ");
                    element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} ${liststring[1]?`đến ${liststring[1]}`:''}`;
                    this.lstKhungGio.push(element);
                }
            });
        }
    }
}
