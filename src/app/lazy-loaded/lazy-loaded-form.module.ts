import { NgModule } from '@angular/core';
import { DynamicFormsBootstrapUIModule } from "@ng-dynamic-forms/ui-bootstrap";
import { LazyLoadedFormRoutingModule } from "./lazy-loaded-form.routing.module";
import { NG_VALIDATORS, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LazyLoadedFormComponent } from "./lazy-loaded-form.component";
import { DYNAMIC_VALIDATORS, DynamicFormsCoreModule, Validator, ValidatorFactory } from "@ng-dynamic-forms/core";
import { customLazyLoadedValidator } from "./lazy-loaded-form.validators";

@NgModule({

    imports: [
        LazyLoadedFormRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule,
        DynamicFormsBootstrapUIModule
    ],
    declarations: [LazyLoadedFormComponent],
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
        },

    ]
})

export class LazyLoadedFormModule {
}
