import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
// import { ɵangular_packages_platform_browser_animations_animations_f } from "@angular/platform-browser/animations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
    DateToUnix,
    deepCopy,
    mapArrayForDropDown,
    validVariable,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";
import { StoreBase } from "src/app/services/storebase.class";
import { BotrimayChungComponent } from "./modals/botrimay-chung/botrimay-chung.component";
import { BotrimayOngComponent } from "./modals/botrimay-ong/botrimay-ong.component";
@Component({
    selector: "app-candoichuyen",
    templateUrl: "./candoichuyen.component.html",
    styleUrls: ["./candoichuyen.component.css"],
    providers: [DatePipe],
})
export class CandoichuyenComponent extends StoreBase implements OnInit,OnDestroy {
    listDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    listDates = [];
    filter: any = {
        CongDoan: "ONG",
        IddmPhanXuong: "1cf3f340-0f55-4f34-938p-e629318e25et"
    };
    showDialog: boolean = false;
    listCongDoan: any = [];
    listPhanXuong: any = [];
    mapMa_TenCongDoan: any = {};
    today:any;

    constructor(
        private _store: StoreService,
        private _services: SanXuatService,
        private datepipe: DatePipe,
        private _modal: NgbModal,public store:StoreService
    ) {
        super(store)
    }

