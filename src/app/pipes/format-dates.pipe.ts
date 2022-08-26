import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDates',
  pure: false
})
export class FormatDatesPipe implements PipeTransform {
  /**
   * Simple pipe to format an array of date/string to a specific type of format
   * Utilizes moment purely for this demo
   * @param items 
   * @param format 
   * @returns 
   */
  transform(items: any[], format: string = 'YYYY-MM-DD'): any {
      if (!items || !format) {
          return items;
      }
      return items.map(item => moment(item).format(format));
  }
}