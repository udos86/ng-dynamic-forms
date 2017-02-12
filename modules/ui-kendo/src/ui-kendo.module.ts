import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormKendoComponent } from "./dynamic-form-kendo.component";

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
        DynamicFormKendoComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicFormKendoComponent
    ]
})

export class DynamicFormsKendoUIModule {
}