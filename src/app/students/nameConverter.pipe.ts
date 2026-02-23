import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'nameconverter',
})

export class nameConverter implements PipeTransform {
  transform(value: string) {
    return value.charAt(0) + '.';
  }
}