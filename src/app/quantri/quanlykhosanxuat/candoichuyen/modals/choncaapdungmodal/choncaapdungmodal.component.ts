import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choncaapdungmodal',
  templateUrl: './choncaapdungmodal.component.html',
  styleUrls: ['./choncaapdungmodal.component.css']
})
export class ChoncaapdungmodalComponent implements OnInit {
  ca:any;
  listCa:any = [];
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.listCa);
    console.log(this.ca);
    this.listCa.forEach(c => {
      if(this.ca === c.prop){
        c.disabled = true;
      }
    });
  }
  accept(){
    let arrCaApDung = this.listCa.filter(ele=>ele.checked === true).map(ele=>ele.prop);
    this.activeModal.close(arrCaApDung);
  }

}
