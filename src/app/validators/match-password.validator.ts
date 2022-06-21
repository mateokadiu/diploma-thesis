import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, confirmPassword } = formGroup.value;

    if (password !== confirmPassword) {
      return { passwordsDontMatch: true };
    }
    return null;
  }
}
