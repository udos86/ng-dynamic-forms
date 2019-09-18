import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { RatingModule } from "ngx-bootstrap/rating";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicNGxBootstrapFormControlContainerComponent } from "./dynamic-ngx-bootstrap-form-control-container.component";
import { DynamicNGxBootstrapFormComponent } from "./dynamic-ngx-bootstrap-form.component";
import { DynamicNGxBootstrapCheckboxComponent } from "./checkbox/dynamic-ngx-bootstrap-checkbox.component";
import { DynamicNGxBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ngx-bootstrap-checkbox-group.component";
import { DynamicNGxBootstrapDatePickerComponent } from "./datepicker/dynamic-ngx-bootstrap-datepicker.component";
import { DynamicNGxBootstrapFormArrayComponent } from "./form-array/dynamic-ngx-bootstrap-form-array.component";
import { DynamicNGxBootstrapFormGroupComponent } from "./form-group/dynamic-ngx-bootstrap-form-group.component";
import { DynamicNGxBootstrapInputComponent } from "./input/dynamic-ngx-bootstrap-input.component";
import { DynamicNGxBootstrapRadioGroupComponent } from "./radio-group/dynamic-ngx-bootstrap-radio-group.component";
import { DynamicNGxBootstrapRatingComponent } from "./rating/dynamic-ngx-bootstrap-rating.component";
import { DynamicNGxBootstrapSelectComponent } from "./select/dynamic-ngx-bootstrap-select.component";
import { DynamicNGxBootstrapTextAreaComponent } from "./textarea/dynamic-ngx-bootstrap-textarea.component";
import { DynamicNGxBootstrapTimePickerComponent } from "./timepicker/dynamic-ngx-bootstrap-timepicker.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BsDatepickerModule,
        ButtonsModule,
        RatingModule,
        TimepickerModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicNGxBootstrapCheckboxComponent,
        DynamicNGxBootstrapCheckboxGroupComponent,
        DynamicNGxBootstrapDatePickerComponent,
        DynamicNGxBootstrapFormArrayComponent,
        DynamicNGxBootstrapFormComponent,
        DynamicNGxBootstrapFormControlContainerComponent,
        DynamicNGxBootstrapFormGroupComponent,
        DynamicNGxBootstrapInputComponent,
        DynamicNGxBootstrapRadioGroupComponent,
        DynamicNGxBootstrapRatingComponent,
        DynamicNGxBootstrapSelectComponent,
        DynamicNGxBootstrapTextAreaComponent,
        DynamicNGxBootstrapTimePickerComponent
    ],
    entryComponents: [
        DynamicNGxBootstrapCheckboxComponent,
        DynamicNGxBootstrapCheckboxGroupComponent,
        DynamicNGxBootstrapDatePickerComponent,
        DynamicNGxBootstrapFormArrayComponent,
        DynamicNGxBootstrapFormGroupComponent,
        DynamicNGxBootstrapInputComponent,
        DynamicNGxBootstrapRadioGroupComponent,
        DynamicNGxBootstrapRatingComponent,
        DynamicNGxBootstrapSelectComponent,
        DynamicNGxBootstrapTextAreaComponent,
        DynamicNGxBootstrapTimePickerComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicNGxBootstrapCheckboxComponent,
        DynamicNGxBootstrapCheckboxGroupComponent,
        DynamicNGxBootstrapDatePickerComponent,
        DynamicNGxBootstrapFormArrayComponent,
        DynamicNGxBootstrapFormComponent,
        DynamicNGxBootstrapFormControlContainerComponent,
        DynamicNGxBootstrapFormGroupComponent,
        DynamicNGxBootstrapInputComponent,
        DynamicNGxBootstrapRadioGroupComponent,
        DynamicNGxBootstrapRatingComponent,
        DynamicNGxBootstrapSelectComponent,
        DynamicNGxBootstrapTextAreaComponent,
        DynamicNGxBootstrapTimePickerComponent
    ]
})
export class DynamicFormsNGxBootstrapUIModule {
}
