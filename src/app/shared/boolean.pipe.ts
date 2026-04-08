import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
  standalone: true
})

export class BooleanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): boolean {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }

    return !!value;
  }

}