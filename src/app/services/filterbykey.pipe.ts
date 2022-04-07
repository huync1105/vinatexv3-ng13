import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
        name: 'filterByKey', pure: false
})
export class FilterByKeyPipe implements PipeTransform {
        transform(value: any, Key: string, keyWord: string): Array<any> {
                if (!!value) {
                        if (keyWord !== null && keyWord !== undefined && keyWord.trim() !== '') {
                                return value.filter(ele => ele[Key].toString()
                                        .toLowerCase()
                                        .includes(keyWord.toLowerCase())
                                );
                        }
                        else {
                                return value;
                        }
                } else {
                        return null;
                }
        }
}