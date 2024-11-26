import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore',
})
export class Readmore implements PipeTransform {
  transform(value: string, limit: number = 20, ellipsis: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}