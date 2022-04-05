import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StringFieldComponent } from './field-types/string-field/string-field.component';

const COMPONENTS = [StringFieldComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...COMPONENTS],
})
export class FormModule {}
