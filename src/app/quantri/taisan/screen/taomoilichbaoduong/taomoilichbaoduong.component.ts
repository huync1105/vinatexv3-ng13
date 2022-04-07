import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-taomoilichbaoduong',
  templateUrl: './taomoilichbaoduong.component.html',
  styleUrls: ['./taomoilichbaoduong.component.css']
})
export class TaomoilichbaoduongComponent implements OnInit {
  @Input('item') item: any = {};  
  @Input('itemDonVi') itemDonVi: any = {};  
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  ChangeData() {
    this.itemChange.emit(this.item);
  }

}
