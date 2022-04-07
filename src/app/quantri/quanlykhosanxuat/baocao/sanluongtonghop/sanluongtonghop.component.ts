import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanluongtonghop',
  templateUrl: './sanluongtonghop.component.html',
  styleUrls: ['./sanluongtonghop.component.css']
})
export class SanluongtonghopComponent implements OnInit {
  filter:any={}
  items:any;
  constructor() { }

  ngOnInit(): void {
  }
  GetListQuyTrinh(){

  }
  resetFilter(){
    
  }
}
