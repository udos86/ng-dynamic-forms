import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function customValidator(control: AbstractControl): ValidationErrors | null {

    let hasError = control.value ? (control.value as string).startsWith("abc") : false;

    return hasError ? {customValidator: true} : null;
}

export function customDateRangeValidator(group: FormGroup): ValidationErrors | null {

    let dateArrival = group.get("arrivalDate").value as Date,
        dateDeparture = group.get("departureDate").value as Date,
        hasError = false;

    if (dateArrival && dateDeparture) {
        hasError = dateArrival >= dateDeparture || dateDeparture <= dateArrival;
    }

    return hasError ? {customDateRangeValidator: true} : null;
}