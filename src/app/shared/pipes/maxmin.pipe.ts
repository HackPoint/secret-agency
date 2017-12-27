import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxMin'
})
export class MaxMinPipe implements PipeTransform {
  transform(value: any[], prop: string) {
    if (!Array.isArray(value) || value.length === 0 || !prop) {
      return value;
    }

    // Here we sort the items based on passed `property`
    value.sort((a, b) => b[prop] - a[prop]);
    const max = value[0][prop];
    const min = value[value.length - 1][prop];

    return [max, min];
  }
}
