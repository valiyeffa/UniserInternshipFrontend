import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'fullnameconverter',
})

export class fullNameConverter implements PipeTransform {
  transform(value: string) {
    const [first, last] = value.split(" ");
    return `${first} ${last.charAt(0)}.`
  }
}