    ngOnInit(): void {
        this.GetOptions();
        let date = new Date();
        this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
        this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.today = this.datepipe.transform(date, "dd/MM/yyyy");
        // this.boTriMay();
    }
    GetOptions(): void {
        let data2 = {
            PageSize: 20,
            CurrentPage: 0,
            sFilter: this.filter.keyWord ? this.filter.keyWord : "",
            CongDoan: this.filter.CongDoan ? this.filter.CongDoan : "",
            Ma: "",
            Ten: "",
        };
        this._services.GetListdmPhanXuong(data2).subscribe((res: any) => {
            this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
            this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
            this.GetCalendar();
        });
        this._services.GetListCongDoan().subscribe((res: any) => {
            this.listCongDoan = mapArrayForDropDown(res, "Ten", "Ma");
            res.forEach((cd) => {
                this.mapMa_TenCongDoan[cd.Ma] = cd.Ten;
            });
            // this.listCongDoan.unshift({ label: 'Tất cả', value: '' })
            // this.filter.CongDoan = this.listCongDoan[0].value;
        });
    }
    getDates(startDate, endDate) {
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            let data: any = {};
            if (currentDate.getDate() === 1) {
                data.header = `01/${currentDate.getMonth() < 9
                    ? `0${currentDate.getMonth() + 1}`
                    : currentDate.getMonth() + 1
                    }`;
            } else {
                data.header = this.datepipe.transform(currentDate, "dd");
            }
            data.Unix = DateToUnix(currentDate);
            data.prop = this.datepipe.transform(currentDate, "dd_MM_yyyy");
            data.labelHienThi = this.datepipe.transform(currentDate, "dd/MM/yyyy");
            data.value = currentDate;
            dates.push(data);
            currentDate = addDays.call(currentDate, 1);
        }
        console.log(dates);
        return dates;
    }
    GetCalendar(reset?) {
        if (validVariable(this.filter._tuNgay)) {
            this.filter.TuNgayUnix = DateToUnix(this.filter._tuNgay);
        } else {
            this.filter.TuNgayUnix = null;
        }
        if (validVariable(this.filter._denNgay)) {
            this.filter.DenNgayUnix = DateToUnix(this.filter._denNgay);
        } else {
            this.filter.DenNgayUnix = null;
        }
        if (
            validVariable(this.filter.TuNgayUnix) &&
            validVariable(this.filter.DenNgayUnix) &&
            this.filter.TuNgayUnix < this.filter.DenNgayUnix
            && validVariable(this.filter.IddmPhanXuong) && validVariable(this.filter.CongDoan)
        ) {
            let { IddmPhanXuong, TuNgayUnix, DenNgayUnix, CongDoan } = this.filter
            this._services.CanDoiChuyen().GetListCanDoiChuyen(IddmPhanXuong, CongDoan, TuNgayUnix, DenNgayUnix,).subscribe((res: Array<any>) => {
                this.listDates = this.getDates(
                    this.filter._tuNgay,
                    this.filter._denNgay
                );
                for (let i = 0; i < this.listDates.length; i++) {
                    this.listDates[i] = { ...this.listDates[i], ...res[i] }
                }
                for (let i = 0; i < this.filter._tuNgay.getDay(); i++) {
                    this.listDates.unshift({ header: "none" });
                }
                // if(!reset){
                //     let date = new Date();
                //     let today = this.datepipe.transform(date, "dd/MM/yyyy");
                //     this.boTriMay(this.listDates.findIndex(ele=>ele.labelHienThi===today),this.listDates.find(ele=>ele.labelHienThi=== today));
                // }
            })
        }
    }
    boTriMay(index, date?) {
        if (date?.header === 'none') {
        } else {
            if (this.filter.CongDoan === "ONG") {
                this._services.CanDoiChuyen().GetCanDoiChuyen(this.filter.IddmPhanXuong, this.filter.CongDoan, date.Unix).subscribe(res => {
                    console.log(res);
                    let modalRef = this._modal.open(BotrimayOngComponent, {
                        size: "fullscreen-100",
                        backdrop: "static",
                        keyboard: false
                    });
                    modalRef.componentInstance.item = deepCopy(res);
                    modalRef.componentInstance.checkbutton = this.checkNavigationButton(index);
                    modalRef.componentInstance.addonData = {
                        IddmPhanXuong: this.filter.IddmPhanXuong,
                        CongDoan: this.filter.CongDoan,
                        NgayUnix: date.Unix,
                        LabelNgay: date.labelHienThi
                    };
                    modalRef.result
                        .then((res) => {
                            if (res.opt) {
                                this.navigationAction(res.opt, index)
                            }
                            if (res.respawn) {
                                this.boTriMay(index, date);
                            }
                        })
                        .catch((er) => {
                            console.log(er);
                        })
                        .finally(() => {
                            this.GetCalendar(true);
                        });
                })
            } else {
                this._services.CanDoiChuyen().GetCanDoiChuyen(this.filter.IddmPhanXuong, this.filter.CongDoan, date.Unix).subscribe(res => {
                    let modalRef = this._modal.open(BotrimayChungComponent, {
                        size: "fullscreen-100",
                        backdrop: "static",
                        keyboard: false
                    });
                    modalRef.componentInstance.TenCongDoan = this.mapMa_TenCongDoan[this.filter.CongDoan];
                    modalRef.componentInstance.checkbutton = this.checkNavigationButton(index);
                    modalRef.componentInstance.item = deepCopy(res);
                    // modalRef.componentInstance.canDieuChinh = (date.labelHienThi === this.today);
                    modalRef.componentInstance.canDieuChinh = true;
                        modalRef.componentInstance.addonData = {
                            IddmPhanXuong: this.filter.IddmPhanXuong,
                            CongDoan: this.filter.CongDoan,
                            NgayUnix: date.Unix,
                            LabelNgay: date.labelHienThi
                        };
                    modalRef.result
                        .then((res) => {
                            if (res.opt) {
                                this.navigationAction(res.opt, index);
                            }
                            if (res.respawn) {
                                this.boTriMay(index, date);
                            }
                        })
                        .catch((er) => {
                            console.log(er);
                        })
                        .finally(() => {
                            this.GetCalendar(true);
                        });
                })
            }
        }
    }
    navigationAction(opt, index) {
        switch (opt) {
            case 'Next':
                this.boTriMay(index + 1, this.listDates[index + 1])
                break;
            case 'Previous':
                this.boTriMay(index - 1, this.listDates[index - 1])
                break;
            default:
                break;
        }
    }
    checkNavigationButton(index) {
        return {
            Previous: this.canPrevious(index, this.listDates),
            Next: this.canNext(index, this.listDates),
            Ghi: true
        }
    }
    canPrevious(index, list) {
        if (index > 0) {
            if (validVariable(list[index - 1]?.Unix)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    canNext(index, list) {
        if (index < list.length - 1) {
            return true;
        }
        return false
    }
    showSanLuong() {
        this.showDialog = true;
    }
    ngOnDestroy(){
        super.ngOnDestroy();
      }
}
