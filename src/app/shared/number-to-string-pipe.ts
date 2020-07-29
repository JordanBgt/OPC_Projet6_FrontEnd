import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe which transforms a number to its string value
 */

@Pipe({name: 'numberToString'})
export class NumberToStringPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString();
  }
}
