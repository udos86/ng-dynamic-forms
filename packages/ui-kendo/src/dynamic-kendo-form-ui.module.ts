import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicKendoFormControlComponent } from "./dynamic-kendo-form-control.component";
import { DynamicKendoFormComponent } from "./dynamic-kendo-form.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        DateInputsModule,
        DropDownsModule,
        InputsModule,
        UploadModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicKendoFormControlComponent,
        DynamicKendoFormComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicKendoFormControlComponent,
        DynamicKendoFormComponent
    ]
})

export class DynamicFormsKendoUIModule {
}