import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'plussing'})
export class PositiveNumberPipe implements PipeTransform {
  transform(value) {
    if (value > 0) {
      return "+ " + value;
    } else if (value < 0){
      return "- " + value * -1;
    } 

    return value;
  }
}