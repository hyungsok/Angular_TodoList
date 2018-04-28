import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log('value: ', value, ', args : ', args);
    //  >> value:  2018-04-28 15:53:11.0 , args :  yyyy-MM-dd aa HH:mm
    //     ( 첫번째 파라미터는 파이프 앞의 문자열, 두번째는 다음 문자열 )
    return value.substring(0, 10);
  }

}
