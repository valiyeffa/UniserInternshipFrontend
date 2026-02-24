import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(fullName: string): string {
    const parts = fullName.trim().split(' ');
    // 👆 adı boşluqdan ayırır: ['Aysel', 'Məmmədova']
    
    if (parts.length < 2) return fullName;
    
    return `${parts[0]} ${parts[1].charAt(0)}.`;
    // 👆 'Aysel' + ' ' + 'M' + '.' = 'Aysel M.'
  }
}