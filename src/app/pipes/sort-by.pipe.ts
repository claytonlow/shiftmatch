import { Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  /**
   * Simple sortby pipe to sort arrays based on the sortKey..can sort numbers, strings and dates
   * @param value 
   * @param sortKey 
   * @param sortOrder 
   * @returns 
   */
  transform(value: any[], sortKey?: string, sortOrder: SortOrder | string = 'asc',): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);
    
    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numberArray = [];
    let stringArray = [];
    let dateArray = [];
    
    if (!sortKey) {
      numberArray = value.filter(item => typeof item === 'number').sort();
      stringArray = value.filter(item => typeof item === 'string').sort();
    } else {
      dateArray = value.filter(item => item[sortKey] instanceof Date).sort((a, b) => a[sortKey].getTime() - b[sortKey].getTime());
      numberArray = value.filter(item => typeof item[sortKey] === 'number').sort((a, b) => a[sortKey] - b[sortKey]);
      stringArray = value
        .filter(item => typeof item[sortKey] === 'string')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
    }
    
    const sorted = numberArray.concat(stringArray).concat(dateArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

}
