import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StringFieldComponent } from './field-types/string-field/string-field.component';
import { SelectionFieldComponent } from './field-types/selection-field/selection-field.component';
import { RadiobuttonFieldComponent } from './field-types/radiobutton-field/radiobutton-field.component';

const COMPONENTS = [StringFieldComponent, SelectionFieldComponent, RadiobuttonFieldComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...COMPONENTS],
})
export class FormModule {}
