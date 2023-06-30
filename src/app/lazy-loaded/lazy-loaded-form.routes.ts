import { Route } from "@angular/router";
import { LazyLoadedFormComponent } from "./lazy-loaded-form.component";
import { NG_VALIDATORS } from "@angular/forms";
import { customLazyLoadedValidator } from "./lazy-loaded-form.validators";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory } from "@ng-dynamic-forms/core";

export const lazyFormRoutes: Route[] = [
    {
        path: "",
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

        ],
        component: LazyLoadedFormComponent
    }
];
