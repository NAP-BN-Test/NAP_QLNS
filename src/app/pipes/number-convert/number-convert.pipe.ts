import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberConvert',
})
export class NumberConvertPipe implements PipeTransform {
  transform(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    if (amount >= 100) {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
      );
    } else {
      return amount;
    }
  }

  // transform(value): any {
  //   // if (value >= 1000000) {
  //   //   return parseFloat(value / 1000000 + "");
  //   // }
  //   // else if (value >= 1000 && value < 1000000) {
  //   //   return parseFloat(value / 1000 + "");
  //   // }
  //   // else {
  //   //   return value;
  //   // }
  //   value.Format("{0:#.00}", Convert.ToDecimal(myMoneyString) / 100);
  // }
}
