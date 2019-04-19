import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

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

export function customForbiddenValidator(forbiddenValue: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control && control.value === forbiddenValue) {
            return { forbidden: true };
        }

        return null;
    }
}

export function customAsyncFormGroupValidator(formGroup: FormGroup): Promise<ValidationErrors | null> {

    return new Promise((resolve, reject) => {
        console.log("async validation");
        resolve(null);
    });
}