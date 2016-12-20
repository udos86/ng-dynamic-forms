import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormFoundationSitesComponent } from "./dynamic-form-foundation-sites.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicFormFoundationSitesComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormFoundationSitesComponent
    ]
})

export class DynamicFormsFoundationUIModule {
}