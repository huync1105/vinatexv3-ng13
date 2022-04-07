import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-modaldanhmuctygiangoaite',
  templateUrl: './modaldanhmuctygiangoaite.component.html',
  styleUrls: ['./modaldanhmuctygiangoaite.component.css']
})
export class ModaldanhmuctygiangoaiteComponent implements OnInit {
  public data: any = {};
  public title: any = '';
  public type = '';
  public listNam = [];
  public Nam ;
  public cols = [];
  public listProp = []

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    for(let i = new Date().getFullYear()-5;i<=new Date().getFullYear()+10;i++){
      this.listNam.push({value:i,label:i});
    }
    for(let i = 1;i<=12;i++){
      this.listProp.push(`Thang${i}`)
    }
    if(validVariable(this.Nam)){
      this.GetData();
    }
  }
  GetData(){
    this._danhMucHopDong.DanhMucTyGia().Get(this.Nam).subscribe((res:any)=>{
      res.lstTienTe.forEach(tiente => {
        for(let i =1;i<12;i++){
          let tygia = (tiente.lstTyGia.find(ele=>ele.Thang===i)?.TyGia)
          tiente[`Thang${i}`] = tygia;
        }
      });
      this.data = res;
      console.log(res);
    })
  }
  SetData() {
    this.data.lstTienTe.forEach(tiente => {
      for(let i =1;i<=12;i++){
        let tygia =tiente.lstTyGia.find(ele=>ele.Thang ===i);
        tygia.TyGia = tiente[`Thang${i}`];
      }  
    });
    return this.data;
  }

  GhiLai() {
      this._danhMucHopDong.DanhMucTyGia().Set(this.SetData()).subscribe((res: any) => {
        if (res.State !== 1) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        }
      })
    }
}
