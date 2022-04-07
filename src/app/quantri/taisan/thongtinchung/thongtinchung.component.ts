
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DateToUnix, formatdate, UnixToDate, } from "src/app/services/globalfunction";

import { vn } from "src/app/services/const";
@Component({
  selector: 'app-thongtinchung',
  templateUrl: './thongtinchung.component.html',
  styleUrls: ['./thongtinchung.component.css']
})
export class ThongtinchungComponent implements OnInit {
  @Input("Du_Lieu_Thong_Tin_Chung") Chon_Vao:any={};

  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;

  constructor(
 ) { }

  ngOnInit(): void {
   console.log(this.Chon_Vao)

  }



 
}