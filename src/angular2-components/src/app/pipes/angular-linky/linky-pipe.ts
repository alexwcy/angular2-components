import { Pipe, PipeTransform } from '@angular/core';
import * as Autolinker from 'autolinker';

@Pipe({ name: 'linky' })
export class LinkyPipe implements PipeTransform {
  transform(value: string, options?: any): string {
    return Autolinker.link(value, options);
  }
}
