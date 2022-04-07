
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calcmodal',
  templateUrl: './calcmodal.component.html',
  styleUrls: ['./calcmodal.component.css']
})
export class CalcmodalComponent implements OnInit {
  calcString: string;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
    this.calcString = "";
  }
  accept() {
    try {
      let result = new Function(`return ${this.calcString.replace(',', '.')};`)();
      if (typeof result === 'number') {
        this.activeModal.close(result)
      } else {
        this.toastr.error('Vui lòng nhập đúng biểu thức số học!')
      }
    } catch (error) {
      this.toastr.error('Vui lòng nhập đúng biểu thức số học!')
    }

  }
}
