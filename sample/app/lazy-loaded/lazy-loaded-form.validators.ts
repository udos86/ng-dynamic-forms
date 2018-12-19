import { AbstractControl, ValidationErrors } from "@angular/forms";

export function customLazyLoadedValidator(control: AbstractControl): ValidationErrors | null {

    let hasError = control.value ? (control.value as string).startsWith("lazy") : false;

    return hasError ? {customLazyLoadedValidator: true} : null;
}
