import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'fullnameconverter',
})

export class fullNameConverter implements PipeTransform {
  transform(value: string) {
    return value.slice(0, value.indexOf(" ")).concat(" ", value.charAt(value.indexOf(" ") + 1) + '.');
  }
}