import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberConvertPipe } from './number-convert/number-convert.pipe';



@NgModule({
  declarations: [ NumberConvertPipe],
  imports: [
    CommonModule
  ],
  exports: [ NumberConvertPipe]
})
export class PipesModule { }
