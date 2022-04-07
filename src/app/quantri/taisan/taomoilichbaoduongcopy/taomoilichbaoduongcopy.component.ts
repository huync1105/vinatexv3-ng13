import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ModalcapnhatbaoduongcopyyComponent } from '../modalcapnhatbaoduongcopyy/modalcapnhatbaoduongcopyy.component';

@Component({
  selector: 'app-taomoilichbaoduongcopy',
  templateUrl: './taomoilichbaoduongcopy.component.html',
  styleUrls: ['./taomoilichbaoduongcopy.component.css']
})
export class TaomoilichbaoduongcopyComponent implements OnInit {
 
  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
 

  constructor( public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  // console.log(this.item)
  }
  addBaoDuong() {
    let modalRef = this._modal.open(ModalcapnhatbaoduongcopyyComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.title = "Thêm mới lịch bảo dưỡng";
    modalRef.componentInstance.item = { Id: "",
    IdTaiSan: "",};
    modalRef.componentInstance.listLichBaoDuong = this.item|| [];
    modalRef.result
      .then((res: any) => {
        console.log(res)
        this.item=res
      })
      .catch((er) => {

      });
    }
    CapNhat(item) {
      console.log(item)
      let modalRef = this._modal.open(ModalcapnhatbaoduongcopyyComponent, {
        size: "fullscreen-100",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "edit";
      modalRef.componentInstance.title = "Cập nhật lịch bảo dưỡng";
      modalRef.componentInstance.item = item;
      
      modalRef.result
        .then((res: any) => {
        
        })
        .catch((er) => {
  
        });
    }
    Xoa(item, index) {
      if (validVariable(item.Id)) {
        this.item.splice(index, 1);
      }
      else {
        this.item[index].isXoa = true;
      }
    }
  
}
