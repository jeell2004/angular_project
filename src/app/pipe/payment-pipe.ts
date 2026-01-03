import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

transform(value: string): string {
    if (!value) return '';

    return value.toUpperCase();
  }


}
