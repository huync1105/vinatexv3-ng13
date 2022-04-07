import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'isDieuChinh',pure:false})
export class isDieuChinhPipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    if(!!value){
        return value.filter(ele=>ele.isDieuChinh!== true);
    }else{
      return null;
    }
  }
}