import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function customValidator(control: AbstractControl): ValidationErrors | null {

    let hasError = control.value ? (control.value as string).startsWith("abc") : false;

    return hasError ? {customValidator: true} : null;
}

export function customGroupValidator(group: FormGroup): ValidationErrors | null {

    return {customGroupValidator: true};
}