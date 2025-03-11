import { FormControl, AbstractControl } from '@angular/forms';

export function ValidateConfirmPassword(control: FormControl) {
  if (control.parent && control.value !== control.parent.get('password').value) {
    return { mismatch: true };
  }
  return null;
}
