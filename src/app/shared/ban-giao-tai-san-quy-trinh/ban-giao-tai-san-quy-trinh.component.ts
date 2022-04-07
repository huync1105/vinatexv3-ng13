import { Component, OnInit } from '@angular/core';

interface QuyTrinh {
  id: number,
  ten: string,
  isHoanThanh: boolean,
  isXuLy: boolean,
}

@Component({
  selector: 'app-ban-giao-tai-san-quy-trinh',
  templateUrl: './ban-giao-tai-san-quy-trinh.component.html',
  styleUrls: ['./ban-giao-tai-san-quy-trinh.component.css']
})
export class BanGiaoTaiSanQuyTrinhComponent implements OnInit {

  title = 'Tiến trình'
  listQuyTrinh: QuyTrinh[] = [];
  bool: boolean = true;

  constructor() { 
    this.listQuyTrinh = [
    {
        id: 1,
        ten: 'Bước 1: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: true,
        isXuLy: false,
    },
    {
        id: 2,
        ten: 'Bước 2: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: false,
        isXuLy: true
    },
    {
        id: 3,
        ten: 'Bước 3: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: false,
        isXuLy: false
    },
    {
        id: 4,
        ten: 'Bước 4: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: false,
        isXuLy: false
    },
    {
        id: 5,
        ten: 'Bước 5: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: false,
        isXuLy: false
    },
    {
        id: 6,
        ten: 'Bước 6: Nhập nhóm sản phẩm mua bán',
        isHoanThanh: false,
        isXuLy: false
    },
    ]
  }

  ngOnInit(): void {
    
  }

  transformIcon() {
    this.bool = !this.bool;
    console.log(this.bool); 
  }

}
