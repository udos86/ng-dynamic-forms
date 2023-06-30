import { NgModule } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory } from "@ng-dynamic-forms/core";
import { customLazyLoadedValidator } from "./lazy-loaded-form.validators";

@NgModule({
    providers: [
        {
            provide: NG_VALIDATORS,
            useValue: customLazyLoadedValidator,
            multi: true
        },
        {
            provide: DYNAMIC_VALIDATORS,
            useValue: new Map<string, Validator | ValidatorFactory>([
                ["customLazyLoadedValidator", customLazyLoadedValidator]
            ])
        }

    ]
})

export class LazyLoadedFormModule {
}
