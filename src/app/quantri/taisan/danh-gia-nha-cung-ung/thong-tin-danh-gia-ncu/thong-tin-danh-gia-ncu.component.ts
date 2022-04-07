import { time } from '@amcharts/amcharts4/core';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-thong-tin-danh-gia-ncu',
  templateUrl: './thong-tin-danh-gia-ncu.component.html',
  styleUrls: ['./thong-tin-danh-gia-ncu.component.css']
})
export class ThongTinDanhGiaNcuComponent implements OnInit,AfterViewInit,OnChanges {

  listTieuChi: any = [];
  @Input() phieuDanhGia: any;
  @Input() daDanhGia: any;

  sum: any = 0;

  constructor(
    public toast: ToastrService,
    private taiSanService: TaisanService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.LoadListTieuChi();
  }

  ngOnInit(): void {
    this.LoadListTieuChi();
  }
  
  LoadListTieuChi() {
    let data = {
      CurrentPage: 1,
      TieuChiCha: false,
      Keyword: "",
      GhiChu: "",
    }
    this.taiSanService.TieuChiDanhGia().GetList(data).subscribe((res: any) => {
      this.listTieuChi = res.Data.Items;
      this.listTieuChi= this.recursive(this.listTieuChi)
      this.SumDiemDanhGia();
    })
  }

  recursive(list: Array<any>) {
    return list.map(ele => {
      let realPoint = this.daDanhGia?.find(tieuchi => ele.Id === tieuchi.IddmTieuChiDanhGia)?.Diem
      return {
        ...ele,
        DiemDanhGia: realPoint || null,
        listItem: validVariable(ele.listItem) ? this.recursive(ele.listItem) : []
      }
    })
  }

  SaveData() {
    let listCon = [];
    let listCha = [];
    listCon = this.listTieuChi.reduce((array, item)=>{
      return array.concat(item.listItem);
    },[]).map((ele)=>{
      return {
        IddmTieuChiDanhGia: ele.Id,
        Diem: ele.DiemDanhGia,
      }
    })
    listCha = this.listTieuChi.map(ele => {
      return {
        IddmTieuChiDanhGia: ele.Id,
        Diem: ele.DiemDanhGia,
      }
    })
    this.phieuDanhGia.listTieuChi = [...listCon,...listCha].filter((ele)=>{
      return validVariable(ele.Diem) && ele.Diem !== 0;
    });
    this.phieuDanhGia.KetQuaDanhGia = this.sum;
  }

  SumDiemDanhGia() {
    this.listTieuChi.forEach((item) => {
      if (item.listItem.length) {
        item.toggle = true;
        item.DiemDanhGia = Math.max(...item.listItem.reduce((array, nextChild)=>{
          return array.concat(nextChild.DiemDanhGia || 0)
        },[])) || 0;
        // item.DiemDanhGia = item.listItem.reduce((number, nextChild) => {
        //   return number + (nextChild.DiemDanhGia || 0);
        // }, 0)
      } else {
        item.toggle = false;
      }
    })
    this.sum = this.listTieuChi.reduce((number, item) => {
      return number + item.DiemDanhGia;
    }, 0)
    this.SaveData();
  }


  // recursiveArr(list){
  //   let newArray=[];
  //   list.forEach(ele=>{
  //     newArray.push(ele);
  //     console.log('newArray:',newArray);
      
  //     if(validVariable(ele.listCon) && ele.listCon.length!==0){
  //       newArray = [...newArray,...this.recursive(ele.listCon)] 
  //     }
  //   })
  //   return newArray
  // }
}
