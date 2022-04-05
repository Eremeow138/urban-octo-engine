import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StringFieldComponent } from './field-types/string-field/string-field.component';

@NgModule({
  declarations: [StringFieldComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormModule {}
