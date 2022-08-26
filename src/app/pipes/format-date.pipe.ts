import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  /**
   * Simple pipe to format a date/string to a specific type of format
   * Utilizes moment purely for this demo
   * @param date 
   * @param format 
   * @returns 
   */
  transform(date: Date | string, format = 'YYYY-MM-DD'): unknown {
    return moment(date).format(format);
  }

}
