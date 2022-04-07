import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalthongbao',
  templateUrl: './modalthongbao.component.html',
  styleUrls: ['./modalthongbao.component.css']
})
export class ModalthongbaoComponent implements OnInit {
  message:string = '';
  constructor(public _modal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

}
