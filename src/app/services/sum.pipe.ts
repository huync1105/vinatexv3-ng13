import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'SumByKey',pure:false})
export class SumByKeyPipe implements PipeTransform {
  transform(value: Array<any>,Key?:any): number {
    if(!!value){
      if(Key!==undefined && Key!==null &&Key!==''){
        return value.reduce((Total,ele)=>Total+(ele[Key]||0),0);
      }else{
        return 0;
      }
    }else{
      return null;
    }
  }
}