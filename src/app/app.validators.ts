import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customValidator(control: AbstractControl): ValidationErrors | null {

    const hasError = control.value ? (control.value as string).startsWith("abc") : false;

    return hasError ? {customValidator: true} : null;
}

export function customDateRangeValidator(group: FormGroup): ValidationErrors | null {

    const dateArrival = group.get("arrivalDate").value as Date;
    const dateDeparture = group.get("departureDate").value as Date;

    let hasError = false;

    if (dateArrival && dateDeparture) {
        hasError = dateArrival >= dateDeparture || dateDeparture <= dateArrival;
    }

    return hasError ? {customDateRangeValidator: true} : null;
}

export function customForbiddenValidator(forbiddenValue: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control && control.value === forbiddenValue) {
            return {forbidden: true};
        }

        return null;
    };
}

export function customAsyncFormGroupValidator(_formGroup: FormGroup): Promise<ValidationErrors | null> {

    return new Promise((resolve, _reject) => {
        console.log("async validation");
        resolve(null);
    });
}
