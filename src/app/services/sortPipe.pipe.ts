import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'SortByKey',pure:false})
export class SortByKeyPipe implements PipeTransform {
  transform(value: Array<any>,Key?:any): Array<any> {
    if(!!value){
      if(Key!==undefined && Key!==null &&Key!==''){
        return value.sort((a,b)=>a[Key]-b[Key]);
      }else{
        return value;
      }
    }else{
      return null;
    }
  }
}