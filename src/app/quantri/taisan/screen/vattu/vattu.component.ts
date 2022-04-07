import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.component.html',
  styleUrls: ['./vattu.component.css']
})
export class VattuComponent implements OnInit {

  constructor(private _services: SanXuatService) { }

  ngOnInit(): void {
  }

}
