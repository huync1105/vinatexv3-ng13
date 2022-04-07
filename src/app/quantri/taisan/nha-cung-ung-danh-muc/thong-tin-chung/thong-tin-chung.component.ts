import { Component, Input, OnInit } from '@angular/core';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.css']
})
export class ThongTinChungComponent implements OnInit {

  @Input() item:any;
  listNhomCungUng: any = [];

  constructor(
    private taiSanService: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetListdmNhomCungUng();
  }

  GetListdmNhomCungUng() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: "",  
      GhiChu: "",
    }
    this.taiSanService.NhomNhaCungUng().GetListdmNhomNhaCungung(data).subscribe((res: any) => {
      this.listNhomCungUng = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

}
