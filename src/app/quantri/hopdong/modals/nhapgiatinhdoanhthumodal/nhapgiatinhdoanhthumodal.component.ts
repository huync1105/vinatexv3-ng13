import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nhapgiatinhdoanhthumodal',
  templateUrl: './nhapgiatinhdoanhthumodal.component.html',
  styleUrls: ['./nhapgiatinhdoanhthumodal.component.css']
})
export class NhapgiatinhdoanhthumodalComponent implements OnInit {
  data:any
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
