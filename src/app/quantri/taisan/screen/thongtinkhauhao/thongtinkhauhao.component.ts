import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-thongtinkhauhao',
  templateUrl: './thongtinkhauhao.component.html',
  styleUrls: ['./thongtinkhauhao.component.css']
})
export class ThongtinkhauhaoComponent implements OnInit {

  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};

  constructor(public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  add() {
    if (this.item === undefined || this.item === null)
    this.item = [];
    this.item.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.splice(index, 1)[0];
  }
}
