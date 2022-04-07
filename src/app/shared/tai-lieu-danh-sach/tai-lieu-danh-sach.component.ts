import { Component, OnInit } from '@angular/core';

interface ListTaiLieu {
    id: number,
    ten: string,
    loai: string,
    tacgia: string,
    ngaytao: number,
    ghichu: string,
}

@Component({
  selector: 'app-tai-lieu-danh-sach',
  templateUrl: './tai-lieu-danh-sach.component.html',
  styleUrls: ['./tai-lieu-danh-sach.component.css']
})
export class TaiLieuDanhSachComponent implements OnInit {

  // table header
  cols = [
    'Tên tài liệu',
    'Loại tài liệu',
    'Người tạo',
    'Ngày tạo',
    'Ghi chú',
  ]

  // list tai lieu
  listTaiLieu: ListTaiLieu[] = [
    
  ]

  constructor() {
    this.listTaiLieu = [
      {
        id: 1,
        ten: 'Tài liệu bàn giao tài sản 1',
        loai: 'Bản cứng',
        tacgia: 'Nguyễn Văn A',
        ngaytao: 1646646257000,
        ghichu: 'Không có ghi chú'
      },
      {
        id: 2,
        ten: 'Tài liệu bàn giao tài sản 2',
        loai: 'Bản cứng',
        tacgia: 'Nguyễn Văn A',
        ngaytao: 200000000,
        ghichu: 'Không có ghi chú'
      },
      {
        id: 3,
        ten: 'Tài liệu bàn giao tài sản 3',
        loai: 'Bản cứng',
        tacgia: 'Nguyễn Văn A',
        ngaytao: 200000000,
        ghichu: 'Không có ghi chú'
      }
    ]
  }

  ngOnInit(): void {
  }

  deleteTaiLieu(ten: string) {
    const index = this.listTaiLieu.findIndex(tl => tl.ten === ten)
    this.listTaiLieu.splice(index, 1);
    if(this.listTaiLieu.length === 0) {
      this.listTaiLieu= [
        {
          id: 0,
          ten: '',
          loai: '',
          tacgia: '',
          ngaytao: NaN,
          ghichu: ''
        },
      ]
    }
  }
}
